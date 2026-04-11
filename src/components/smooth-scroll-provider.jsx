"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    function onScroll() {
      ScrollTrigger.update();
    }

    lenis.on("scroll", onScroll);

    function ticker(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.refresh();
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }) {
  const [isSmoothScrollEnabled, setIsSmoothScrollEnabled] = useState(false);

  useEffect(() => {
    function applyPreference() {
      setIsSmoothScrollEnabled(!prefersReducedMotion());
    }

    applyPreference();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", applyPreference);
    return () => mq.removeEventListener("change", applyPreference);
  }, []);

  if (!isSmoothScrollEnabled) return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.1,
        anchors: true,
      }}
    >
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
