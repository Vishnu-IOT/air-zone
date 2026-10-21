import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import cfg from "../data/siteConfig.js";
import { services } from "../data/services.js";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/gallery", "Gallery"],
  ["/contact", "Contact"],
];
export function Navbar() {
  const [s, setS] = useState(false),
    [o, setO] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const f = () => setS(scrollY > 20);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    setO(false);
  }, [pathname]);
  // Lock page scroll while the mobile menu is open; close on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!o) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setO(false);
    const mq = matchMedia("(min-width: 901px)");
    const onMq = () => mq.matches && setO(false);
    addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [o]);
  return (
    <>
      <header className={"nav" + (s ? " scrolled" : "") + (o ? " open" : "")}>
        <div className="nav-in container">
          <Link to="/" className="brand" aria-label="Air Zone Automobile home">
            <img src="/images/logo.png" alt="Air Zone Automobile" />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {links.map(([t, l]) => (
              <NavLink key={t} to={t} end={t === "/"}>
                {l}
              </NavLink>
            ))}
          </nav>
          <Link className="btn btn-sm nav-cta" to="/book-a-quote">
            Book a Quote
          </Link>
          <button
            className="burger"
            aria-label={o ? "Close menu" : "Open menu"}
            aria-expanded={o}
            aria-controls="mobile-menu"
            onClick={() => setO(!o)}
          >
            {o ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {/* Rendered outside <header>: the header's backdrop-filter would otherwise trap this fixed menu inside the 72px bar. */}
      <AnimatePresence>
        {o && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(([t, l]) => (
              <NavLink key={t} to={t} end={t === "/"} onClick={() => setO(false)}>
                {l}
              </NavLink>
            ))}
            <Link className="btn" to="/book-a-quote" onClick={() => setO(false)}>
              Book a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
