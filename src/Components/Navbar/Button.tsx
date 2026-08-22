"use client";

import React, { useRef, useState } from "react";

const MagneticButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic effect - button follows cursor slightly
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    // Reset position on mouse leave
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className="group relative px-5 py-2 text-sm font-bold text-white bg-gradient-to-br from-[#113E6E] to-[#00B7C3] rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#00B7C3]/20 active:scale-95 transition-all duration-200 overflow-visible"
    >
      <span className="relative z-10 flex items-center gap-2">
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Contact Us
      </span>

      {/* Glossy overlay */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#0D1B2A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      {/* Shine effect */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>

      {/* Subtle glow */}
      <span className="absolute -inset-0.5 bg-gradient-to-r from-[#113E6E] via-[#00B7C3] to-[#22C55E] rounded-lg blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></span>

      {/* Green accent line */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#22C55E] rounded-full transition-all duration-300 group-hover:w-full"></span>
    </button>
  );
};

export default MagneticButton;
