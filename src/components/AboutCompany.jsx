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
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.9 }}
      >
        <SmartImage
          src="/images/about/about-az.png"
          alt="Luxury car in the Air Zone studio"
          pos="72% center"
        />
      </motion.div>
      <span className="aboutco-shade" aria-hidden="true" />
      <span className="sweep-beam" aria-hidden="true" />
      <div className="aboutco-text">
        <p className="label">About Air Zone Automobile</p>
        <div className="aboutco-bmw">
          <img className="bmw-logo" src="/images/hero/bmw.png" alt="" />
        </div>
        <Reveal variant="left" delay={0.15}>
          <p id="aboutco-h">
            Established in 2008, Air Zone Automobile brings together extensive
            automotive experience from Coimbatore and international technical
            exposure in Dubai, including six years working with BMW vehicles.
            From specialised car AC services to advanced OBD diagnostics, we are
            committed to keeping your vehicle performing at its best.
          </p>
          <Link to="/about" className="circ-cta" data-cursor="View">
            <span>Discover more</span>
            <i>
              <ArrowRight size={18} />
            </i>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
