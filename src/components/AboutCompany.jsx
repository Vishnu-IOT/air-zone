import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import SmartImage from "./SmartImage.jsx";
// Full-bleed background image with the text over it; responsive.
export default function AboutCompany() {
  const r = useReducedMotion();
  return (
    <section className="aboutco" aria-labelledby="aboutco-h">
      <motion.div
        className="aboutco-bgimg"
        initial={r ? false : { opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3 }}
      >
        <SmartImage src="/images/about/about-az.png" alt="Luxury car in the Air Zone studio" pos="72% center" />
      </motion.div>
      <span className="aboutco-shade" aria-hidden="true" />
      <span className="sweep-beam" aria-hidden="true" />
      <div className="aboutco-text">
        <p className="label">About Air Zone Automobile</p>
        <div className="aboutco-bmw">
          <img className="bmw-logo" src="/images/hero/bmw.png" alt="" />
        </div>
        <Reveal delay={0.15}>
          <p id="aboutco-h">
            Air Zone Automobile is a service centre for luxury and premium vehicles, focused on routine servicing,
            computer diagnostics and car AC repair. Each vehicle is inspected carefully, and findings are explained
            before any additional work proceeds.
          </p>
          <Link to="/about" className="circ-cta" data-cursor="View">
            <span>Discover more</span>
            <i><ArrowRight size={18} /></i>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
