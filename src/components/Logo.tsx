interface LogoProps {
    size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
    const s = size;
    const stroke = s * 0.13;

    return (
        <svg
            width={s}
            height={s}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* D shape */}
            <path
                d="M20 15 L20 85 L55 85 Q85 85 85 50 Q85 15 55 15 Z"
                stroke="#6366f1"
                strokeWidth={stroke}
                fill="none"
                strokeLinejoin="round"
            />
            {/* Eraser — cuts behind U */}
            <path
                d="M45 40 L45 75 Q45 85 55 85 Q65 85 65 75 L65 40"
                stroke="var(--color-bg)"
                strokeWidth={stroke * 1.8}
                fill="none"
            />
            {/* U shape */}
            <path
                d="M45 40 L45 75 Q45 85 55 85 Q65 85 65 75 L65 40"
                stroke="#6366f1"
                strokeWidth={stroke}
                fill="none"
                strokeLinejoin="round"
            />
        </svg>
    );
}