import React from "react";

interface GooeyButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GooeyButton: React.FC<GooeyButtonProps> = ({
  children = "Contact US",
  className = "",
  onClick,
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <button
        onClick={onClick}
        className="group relative z-10 inline-block cursor-pointer rounded-full border-[3px] border-[#113E6E] px-6 py-3 align-middle text-[12px] font-bold uppercase tracking-[1.5px] text-[#113E6E] transition-all duration-700 ease-in-out hover:text-white"
      >
        {children}
        <div
          className="absolute bottom-[-2px] left-0 right-[-1px] top-0 -z-10 h-full overflow-hidden rounded-full"
          style={{ filter: "url(#goo)" }}
        >
          <div className="absolute left-[-5%] h-full w-[34%] rounded-full bg-[#113E6E] transition-all duration-700 ease-in-out scale-150 translate-y-[125%] group-hover:translate-y-0" />
          <div className="absolute left-[30%] h-full w-[34%] rounded-full bg-[#113E6E] transition-all duration-700 ease-in-out delay-[60ms] scale-150 translate-y-[125%] group-hover:translate-y-0" />
          <div className="absolute left-[66%] h-full w-[34%] rounded-full bg-[#113E6E] transition-all duration-700 ease-in-out delay-[25ms] scale-150 translate-y-[125%] group-hover:translate-y-0" />
        </div>
      </button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "block", height: 0, width: 0 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={8} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default GooeyButton;
