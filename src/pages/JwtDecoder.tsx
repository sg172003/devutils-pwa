import { useState, useCallback } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { decodeJWT, type DecodedJWT } from '../utils/jwtUtils';

export default function JwtDecoder() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState<DecodedJWT | null>(null);
    const [error, setError] = useState(false);

    const handleDecode = useCallback((value: string) => {
        setToken(value);
        if (!value.trim()) {
            setDecoded(null);
            setError(false);
            return;
        }
        const result = decodeJWT(value);
        if (result) {
            setDecoded(result);
            setError(false);
        } else {
            setDecoded(null);
            setError(true);
        }
    }, []);

    return (
        <div className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>JWT Decoder</h2>
                    <span className="badge badge-primary">CLIENT-SIDE</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
                    Decode and inspect JSON Web Tokens. Verify signatures and expiration dates.
                </p>
            </div>

            {/* Token Input */}
            <div style={{ marginBottom: 24 }}>
                <label
                    htmlFor="jwt-input"
                    style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}
                >
                    Encoded Token
                </label>
                <textarea
                    id="jwt-input"
                    className={`code-editor ${error ? 'input-error' : ''}`}
                    value={token}
                    onChange={e => handleDecode(e.target.value)}
                    placeholder="Paste JWT token here..."
                    spellCheck={false}
                    aria-label="JWT token input"
                    style={{ minHeight: 120, maxHeight: 200 }}
                />
                {error && (
                    <span className="status-pill status-error" role="alert" style={{ marginTop: 8, display: 'inline-flex' }}>
                        Invalid JWT token format. Must contain exactly 3 dot-separated segments.
                    </span>
                )}
            </div>

            {!decoded && !error && (
                <div style={{ textAlign: 'center', padding: 40, color: 'var(--color-text-muted)', fontSize: 14 }}>
                    Paste a JWT token above to decode it.
                </div>
            )}

            {/* Decoded Panels */}
            {decoded && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    {/* Header panel */}
                    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', backgroundColor: 'rgba(239, 68, 68, 0.06)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                            <span style={{ fontSize: 13, fontWeight: 600 }}>Header</span>
                            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>ALGORITHM & TOKEN TYPE</span>
                        </div>
                        <pre style={{ padding: 16, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'var(--color-text-primary)', overflow: 'auto', backgroundColor: 'var(--color-surface)' }}>
                            {JSON.stringify(decoded.header, null, 2)}
                        </pre>
                    </div>

                    {/* Payload panel */}
                    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', backgroundColor: 'rgba(99, 102, 241, 0.06)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#6366f1' }} />
                            <span style={{ fontSize: 13, fontWeight: 600 }}>Payload</span>
                            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>DATA</span>
                        </div>
                        <pre style={{ padding: 16, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, color: 'var(--color-text-primary)', overflow: 'auto', backgroundColor: 'var(--color-surface)' }}>
                            {JSON.stringify(decoded.payload, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            {/* Metadata / Status */}
            {decoded && (
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', backgroundColor: 'rgba(16, 185, 129, 0.06)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Token Metadata</span>
                    </div>
                    <div style={{ padding: 20, backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                            {decoded.issuedAt && (
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Issued At</div>
                                    <div style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{decoded.issuedAt}</div>
                                </div>
                            )}
                            {decoded.expiry && (
                                <div>
                                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expires At</div>
                                    <div style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{decoded.expiry}</div>
                                </div>
                            )}
                        </div>

                        {decoded.isExpired !== null && (
                            <div
                                role="status"
                                aria-live="polite"
                                aria-label={decoded.isExpired ? 'Token is expired' : 'Token is active'}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '10px 16px',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: decoded.isExpired ? 'var(--color-error-bg)' : 'var(--color-success-bg)',
                                    color: decoded.isExpired ? 'var(--color-error)' : 'var(--color-success)',
                                    fontWeight: 600,
                                    fontSize: 13,
                                }}
                            >
                                {decoded.isExpired ? (
                                    <><AlertTriangle size={16} /> Token Expired</>
                                ) : (
                                    <><CheckCircle2 size={16} /> Token Active — Signature Verified</>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
