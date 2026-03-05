export default function TermsOfService() {
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
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Terms of Service</h1>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 32 }}>
                Last updated: March 1, 2026
            </p>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Acceptance of Terms</h2>
                <p style={textStyle}>
                    By accessing and using DevUtils, you agree to these terms of service. DevUtils is
                    a free, open-source developer tool suite. If you do not agree with any part of these
                    terms, please do not use the application.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Description of Service</h2>
                <p style={textStyle}>
                    DevUtils provides browser-based developer utilities including JSON formatting, dummy
                    data generation, JWT decoding, and other tools. All processing happens client-side
                    in your browser. The service is provided "as is" without warranties of any kind.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Use of Service</h2>
                <p style={textStyle}>
                    You may use DevUtils for any lawful purpose, whether personal, educational, or
                    commercial. There are no usage limits or restrictions on the tools provided. You are
                    responsible for any data you input into the tools — all processing occurs locally
                    on your device.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Intellectual Property</h2>
                <p style={textStyle}>
                    DevUtils is open-source software. The source code is available under its respective
                    license on GitHub. You are free to fork, modify, and distribute the code in accordance
                    with the license terms. The DevUtils name and logo are trademarks of the project
                    maintainers.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Disclaimer of Warranties</h2>
                <p style={textStyle}>
                    DevUtils is provided on an "as is" and "as available" basis. We make no warranties,
                    expressed or implied, regarding the reliability, accuracy, or availability of the
                    service. While we strive in making our tools accurate and reliable, we cannot guarantee
                    that the output of any tool will be error-free in all cases.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Limitation of Liability</h2>
                <p style={textStyle}>
                    In no event shall DevUtils, its authors, or contributors be liable for any direct,
                    indirect, incidental, or consequential damages arising from the use or inability to
                    use the service. Since all data processing occurs client-side, we bear no
                    responsibility for data loss or corruption on your device.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Changes to Terms</h2>
                <p style={textStyle}>
                    We reserve the right to modify these terms at any time. Changes will be reflected on
                    this page with an updated revision date. Continued use of DevUtils after changes
                    constitutes acceptance of the modified terms.
                </p>
            </div>
        </div>
    );
}
