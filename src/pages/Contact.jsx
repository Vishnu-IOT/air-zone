import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, User, ArrowUpRight } from "lucide-react";
import Form from "../components/Form.jsx";
import Lines from "../components/Lines.jsx";
import Reveal from "../components/Reveal.jsx";
import SmartImage from "../components/SmartImage.jsx";
import cfg from "../data/siteConfig.js";
const q = encodeURIComponent(cfg.address);
const embed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.086357937416!2d76.6922130766534!3d10.769326752324712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86ddf8f5d72b9%3A0x8ce675a472e84df5!2sAir%20Zone!5e0!3m2!1sen!2sin!4v1792662695138!5m2!1sen!2sin`;
const open = `https://www.google.com/maps/place/Air+Zone/@10.7693268,76.6922131,17z/data=!4m6!3m5!1s0x3ba86ddf8f5d72b9:0x8ce675a472e84df5!8m2!3d10.7694767!4d76.6918143!16s%2Fg%2F11g0zqp418?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D`;
export default function Contact() {
  return (
    <>
      <section className="chero">
        <SmartImage
          className="chero-bg"
          src="/images/hero/contact.png"
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
            discuss a service enquiry or request a service.
          </p>
        </div>
      </section>
      <section className="section container cgrid">
        <Reveal variant="left" className="cinfo2">
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
              Book a Service
            </Link>
            {cfg.whatsapp && (
              <a className="btn ghost" href={"https://wa.me/" + cfg.whatsapp}>
                WhatsApp
              </a>
            )}
          </div>
          <p className="note">
            {cfg.hours}. For prices or appointments, use Book a Service.
          </p>
        </Reveal>
        <Reveal variant="right" delay={0.1} className="cform">
          <h2>Send an enquiry</h2>
          <Form contact />
        </Reveal>
      </section>
      <section className="container section mapwrap">
        <Reveal variant="zoom">
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
