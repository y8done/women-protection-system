import React from 'react';

// --- SVG Logo Component ---
// A shield-based logo representing safety and protection.
const AppLogo = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-pulse text-pink-500"
  >
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
        <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 0.2 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 22.21C12 22.21 3.75 18.21 3.75 11.21V5.21L12 2.21L20.25 5.21V11.21C20.25 18.21 12 22.21 12 22.21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#shieldGradient)"
    />
    <path
      d="M9.47 11.45L11.07 13.05L14.53 9.58"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AppLogo;
