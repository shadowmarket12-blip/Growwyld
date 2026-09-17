"use client";

import React, { useState } from "react";
import { Shield, Lightbulb, Users, TrendingUp } from "lucide-react";

const OurValues = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const values = [
    {
      id: 1,
      title: "Integrity",
      icon: (
        <Shield
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          strokeWidth={1.5}
        />
      ),
      description:
        "We believe in honest communication, transparent processes, and realistic expectations.",
      color: "#0D1B2A",
      blobColor: "#113E6E",
    },
    {
      id: 2,
      title: "Innovation",
      icon: (
        <Lightbulb
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          strokeWidth={1.5}
        />
      ),
      description:
        "We continuously explore new technologies, tools, and strategies to deliver better outcomes.",
      color: "#113E6E",
      blobColor: "#00B7C3",
    },
    {
      id: 3,
      title: "Collaboration",
      icon: (
        <Users
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          strokeWidth={1.5}
        />
      ),
      description:
        "We work closely with our clients and treat every project as a partnership.",
      color: "#00B7C3",
      blobColor: "#22C55E",
    },
    {
      id: 4,
      title: "Growth",
      icon: (
        <TrendingUp
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          strokeWidth={1.5}
        />
      ),
      description:
        "Our goal is simple—help businesses grow while continuously improving ourselves.",
      color: "#22C55E",
      blobColor: "#113E6E",
    },
  ];

  const handleSlideChange = (slide: number) => {
    setActiveSlide(slide);
    setIsExpanded(false);
  };

  const activeValue = values[activeSlide - 1];

  return (
    <div className="min-h-screen bg-white font-['Raleway',sans-serif] px-4 py-10 sm:py-16 lg:py-20 relative overflow-x-hidden">
      {/* SVG Filters */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute w-0 h-0"
        style={{ position: "absolute" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Side - Heading and Tabs */}
        <div className="w-full lg:w-1/3">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4 tracking-tight">
              Our Values
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00B7C3] to-[#22C55E] mx-auto lg:mx-0 rounded-full"></div>
            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              The principles that guide everything we do.
            </p>
          </div>

          {/* Tabs - Scrollable on mobile, vertical on desktop */}
          <div
            className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-3 min-w-max">
              {values.map((value) => (
                <button
                  key={value.id}
                  onClick={() => handleSlideChange(value.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                    activeSlide === value.id
                      ? "bg-[#113E6E] text-white shadow-lg shadow-[#113E6E]/20"
                      : "bg-gray-100 hover:bg-gray-200 text-[#0D1B2A]"
                  }`}
                >
                  <span className="text-sm sm:text-base font-semibold whitespace-nowrap">
                    {value.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop vertical tabs */}
          <div className="hidden lg:block space-y-3">
            {values.map((value) => (
              <button
                key={value.id}
                onClick={() => handleSlideChange(value.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                  activeSlide === value.id
                    ? "bg-[#113E6E] text-white shadow-lg shadow-[#113E6E]/20"
                    : "bg-gray-50 hover:bg-gray-100 text-[#0D1B2A]"
                }`}
              >
                <span className="text-sm sm:text-base font-semibold">
                  {value.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Card */}
        <div className="w-full lg:w-2/3 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[550px] min-h-[420px] sm:min-h-[460px] md:min-h-[500px] bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] overflow-hidden rounded-2xl">
            {/* Card Content */}
            <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
              {/* Photo Section */}
              <div
                className="absolute w-1/2 h-full left-0 top-0 overflow-hidden"
                style={{ perspective: "300px" }}
              >
                {values.map((value) => (
                  <div
                    key={value.id}
                    className={`absolute w-3/4 h-1/2 top-[-12.5%] ml-[-12.5%] rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center justify-center ${
                      activeSlide === value.id ? "transform-none" : ""
                    }`}
                    style={{
                      transform:
                        activeSlide === value.id
                          ? "rotateX(0deg)"
                          : "rotateX(-180deg)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      background: value.color,
                      boxShadow: `inset 0 0 0 5px #fff, 0 0 0 5px ${value.color}, 0 0 0 10px #fff`,
                    }}
                  >
                    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-90">
                      {value.icon}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shapes */}
              <div
                className={`absolute z-[2] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                  activeSlide === 1
                    ? "left-[45%] top-[20%] w-[60px]"
                    : activeSlide === 2
                      ? "left-[65%] top-[35%] w-[90px]"
                      : activeSlide === 3
                        ? "left-[55%] top-[55%] w-[140px]"
                        : "left-[50%] top-[30%] w-[80px]"
                }`}
                style={{
                  background: "#00B7C3",
                  height: "4px",
                  boxShadow:
                    "0 8px 0 0 #00B7C3, 0 16px 0 0 #00B7C3, 0 24px 0 0 #00B7C3, 0 32px 0 0 #00B7C3",
                  mixBlendMode: "screen",
                }}
              >
                <div
                  className={`absolute w-10 h-10 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    activeSlide === 2
                      ? "left-[120px] top-[170px]"
                      : activeSlide === 3
                        ? "left-[140px] top-[-40px]"
                        : activeSlide === 4
                          ? "left-[100px] top-[120px]"
                          : "left-[175px] top-[160px]"
                  }`}
                  style={{
                    background: "linear-gradient(to bottom, #00B7C3, #22C55E)",
                    clipPath:
                      activeSlide === 2
                        ? "polygon(0 0, 0% 100%, 100% 50%)"
                        : activeSlide === 3
                          ? "polygon(100% 0, 0 0, 100% 100%)"
                          : activeSlide === 4
                            ? "polygon(0 0, 100% 0, 50% 100%)"
                            : "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                />
              </div>

              {/* Blob */}
              <div
                className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isExpanded ? "z-[1]" : "z-0"}`}
                style={{ filter: "url(#goo)" }}
              >
                <div
                  className={`absolute transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1)] ${
                    isExpanded
                      ? "min-w-[110%] min-h-[110%] rounded-none top-[-5%] right-[-5%]"
                      : activeSlide === 1
                        ? "w-[60%] h-[75%] rounded-full top-[-25%] right-[-25%]"
                        : activeSlide === 2
                          ? "w-[70%] h-[75%] rounded-full top-[-25%] right-[-25%]"
                          : activeSlide === 3
                            ? "w-[70%] h-[55%] rounded-full top-[-25%] right-[-25%]"
                            : "w-[65%] h-[70%] rounded-full top-[-25%] right-[-25%]"
                  }`}
                  style={{
                    backgroundColor: activeValue.blobColor,
                  }}
                />
                <div
                  className={`absolute w-1/2 h-[60%] rounded-full right-0 top-5 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    isExpanded
                      ? "scale-0"
                      : activeSlide === 1
                        ? "bg-[#113E6E]"
                        : activeSlide === 2
                          ? "bg-[#00B7C3] top-[40%]"
                          : activeSlide === 3
                            ? "bg-[#22C55E] top-[20%] left-[40%]"
                            : "bg-[#113E6E] top-[30%]"
                  }`}
                  style={{
                    backgroundColor: activeValue.blobColor,
                  }}
                />
                <div
                  className={`absolute w-[40%] h-[60%] rounded-full right-[-15%] top-[20%] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    isExpanded
                      ? "scale-0"
                      : activeSlide === 1
                        ? "bg-[#113E6E]"
                        : activeSlide === 2
                          ? "bg-[#00B7C3]"
                          : activeSlide === 3
                            ? "bg-[#22C55E] left-[70%]"
                            : "bg-[#113E6E] left-[60%]"
                  }`}
                  style={{
                    backgroundColor: activeValue.blobColor,
                  }}
                />
              </div>
            </div>

            {/* Title - Always visible */}
            <h2 className="absolute right-4 sm:right-6 md:right-8 z-[10] text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold m-0 top-6 sm:top-8 md:top-10">
              {activeValue.title}
            </h2>

            {/* Description */}
            <p
              className={`absolute z-[10] w-3/4 text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Raleway'] leading-5 sm:leading-6 md:leading-7 lg:leading-8 left-[12.5%] text-white transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.175)] top-[25%] sm:top-[30%]`}
              style={{
                clipPath: isExpanded
                  ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                  : "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                opacity: isExpanded ? 1 : 0,
                transitionDelay: isExpanded ? "0.2s" : "0s",
              }}
            >
              {activeValue.description}
            </p>

            {/* Read More Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`absolute bottom-[30px] sm:bottom-[40px] md:bottom-[50px] z-[20] text-[#113E6E] text-[12px] sm:text-sm md:text-[15px] text-center tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-black py-3 sm:py-3.5 md:py-4 px-4 sm:px-5 border-2 border-[#113E6E] cursor-pointer left-1/2 transform -translate-x-1/2 w-[70%] sm:w-[60%] md:w-1/2 max-w-[250px] transition-all duration-300 rounded-lg ${
                isExpanded
                  ? "text-white bg-[#00B7C3] border-[#00B7C3]"
                  : "hover:bg-[#00B7C3] hover:text-white hover:border-[#00B7C3]"
              }`}
            >
              {isExpanded ? "BACK" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurValues;
