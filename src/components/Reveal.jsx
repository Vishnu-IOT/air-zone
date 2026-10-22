import { motion, useReducedMotion } from "framer-motion";
// Scroll-reveal with a choice of entrance styles. Slow, eased, plays once when the block is well inside the screen.
const EASE = [0.16, 0.8, 0.2, 1];
export const REVEALS = {
  up: { from: { opacity: 0, y: 70 }, to: { opacity: 1, y: 0 } },
  rise: { from: { opacity: 0, y: 110, scale: 0.96 }, to: { opacity: 1, y: 0, scale: 1 } },
  left: { from: { opacity: 0, x: -110 }, to: { opacity: 1, x: 0 } },
  right: { from: { opacity: 0, x: 110 }, to: { opacity: 1, x: 0 } },
  zoom: { from: { opacity: 0, scale: 0.86 }, to: { opacity: 1, scale: 1 } },
  blur: { from: { opacity: 0, y: 36, filter: "blur(16px)" }, to: { opacity: 1, y: 0, filter: "blur(0px)" } },
  flip: { from: { opacity: 0, y: 60, rotateX: 40, transformPerspective: 900 }, to: { opacity: 1, y: 0, rotateX: 0 } },
  wipe: { from: { opacity: 1, clipPath: "inset(0 100% 0 0)" }, to: { opacity: 1, clipPath: "inset(0 0% 0 0)" } },
};
export default function Reveal({ children, delay = 0, as = "div", className = "", variant = "up", duration = 1.3 }) {
  const r = useReducedMotion();
  const M = motion[as];
  const v = REVEALS[variant] || REVEALS.up;
  return (
    <M
      className={className}
      initial={r ? false : v.from}
      whileInView={v.to}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}
