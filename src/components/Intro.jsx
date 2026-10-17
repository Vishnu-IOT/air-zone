import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Gauge, Cpu, Snowflake, Users } from "lucide-react";
import Lines from "./Lines.jsx";
import SmartImage from "./SmartImage.jsx";
import Reveal from "./Reveal.jsx";
// Layout follows next_to_about_company.png: black car centred, four glass panels beneath (outer two raised).
const P = [
  [
    Gauge,
    "Precision Vehicle Care",
    "Structured inspection and careful workmanship.",
  ],
  [
    Cpu,
    "Diagnostic Expertise",
    "Fault scanning and testing to find root causes.",
  ],
  [
    Snowflake,
    "Luxury Car AC Services",
    "Cooling checks, leak diagnosis and repair.",
  ],
  [
    Users,
    "Customer-Focused Service",
    "Clear explanations before additional work.",
  ],
];
export default function Intro() {
  const ref = useRef(null);
  const r = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], r ? [0, 0] : [24, -24]);
  return (
    <section className="intro2" ref={ref}>
      <div className="container center-text">
        <p className="label">Our standard</p>
        <Lines
          as="h2"
          lines={["More than service.", "A standard of precision."]}
        />
        <Reveal delay={0.2}>
          <p className="lead">
            At Air Zone Automobile, every vehicle deserves careful attention.
            From routine maintenance and advanced diagnostics to luxury car AC
            repair, our focus is on understanding your vehicle's needs and
            delivering thoughtful, precise care.
          </p>
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
          <SmartImage
            src="/images/hero/luxury-car.webp"
            alt="Black luxury car in a dark studio"
          />
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
              <i>
                <I size={18} />
              </i>
              <b>{t}</b>
              <span>{d}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
