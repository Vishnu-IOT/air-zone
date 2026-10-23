import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// ignoreMobileResize: the mobile address bar collapsing must not re-measure every pin/trigger mid-scroll (that was the jump).
// limitCallbacks: fewer redundant onEnter/onLeave calls while scrolling fast.
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
gsap.config({ force3D: true, nullTargetWarn: false });
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
