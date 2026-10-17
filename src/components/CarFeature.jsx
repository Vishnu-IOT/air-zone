import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Lines from "./Lines.jsx";
import SmartImage from "./SmartImage.jsx";
export default function CarFeature() {
  const ref = useRef(null);
  const r = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], r ? [0, 0] : [-40, 40]);
  return (
    <section className="carfeat" ref={ref}>
      <div className="container">
        <p className="label">Precision in every detail</p>
        <Lines as="h2" lines={["Engineered for the drive."]} />
        <p className="lead">
          Professional maintenance and careful inspection help keep your vehicle
          performing the way it was designed to.
        </p>
        <Link className="btn" to="/services">
          Explore Our Services
        </Link>
      </div>
      <motion.div className="carstage" style={{ x }}>
        <motion.div
          initial={r ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <SmartImage
            className="car"
            src="/images/hero/black-car-feature.webp"
            alt="Black luxury sports car in a dark studio"
          />
          <div className="floor" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
