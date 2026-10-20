import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form.jsx";
import Reveal from "../components/Reveal.jsx";
import SmartImage from "../components/SmartImage.jsx";
import { Faq, CtaBanner } from "../components/Extras.jsx";
import Lines from "../components/Lines.jsx";
import OwnerSection from "../components/OwnerSection.jsx";
import {
  AboutHero,
  Approach,
  VehicleSpecific,
  Inspection,
  Preventive,
} from "../components/AboutSections.jsx";
import Folio from "../components/Folio.jsx";
import cfg from "../data/siteConfig.js";
import { services } from "../data/services.js";
const cta = (
  <Link className="btn" to="/book-a-quote">
    Book a Quote
  </Link>
);
export const About = () => (
  <div className="bs">
    {/* <Folio top /> */}
    <AboutHero />
    <OwnerSection />
    <Approach />
    <VehicleSpecific />
    <Inspection />
    <Preventive />
    <CtaBanner />
    {/* <Folio /> */}
  </div>
);
export function Gallery() {
  const imgs = services.map((s) => ({
    src: s.image,
    alt: s.title + " (illustrative image)",
    cat: s.category,
  }));
  const cats = ["All", ...new Set(imgs.map((i) => i.cat))];
  const [c, setC] = useState("All"),
    [o, setO] = useState(null);
  const list = imgs.filter((i) => c === "All" || i.cat === c);
  useEffect(() => {
    if (o === null) return;
    const k = (e) => {
      if (e.key === "Escape") setO(null);
      if (e.key === "ArrowRight") setO((x) => (x + 1) % list.length);
      if (e.key === "ArrowLeft")
        setO((x) => (x - 1 + list.length) % list.length);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [o, list.length]);
  return (
    <section className="page">
      <div className="container section">
        <p className="label">Gallery</p>
        <h1>Gallery</h1>
        <p className="lead">
          Images are illustrative until real workshop photographs are added in{" "}
          <code>public/images/</code>.
        </p>
        <div className="row">
          {cats.map((x) => (
            <button
              key={x}
              className={"chip" + (x === c ? " on" : "")}
              onClick={() => setC(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="masonry">
          {list.map((i, n) => (
            <button
              key={i.alt}
              onClick={() => setO(n)}
              aria-label={"Open " + i.alt}
            data-cursor="Expand"
            >
              <SmartImage src={i.src} alt={i.alt} />
            </button>
          ))}
        </div>
        {o !== null && list[o] && (
          <div
            className="lightbox"
            data-cursor="Close"
            role="dialog"
            aria-modal="true"
            onClick={() => setO(null)}
          >
            <SmartImage src={list[o].src} alt={list[o].alt} />
            <button aria-label="Close">×</button>
          </div>
        )}
        <div className="row">
          {cta}
          <Link className="btn ghost" to="/services">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
export { default as Contact } from "./Contact.jsx";
export const BookQuote = () => (
  <section className="page">
    <div className="container section">
      <p className="label">Book a quote</p>
      <h1>Let's care for your drive.</h1>
      <p className="lead">Tell us about your vehicle and what it needs.</p>
      <div className="dgrid">
        <Form quote />
        <aside className="cinfo">
          <h3>What happens next</h3>
          <ol className="tick">
            <li>Your request is sent to the team.</li>
            <li>They review your details and follow up.</li>
            <li>An estimate is confirmed after assessment.</li>
          </ol>
          <p className="note">
            Submitting a request does not confirm an appointment.
          </p>
        </aside>
      </div>
    </div>
  </section>
);
export const NotFound = () => (
  <section className="section container page">
    <h1>Page not found</h1>
    <Link className="btn" to="/">
      Back home
    </Link>
  </section>
);
