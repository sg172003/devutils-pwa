const MAX_TOKEN_LENGTH = 10_000;

export interface DecodedJWT {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    issuedAt: string | null;
    expiry: string | null;
    isExpired: boolean | null;
}

function base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return atob(base64);
}

export function decodeJWT(token: string): DecodedJWT | null {
    const trimmed = token.trim();

    if (!trimmed || trimmed.length > MAX_TOKEN_LENGTH) return null;

    try {
        const parts = trimmed.split('.');
        if (parts.length !== 3) return null;

        const header = JSON.parse(base64UrlDecode(parts[0]));
        const payload = JSON.parse(base64UrlDecode(parts[1]));

        let issuedAt: string | null = null;
        let expiry: string | null = null;
        let isExpired: boolean | null = null;

        if (payload.iat) {
            issuedAt = new Date(payload.iat * 1000).toLocaleString();
        }
        if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            expiry = expDate.toLocaleString();
            isExpired = Date.now() > expDate.getTime();
        }

        return { header, payload, issuedAt, expiry, isExpired };
    } catch {
        return null;
    }
}
