import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <div className={`logo ${className}`}>
            <svg
                width="120"
                height="50"
                viewBox="0 0 120 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo-svg"
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#1a2a6c" />
                        <stop offset="30%" stopColor="#2a3c78" />
                        <stop offset="70%" stopColor="#b21f1f" />
                        <stop offset="100%" stopColor="#fdbb2d" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 连接图形 */}
                <circle cx="15" cy="20" r="8" fill="url(#logoGradient)" opacity="0.8" />
                <circle cx="105" cy="20" r="8" fill="url(#logoGradient)" opacity="0.8" />
                <line x1="18" y1="20" x2="102" y2="20" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="3,2" />

                {/* 支持系统文字 */}
                <text
                    x="25"
                    y="26"
                    fontFamily="sans-serif"
                    fontSize="18"
                    fontWeight="bold"
                    fill="url(#logoGradient)"
                >
                    支持系统
                </text>
                <text
                    x="5"
                    y="40"
                    fontFamily="sans-serif"
                    fontSize="12"
                    fill="black"
                >
                    zhichixitong.support
                </text>
            </svg>
        </div>
    );
};

export default Logo; 