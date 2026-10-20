import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, IndianRupee } from "lucide-react";
import ServiceCard from "../components/ServiceCard.jsx";
import SmartImage from "../components/SmartImage.jsx";
import Reveal from "../components/Reveal.jsx";
import { Faq, CtaBanner } from "../components/Extras.jsx";
import {
  services,
  bySlug,
  priceText,
  factors,
  disclaimer,
} from "../data/services.js";
export function Services() {
  const cats = ["All", ...new Set(services.map((s) => s.category))];
  const [c, setC] = useState("All");
  const list = services.filter((s) => c === "All" || s.category === c);
  return (
    <>
    <section className="page">
      <div className="container section">
        <p className="label">Services</p>
        <h1>Our services</h1>
        <p className="lead">
          From scheduled servicing to diagnostics and AC repair. Durations and
          prices are indicative and confirmed after assessment, since luxury and
          premium vehicles can need different parts, fluids and procedures.
        </p>
        <div className="row" role="group" aria-label="Filter services">
          {cats.map((x) => (
            <button
              key={x}
              className={"chip" + (x === c ? " on" : "")}
              aria-pressed={x === c}
              onClick={() => setC(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.map((s, i) => (
            <ServiceCard key={s.slug} s={s} i={i} />
          ))}
        </div>
        <p className="note">{disclaimer}</p>
      </div>
    </section>
    <CtaBanner />
    </>
  );
}
export function ServiceDetails() {
  const { slug } = useParams();
  const s = bySlug(slug);
  if (!s)
    return (
      <section className="section container page">
        <h1>Service not found</h1>
        <p className="lead">We couldn't find that service.</p>
        <Link className="btn" to="/services">
          View all services
        </Link>
      </section>
    );
  const book = "/book-a-quote?service=" + s.slug;
  const L = ({ t, items }) => (
    <Reveal>
      <h2>{t}</h2>
      <ul className="tick">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </Reveal>
  );
  return (
    <article className="page">
      <div className="dhero">
        <SmartImage src={s.image} alt={s.title} eager />
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> /{" "}
            {s.title}
          </nav>
          <p className="label">{s.category}</p>
          <h1>{s.title}</h1>
          <p className="lead">{s.short}</p>
          <Link className="btn" to={book}>
            {s.cta}
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="panel">
          <div>
            <Clock size={18} />
            <span>Estimated duration</span>
            <b>{s.duration}</b>
          </div>
          <div>
            <IndianRupee size={18} />
            <span>Estimated price</span>
            <b>{priceText(s)}</b>
          </div>
          <div>
            <span>Final cost</span>
            <b className="sm">
              Depends on vehicle make, model, parts, condition and repair
              requirements.
            </b>
          </div>
        </div>
        <div className="dgrid section">
          <Reveal>
            <h2>Overview</h2>
            <p className="lead">{s.overview}</p>
            <h3>Why it matters</h3>
            <p className="lead">{s.why}</p>
          </Reveal>
          <L t="Common reasons to book" items={s.symptoms} />
        </div>
        <div className="dgrid">
          <L t="Inspection checklist" items={s.checklist} />
          <L t="What may be included" items={s.includes} />
        </div>
        <Reveal>
          <h2 className="mt">How it works</h2>
          <ol className="steps">
            {s.steps.map((t, i) => (
              <li key={t}>
                <b>0{i + 1}</b>
                {t}
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="dgrid section">
          <L t="What affects the final estimate" items={factors} />
          <Reveal>
            <h2>FAQ</h2>
            <Faq items={s.faqs} />
          </Reveal>
        </div>
        <p className="note">{disclaimer}</p>
        <h2>Related services</h2>
        <div className="grid">
          {s.related.map(
            (r, i) => bySlug(r) && <ServiceCard key={r} s={bySlug(r)} i={i} />,
          )}
        </div>
        <div className="inline-cta">
          <h2>Ready to book?</h2>
          <Link className="btn" to={book}>
            {s.cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
