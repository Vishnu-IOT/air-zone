import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "./components/Layout.jsx";
import Footer from "./components/Footer.jsx";
import Splash from "./components/Splash.jsx";
import Cursor from "./components/Cursor.jsx";
import Home from "./pages/Home.jsx";
import { Services, ServiceDetails } from "./pages/ServicesPages.jsx";
import { About, Gallery, Contact, BookQuote, NotFound } from "./pages/Other.jsx";
// Quick silver wipe (about 0.75s) between pages. Lighter than the splash screen.
function PageWipe() {
  const { pathname } = useLocation();
  const r = useReducedMotion();
  const first = useRef(true);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!r) setK((n) => n + 1);
  }, [pathname, r]);
  if (!k) return null;
  return (
    <motion.div
      key={k}
      className="wipe"
      aria-hidden="true"
      initial={{ y: "100%" }}
      animate={{ y: ["100%", "0%", "0%", "-100%"] }}
      transition={{ duration: 0.75, times: [0, 0.4, 0.52, 1], ease: "easeInOut" }}
    >
      <img src="/images/branding/splash-screen-logo.png" alt="" />
    </motion.div>
  );
}
export default function App() {
  const { pathname } = useLocation();
  const r = useReducedMotion();
  const first = useRef(true);
  const delay = first.current || r ? 0 : 0.32;
  useEffect(() => { first.current = false; }, []);
  return (
    <>
      <Splash />
      <PageWipe />
      <Cursor />
      <Navbar />
      <motion.main key={pathname} initial={r ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay }}>
        <Routes>
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
    </>
  );
}
