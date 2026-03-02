import { Link } from 'react-router-dom';
import { Braces, Database, KeyRound, ArrowRight, Shield, Zap, Wifi } from 'lucide-react';

const tools = [
    {
        icon: <Braces size={22} />,
        title: 'JSON Formatter',
        description: 'Validate, format, and minify JSON data instantly. Supports syntax highlighting and tree view.',
        to: '/json-formatter',
        color: '#6366f1',
    },
    {
        icon: <Database size={22} />,
        title: 'Dummy Data',
        description: 'Generate random user data, addresses, credit cards, and more for testing your applications.',
        to: '/dummy-data',
        color: '#10b981',
    },
    {
        icon: <KeyRound size={22} />,
        title: 'JWT Decoder',
        description: 'Decode and inspect JSON Web Tokens. Verify signatures and expiration dates client-side.',
        to: '/jwt-decoder',
        color: '#f59e0b',
    },
];

const features = [
    {
        icon: <Shield size={20} />,
        title: 'Privacy First',
        description: 'Your data never leaves your browser. All processing happens locally on your machine, ensuring your sensitive API keys and tokens remain safe.',
        color: '#6366f1',
    },
    {
        icon: <Zap size={20} />,
        title: 'Lightning Fast',
        description: 'No network latency. Tools load instantly and process large datasets without waiting for server roundtrips.',
        color: '#f59e0b',
    },
    {
        icon: <Wifi size={20} />,
        title: 'Works Offline',
        description: 'PWA support means you can install DevUtils and use it even when you don\'t have an internet connection.',
        color: '#10b981',
    },
];

export default function Home() {
    return (
        <>
            {/* Hero */}
            <section
                style={{
                    paddingTop: 80,
                    paddingBottom: 60,
                    textAlign: 'center',
                }}
            >
                <div className="container">
                    <div style={{ maxWidth: 720, margin: '0 auto' }}>
                        <div style={{ marginBottom: 20 }}>
                            <span className="badge badge-primary">✦ New: Works Offline — Install as PWA</span>
                        </div>
                        <h1 style={{ marginBottom: 20 }}>
                            Developer Utilities.{' '}
                            <span className="gradient-text">Fast. Private. Client-side.</span>
                        </h1>
                        <p
                            style={{
                                fontSize: 17,
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.6,
                                marginBottom: 32,
                                maxWidth: 560,
                                margin: '0 auto 32px',
                            }}
                        >
                            Essential developer tools that run entirely in your browser. No server calls, no tracking, complete privacy for your sensitive data.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/json-formatter" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: 14 }}>
                                Start Using Tools
                            </Link>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                style={{ padding: '12px 24px', fontSize: 14 }}
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Tools */}
            <section style={{ paddingBottom: 60 }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600 }}>Popular Tools</h3>
                        <Link
                            to="/json-formatter"
                            style={{ fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                            View all tools <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                        {tools.map(tool => (
                            <Link
                                key={tool.to}
                                to={tool.to}
                                className="card card-interactive"
                                style={{ padding: 24, textDecoration: 'none', color: 'inherit' }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: `${tool.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: tool.color,
                                        marginBottom: 16,
                                    }}
                                >
                                    {tool.icon}
                                </div>
                                <h3 style={{ marginBottom: 8 }}>{tool.title}</h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.5,
                                        margin: 0,
                                        marginBottom: 16,
                                    }}
                                >
                                    {tool.description}
                                </p>
                                <span
                                    style={{
                                        fontSize: 13,
                                        color: 'var(--color-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        fontWeight: 500,
                                    }}
                                >
                                    Open Tool <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why DevUtils */}
            <section style={{ paddingBottom: 80 }}>
                <div className="container">
                    <h2 style={{ marginBottom: 32, textAlign: 'center' }}>Why use DevUtils?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {features.map(feat => (
                            <div key={feat.title} className="feature-card">
                                <div
                                    className="feature-icon"
                                    style={{
                                        backgroundColor: `${feat.color}15`,
                                        color: feat.color,
                                    }}
                                >
                                    {feat.icon}
                                </div>
                                <h3 style={{ marginBottom: 8 }}>{feat.title}</h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.6,
                                        margin: 0,
                                    }}
                                >
                                    {feat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
