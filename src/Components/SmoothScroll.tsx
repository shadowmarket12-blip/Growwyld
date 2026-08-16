"use client";

import { useEffect } from "react";
import { getLenis, destroyLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    // Keep ScrollTrigger's measurements in lockstep with Lenis's virtual scroll
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      destroyLenis();
    };
  }, []);

  return null;
}
