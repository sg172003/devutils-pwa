import { describe, test, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '../utils/base64Utils';

describe('base64Utils', () => {

  describe('encodeBase64', () => {

    test('encodes standard ASCII strings correctly', () => {
      expect(encodeBase64('Hello World')).toBe('SGVsbG8gV29ybGQ=');
    });

    test('encodes Unicode/Emojis correctly (UTF-8)', () => {
      expect(encodeBase64('🚀 orbit')).toBe('8J+agCBvcmJpdA==');
      expect(encodeBase64('你好')).toBe('5L2g5aW9');
    });

    test('encodes to URL-safe format when requested', () => {
      const input = 'Subject? Data+';
      const encoded = encodeBase64(input, true);

      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).not.toContain('=');
      expect(encoded).toBe('U3ViamVjdD8gRGF0YSs');
    });

    test('handles empty string', () => {
      expect(encodeBase64('')).toBe('');
    });

  });

  describe('decodeBase64', () => {

    test('decodes standard Base64 strings', () => {
      expect(decodeBase64('SGVsbG8gV29ybGQ=')).toBe('Hello World');
    });

    test('decodes Unicode/Emoji Base64 strings', () => {
      expect(decodeBase64('8J+agCBvcmJpdA==')).toBe('🚀 orbit');
      expect(decodeBase64('5L2g5aW9')).toBe('你好');
    });

    test('decodes URL-safe strings (with or without padding)', () => {
      const urlSafeInput = 'U3ViamVjdD8gRGF0YSs';
      expect(decodeBase64(urlSafeInput)).toBe('Subject? Data+');
    });

    test('handles empty string', () => {
      expect(decodeBase64('')).toBe('');
    });

    test('throws error for invalid Base64', () => {
      expect(() => decodeBase64('!!!NotBase64!!!')).toThrow();
    });

  });

  describe('Round-trip Integrity', () => {

    test('maintains data integrity through encode → decode cycle', () => {
      const complexString =
        'Special characters: !@#$%^&*()_+ []{} | ";: <>,.?/ and Emojis: 🧠🔥';

      const encoded = encodeBase64(complexString);
      const decoded = decodeBase64(encoded);

      expect(decoded).toBe(complexString);
    });

  });

});