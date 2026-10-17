import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Lines from "./Lines.jsx";
import Reveal from "./Reveal.jsx";
import SmartImage from "./SmartImage.jsx";
// Layout follows about_company_template.png: dark text panel on the left, large vehicle image with floor reflection on the right.
export default function AboutCompany() {
  const r = useReducedMotion();
  return (
    <section className="aboutco" aria-labelledby="aboutco-h">
      <div className="aboutco-text">
        <p className="label">About Air Zone Automobile</p>
        <Lines as="h2" lines={["Precision care", "for premium cars."]} />
        <Reveal delay={0.15}>
          <p id="aboutco-h">
            Air Zone Automobile is a service centre for luxury and premium
            vehicles, focused on routine servicing, computer diagnostics and car
            AC repair. Each vehicle is inspected carefully, and findings are
            explained before any additional work proceeds.
          </p>
          <Link to="/about" className="circ-cta">
            <span>Discover more</span>
            <i>
              <ArrowRight size={18} />
            </i>
          </Link>
        </Reveal>
      </div>
      <motion.div
        className="aboutco-img"
        initial={r ? false : { opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <SmartImage
          src="/images/about/about-az.png"
          alt="Luxury car in the Air Zone studio"
        />
        <span className="beam" aria-hidden="true" />
        <span className="reflect" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
