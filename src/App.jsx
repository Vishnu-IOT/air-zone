import { useEffect, useRef, useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "./components/Layout.jsx";
import Footer from "./components/Footer.jsx";
import Splash from "./components/Splash.jsx";
import Cursor from "./components/Cursor.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import GsapEffects from "./components/GsapEffects.jsx";
import FloatingActions from "./components/FloatingActions.jsx";
import { scrollToTop } from "./lib/gsap.js";
import Home from "./pages/Home.jsx";
import { Services, ServiceDetails } from "./pages/ServicesPages.jsx";
import { About, Gallery, Contact, BookQuote, NotFound } from "./pages/Other.jsx";
// Quick silver wipe between pages.
function PageWipe({ pathname }) {
  const r = useReducedMotion();
  const first = useRef(true);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!r) setK((n) => n + 1);
  }, [pathname, r]);
  if (!k) return null;
  return (
    <motion.div key={k} className="wipe" aria-hidden="true" initial={{ y: "100%" }} animate={{ y: ["100%", "0%", "0%", "-100%"] }} transition={{ duration: 0.75, times: [0, 0.4, 0.52, 1], ease: "easeInOut" }}>
      <img src="/images/branding/splash-screen-logo.png" alt="" />
    </motion.div>
  );
}
export default function App() {
  const location = useLocation();
  const r = useReducedMotion();
  // The page is only mounted once the splash starts leaving, and a new route only mounts while the wipe covers the screen.
  // That way scroll reveals play when you actually see/scroll to a section, not behind the splash or wipe.
  const [entered, setEntered] = useState(false);
  const [shown, setShown] = useState(location);
  const onLeave = useCallback(() => setEntered(true), []);
  useEffect(() => {
    if (location === shown) return;
    if (location.pathname === shown.pathname || r) { setShown(location); return; }
    const t = setTimeout(() => { scrollToTop(true); setShown(location); }, 360);
    return () => clearTimeout(t);
  }, [location, shown, r]);
  return (
    <>
      <Splash onLeave={onLeave} />
      <PageWipe pathname={location.pathname} />
      <Cursor />
      <SmoothScroll />
      <Navbar />
      {entered && (
        <>
          <motion.main key={shown.pathname} initial={r ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Routes location={shown}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-a-quote" element={<BookQuote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
          <Footer />
          <GsapEffects page={shown.pathname} />
          <FloatingActions />
        </>
      )}
    </>
  );
}
