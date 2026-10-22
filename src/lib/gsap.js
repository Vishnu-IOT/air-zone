import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
// Scroll helpers that work with or without Lenis smooth scrolling.
export const scrollToTop = (immediate = false) => {
  const l = window.__lenis;
  if (l) l.scrollTo(0, immediate ? { immediate: true } : { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
};
export const lockScroll = (lock) => {
  const l = window.__lenis;
  if (l) lock ? l.stop() : l.start();
};
