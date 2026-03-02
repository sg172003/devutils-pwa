import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: '32px 0',
                marginTop: 'auto',
            }}
        >
            <div className="container">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16,
                        textAlign: 'center',
                    }}
                >
                    {/* Logo + Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Logo size={20} />
                        <span style={{ fontWeight: 700, fontSize: 15 }}>DevUtils</span>
                    </div>

                    {/* Credits */}
                    <p style={{ fontSize: 13, margin: 0 }}>
                        Built with ❤️ by <strong style={{ color: 'var(--color-text-primary)' }}>Sarthak</strong> 
                    </p>

                    {/* Legal links */}
                    <div style={{ display: 'flex', gap: 24 }}>
                        <Link
                            to="/privacy-policy"
                            style={{ fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'none' }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-of-service"
                            style={{ fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'none' }}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/contributing"
                            style={{ fontSize: 13, color: 'var(--color-text-muted)', textDecoration: 'none' }}
                        >
                            Contributing
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: 0 }}>
                        © 2026 DevUtils. Open Source.
                    </p>
                </div>
            </div>
        </footer>
    );
}