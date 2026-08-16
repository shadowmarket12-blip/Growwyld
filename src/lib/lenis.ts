"use client";

import Lenis from "lenis";
import gsap from "gsap";

let lenis: Lenis | null = null;
let started = false;


export function getLenis() {
  if (typeof window === "undefined") return null;

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // Keep native touch scrolling on mobile fast & lag-free
      syncTouch: false,
    });
  }

  if (!started) {
    started = true;
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });
    // Lenis already integrates with rAF timing; disable gsap's own lag smoothing
    // so the two never disagree about elapsed time.
    gsap.ticker.lagSmoothing(0);
  }

  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
  started = false;
}
