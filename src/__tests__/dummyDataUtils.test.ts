import { describe, it, expect } from 'vitest';
import { generateRecord, generateRecords, toCSV, toSQL, formatOutput, type FieldKey } from '../utils/dummyDataUtils';

describe('generateRecord', () => {
    it('returns empty object for empty field set', () => {
        const record = generateRecord(new Set<FieldKey>());
        expect(Object.keys(record).length).toBe(0);
    });

    it('returns only selected fields', () => {
        const record = generateRecord(new Set<FieldKey>(['name', 'email']));
        expect(record).toHaveProperty('name');
        expect(record).toHaveProperty('email');
        expect(record).not.toHaveProperty('phone');
        expect(record).not.toHaveProperty('address');
    });

    it('generates a valid email format', () => {
        const record = generateRecord(new Set<FieldKey>(['email']));
        expect(record.email).toMatch(/.+@.+\..+/);
    });

    it('generates a phone with country code', () => {
        const record = generateRecord(new Set<FieldKey>(['phone']));
        expect(record.phone).toMatch(/^\+91-\d{10}$/);
    });
});

describe('generateRecords', () => {
    it('generates the requested number of records', () => {
        const records = generateRecords(5, new Set<FieldKey>(['name']));
        expect(records.length).toBe(5);
    });

    it('caps at 1000 records', () => {
        const records = generateRecords(2000, new Set<FieldKey>(['name']));
        expect(records.length).toBe(1000);
    });

    it('returns empty array for 0 count', () => {
        const records = generateRecords(0, new Set<FieldKey>(['name']));
        expect(records.length).toBe(0);
    });

    it('returns empty array for negative count', () => {
        const records = generateRecords(-5, new Set<FieldKey>(['name']));
        expect(records.length).toBe(0);
    });
});

describe('toCSV', () => {
    it('returns empty string for empty data', () => {
        expect(toCSV([])).toBe('');
    });

    it('generates valid CSV with headers and rows', () => {
        const data = [{ name: 'Alice', email: 'alice@example.com' }];
        const csv = toCSV(data);
        const lines = csv.split('\n');
        expect(lines[0]).toBe('name,email');
        expect(lines[1]).toContain('Alice');
    });

    it('escapes double quotes in CSV values', () => {
        const data = [{ name: 'Alice "A" Smith' }];
        const csv = toCSV(data);
        expect(csv).toContain('""');
    });
});

describe('toSQL', () => {
    it('returns empty string for empty data', () => {
        expect(toSQL([])).toBe('');
    });

    it('generates INSERT INTO statements', () => {
        const data = [{ name: 'Alice' }];
        const sql = toSQL(data);
        expect(sql).toMatch(/^INSERT INTO users/);
        expect(sql).toContain("'Alice'");
    });

    it('uses custom table name', () => {
        const data = [{ name: 'Alice' }];
        const sql = toSQL(data, 'employees');
        expect(sql).toMatch(/^INSERT INTO employees/);
    });

    it('throws on invalid table name', () => {
        const data = [{ name: 'Alice' }];
        expect(() => toSQL(data, 'DROP TABLE users;--')).toThrow('Invalid table name');
    });

    it('throws on invalid column name', () => {
        const data = [{ 'DROP TABLE users;--': 'value' }];
        expect(() => toSQL(data)).toThrow('Invalid column name');
    });

    it('escapes single quotes in SQL values', () => {
        const data = [{ name: "O'Brien" }];
        const sql = toSQL(data);
        expect(sql).toContain("O''Brien");
    });
});

describe('formatOutput', () => {
    const data = [{ name: 'Alice' }];

    it('outputs JSON format', () => {
        const result = formatOutput(data, 'JSON');
        expect(() => JSON.parse(result)).not.toThrow();
    });

    it('outputs CSV format', () => {
        const result = formatOutput(data, 'CSV');
        expect(result.split('\n')[0]).toBe('name');
    });

    it('outputs SQL format', () => {
        const result = formatOutput(data, 'SQL');
        expect(result).toContain('INSERT INTO');
    });
});
