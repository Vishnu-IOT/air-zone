import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Portrait({ m }) {
  const [bad, setBad] = useState(false);
  return bad ? (
    <div
      className="portrait-ph"
      role="img"
      aria-label={`Portrait of ${m.name} to be added`}
    >
      <svg viewBox="0 0 100 120" aria-hidden="true">
        <circle cx="50" cy="42" r="20" />
        <path d="M12 120c2-34 24-48 38-48s36 14 38 48z" />
      </svg>
      <span>Photo to be added</span>
    </div>
  ) : (
    <img
      src={m.image}
      alt={`${m.name}, ${m.designation}`}
      loading="lazy"
      onError={() => setBad(true)}
    />
  );
}
export default function TeamCard({ m, i = 0 }) {
  const r = useReducedMotion();
  return (
    <motion.article
      className="tcard"
      initial={r ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
    >
      <span className="pill">{m.category}</span>
      {m.placeholder && (
        <span className="badge">Placeholder · not published</span>
      )}
      <h3>{m.name}</h3>
      <p className="role">{m.designation}</p>
      <div className="tphoto">
        <Portrait m={m} />
      </div>
      <p className="tbio">{m.bio}</p>
    </motion.article>
  );
}
