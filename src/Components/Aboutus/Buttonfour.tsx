"use client";

import React from "react";

const Buttons = () => {
  return (
    <div className="flex items-center justify-center">
      <button className="btn w-[170px] h-[60px] text-[18px] bg-white border-none rounded-[50px] text-black outline-none cursor-pointer transition-all duration-400 hover:shadow-[inset_0_0_0_4px_#ef476f,inset_0_0_0_8px_#ffd166,inset_0_0_0_12px_#06d6a0,inset_0_0_0_16px_#118ab2] hover:bg-[#073b4c] hover:text-white">
        Hover Me
      </button>
    </div>
  );
};

export default Buttons;
