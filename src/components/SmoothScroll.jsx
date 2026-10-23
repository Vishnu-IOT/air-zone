import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
// Lenis = inertia smooth scrolling for mouse/trackpad, driven by GSAP's ticker so ScrollTrigger stays frame-perfect.
// Touch devices keep their native momentum scrolling (it is smoother than any JS emulation and keeps pins glitch-free).
export default function SmoothScroll() {
  const r = useReducedMotion();
  useEffect(() => {
    if (r) return;
    const lenis = new Lenis({
      lerp: 0.1, // frame-rate independent easing (no duration/easing jump when a frame is dropped)
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [r]);
  return null;
}
