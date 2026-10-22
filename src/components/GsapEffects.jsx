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
      // 0. Section entrances: each section gets its own slow, distinct style (rise, curtain, slide, zoom, wipe, flip, skew)
      const SEL = "main section,main .dhero,main .dgrid,main .panel,main .inline-cta";
      const STYLES = [
        { from: { y: 90 }, to: { y: 0 }, d: 1.5 },
        { from: { clipPath: "inset(0 0 100% 0)" }, to: { clipPath: "inset(0 0 0% 0)" }, d: 1.3 },
        { from: { x: -150 }, to: { x: 0 }, d: 1.5 },
        { from: { scale: 0.92, transformOrigin: "50% 85%" }, to: { scale: 1 }, d: 1.5 },
        { from: { clipPath: "inset(0 100% 0 0)" }, to: { clipPath: "inset(0 0% 0 0)" }, d: 1.3 },
        { from: { x: 150 }, to: { x: 0 }, d: 1.5 },
        { from: { rotationX: 10, y: 80, transformPerspective: 1200, transformOrigin: "50% 0" }, to: { rotationX: 0, y: 0 }, d: 1.6 },
        { from: { skewY: 3, y: 90 }, to: { skewY: 0, y: 0 }, d: 1.5 },
      ];
      const blocks = Array.from(document.querySelectorAll(SEL)).filter((el) => !el.parentElement.closest(SEL) && !el.matches(".hero,.chero"));
      blocks.forEach((el, i) => {
        const s = STYLES[i % STYLES.length];
        gsap.fromTo(el, s.from, { ...s.to, duration: s.d, ease: "power3.out", clearProps: "transform,clipPath,transformOrigin", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      // 1. Parallax on large background / hero images (scrubbed to scroll)
      gsap.utils.toArray(".aboutco-bgimg img,.dhero>img,.dhero>.ph,.chero-bg,.bs-wide img,.intro2-car img,.hero-vid,.hero video").forEach((el) => {
        const trigger = el.closest("section") || el.parentElement;
        gsap.fromTo(el, { yPercent: -6, scale: 1.1 }, { yPercent: 6, scale: 1.1, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.6 } });
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
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => { clearTimeout(refresh); off.forEach((f) => f()); ctx.revert(); };
  }, [page, r]);
  return null;
}
