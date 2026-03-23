import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '../utils/base64Utils';

describe('base64Utils', () => {

  describe('encodeBase64', () => {

    it('encodes standard ASCII strings correctly', () => {
      expect(encodeBase64('Hello World')).toBe('SGVsbG8gV29ybGQ=');
    });

    it('encodes Unicode/Emojis correctly (UTF-8)', () => {
      expect(encodeBase64('🚀 orbit')).toBe('8J+agCBvcmJpdA==');
      expect(encodeBase64('你好')).toBe('5L2g5aW9');
    });

    it('encodes to URL-safe format when requested', () => {
      const input = 'Subject? Data+';
      const encoded = encodeBase64(input, true);

      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).not.toContain('=');
      expect(encoded).toBe('U3ViamVjdD8gRGF0YSs');
    });

    it('handles empty string', () => {
      expect(encodeBase64('')).toBe('');
    });

  });

  describe('decodeBase64', () => {

    it('decodes standard Base64 strings', () => {
      expect(decodeBase64('SGVsbG8gV29ybGQ=')).toBe('Hello World');
    });

    it('decodes Unicode/Emoji Base64 strings', () => {
      expect(decodeBase64('8J+agCBvcmJpdA==')).toBe('🚀 orbit');
      expect(decodeBase64('5L2g5aW9')).toBe('你好');
    });

    it('decodes URL-safe strings (with or without padding)', () => {
      const urlSafeInput = 'U3ViamVjdD8gRGF0YSs';
      expect(decodeBase64(urlSafeInput)).toBe('Subject? Data+');
    });

    it('handles empty string', () => {
      expect(decodeBase64('')).toBe('');
    });

    it('throws error for invalid Base64', () => {
      expect(() => decodeBase64('!!!NotBase64!!!')).toThrow("Invalid Base64 string");
    });

    it('handles whitespace around Base64 input', () => {
      expect(decodeBase64(' SGVsbG8gV29ybGQ= ')).toBe('Hello World');
    });

  });

  describe('Round-trip Integrity', () => {

    it('maintains data integrity through encode → decode cycle', () => {
      const complexString =
        'Special characters: !@#$%^&*()_+ []{} | ";: <>,.?/ and Emojis: 🧠🔥';

      const encoded = encodeBase64(complexString);
      const decoded = decodeBase64(encoded);

      expect(decoded).toBe(complexString);
    });

  });

});