import { describe, it, expect } from 'vitest';
import { validateJson, formatJson, minifyJson, sortKeys, removeNulls } from '../utils/jsonUtils';

describe('validateJson', () => {
    it('returns valid for empty string', () => {
        const result = validateJson('');
        expect(result.valid).toBe(true);
        expect(result.parsed).toBeNull();
    });

    it('returns valid for whitespace-only string', () => {
        const result = validateJson('   ');
        expect(result.valid).toBe(true);
        expect(result.parsed).toBeNull();
    });

    it('parses valid JSON object', () => {
        const result = validateJson('{"name":"Alice"}');
        expect(result.valid).toBe(true);
        expect(result.parsed).toEqual({ name: 'Alice' });
        expect(result.message).toBe('Valid JSON');
    });

    it('parses valid JSON array', () => {
        const result = validateJson('[1,2,3]');
        expect(result.valid).toBe(true);
        expect(result.parsed).toEqual([1, 2, 3]);
    });

    it('returns invalid for malformed JSON', () => {
        const result = validateJson('{name: "Alice"}');
        expect(result.valid).toBe(false);
        expect(result.parsed).toBeNull();
        expect(result.message).toBeTruthy();
    });

    it('returns invalid for trailing comma', () => {
        const result = validateJson('{"a":1,}');
        expect(result.valid).toBe(false);
    });
});

describe('formatJson', () => {
    it('formats parsed JSON with 2-space indentation', () => {
        const result = formatJson({ a: 1 });
        expect(result).toBe('{\n  "a": 1\n}');
    });
});

describe('minifyJson', () => {
    it('minifies parsed JSON', () => {
        const result = minifyJson({ a: 1, b: [2, 3] });
        expect(result).toBe('{"a":1,"b":[2,3]}');
    });
});

describe('sortKeys', () => {
    it('sorts top-level keys alphabetically', () => {
        const result = sortKeys({ c: 3, a: 1, b: 2 });
        expect(Object.keys(result as Record<string, unknown>)).toEqual(['a', 'b', 'c']);
    });

    it('sorts nested object keys', () => {
        const result = sortKeys({ z: { b: 2, a: 1 } }) as Record<string, Record<string, unknown>>;
        expect(Object.keys(result.z)).toEqual(['a', 'b']);
    });

    it('handles arrays without sorting elements', () => {
        const result = sortKeys([3, 1, 2]);
        expect(result).toEqual([3, 1, 2]);
    });

    it('returns primitives unchanged', () => {
        expect(sortKeys('hello')).toBe('hello');
        expect(sortKeys(42)).toBe(42);
        expect(sortKeys(null)).toBeNull();
    });
});

describe('removeNulls', () => {
    it('removes null values from objects', () => {
        const result = removeNulls({ a: 1, b: null, c: 'hello' });
        expect(result).toEqual({ a: 1, c: 'hello' });
    });

    it('removes null values from arrays', () => {
        const result = removeNulls([1, null, 3]);
        expect(result).toEqual([1, 3]);
    });

    it('removes deeply nested nulls', () => {
        const result = removeNulls({ a: { b: null, c: 1 } });
        expect(result).toEqual({ a: { c: 1 } });
    });

    it('returns primitives unchanged', () => {
        expect(removeNulls('hello')).toBe('hello');
        expect(removeNulls(42)).toBe(42);
    });
});
