import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';
import { Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: '1px solid var(--color-border)',
                padding: '24px 0',
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16,
                    fontSize: 13,
                    color: 'var(--color-text-muted)',
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <LogoMark size={20} />
                        <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>DevUtils</span>
                        <span>© 2026 DevUtils. Open Source.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                        <span>Built with</span>
                        <Heart size={12} style={{ color: '#ef4444', fill: '#ef4444' }} />
                        <span>
                            by{' '}
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Sarthak</span>
                            
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <Link to="/privacy-policy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Terms of Service
                    </Link>
                    <Link to="/contributing" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                        Contributing
                    </Link>
                </div>
            </div>
        </footer>
    );
}
