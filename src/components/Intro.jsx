import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Gauge, Cpu, Snowflake, Users } from "lucide-react";
import Lines from "./Lines.jsx";
import SmartImage from "./SmartImage.jsx";
import Reveal from "./Reveal.jsx";
// Layout follows the shared reference: black car on top, four glass cards beneath (outer two raised).
// Car image slot: public/images/hero/luxury-car.webp (replace later). Cards keep their descriptive text.
const P = [
  [Gauge, "Precision Vehicle Care", "Structured inspection and careful workmanship."],
  [Cpu, "Diagnostic Expertise", "Fault scanning and testing to find root causes."],
  [Snowflake, "Luxury Car AC Services", "Cooling checks, leak diagnosis and repair."],
  [Users, "Customer-Focused Service", "Clear explanations before additional work."],
];
export default function Intro() {
  const ref = useRef(null);
  const r = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], r ? [0, 0] : [24, -24]);
  return (
    <section className="intro2" ref={ref}>
      <div className="container center-text">
        <p className="label">Our standard</p>
        <Lines as="h2" lines={["More than service.", "A standard of precision."]} />
        <Reveal delay={0.2}>
          <p className="lead">
            Air Zone Automobile brings together careful vehicle inspection, thoughtful maintenance, advanced diagnostics,
            and luxury car AC care. Our focus is on understanding each vehicle's needs and helping customers make
            informed service decisions.
          </p>
          <div className="row center">
            <Link className="btn" to="/about">Discover Air Zone</Link>
            <Link className="btn ghost" to="/services">Our Services</Link>
          </div>
        </Reveal>
      </div>
      <div className="intro2-stage">
        <motion.div
          className="intro2-car"
          style={{ y }}
          initial={r ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
        >
          <SmartImage src="/images/hero/luxury-car.webp" fallback="/images/hero/hero.png" alt="Black luxury car in a dark studio" pos="center 45%" />
        </motion.div>
        <ul className="panels2">
          {P.map(([I, t, d], i) => (
            <motion.li
              key={t}
              className={"gp p" + i}
              initial={r ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <i><I size={18} /></i>
              <b>{t}</b>
              <span>{d}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
