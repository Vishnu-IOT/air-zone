import { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import cfg from "../data/siteConfig.js";
import { scrollToTop } from "../lib/gsap.js";
const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.46 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42z" />
  </svg>
);
export default function FloatingActions() {
  const r = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 400));
  const num = cfg.whatsapp || "91" + cfg.phone; // WhatsApp number: set `whatsapp` in siteConfig.js to override the phone number
  const wa = "https://wa.me/" + num + "?text=" + encodeURIComponent("Hello Air Zone Automobile, I'd like to enquire about a service.");
  return (
    <>
      <motion.div className="topbar" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="fab-stack">
        <AnimatePresence>
          {show && (
            <motion.button
              key="top"
              type="button"
              className="fab fab-top"
              data-tip="Back to top"
              aria-label="Back to top"
              onClick={() => scrollToTop()}
              initial={{ scale: 0, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="ring" viewBox="0 0 52 52" aria-hidden="true">
                <circle className="ring-bg" cx="26" cy="26" r="23" />
                <motion.circle className="ring-fg" cx="26" cy="26" r="23" style={{ pathLength: progress }} />
              </svg>
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a className="fab fab-wa" href={wa} target="_blank" rel="noopener noreferrer" data-tip="Chat on WhatsApp" aria-label="Chat on WhatsApp"
          initial={r ? false : { scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.5 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
          {!r && <span className="pulse" aria-hidden="true" />}
          <WaIcon />
        </motion.a>
        <motion.a className="fab fab-call" href={"tel:+91" + cfg.phone} data-tip="Call us" aria-label={"Call Air Zone Automobile on " + cfg.phone}
          initial={r ? false : { scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.65 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
          {!r && <span className="pulse" aria-hidden="true" />}
          <motion.span className="ph-ico" animate={r ? {} : { rotate: [0, -16, 14, -10, 8, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3.2 }}>
            <Phone size={20} />
          </motion.span>
        </motion.a>
      </div>
    </>
  );
}
