const MAX_TOKEN_LENGTH = 10_000;
const MAX_PAYLOAD_KEYS = 100;

// Types
export type ClaimCategory = 'standard' | 'identity' | 'authorization' | 'custom';

export interface ClaimInfo {
    key: string;
    value: unknown;
    label: string;
    description: string;
    isStandard: boolean;
    category: ClaimCategory;
}

export interface RawJWT {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
    rawHeaderBase64: string;
    rawPayloadBase64: string;
}

export interface JWTMetadata {
    algorithm: string;
    tokenType: string;
    tokenSize: number;
    issuedAt: string | null;
    issuedAtISO: string | null;
    expiry: string | null;
    expiryISO: string | null;
    notBefore: string | null;
    notBeforeISO: string | null;
    isExpired: boolean | null;
    ttlSeconds: number | null;
    timeLeftSeconds: number | null;
    tokenAgeSeconds: number | null;
}

export interface DecodedJWT extends RawJWT, JWTMetadata {
    claims: ClaimInfo[];
}

export type ExportFormat = 'JSON' | 'CSV' | 'SQL';


// Known JWT Claims Registry


const KNOWN_CLAIMS: Record<string, { label: string; description: string; category: ClaimCategory }> = {
    iss: { label: 'Issuer', description: 'Entity that issued the token', category: 'standard' },
    sub: { label: 'Subject', description: 'Subject of the token (usually user ID)', category: 'standard' },
    aud: { label: 'Audience', description: 'Intended recipient of the token', category: 'standard' },
    exp: { label: 'Expiration', description: 'Unix timestamp when the token expires', category: 'standard' },
    nbf: { label: 'Not Before', description: 'Unix timestamp before which the token is invalid', category: 'standard' },
    iat: { label: 'Issued At', description: 'Unix timestamp when the token was issued', category: 'standard' },
    jti: { label: 'JWT ID', description: 'Unique identifier for the token', category: 'standard' },
    name: { label: 'Full Name', description: 'User display name', category: 'identity' },
    email: { label: 'Email', description: 'User email address', category: 'identity' },
    role: { label: 'Role', description: 'User role or permission level', category: 'authorization' },
    scope: { label: 'Scope', description: 'Access scope granted to the token', category: 'authorization' },
    azp: { label: 'Authorized Party', description: 'The party the token was issued to', category: 'authorization' },
    nonce: { label: 'Nonce', description: 'Value used for replay protection', category: 'standard' },
};

// Sample Token


export const SAMPLE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwi' +
    'ZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiw' +
    'iaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjIsImlzcyI6Im' +
    'h0dHBzOi8vYXV0aC5leGFtcGxlLmNvbSIsImp0aSI6ImFiYzEyMyJ9.' +
    'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


// Helpers


function base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return atob(base64);
}

function toISO(unixSeconds: number): string {
    return new Date(unixSeconds * 1000).toISOString();
}

function toLocale(unixSeconds: number): string {
    return new Date(unixSeconds * 1000).toLocaleString();
}

/**
 * Returns seconds remaining until the given expiry timestamp.
 * Positive = still valid, negative = expired.
 */
export function getTimeLeft(expUnixSeconds: number): number {
    return Math.floor(expUnixSeconds - Date.now() / 1000);
}


// Core: decodeRaw


export function decodeRaw(token: string): RawJWT | null {
    const trimmed = token.trim();

    if (!trimmed || trimmed.length > MAX_TOKEN_LENGTH) return null;

    try {
        const parts = trimmed.split('.');
        if (parts.length !== 3) return null;

        const header = JSON.parse(base64UrlDecode(parts[0]));
        const payload = JSON.parse(base64UrlDecode(parts[1]));

        if (typeof header !== 'object' || header === null) return null;
        if (typeof payload !== 'object' || payload === null) return null;

        if (Object.keys(payload).length > MAX_PAYLOAD_KEYS) return null;

        return {
            header,
            payload,
            signature: parts[2],
            rawHeaderBase64: parts[0],
            rawPayloadBase64: parts[1],
        };
    } catch {
        return null;
    }
}


// Core: extractStandardTimes


