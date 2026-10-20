import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Lines from "./Lines.jsx";
import Reveal from "./Reveal.jsx";
import SmartImage from "./SmartImage.jsx";
export function SecHead({ n, title, tag }) {
  return (
    <div className="sechead">
      <span>
        <i className="sq" />
        {n && n + " / "}
        {title}
      </span>
      <span>{tag}</span>
    </div>
  );
}
function Mask({ src, alt, fb, dir = "left", className = "" }) {
  const r = useReducedMotion();
  return (
    <motion.div
      className={"mask " + className}
      initial={
        r
          ? false
          : {
              clipPath:
                dir === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
            }
      }
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <SmartImage src={src} alt={alt} fallback={fb} />
    </motion.div>
  );
}
export function AboutHero() {
  return (
    <section className="bs-hero folio-top">
      <div className="container">
        <SecHead
          title="Our story // Air Zone Automobile"
          tag="Palakkad · Kerala"
        />
        <div className="bs-hero-grid">
          <div>
            <p className="label">About Air Zone Automobile</p>
            <Lines as="h1" lines={["Vehicle care,", "done carefully."]} />
          </div>
          <Reveal className="bs-lede">
            <p className="dropcap">
              Air Zone Automobile focuses on servicing, computer diagnostics and
              car AC repair for luxury and premium vehicles. We treat every
              vehicle as an individual machine with its own requirements, not as
              a number on a job card.
            </p>
            <p className="meta">
              Intended approach · owner to verify before publishing
            </p>
          </Reveal>
        </div>
        <Mask
          className="bs-wide"
          src="/images/about/about-hero.webp"
          fb="/images/about/about-az.png"
          alt="Luxury car in a dark studio (illustrative)"
        />
      </div>
    </section>
  );
}
const A = [
  [
    "01",
    "Understand",
    "Stage: Listen",
    "Every vehicle has its own service requirements. We begin with the vehicle and the customer’s concerns.",
    [
      ["Customer concerns", "Heard first"],
      ["Vehicle details", "Noted"],
    ],
  ],
  [
    "02",
    "Inspect",
    "Stage: Assess",
    "Careful assessment helps identify the work that may be needed, and what can wait.",
    [
      ["Inspection", "Structured"],
      ["Findings", "Recorded"],
    ],
  ],
  [
    "03",
    "Recommend",
    "Stage: Advise",
    "Clear, practical recommendations focused on the vehicle’s condition.",
    [
      ["Explanation", "Plain language"],
      ["Next steps", "Agreed with you"],
    ],
  ],
];
export function Approach() {
  return (
    <section className="bs-sec">
      <div className="container">
        <SecHead n="02" title="Our approach" tag="Care process" />
        <Lines as="h2" lines={["Our approach to", "automotive care"]} />
        <Reveal>
          <p className="lead narrow">
            Every vehicle has its own service requirements. Our approach begins
            with understanding the vehicle, listening to the customer's
            concerns, and identifying the work that may be needed. We aim to
            make the service process clear, practical, and focused on the
            vehicle's condition.
          </p>
        </Reveal>
        <div className="bs-cols">
          {A.map(([n, t, st, d, sp], i) => (
            <Reveal as="article" key={n} delay={i * 0.1}>
              <span className="stage">{st}</span>
              <div className="bignum">{n}</div>
              <h3>{t}</h3>
              <p>{d}</p>
              <dl className="specs">
                {sp.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
const K = [
  [
    "Manufacturer specifications",
    "Protocol",
    "Service intervals and fluids are set by the vehicle’s maker and differ between models.",
  ],
  [
    "Correct parts and fluids",
    "Compliance",
    "Components and oil grades vary between makes, models and engines.",
  ],
  [
    "Vehicle-specific diagnostics",
    "Diagnostics",
    "Systems and fault-finding procedures differ by make, model and year.",
  ],
  [
    "Maintenance intervals",
    "Condition",
    "Schedules depend on the engine, how the car is used and its condition.",
  ],
];
const D = [
  ["Specifications", "Vary by make and model"],
  ["Fluids and parts", "Depend on the engine"],
  ["Diagnostics", "Depend on the system"],
  ["Intervals", "Schedule and condition"],
];
export function VehicleSpecific() {
  return (
    <section className="bs-sec alt">
      <div className="container">
        <SecHead
          n="03"
          title="Vehicle-specific servicing"
          tag="Specification paradigm"
        />
        <div className="bs-hero-grid">
          <div>
            <Lines
              as="h2"
              lines={["Every vehicle has its", "own requirements."]}
            />
          </div>
          <Reveal className="bs-lede">
            <p className="lead">
              Vehicle maintenance is not one-size-fits-all. Oil specifications,
              replacement intervals, diagnostic procedures, components, and
              repair requirements can vary between vehicles. Understanding the
              manufacturer's recommendations and the vehicle's condition helps
              ensure that service decisions are appropriate and informed.
            </p>
          </Reveal>
        </div>
        <div className="bs-two">
          <div>
            <Mask
              dir="right"
              src="/images/about/vehicle-specific.webp"
              fb="/images/services/diagnostics.png"
              alt="Brake and suspension inspection (illustrative)"
            />
            <div className="datasheet">
              <h4>Service considerations</h4>
              <dl className="specs">
                {D.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="items">
            {K.map(([t, tag, d], i) => (
              <Reveal as="div" className="item" key={t} delay={i * 0.08}>
                <header>
                  <h3>
                    <span className="n">0{i + 1}</span>
                    {t}
                  </h3>
                  <small>{tag}</small>
                </header>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="note">
          Air Zone is not described as manufacturer-authorised unless the
          business confirms that status.
        </p>
      </div>
    </section>
  );
}
const S = [
  [
    "01",
    "Inspect",
    "Assessment",
    "Understand the reported concern and assess the vehicle.",
    "Output: findings noted",
  ],
  [
    "02",
    "Explain",
    "Communication",
    "Communicate findings and recommended work in straightforward language.",
    "Output: plain-language summary",
  ],
  [
    "03",
    "Approve",
    "Consent",
    "Confirm the agreed scope, and any additional cost, before proceeding.",
    "Output: agreed scope of work",
  ],
];
export function Inspection() {
  return (
    <section className="bs-sec">
      <div className="container">
        <SecHead n="04" title="Inspection & communication" tag="Transparency" />
        <Lines as="h2" lines={["Clear inspections.", "Informed decisions."]} />
        <p className="bs-ital">
          “Trust is built when every recommendation has a reason.”
        </p>
        <Reveal>
          <p className="lead narrow">
            A clear service process helps customers understand their vehicle's
            needs. Inspection findings, recommended repairs, and potential
            additional costs should be explained in straightforward language so
            customers can make informed decisions before work proceeds.
          </p>
        </Reveal>
        <div className="bs-steps">
          {S.map(([n, t, tag, d, out], i) => (
            <Reveal as="article" className="step" key={n} delay={i * 0.12}>
              <header>
                <span>Step {n}</span>
                <span>{tag}</span>
              </header>
              <h3>{t}</h3>
              <p>{d}</p>
              <footer>{out}</footer>
            </Reveal>
          ))}
        </div>
        <p className="note">
          Intended service approach — the business should confirm this reflects
          its actual process before publication.
        </p>
      </div>
    </section>
  );
}
const C = [
  ["A", "Service schedule", "Follow the appropriate service schedule."],
  ["B", "Fluids & filters", "Check fluids and filters as required."],
  ["C", "Tyres, brakes & suspension", "Monitor tyres, brakes, and suspension."],
  ["D", "Warning signs", "Pay attention to warning lights and unusual noises."],
  [
    "E",
    "AC & electrical",
    "Inspect the AC and electrical systems when necessary.",
  ],
  [
    "F",
    "Act by urgency",
    "Address identified issues according to their urgency.",
  ],
];
export function Preventive() {
  return (
    <section className="bs-sec alt">
      <div className="container">
        <SecHead
          n="05"
          title="Preventive maintenance"
          tag="Proactive stewardship"
        />
        <div className="bs-prev">
          <div>
            <Lines
              as="h2"
              lines={["Care today.", "Prepare for every drive."]}
            />
            <Reveal>
              <p className="lead">
                Regular maintenance helps monitor vehicle condition and identify
                service needs before they become more complicated. Following
                appropriate maintenance schedules, checking essential systems,
                and addressing warning signs promptly can help support vehicle
                reliability and informed ownership.
              </p>
            </Reveal>
            <div className="sys">
              {C.map(([k, t, d], i) => (
                <Reveal as="div" className="item" key={k} delay={i * 0.06}>
                  <header>
                    <small>[{k}]</small>
                    <small>SYS-0{i + 1}</small>
                  </header>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal as="aside" className="persp" delay={0.15}>
            <small className="label">Editorial perspective</small>
            <h3>A more thoughtful approach to ownership</h3>
            <ol className="pts">
              <li>
                <b>Monitor condition.</b> Regular checks show how the vehicle is
                ageing.
              </li>
              <li>
                <b>Act on warning signs.</b> Early attention can keep issues
                simpler.
              </li>
              <li>
                <b>Plan ahead.</b> Maintenance planned around use supports
                informed ownership.
              </li>
            </ol>
            <p className="note">
              Maintenance supports reliability but cannot promise to prevent
              every breakdown.
            </p>
            <div className="row">
              <Link className="btn" to="/book-a-quote?service=preventive">
                Plan Maintenance
              </Link>
              <Link className="btn ghost" to="/services">
                Explore Services <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
