interface LogoProps {
    size?: number;
    className?: string;
}

/**
 * Interlocking DU monogram logo from the user's custom SVG design.
 * Uses a 3-layer approach: D stroke, white eraser for interlink, U stroke.
 */
function DUMonogram({ size = 52 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 60"
            width={size}
            height={size * (60 / 52)}
            fill="none"
            aria-label="DevUtils logo"
            role="img"
        >
            <g transform="translate(8, 6)">
                {/* D shape */}
                <path
                    d="M8 4H26L36 14V38L26 48H8V4Z"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="8"
                    strokeLinejoin="round"
                />
                {/* Eraser for interlink effect */}
                <path
                    d="M32 20V40L24 48"
                    fill="none"
                    stroke="var(--color-bg, #0f1117)"
                    strokeWidth="12"
                />
                {/* U shape */}
                <path
                    d="M26 18V38L34 46H46V18"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="8"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}

export default function Logo({ size = 28, className }: LogoProps) {
    return (
        <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <DUMonogram size={size} />
        </span>
    );
}

export function LogoMark({ size = 20 }: { size?: number }) {
    return <DUMonogram size={size} />;
}
