import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, User, ArrowUpRight } from "lucide-react";
import Form from "../components/Form.jsx";
import Lines from "../components/Lines.jsx";
import Reveal from "../components/Reveal.jsx";
import SmartImage from "../components/SmartImage.jsx";
import cfg from "../data/siteConfig.js";
const q = encodeURIComponent(cfg.address);
const embed = `https://www.google.com/maps?q=${q}&output=embed`;
const open = `https://www.google.com/maps/search/?api=1&query=${q}`;
export default function Contact() {
  return (
    <>
      <section className="chero">
        <SmartImage
          className="chero-bg"
          src="/images/about/about-az.png"
          alt=""
          pos="center 55%"
        />
        <span className="intro3-shade" aria-hidden="true" />
        <span className="sweep-beam" aria-hidden="true" />
        <div className="container">
          <p className="label">Contact</p>
          <Lines as="h1" lines={["Let's talk about", "your car."]} />
          <p className="lead">
            Tell us what your vehicle needs. Contact Air Zone Automobile to
            discuss a service enquiry or request a quote.
          </p>
        </div>
      </section>
      <section className="section container cgrid">
        <Reveal className="cinfo2">
          <h2>Get in touch</h2>
          <ul className="clist">
            <li>
              <User size={18} />
              <div>
                <span>Contact person</span>
                <b>{cfg.contactPerson}</b>
              </div>
            </li>
            <li>
              <Phone size={18} />
              <div>
                <span>Phone</span>
                <a href={"tel:+91" + cfg.phone}>{cfg.phone}</a>
              </div>
            </li>
            <li>
              <Mail size={18} />
              <div>
                <span>Email</span>
                <a href={"mailto:" + cfg.email}>{cfg.email}</a>
              </div>
            </li>
            <li>
              <MapPin size={18} />
              <div>
                <span>Location</span>
                <b>{cfg.address}</b>
              </div>
            </li>
          </ul>
          <div className="row">
            <Link className="btn" to="/book-a-quote">
              Book a Quote
            </Link>
            {cfg.whatsapp && (
              <a className="btn ghost" href={"https://wa.me/" + cfg.whatsapp}>
                WhatsApp
              </a>
            )}
          </div>
          <p className="note">
            {cfg.hours}. For prices or appointments, use Book a Quote.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="cform">
          <h2>Send an enquiry</h2>
          <Form contact />
        </Reveal>
      </section>
      <section className="container section mapwrap">
        <Reveal>
          <div className="mapbar">
            <div>
              <p className="label">Find us</p>
              <h2>{cfg.address}</h2>
            </div>
            <a
              className="btn ghost"
              href={open}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="mapbox">
            <iframe
              title="Map showing Air Zone Automobile location"
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="note">
            The map searches the address above; the pin position has not been
            verified. If it does not load, use the “Open in Google Maps” link.
          </p>
        </Reveal>
      </section>
    </>
  );
}
