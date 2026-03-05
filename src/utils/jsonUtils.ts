export interface ValidationResult {
    parsed: unknown;
    valid: boolean;
    message: string;
}

export function validateJson(text: string): ValidationResult {
    if (!text.trim()) return { parsed: null, valid: true, message: '' };
    try {
        const parsed = JSON.parse(text);
        return { parsed, valid: true, message: 'Valid JSON' };
    } catch (e) {
        return { parsed: null, valid: false, message: (e as Error).message };
    }
}

export function formatJson(parsed: unknown): string {
    return JSON.stringify(parsed, null, 2);
}

export function minifyJson(parsed: unknown): string {
    return JSON.stringify(parsed);
}

export function sortKeys(obj: unknown): unknown {
    if (Array.isArray(obj)) return obj.map(sortKeys);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj as Record<string, unknown>)
            .sort()
            .reduce<Record<string, unknown>>((acc, key) => {
                acc[key] = sortKeys((obj as Record<string, unknown>)[key]);
                return acc;
            }, {});
    }
    return obj;
}

export function removeNulls(obj: unknown): unknown {
    if (Array.isArray(obj)) return obj.map(removeNulls).filter(v => v !== null);
    if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj as Record<string, unknown>).reduce<Record<string, unknown>>((acc, [key, val]) => {
            if (val !== null) acc[key] = removeNulls(val);
            return acc;
        }, {});
    }
    return obj;
}