export interface StandardTimes {
    iat: number | null;
    exp: number | null;
    nbf: number | null;
    issuedAt: string | null;
    issuedAtISO: string | null;
    expiry: string | null;
    expiryISO: string | null;
    notBefore: string | null;
    notBeforeISO: string | null;
}

/**
 * Extracts iat, exp, nbf from the payload and formats them.
 * Pure extraction — no derived calculations.
 */
export function extractStandardTimes(payload: Record<string, unknown>): StandardTimes {
    const iat = typeof payload.iat === 'number' ? payload.iat : null;
    const exp = typeof payload.exp === 'number' ? payload.exp : null;
    const nbf = typeof payload.nbf === 'number' ? payload.nbf : null;

    return {
        iat,
        exp,
        nbf,
        issuedAt: iat !== null ? toLocale(iat) : null,
        issuedAtISO: iat !== null ? toISO(iat) : null,
        expiry: exp !== null ? toLocale(exp) : null,
        expiryISO: exp !== null ? toISO(exp) : null,
        notBefore: nbf !== null ? toLocale(nbf) : null,
        notBeforeISO: nbf !== null ? toISO(nbf) : null,
    };
}

// ---------------------------------------------------------------------------
// Core: computeTimeMetadata
// ---------------------------------------------------------------------------

export interface TimeMetadata {
    isExpired: boolean | null;
    ttlSeconds: number | null;
    timeLeftSeconds: number | null;
    tokenAgeSeconds: number | null;
}

/**
 * Derives expiry state, TTL, time remaining, and token age from raw timestamps.
 * ttlSeconds is null unless both iat and exp are present.
 * Negative ttlSeconds is preserved when exp < iat — we do not silently assume valid ordering.
 */
export function computeTimeMetadata(iat: number | null, exp: number | null): TimeMetadata {
    const isExpired = exp !== null ? Date.now() > exp * 1000 : null;
    const timeLeftSeconds = exp !== null ? getTimeLeft(exp) : null;
    const ttlSeconds = iat !== null && exp !== null ? exp - iat : null;
    const tokenAgeSeconds = iat !== null ? Math.floor(Date.now() / 1000 - iat) : null;

    return { isExpired, ttlSeconds, timeLeftSeconds, tokenAgeSeconds };
}

// ---------------------------------------------------------------------------
// Core: buildMetadata (composes extractStandardTimes + computeTimeMetadata)
// ---------------------------------------------------------------------------

export function buildMetadata(raw: RawJWT): JWTMetadata {
    const { header } = raw;

    const algorithm = typeof header.alg === 'string' ? header.alg : 'Unknown';
    const tokenType = typeof header.typ === 'string' ? header.typ : 'Unknown';
    const tokenSize = new TextEncoder().encode(
        `${raw.rawHeaderBase64}.${raw.rawPayloadBase64}.${raw.signature}`
    ).byteLength;

    const times = extractStandardTimes(raw.payload);
    const computed = computeTimeMetadata(times.iat, times.exp);

    return {
        algorithm,
        tokenType,
        tokenSize,
        issuedAt: times.issuedAt,
        issuedAtISO: times.issuedAtISO,
        expiry: times.expiry,
        expiryISO: times.expiryISO,
        notBefore: times.notBefore,
        notBeforeISO: times.notBeforeISO,
        ...computed,
    };
}

// ---------------------------------------------------------------------------
// Core: buildClaims
// ---------------------------------------------------------------------------

export function buildClaims(payload: Record<string, unknown>): ClaimInfo[] {
    return Object.entries(payload).map(([key, value]) => {
        const known = KNOWN_CLAIMS[key];
        return {
            key,
            value,
            label: known?.label ?? 'Custom Claim',
            description: known?.description ?? 'Application-specific claim',
            isStandard: !!known,
            category: known?.category ?? 'custom',
        };
    });
}

// ---------------------------------------------------------------------------
// Convenience: Full decode (for backward compat & simple usage)
// ---------------------------------------------------------------------------

export function decodeJWT(token: string): DecodedJWT | null {
    const raw = decodeRaw(token);
    if (!raw) return null;

    const metadata = buildMetadata(raw);
    const claims = buildClaims(raw.payload);

    return { ...raw, ...metadata, claims };
}
