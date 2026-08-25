"use client";

import React from "react";

const LearnMoreButton = () => {
  return (
    <button className="learn-more group relative inline-block cursor-pointer outline-none border-0 align-middle bg-transparent p-0 text-base font-inherit w-48">
      <span
        className="circle relative block m-0 w-12 h-12 rounded-[1.625rem] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full"
        style={{ background: "#282936" }}
      >
        <span className="icon arrow absolute top-0 bottom-0 left-2.5 w-[1.125rem] h-0.5 m-auto bg-none transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-4 group-hover:bg-white">
          <span className="absolute content-[''] -top-[0.29rem] right-[0.0625rem] w-2.5 h-2.5 border-t-2 border-r-2 border-white rotate-45" />
        </span>
      </span>
      <span className="button-text absolute top-0 left-0 right-0 bottom-0 py-3 px-0 ml-7 text-[#282936] font-bold leading-relaxed text-center uppercase transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white">
        Contact Us
      </span>
    </button>
  );
};

export default LearnMoreButton;
