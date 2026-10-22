import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
// Lenis = inertia smooth scrolling, wired into GSAP's ticker so ScrollTrigger stays in sync.
export default function SmoothScroll() {
  const r = useReducedMotion();
  useEffect(() => {
    if (r) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; };
  }, [r]);
  return null;
}
