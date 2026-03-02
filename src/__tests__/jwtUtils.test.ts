import { describe, it, expect } from 'vitest';
import { decodeJWT } from '../utils/jwtUtils';

// A valid JWT with exp in the past (1516239022 = Jan 18, 2018)
const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ';

// A valid JWT with no exp claim
const NO_EXP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

describe('decodeJWT', () => {
    it('returns null for empty string', () => {
        expect(decodeJWT('')).toBeNull();
    });

    it('returns null for non-JWT string', () => {
        expect(decodeJWT('not.a.jwt')).toBeNull();
    });

    it('returns null for string with wrong number of parts', () => {
        expect(decodeJWT('only-one-part')).toBeNull();
        expect(decodeJWT('two.parts')).toBeNull();
        expect(decodeJWT('a.b.c.d')).toBeNull();
    });

    it('returns null for string exceeding size limit (10K chars)', () => {
        const longToken = 'a'.repeat(10001);
        expect(decodeJWT(longToken)).toBeNull();
    });

    it('decodes a valid expired token', () => {
        const result = decodeJWT(EXPIRED_TOKEN);
        expect(result).not.toBeNull();
        expect(result!.header).toEqual({ alg: 'HS256', typ: 'JWT' });
        expect(result!.payload.sub).toBe('1234567890');
        expect(result!.payload.name).toBe('John Doe');
        expect(result!.isExpired).toBe(true);
        expect(result!.issuedAt).toBeTruthy();
        expect(result!.expiry).toBeTruthy();
    });

    it('decodes a valid token without exp claim', () => {
        const result = decodeJWT(NO_EXP_TOKEN);
        expect(result).not.toBeNull();
        expect(result!.isExpired).toBeNull();
        expect(result!.expiry).toBeNull();
        expect(result!.issuedAt).toBeTruthy();
    });

    it('handles whitespace around token', () => {
        const result = decodeJWT(`  ${EXPIRED_TOKEN}  `);
        expect(result).not.toBeNull();
        expect(result!.header.alg).toBe('HS256');
    });
});
