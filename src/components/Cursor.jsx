import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// Custom cursor: a small ring that grows into a labelled bubble ("View", "Expand", "Close") over any element with data-cursor="...".
// Desktop mouse only; the native cursor stays visible and touch devices never see it.
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.35 });
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target.closest && e.target.closest("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : "");
    };
    const leave = () => setLabel("");
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <span className={"cursor-in" + (label ? " big" : "")}>{label && <em>{label}</em>}</span>
    </motion.div>
  );
}
