import { useState, useCallback } from 'react';
import { Copy, Download, Trash2, Shield, Zap, Bug } from 'lucide-react';
import { validateJson, formatJson, minifyJson, sortKeys, removeNulls, type ValidationResult } from '../utils/jsonUtils';

const MAX_INPUT_BYTES = 2 * 1024 * 1024;

type ValidationStatus = { valid: boolean; message: string } | null;

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState<ValidationStatus>(null);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (value: string) => {
        if (new Blob([value]).size > MAX_INPUT_BYTES) {
            setStatus({ valid: false, message: 'Input exceeds 2MB limit' });
            return;
        }
        setInput(value);
        setStatus(null);
    };

    const applyTransform = useCallback((transformFn: (parsed: unknown) => string) => {
        const result: ValidationResult = validateJson(input);
        setStatus(input.trim() ? { valid: result.valid, message: result.message } : null);
        if (result.valid && result.parsed !== null) setOutput(transformFn(result.parsed));
    }, [input]);

    const handleFormat = () => applyTransform(p => formatJson(p));
    const handleMinify = () => applyTransform(p => minifyJson(p));
    const handleSortKeys = () => applyTransform(p => formatJson(sortKeys(p)));
    const handleRemoveNulls = () => applyTransform(p => formatJson(removeNulls(p)));

    const handleValidate = () => {
        const { valid, message } = validateJson(input);
        setStatus(input.trim() ? { valid, message } : null);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setStatus(null);
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700 }}>JSON Formatter</h2>
                        <span className="badge badge-primary">CLIENT-SIDE</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                        Format, validate, and minify your JSON data securely in your browser.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary" onClick={handleFormat} style={{ padding: '8px 16px', fontSize: 13 }}>
                        Format
                    </button>
                    <button className="btn btn-secondary" onClick={handleMinify} style={{ padding: '8px 16px', fontSize: 13 }}>
                        Minify
                    </button>
                </div>
            </div>

            {/* Editor Layout */}
            <div className="tool-layout" style={{ marginBottom: 12 }}>
                {/* Input Panel */}
                <div className="tool-panel">
                    <div className="tool-panel-header">
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Input JSON
                        </span>
                        <div style={{ flex: 1 }} />
                        <button className="btn btn-ghost" onClick={handleValidate} style={{ fontSize: 12, padding: '4px 10px' }}>Validate</button>
                        <button className="btn btn-ghost" onClick={handleClear} aria-label="Clear input" style={{ fontSize: 12, padding: '4px 10px' }}>
                            <Trash2 size={12} /> Clear
                        </button>
                    </div>
                    <div className="tool-panel-body">
                        <textarea
                            className="code-editor"
                            value={input}
                            onChange={e => handleInputChange(e.target.value)}
                            placeholder="Paste your JSON here..."
                            spellCheck={false}
                            aria-label="JSON input editor"
                        />
                    </div>
                </div>

                {/* Output Panel */}
                <div className="tool-panel">
                    <div className="tool-panel-header">
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Output
                        </span>
                        {status && (
                            <span
                                className={`status-pill ${status.valid ? 'status-success' : 'status-error'}`}
                                role="status"
                                aria-live="polite"
                            >
                                {status.valid ? '✓ VALID' : status.message}
                            </span>
                        )}
                        <div style={{ flex: 1 }} />
                        <button className="btn btn-ghost" onClick={handleCopy} disabled={!output} aria-label="Copy output" style={{ fontSize: 12, padding: '4px 10px' }}>
                            <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button className="btn btn-ghost" onClick={handleDownload} disabled={!output} aria-label="Download output" style={{ fontSize: 12, padding: '4px 10px' }}>
                            <Download size={12} /> Download
                        </button>
                    </div>
                    <div className="tool-panel-body">
                        <textarea
                            className="code-editor"
                            value={output}
                            readOnly
                            placeholder="Formatted output will appear here..."
                            spellCheck={false}
                            aria-label="Formatted JSON output"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
                <button className="btn btn-secondary" onClick={handleSortKeys} style={{ padding: '6px 14px', fontSize: 12 }}>Sort Keys</button>
                <button className="btn btn-secondary" onClick={handleRemoveNulls} style={{ padding: '6px 14px', fontSize: 12 }}>Remove Nulls</button>
                <button className="btn btn-secondary" onClick={handleFormat} style={{ padding: '6px 14px', fontSize: 12 }}>Fix JSON</button>
            </div>

            {/* Feature Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div className="feature-card">
                    <div className="feature-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>
                        <Shield size={20} />
                    </div>
                    <h3 style={{ fontSize: 14, marginBottom: 6 }}>Privacy First</h3>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        Data never leaves your browser. All formatting and validation runs locally on your machine using JavaScript.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                        <Zap size={20} />
                    </div>
                    <h3 style={{ fontSize: 14, marginBottom: 6 }}>Lightning Fast</h3>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        Optimized for large JSON files. Handles megabytes of data without freezing your browser tab.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                        <Bug size={20} />
                    </div>
                    <h3 style={{ fontSize: 14, marginBottom: 6 }}>Error Debugging</h3>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        Detailed error messages point you to exactly where your syntax is broken so you can fix it quickly.
                    </p>
                </div>
            </div>
        </div>
    );
}
