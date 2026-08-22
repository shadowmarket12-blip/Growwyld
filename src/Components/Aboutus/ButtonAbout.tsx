"use client";

import React from "react";

interface FancyButtonProps {
  text?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const FancyButtonTailwind: React.FC<FancyButtonProps> = ({
  text = "Contact US",
  href = "#",
  className = "",
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-block cursor-pointer border-1 border-black bg-transparent px-4 py-2 text-[1px] font-bold tracking-wider text-white no-underline transition-all duration-300 ease-in-out hover:bg-[#113E6E] hover:text-white float-right ${className}`.trim()}
    >
      {/* Decorative lines - before element */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-1/2 h-[1.5px] w-[18px] -translate-y-1/2 bg-black transition-all duration-300 group-hover:w-[10px] group-hover:bg-white"
      />

      {/* Top key */}
      <span
        aria-hidden="true"
        className="absolute -top-[1.5px] left-2 h-[1.5px] w-[18px] bg-[#e8e8e8] transition-all duration-500 group-hover:-left-[2px] group-hover:w-0"
      />

      {/* Text */}
      <span className="block pl-6 text-left text-sm uppercase leading-normal text-black transition-all duration-300 group-hover:pl-4 group-hover:text-white">
        {text}
      </span>

      {/* Bottom keys */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[1.5px] right-[22px] h-[1.5px] w-[18px] bg-[#e8e8e8] transition-all duration-500 group-hover:right-0 group-hover:w-0"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-[1.5px] right-2 h-[1.5px] w-[8px] bg-[#e8e8e8] transition-all duration-500 group-hover:right-0 group-hover:w-0"
      />
    </a>
  );
};

export default FancyButtonTailwind;
