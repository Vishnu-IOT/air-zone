import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import SmartImage from "../components/SmartImage.jsx";
import { Faq, Reviews } from "../components/Extras.jsx";
import AboutCompany from "../components/AboutCompany.jsx";
import Intro from "../components/Intro.jsx";
import CarFeature from "../components/CarFeature.jsx";
import TeamSection from "../components/TeamSection.jsx";
import { services } from "../data/services.js";
import { homeFaqs, whyPoints } from "../data/content.js";
const steps = [
  ["Request an appointment", "Send a quote request online."],
  ["Share details", "Tell us your vehicle and the service you need."],
  [
    "Inspection & estimate",
    "Receive findings and an estimate after assessment.",
  ],
  ["Approve the work", "Recommended work proceeds only once you agree."],
  ["Collect your vehicle", "Pick up after the service is complete."],
];
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
          poster="/images/hero/hero.jpg"
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
      <Intro />
      <CarFeature />
      <TeamSection />
      <section className="section container">
        <Reveal>
          <p className="label">Featured services</p>
          <h2>Engineered for every drive.</h2>
        </Reveal>
        <div className="feature">
          <Reveal className="fbig-card">
            <Link to={"/services/" + services[3].slug}>
              <SmartImage src={services[3].image} alt={services[3].title} />
              <div>
                <span className="label">Signature service</span>
                <h3>{services[3].title}</h3>
                <p>{services[3].overview}</p>
                <span className="more">Explore service →</span>
              </div>
            </Link>
          </Reveal>
          <div className="grid two">
            {[services[0], services[2], services[4], services[5]].map(
              (s, i) => (
                <ServiceCard key={s.slug} s={s} i={i} />
              ),
            )}
          </div>
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
      <section className="section container">
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
      </section>
      <section className="section container narrow">
        <Reveal>
          <p className="label">FAQ</p>
          <h2>Good questions.</h2>
        </Reveal>
        <Faq items={homeFaqs} />
      </section>
    </>
  );
}
