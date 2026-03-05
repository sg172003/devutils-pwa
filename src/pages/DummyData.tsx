import { useState, useCallback } from 'react';
import { Copy, Download, Shuffle, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    FIELD_OPTIONS,
    generateRecords,
    formatOutput,
    type FieldKey,
    type ExportFormat,
} from '../utils/dummyDataUtils';

const FIELD_COLORS: Record<string, string> = {
    name: '#6366f1',
    email: '#10b981',
    phone: '#f59e0b',
    address: '#ef4444',
    company: '#8b5cf6',
    jobTitle: '#ec4899',
    date: '#14b8a6',
};

export default function DummyData() {
    const [count, setCount] = useState(50);
    const [fields, setFields] = useState<Set<FieldKey>>(new Set(['name', 'email', 'phone', 'address']));
    const [format, setFormat] = useState<ExportFormat>('JSON');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [records, setRecords] = useState<Record<string, string>[]>([]);
    const [viewTab, setViewTab] = useState<'Table' | 'JSON' | 'SQL'>('Table');
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;
    const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
    const pageRecords = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const toggleField = (key: FieldKey) => {
        setFields(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const generate = useCallback(() => {
        if (fields.size === 0) return;
        const data = generateRecords(count, fields);
        setRecords(data);
        setOutput(formatOutput(data, format));
        setPage(1);
    }, [count, fields, format]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleDownload = () => {
        if (!output) return;
        const activeFormat = viewTab === 'Table' ? format : viewTab as ExportFormat;
        const ext = activeFormat === 'JSON' ? 'json' : activeFormat === 'CSV' ? 'csv' : 'sql';
        const mime = activeFormat === 'JSON' ? 'application/json' : 'text/plain';
        const blob = new Blob([output], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const activeFields = Array.from(fields);

    return (
        <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
            {/* Header */}
            <div style={{ marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>Dummy Data Generator</h2>
                    <span className="badge badge-primary">CLIENT-SIDE</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
                    Generate random user data for testing and development. Configure your fields below and export to JSON, CSV, or SQL.
                </p>
            </div>

            <div className="tool-grid">
                {/* Left: Configuration */}
                <div className="tool-grid-sidebar">
                    <div style={{ padding: 20, borderBottom: '1px solid var(--color-border)' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 16 }}>
                            Configuration
                        </span>

                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="record-count" style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                                Row Count
                            </label>
                            <input
                                id="record-count"
                                type="number"
                                className="input"
                                value={count}
                                onChange={e => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                                min={1}
                                max={1000}
                                style={{ padding: '8px 12px', fontSize: 13 }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                                Format
                            </label>
                            <select
                                className="input"
                                value={format}
                                onChange={e => setFormat(e.target.value as ExportFormat)}
                                style={{ padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
                            >
                                <option value="JSON">JSON</option>
                                <option value="CSV">CSV</option>
                                <option value="SQL">SQL</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ padding: 20, flex: 1 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>
                            Schema
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {FIELD_OPTIONS.map(opt => (
                                <label
                                    key={opt.key}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        color: 'var(--color-text-primary)',
                                        padding: '6px 8px',
                                        borderRadius: 'var(--radius-sm)',
                                        transition: 'background 100ms',
                                    }}
                                >
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: FIELD_COLORS[opt.key] || 'var(--color-primary)', flexShrink: 0 }} />
                                    <input
                                        type="checkbox"
                                        className="checkbox-custom"
                                        checked={fields.has(opt.key)}
                                        onChange={() => toggleField(opt.key)}
                                        style={{ width: 14, height: 14 }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{opt.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{opt.key}_value</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: 16, borderTop: '1px solid var(--color-border)' }}>
                        <button
                            className="btn btn-primary"
                            onClick={generate}
                            disabled={fields.size === 0}
                            style={{ width: '100%', justifyContent: 'center', padding: '10px 20px', fontSize: 13 }}
                        >
                            <Play size={14} /> Generate Data
                        </button>
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="tool-grid-main">
                    {/* Tabs + Actions */}
                    <div className="tool-tabs-bar">
                        <div style={{ display: 'flex', gap: 0 }}>
                            {(['Table', 'JSON', 'SQL'] as const).map(tab => (
                                <button
                                    key={tab}
                                    className="btn btn-ghost"
                                    style={{
                                        fontSize: 12,
                                        padding: '6px 14px',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: viewTab === tab ? 600 : 400,
                                        color: viewTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                        borderBottom: viewTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    }}
                                    onClick={() => {
                                        setViewTab(tab);
                                        if (tab !== 'Table' && records.length > 0) {
                                            setOutput(formatOutput(records, tab as ExportFormat));
                                        }
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {records.length > 0 && (
                                <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                                    {records.length} records generated
                                </span>
                            )}
                            <button className="btn btn-ghost" onClick={handleCopy} disabled={!output && viewTab === 'Table'} style={{ fontSize: 12, padding: '4px 10px' }}>
                                <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button className="btn btn-primary" onClick={handleDownload} disabled={!output} style={{ fontSize: 12, padding: '6px 14px' }}>
                                <Download size={12} /> Download
                            </button>
                        </div>
                    </div>

                    {/* Data Table / Output */}
                    <div className="tool-table-wrap">
                        {records.length === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 40, color: 'var(--color-text-muted)', fontSize: 14 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Shuffle size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
                                    <p style={{ margin: 0 }}>Configure fields and click Generate Data</p>
                                </div>
                            </div>
                        ) : viewTab === 'Table' ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', position: 'sticky', top: 0, backgroundColor: 'var(--color-surface)' }}>
                                            #
                                        </th>
                                        {activeFields.map(f => (
                                            <th key={f} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', position: 'sticky', top: 0, backgroundColor: 'var(--color-surface)' }}>
                                                {f}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageRecords.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 100ms' }}>
                                            <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)', fontSize: 12 }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                                            {activeFields.map(f => (
                                                <td key={f} style={{ padding: '10px 12px', color: 'var(--color-text-primary)', fontSize: 13, whiteSpace: 'nowrap', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {row[f]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <pre style={{ padding: 16, margin: 0, fontSize: 12, fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: 'var(--color-text-primary)' }}>
                                {output || 'Click Generate Data to see output'}
                            </pre>
                        )}
                    </div>

                    {/* Pagination */}
                    {viewTab === 'Table' && records.length > PAGE_SIZE && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 16px',
                            borderTop: '1px solid var(--color-border)',
                            fontSize: 12,
                            color: 'var(--color-text-muted)',
                        }}>
                            <span>
                                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, records.length)} of {records.length}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <button
                                    className="btn btn-ghost"
                                    disabled={page <= 1}
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    aria-label="Previous page"
                                    style={{ padding: '4px 8px', fontSize: 12 }}
                                >
                                    <ChevronLeft size={14} /> Prev
                                </button>
                                <span style={{ padding: '0 8px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                    {page} / {totalPages}
                                </span>
                                <button
                                    className="btn btn-ghost"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    aria-label="Next page"
                                    style={{ padding: '4px 8px', fontSize: 12 }}
                                >
                                    Next <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
