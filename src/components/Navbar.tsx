import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Github, Menu, X, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import Logo from './Logo';

const allTools = [
    { to: '/json-formatter', label: 'JSON Formatter', description: 'Validate, format, and minify JSON data' },
    { to: '/dummy-data', label: 'Dummy Data Generator', description: 'Generate random user data for testing' },
    { to: '/jwt-decoder', label: 'JWT Decoder', description: 'Decode and inspect JSON Web Tokens' },
];

const navLinks = allTools.map(t => ({ to: t.to, label: t.label.replace(' Generator', '') }));

export default function Navbar() {
    const { isDark, toggle } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);

    const filtered = query.trim()
        ? allTools.filter(t =>
            t.label.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase())
        )
        : allTools;

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    useEffect(() => {
        if (!searchOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
                setQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchOpen]);

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered.length > 0) {
            e.preventDefault();
            navigate(filtered[activeIndex].to);
            setSearchOpen(false);
            setQuery('');
        } else if (e.key === 'Escape') {
            setSearchOpen(false);
            setQuery('');
        }
    };

    const handleToolClick = (to: string) => {
        navigate(to);
        setSearchOpen(false);
        setQuery('');
    };

    useEffect(() => {
        if (!mobileOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                toggleBtnRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileOpen]);

    const handleDrawerKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !drawerRef.current) return;
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const dropdownStyle: React.CSSProperties = {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 4,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        zIndex: 100,
    };

    const resultStyle = (isActive: boolean): React.CSSProperties => ({
        display: 'block',
        padding: '10px 14px',
        cursor: 'pointer',
        backgroundColor: isActive ? 'var(--color-surface-hover)' : 'transparent',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background 100ms',
    });

    return (
        <nav
            style={{
                height: 64,
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}
        >
            <div
                className="container"
                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
                {/* Left: Logo + Nav Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 16,
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                            textDecoration: 'none',
                        }}
                    >
                        <Logo size={24} />
                        DevUtils
                    </Link>

                    <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    textDecoration: 'none',
                                    color: location.pathname === link.to ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                    fontWeight: location.pathname === link.to ? 500 : 400,
                                    fontSize: 14,
                                    padding: '6px 12px',
                                    borderRadius: 'var(--radius-md)',
                                    transition: 'color 150ms',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right: Search + Actions */}
                <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div ref={searchRef} style={{ position: 'relative' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${searchOpen ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                backgroundColor: 'var(--color-surface)',
                                fontSize: 13,
                                minWidth: 200,
                                transition: 'border-color 150ms',
                            }}
                        >
                            <Search size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search tools..."
                                value={query}
                                onChange={e => { setQuery(e.target.value); setSearchOpen(true); }}
                                onFocus={() => setSearchOpen(true)}
                                onKeyDown={handleSearchKeyDown}
                                aria-label="Search tools"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    color: 'var(--color-text-primary)',
                                    fontSize: 13,
                                    width: '100%',
                                    fontFamily: 'inherit',
                                }}
                            />
                        </div>

                        {searchOpen && (
                            <div style={dropdownStyle}>
                                {filtered.length === 0 ? (
                                    <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--color-text-muted)' }}>
                                        No tools found
                                    </div>
                                ) : (
                                    filtered.map((tool, i) => (
                                        <div
                                            key={tool.to}
                                            style={resultStyle(i === activeIndex)}
                                            onMouseEnter={() => setActiveIndex(i)}
                                            onClick={() => handleToolClick(tool.to)}
                                        >
                                            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>
                                                {tool.label}
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                                                {tool.description}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-ghost"
                        onClick={toggle}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{ padding: 8, borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', background: 'none', color: 'var(--color-text-secondary)' }}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <a
                        href="https://github.com/sg172003/devutils-pwa"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        style={{
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-text-primary)',
                            fontSize: 13,
                            fontWeight: 500,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Github size={14} /> GitHub
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    ref={toggleBtnRef}
                    className="nav-mobile-toggle"
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                    style={{ padding: 8, border: 'none', cursor: 'pointer', display: 'none', background: 'none', color: 'var(--color-text-primary)' }}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div
                    ref={drawerRef}
                    role="dialog"
                    aria-label="Navigation menu"
                    onKeyDown={handleDrawerKeyDown}
                    style={{
                        position: 'absolute',
                        top: 64,
                        left: 0,
                        right: 0,
                        backgroundColor: 'var(--color-bg)',
                        borderBottom: '1px solid var(--color-border)',
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        zIndex: 49,
                    }}
                >
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                fontWeight: location.pathname === link.to ? 600 : 400,
                                fontSize: 14,
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-md)',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button
                            className="btn btn-ghost"
                            onClick={toggle}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            style={{ padding: 8, border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-md)', background: 'none', color: 'var(--color-text-secondary)' }}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source on GitHub"
                            style={{ padding: 8, color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}
                        >
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
