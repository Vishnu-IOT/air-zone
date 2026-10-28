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
  Journey,
  VehicleSpecific,
  Inspection,
  Preventive,
} from "../components/AboutSections.jsx";
import Folio from "../components/Folio.jsx";
import cfg from "../data/siteConfig.js";
import { services } from "../data/services.js";
const cta = (
  <Link className="btn" to="/book-a-quote">
    Book a Service
  </Link>
);
export const About = () => (
  <div className="bs">
    {/* <Folio top /> */}
    <AboutHero />
    <OwnerSection />
    <Journey />
    <VehicleSpecific />
    <Inspection />
    <Preventive />
    <CtaBanner />
    {/* <Folio /> */}
  </div>
);
export { default as Gallery } from "./Gallery.jsx";

export const BookQuote = () => (
  <section className="page">
    <div className="container section">
      <p className="label">Book a Service</p>
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
export { default as Contact } from "./Contact.jsx";
