import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
// GSAP + ScrollTrigger effects, re-created for every page: image parallax, hero depth, magnetic buttons, 3D card tilt, scroll-velocity skew.
export default function GsapEffects({ page }) {
  const r = useReducedMotion();
  useEffect(() => {
    if (r) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const off = [];
    const ctx = gsap.context(() => {
      // 0. Section entrances: compositor-only (opacity + transform), distinct per section but never wider than the screen.
      // Removed: full-section clip-path wipes (repaint every frame), +/-150px slides (horizontal overflow on phones),
      // skew / rotationX (blurry text mid-flight). Sections that already contain Framer reveals only fade, so motion is never doubled.
      const small = window.matchMedia("(max-width: 860px)").matches;
      const d = small ? 0.8 : 1.1;
      const SEL = "main section,main .dhero,main .dgrid,main .panel,main .inline-cta";
      const STYLES = [
        { from: { y: small ? 36 : 60 }, to: { y: 0 } },
        { from: { scale: 0.965, y: 24, transformOrigin: "50% 85%" }, to: { scale: 1, y: 0 } },
        { from: { x: small ? -18 : -48, y: 20 }, to: { x: 0, y: 0 } },
        { from: { x: small ? 18 : 48, y: 20 }, to: { x: 0, y: 0 } },
      ];
      const blocks = Array.from(document.querySelectorAll(SEL)).filter((el) => !el.parentElement.closest(SEL) && !el.matches(".hero,.chero,.vx"));
      blocks.forEach((el, i) => {
        const hasInner = !!el.querySelector('[style*="opacity: 0"]');
        const s = hasInner ? { from: {}, to: {} } : STYLES[i % STYLES.length];
        gsap.fromTo(el, { opacity: 0, ...s.from }, { opacity: 1, ...s.to, duration: d, ease: "power2.out", force3D: true, clearProps: "transform,opacity,transformOrigin", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      // 1. Parallax on large background / hero images. scrub:true = locked to the scroll position (Lenis already provides the smoothing;
      // an extra scrub lag on top of it is what made images swim). Gentler travel on phones.
      const amt = small ? 4 : 6;
      gsap.utils.toArray(".aboutco-bgimg img,.dhero>img,.dhero>.ph,.chero-bg,.bs-wide img,.intro2-car img,.hero-vid,.hero video").forEach((el) => {
        const trigger = el.closest("section") || el.parentElement;
        gsap.fromTo(el, { yPercent: -amt, scale: 1.1 }, { yPercent: amt, scale: 1.1, ease: "none", force3D: true, scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
      });
      // 2. Hero copy drifts up and fades as you scroll past
      const hero = document.querySelector(".hero-in");
      if (hero) gsap.to(hero, { yPercent: -14, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      // 3. Section eyebrow lines draw in
      gsap.utils.toArray(".sechead,.label").slice(0, 40).forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      if (!fine) return;
      // 4. Magnetic buttons
      document.querySelectorAll(".btn,.rv-btn,.circ-cta").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const mv = (e) => { const b = el.getBoundingClientRect(); xTo((e.clientX - b.left - b.width / 2) * 0.22); yTo((e.clientY - b.top - b.height / 2) * 0.32); };
        const lv = () => { xTo(0); yTo(0); };
        el.addEventListener("mousemove", mv); el.addEventListener("mouseleave", lv);
        off.push(() => { el.removeEventListener("mousemove", mv); el.removeEventListener("mouseleave", lv); });
      });
      // 5. 3D tilt on service cards
      document.querySelectorAll(".card>a,.fs-big>a").forEach((el) => {
        gsap.set(el, { transformPerspective: 900, transformOrigin: "center" });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        const mv = (e) => { const b = el.getBoundingClientRect(); ry(((e.clientX - b.left) / b.width - 0.5) * 7); rx(-((e.clientY - b.top) / b.height - 0.5) * 7); };
        const lv = () => { rx(0); ry(0); };
        el.addEventListener("mousemove", mv); el.addEventListener("mouseleave", lv);
        off.push(() => { el.removeEventListener("mousemove", mv); el.removeEventListener("mouseleave", lv); });
      });
      // 6. Brand marquee skews with scroll velocity (Lenis)
      const lenis = window.__lenis; const view = document.querySelector(".bc-view");
      if (lenis && view) {
        const skew = gsap.quickTo(view, "skewX", { duration: 0.4, ease: "power3.out" });
        const on = ({ velocity }) => skew(Math.max(-8, Math.min(8, -velocity * 0.35)));
        lenis.on("scroll", on); off.push(() => lenis.off("scroll", on));
      }
    });
    // Re-measure once layout settles (fonts, lazy images, the video poster) instead of one fixed guess,
    // so triggers and the showroom pin never sit at stale positions. Debounced and height-guarded: no refresh loops.
    let rt = 0;
    const settle = () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250); };
    const first = setTimeout(() => ScrollTrigger.refresh(), 700);
    window.addEventListener("load", settle);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
    let lastH = 0;
    const main = document.querySelector("main");
    const ro = main && typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => { const h = Math.round(main.getBoundingClientRect().height); if (Math.abs(h - lastH) > 4) { lastH = h; settle(); } }) : null;
    if (ro) ro.observe(main);
    return () => { clearTimeout(first); clearTimeout(rt); window.removeEventListener("load", settle); ro && ro.disconnect(); off.forEach((f) => f()); ctx.revert(); };
  }, [page, r]);
  return null;
}
