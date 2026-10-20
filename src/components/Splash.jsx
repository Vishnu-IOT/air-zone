import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// Shows on every page load/refresh. The panel wipes away from bottom to top.
export default function Splash() {
  const r = useReducedMotion();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), r ? 400 : 1900);
    return () => clearTimeout(t);
  }, [r]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
          role="presentation"
        >
          <div className="splash-mid">
            <motion.div
              className="splash-logo"
              initial={r ? false : { opacity: 0, y: 36, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <img src="/images/branding/splash-screen-logo.png" alt="Air Zone Automobile" />
              {!r && <span className="sweep" aria-hidden="true" />}
            </motion.div>
            {!r && (
              <motion.span
                className="splash-line"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
