import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { reviews } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SmartImage from "./SmartImage.jsx";

// FAQ accordion: opening one closes the others.
export function Faq({ items }) {
  const r = useReducedMotion();
  const [open, setOpen] = useState(0);
  return (
    <div className="faqlist">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className={"faq-item" + (isOpen ? " open" : "")}>
            <h3 className="faq-q">
              <button type="button" aria-expanded={isOpen} aria-controls={"faq-" + i} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{q}</span>
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={"faq-" + i}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: r ? 0 : 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// Background photos are illustrative stand-ins; set review.image to use a specific one.
const BG = [
  "/images/about/about-az.png",
  "/images/hero/hero.png",
  "/images/services/diagnostics.png",
  "/images/services/ac inspection.png",
  "/images/services/car-service.jpg",
];
export function Reviews() {
  const r = useReducedMotion();
  const pub = reviews.filter((x) => x.published);
  const n = pub.length;
  const [active, setActive] = useState(0); // index of the review shown large; starts with the first review
  if (!n)
    return (
      <section className="section container">
        <p className="label">Reviews</p>
        <h2>Drivers, in their words.</h2>
        <div className="notice" role="status">Verified customer reviews will appear here once added and approved by the business.</div>
      </section>
    );
  const go = (d) => setActive((active + d + n) % n);
  const featured = pub[active];
  const others = Array.from({ length: Math.min(3, n - 1) }, (_, k) => (active + 1 + k) % n);
  const bg = (x, i) => x.image || BG[i % BG.length];
  const Meta = ({ x }) => (
    <div className="rv-top">
      {x.service && <span className="rv-pill">{x.service}</span>}
      {x.date && <span className="rv-pill">{x.date}</span>}
    </div>
  );
  return (
    <section
      className="section container rv"
      aria-label="Customer reviews"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="rv-head">
        <h2>Drivers, <em>in their words.</em></h2>
        <div className="rv-ctl">
          <span className="label">{active + 1} / {n}</span>
          {n > 1 && (
            <div className="row">
              <button className="rv-btn" aria-label="Previous review" onClick={() => go(-1)}><ChevronLeft size={18} /></button>
              <button className="rv-btn" aria-label="Next review" onClick={() => go(1)}><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </div>
      <p className="lead">Feedback shared by customers about their service experience. Select a review to read it in full.</p>
      <motion.div key={active} className="rv-grid" initial={r ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
        <article className="rv-card c0 featured" aria-live="polite">
          <SmartImage className="rv-bg" src={bg(featured, active)} alt="" pos="center 40%" />
          <span className="rv-shade" aria-hidden="true" />
          <Meta x={featured} />
          <div className="rv-panel">
            {featured.rating > 0 && (
              <div className="stars" aria-label={featured.rating + " out of 5"}>
                {Array.from({ length: featured.rating }, (_, s) => <Star key={s} size={13} />)}
              </div>
            )}
            <blockquote>“{featured.text}”</blockquote>
            <div className="rv-by"><span className="av" aria-hidden="true">{featured.name[0]}</span><b>{featured.name}</b></div>
          </div>
        </article>
        {others.map((idx, k) => {
          const x = pub[idx];
          return (
            <article
              key={x.id}
              className={"rv-card small c" + (k + 1)}
              role="button"
              tabIndex={0}
              aria-label={"Read the review by " + x.name + " in full"}
              data-cursor="Expand"
              onClick={() => setActive(idx)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(idx); } }}
            >
              <SmartImage className="rv-bg" src={bg(x, idx)} alt="" pos="center 40%" />
              <span className="rv-shade" aria-hidden="true" />
              <Meta x={x} />
              <div className="rv-panel">
                {x.rating > 0 && (
                  <div className="stars" aria-label={x.rating + " out of 5"}>
                    {Array.from({ length: x.rating }, (_, s) => <Star key={s} size={13} />)}
                  </div>
                )}
                <blockquote>“{x.text}”</blockquote>
                <div className="rv-by"><span className="av" aria-hidden="true">{x.name[0]}</span><b>{x.name}</b></div>
              </div>
            </article>
          );
        })}
      </motion.div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="ctaban">
      <Reveal>
        <h2>Ready to give your car the care it deserves?</h2>
        <p>Tell us about your vehicle and the service you need. We'll help you understand the next steps.</p>
        <div className="row center">
          <Link className="btn" to="/book-a-quote">Book a Quote</Link>
          <Link className="btn ghost" to="/services">Explore Services</Link>
        </div>
      </Reveal>
    </section>
  );
}
