import { GitBranch, Bug, Lightbulb, FileCode, CheckCircle, MessageSquare } from 'lucide-react';

export default function Contributing() {
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

    const stepCardStyle = {
        display: 'flex',
        gap: 14,
        padding: 16,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 10,
    };

    const iconWrapStyle = {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    };

    const codeStyle: React.CSSProperties = {
        display: 'block',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px',
        fontSize: 13,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-primary)',
        overflowX: 'auto',
        marginBottom: 12,
    };

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 720 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Contributing</h1>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 32, lineHeight: 1.7 }}>
                DevUtils is open source and we welcome contributions from the community.
                Whether you're fixing a bug, adding a new tool, or improving documentation — every
                contribution matters.
            </p>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Ways to Contribute</h2>
                <div style={stepCardStyle}>
                    <div style={{ ...iconWrapStyle, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                        <Bug size={18} style={{ color: '#ef4444' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Report Bugs</div>
                        <p style={{ ...textStyle, margin: 0 }}>
                            Found something broken? Open an issue on GitHub with steps to reproduce.
                        </p>
                    </div>
                </div>
                <div style={stepCardStyle}>
                    <div style={{ ...iconWrapStyle, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                        <Lightbulb size={18} style={{ color: '#f59e0b' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Suggest Features</div>
                        <p style={{ ...textStyle, margin: 0 }}>
                            Have an idea for a new tool or improvement? Open a feature request issue.
                        </p>
                    </div>
                </div>
                <div style={stepCardStyle}>
                    <div style={{ ...iconWrapStyle, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                        <FileCode size={18} style={{ color: '#6366f1' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Submit Code</div>
                        <p style={{ ...textStyle, margin: 0 }}>
                            Pick an open issue, write your code, and submit a pull request.
                        </p>
                    </div>
                </div>
                <div style={stepCardStyle}>
                    <div style={{ ...iconWrapStyle, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                        <MessageSquare size={18} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Improve Docs</div>
                        <p style={{ ...textStyle, margin: 0 }}>
                            Help improve README, code comments, or this documentation.
                        </p>
                    </div>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Getting Started</h2>
                <p style={textStyle}>Follow these steps to set up the project locally:</p>
                <code style={codeStyle}>
                    <span style={{ color: 'var(--color-text-muted)' }}># 1. Fork and clone the repo</span><br />
                    git clone https://github.com/sg172003/devutils-pwa.git<br />
                    <br />
                    <span style={{ color: 'var(--color-text-muted)' }}># 2. Install dependencies</span><br />
                    npm install<br />
                    <br />
                    <span style={{ color: 'var(--color-text-muted)' }}># 3. Start development server</span><br />
                    npm run dev<br />
                    <br />
                    <span style={{ color: 'var(--color-text-muted)' }}># 4. Run tests</span><br />
                    npm test
                </code>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Pull Request Guidelines</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                        'Create a feature branch from main — never commit directly to main',
                        'Write clean, readable code following existing conventions',
                        'Add tests for new features or bug fixes',
                        'Keep PRs focused — one feature or fix per pull request',
                        'Write a clear PR description explaining what and why',
                        'Ensure all existing tests pass before submitting',
                        'All tools must work client-side only — no server calls',
                    ].map((rule, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--color-text-secondary)' }}>
                            <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: 2 }} />
                            <span>{rule}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Project Structure</h2>
                <code style={codeStyle}>
                    src/<br />
                    ├── components/&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-text-muted)' }}># Shared UI components</span><br />
                    ├── context/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-text-muted)' }}># React context providers</span><br />
                    ├── pages/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-text-muted)' }}># Page components (tools + legal)</span><br />
                    ├── utils/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-text-muted)' }}># Pure utility functions</span><br />
                    └── __tests__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: 'var(--color-text-muted)' }}># Unit tests</span>
                </code>
            </div>

            <div style={sectionStyle}>
                <h2 style={headingStyle}>Code of Conduct</h2>
                <p style={textStyle}>
                    Be respectful, constructive, and inclusive. We're all here to build great developer
                    tools. Harassment, discrimination, or toxic behavior of any kind will not be tolerated.
                </p>
            </div>

            <div style={{
                padding: 20,
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
            }}>
                <GitBranch size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <p style={{ ...textStyle, margin: 0 }}>
                    Ready to contribute? Check out our{' '}
                    <a
                        href="https://github.com/sg172003/devutils-pwa"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
                    >
                        GitHub repository
                    </a>{' '}
                    to get started.
                </p>
            </div>
        </div>
    );
}
