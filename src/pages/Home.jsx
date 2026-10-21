import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import SmartImage from "../components/SmartImage.jsx";
import { Faq, Reviews, CtaBanner } from "../components/Extras.jsx";
import AboutCompany from "../components/AboutCompany.jsx";
import Intro from "../components/Intro.jsx";
import CarFeature from "../components/CarFeature.jsx";
import TeamSection from "../components/TeamSection.jsx";
import BrandCarousel from "../components/BrandCarousel.jsx";
import { services } from "../data/services.js";
import { homeFaqs, whyPoints } from "../data/content.js";
import Lines from "../components/Lines.jsx";
import { ArrowUpRight } from "lucide-react";
const pick = (s) => services.find((x) => x.slug === s);
const big = pick("ac-repair");
const rest = [
  "general-service",
  "diagnostics",
  "engine-performance",
  "brakes",
  "preventive",
]
  .map(pick)
  .filter(Boolean);
// const steps = [
//   ["Request an appointment", "Send a quote request online."],
//   ["Share details", "Tell us your vehicle and the service you need."],
//   [
//     "Inspection & estimate",
//     "Receive findings and an estimate after assessment.",
//   ],
//   ["Approve the work", "Recommended work proceeds only once you agree."],
//   ["Collect your vehicle", "Pick up after the service is complete."],
// ];
export default function Home() {
  const r = useReducedMotion();
  const a = (d) =>
    r
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: d },
        };
  return (
    <>
      <section className="hero">
        {/* <SmartImage
          className="hero-img"
          src="/images/hero/hero.jpg"
          alt="Black luxury sedan in a dark studio"
          eager
        /> */}

        <video
          className="hero-img"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/images/hero/hero.png"
        >
          <source src="/images/hero/hero.mp4" type="video/mp4" />
          Your browser does not support the video element.
        </video>

        <div className="container hero-in">
          <motion.p className="label" {...a(0.1)}>
            Air Zone Automobile · Premium Car Care
          </motion.p>
          <motion.h1 {...a(0.2)}>
            Precision care.
            <br />
            Exceptional drives.
          </motion.h1>
          <motion.p className="lead" {...a(0.35)}>
            From routine maintenance to advanced diagnostics and luxury car AC
            repair, Air Zone Automobile helps you care for your vehicle with
            precision and attention to detail.
          </motion.p>
          <motion.div className="row" {...a(0.5)}>
            <Link className="btn" to="/book-a-quote">
              Book a Service
            </Link>
            <Link className="btn ghost" to="/services">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>
      <div className="strip">
        <div className="container">
          {[
            "Routine & Preventive Maintenance",
            "Advanced Vehicle Diagnostics",
            "Automotive AC Repair",
            "Transparent Service Estimates",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <AboutCompany />
      <TeamSection />
      <BrandCarousel />
      <Intro />
      {/* <CarFeature /> */}
      <section className="section container fs fs-carfeat">
        <Reveal>
          <p className="label">Featured services</p>
          {/* <Lines as="h2" lines={["Precision care for", "every drive."]} /> */}
          <Lines as="h2" lines={["Precision care for", "every drive."]} />
          <p className="lead">
            From scheduled maintenance to specialist diagnostics and AC repair,
            explore the services designed to help care for your vehicle.
          </p>
        </Reveal>
        <div className="fs-grid">
          <Reveal className="fs-big">
            <Link to={"/services/" + big.slug} data-cursor="View">
              <SmartImage src={big.image} alt={big.title} />
              <div className="fs-over">
                <span className="label">Signature · {big.category}</span>
                <h3>{big.title}</h3>
                <p>{big.short}</p>
                <span className="more">
                  Explore service <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
          <ol className="fs-list">
            {rest.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.07}>
                <Link to={"/services/" + s.slug} data-cursor="View">
                  <SmartImage src={s.image} alt={s.title} />
                  <div>
                    <span className="label">
                      0{i + 2} · {s.category}
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                  </div>
                  <ArrowUpRight size={18} />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="row center">
          <Link className="btn ghost" to="/services">
            View all services
          </Link>
        </div>
      </section>
      <section className="why">
        <div className="container section">
          <Reveal>
            <p className="label">Why choose Air Zone</p>
            <h2>Care that goes beyond the drive.</h2>
            <p className="note">
              Proposed service standards — owner to confirm before publishing.
            </p>
          </Reveal>
          <ol className="whylist">
            {whyPoints.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06}>
                <b>0{i + 1}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <Reviews />
      {/* <section className="section container">
        <Reveal>
          <p className="label">Process</p>
          <h2>How it works</h2>
        </Reveal>
        <ol className="steps five">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.07}>
              <b>0{i + 1}</b>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </ol>
        <p className="note">
          Adapt to the actual business process before publication.
        </p>
      </section> */}
      <section className="section container narrow">
        <Reveal>
          <p className="label">FAQ</p>
          <h2>Good questions.</h2>
        </Reveal>
        <Faq items={homeFaqs} />
      </section>
      <CtaBanner />
    </>
  );
}
