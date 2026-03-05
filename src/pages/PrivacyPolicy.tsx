export default function PrivacyPolicy() {
    const sectionStyle = {
        marginBottom: 32,
    };

    const headingStyle = {
        fontSize: 18,
        fontWeight: 600 as const,
        color: 'var(--color-text-primary)',
        marginBottom: 12,
    };

    const textStyle = {
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--color-text-secondary)',
        margin: '0 0 12px',
    };

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 720 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 32 }}>
                Last updated: March 1, 2026
            </p>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Our Commitment</h2>
                <p style={textStyle}>
                    DevUtils is built with privacy as a core principle. We believe developer tools should
                    work for you without compromising your data. Every tool in DevUtils runs entirely in
                    your browser — no data is ever sent to our servers.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Data Collection</h2>
                <p style={textStyle}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>We do not collect any personal data.</strong> DevUtils
                    does not use cookies, analytics trackers, or any form of data collection. There are no
                    user accounts, no login systems, and no server-side processing.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Client-Side Processing</h2>
                <p style={textStyle}>
                    All operations — JSON formatting, dummy data generation, JWT decoding, and any other
                    tools — are performed entirely within your browser using JavaScript. Your data never
                    leaves your device. We have no ability to see, access, or store any data you process
                    through DevUtils.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Local Storage</h2>
                <p style={textStyle}>
                    DevUtils uses your browser's <code>localStorage</code> only to save your theme
                    preference (dark or light mode). This data stays on your device and is never
                    transmitted anywhere. You can clear it at any time through your browser settings.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Third-Party Services</h2>
                <p style={textStyle}>
                    DevUtils does not integrate with any third-party analytics, advertising, or tracking
                    services. We use Google Fonts for typography, which may involve your browser making
                    requests to Google's CDN to load font files.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Open Source</h2>
                <p style={textStyle}>
                    DevUtils is open source. You are welcome to inspect our source code to verify these
                    privacy claims. Transparency is important to us.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Contact</h2>
                <p style={textStyle}>
                    If you have any questions about this privacy policy, feel free to reach out through
                    our GitHub repository.
                </p>
            </div>
        </div>
    );
}
