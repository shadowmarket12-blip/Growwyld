import React from "react";

const Button: React.FC = () => {
  return (
    <button className="group relative w-36 h-12 rounded-full text-[15px] font-inherit border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
      <span className="absolute inset-0 w-0 h-full rounded-full bg-gradient-to-r from-[#0fd850] to-[#f9f047] transition-all duration-500 ease-in-out group-hover:w-full -z-10" />
      <span className="relative z-10 text-black">Pick up!</span>
    </button>
  );
};

export default Button;
