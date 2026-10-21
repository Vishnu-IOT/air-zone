import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Lines from "../components/Lines.jsx";
import Reveal from "../components/Reveal.jsx";
import { galleryItems } from "../data/gallery.js";
export default function Gallery() {
  const r = useReducedMotion();
  const cats = ["All", ...new Set(galleryItems.map((i) => i.category))];
  const [c, setC] = useState("All");
  const [o, setO] = useState(null);
  const list = galleryItems.filter((i) => c === "All" || i.category === c);
  const touch = useRef(null);
  const closeBtn = useRef(null);
  const go = useCallback((d) => setO((x) => (x + d + list.length) % list.length), [list.length]);
  const open = o !== null;
  useEffect(() => {
    if (!open) return;
    const k = (e) => {
      if (e.key === "Escape") setO(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    closeBtn.current && closeBtn.current.focus();
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, go]);
  const cur = open ? list[o] : null;
  return (
    <section className="page">
      <div className="container section">
        <p className="label">Gallery</p>
        <Lines as="h1" lines={["Inside the workshop."]} />
        <Reveal><p className="lead">A look at our workshop, electrical, engine and interior work. Select any photo to view it full screen.</p></Reveal>
        <div className="row" role="group" aria-label="Filter gallery">
          {cats.map((x) => (
            <button key={x} className={"chip" + (x === c ? " on" : "")} aria-pressed={x === c} onClick={() => setC(x)}>{x}</button>
          ))}
        </div>
        <div className="masonry gmasonry">
          {list.map((i, n) => (
            <motion.button
              key={i.id}
              className="gitem"
              type="button"
              data-cursor="Expand"
              aria-label={"Open photo: " + i.alt}
              onClick={() => setO(n)}
              initial={r ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: (n % 3) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <img src={i.src} alt={i.alt} width={i.w} height={i.h} loading="lazy" />
              <span className="gcap">{i.category}</span>
            </motion.button>
          ))}
        </div>
        <div className="row">
          <Link className="btn" to="/book-a-quote">Book a Quote</Link>
          <Link className="btn ghost" to="/services">Explore Services</Link>
        </div>
      </div>
      {cur && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={cur.alt}
          onClick={() => setO(null)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            touch.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <button ref={closeBtn} className="lb-x" aria-label="Close" onClick={() => setO(null)}><X size={22} /></button>
          <button className="lb-nav prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft size={24} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={cur.alt} />
            <figcaption>{cur.alt} · {o + 1} / {list.length}</figcaption>
          </figure>
          <button className="lb-nav next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight size={24} /></button>
        </div>
      )}
    </section>
  );
}
