import { motion, useReducedMotion } from "framer-motion";
// FIX: the scroll trigger (whileInView) now lives on the visible .line wrapper. Before, it was on the inner span that starts translated
// outside the overflow:hidden wrapper, so the browser never saw it as "in view" and headings stayed hidden forever.
const inner = (i) => ({
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] },
  },
});
export default function Lines({ lines, as: T = "h2", className = "" }) {
  const r = useReducedMotion();
  if (r)
    return (
      <T className={className}>
        {lines.map((l) => (
          <span key={l} className="line">
            <span>{l}</span>
          </span>
        ))}
      </T>
    );
  return (
    <T className={className}>
      {lines.map((l, i) => (
        <motion.span
          key={l}
          className="line"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.span variants={inner(i)}>{l}</motion.span>
        </motion.span>
      ))}
    </T>
  );
}
