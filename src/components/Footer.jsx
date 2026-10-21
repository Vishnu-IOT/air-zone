import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import cfg from "../data/siteConfig.js";
import { bySlug } from "../data/services.js";
import Reveal from "./Reveal.jsx";
const nav = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];
export default function Footer() {
  const sv = [
    "general-service",
    "diagnostics",
    "ac-repair",
    "brakes",
    "preventive",
  ].map(bySlug);
  const soc = Object.entries(cfg.social).filter(([, u]) => u);
  return (
    <>
      <footer className="footer site-footer">
        <img
          className="site-footer__bg"
          src="/images/branding/footer-bg.png"
          alt=""
          aria-hidden="true"
        />
        <Reveal className="container fgrid">
          <div>
            <img
              src="/images/logo.png"
              alt="Air Zone Automobile"
              className="flogo"
            />
            <p>
              Servicing, computer diagnostics and car AC repair for luxury and
              premium vehicles.
            </p>
            {soc.length > 0 && (
              <div className="row">
                {soc.map(([n, u]) => (
                  <a key={n} href={u} rel="noopener noreferrer" target="_blank">
                    {n}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4>Explore</h4>
            {nav.map(([t, l]) => (
              <Link key={t} to={t}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h4>Our services</h4>
            {sv.map((s) => (
              <Link key={s.slug} to={"/services/" + s.slug}>
                {s.title}
              </Link>
            ))}
            <Link to="/book-a-quote" className="flink">
              Book a quote →
            </Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <Phone size={14} /> {cfg.phone || "Phone: to be added"}
            </p>
            <p>
              <Mail size={14} /> {cfg.email || "Email: to be added"}
            </p>
            <p>
              <MapPin size={14} /> {cfg.address || "Address: to be added"}
            </p>
            <p>
              <Clock size={14} /> {cfg.hours}
            </p>
            {cfg.whatsapp && (
              <a href={"https://wa.me/" + cfg.whatsapp}>WhatsApp us</a>
            )}
          </div>
        </Reveal>
        <div className="copy">
          <span>© {new Date().getFullYear()} {cfg.name}. All rights reserved.</span>
          <span>
            Designed &amp; developed by{" "}
            {cfg.developer.url ? (
              <a href={cfg.developer.url} target="_blank" rel="noopener noreferrer">{cfg.developer.name}</a>
            ) : (
              <b>{cfg.developer.name}</b>
            )}
          </span>
        </div>
      </footer>
    </>
  );
}
