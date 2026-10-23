import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ScanSearch } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import Lines from "./Lines.jsx";
import Reveal from "./Reveal.jsx";
import { ART } from "./ShowroomArt.jsx";
import { SHOWROOM_CAR as CAR, SHOWROOM_STAGES as STAGES } from "../data/showroom.js";

// Interactive Showroom / Vehicle Explorer.
// Ownership: GSAP owns everything inside the pinned scene (hotspots, connectors, overlays, panels, camera, X-ray reveal, progress bar).
// Framer Motion owns only the intro copy above the scene. React state only holds the active index (for the HUD text / aria),
// and it changes six times per pass, not per scroll frame.
const N = STAGES.length;
const GHOST = 0; // idle opacity of inactive technical overlays
const pad = (n) => String(n).padStart(2, "0");
const pct = (v) => (v * 100).toFixed(2) + "%";

export default function Showroom() {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const trig = useRef(null);
  const live = useRef(0);
  const [active, setActive] = useState(0);
  const W = CAR.width, H = CAR.height;

  // Smooth-scrolls to the middle of a stage (Lenis when present). Only used by prev/next/dots.
  const goTo = useCallback(
    (i) => {
      const next = Math.max(0, Math.min(N - 1, i));
      const st = trig.current;
      if (reduce || !st) { live.current = next; setActive(next); return; }
      const y = st.start + ((next + 0.5) / N) * (st.end - st.start);
      const l = window.__lenis;
      if (l) l.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [reduce]
  );

  useEffect(() => {
    if (reduce) return; // static, non-pinned fallback (see .vx--static in showroom.css)
    const el = root.current;
    const mm = gsap.matchMedia();
    mm.add(
      { wide: "(min-width: 861px)", narrow: "(max-width: 860px)" },
      (ctx) => {
        const narrow = ctx.conditions.narrow;
        const q = (s) => el.querySelectorAll(s);
        const one = (s) => el.querySelector(s);
        const scene = one(".vx-scene"), frame = one(".vx-frame"), cam = one(".vx-cam"), xray = one(".vx-xray");
        const sys = q(".vx-sys"), hot = q(".vx-hot"), con = q(".vx-con path"), chip = q(".vx-chip"), info = q(".vx-info");
        const bar = one(".vx-bar i");

        // Camera: gently pushes toward the active hotspot. On phones/tablets the zoom adapts to the room left above the panel
        // so the car always fills its area; it is re-evaluated on every ScrollTrigger refresh (resize / rotation).
        const WIDE_S = [1.12, 1.18, 1.14, 1.16, 1.0, 1.06];
        const k = narrow ? 0.95 : 0.45;
        const scaleFor = (i) =>
          narrow ? Math.max(1.5, Math.min(2.4, (frame.clientHeight / cam.offsetHeight) * 0.92)) : WIDE_S[i];
        const camFor = (i) => () => {
          const fw = frame.clientWidth, fh = frame.clientHeight, lw = cam.offsetWidth, lh = cam.offsetHeight;
          const s = scaleFor(i), h = STAGES[i].hotspot;
          let x = (1 - k) * (fw - lw * s) / 2 + k * (fw / 2 - h.x * lw * s);
          let y = (1 - k) * (fh - lh * s) / 2 + k * (fh * (narrow ? 0.5 : 0.46) - h.y * lh * s);
          // keep the picture covering the frame horizontally when zoomed beyond it
          if (lw * s > fw) x = Math.min(0, Math.max(fw - lw * s, x));
          return { x, y, scale: s };
        };
        const camX = (i) => () => camFor(i)().x, camY = (i) => () => camFor(i)().y, camS = (i) => () => scaleFor(i);
        const rev = (i) => ({ "--hx": pct(STAGES[i].hotspot.x), "--hy": pct(STAGES[i].hotspot.y) });

        gsap.set(cam, { transformOrigin: "0 0", x: camX(0), y: camY(0), scale: camS(0) });
        gsap.set(sys, { opacity: GHOST });
        gsap.set(hot, { opacity: 0, scale: 0.6 });
        gsap.set(chip, { opacity: 0, x: (i) => (STAGES[i].label.side === "left" ? 14 : -14) });
        gsap.set(con, { strokeDashoffset: 1 });
        gsap.set(info, { opacity: 0, y: 18 });
        gsap.set(xray, { ...rev(0), opacity: 0 });
        gsap.set(bar, { scaleX: 1 / N, transformOrigin: "0 50%" });
        // stage 01 is already on when the scene pins
        gsap.set([sys[0], hot[0], chip[0], info[0]], { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(con[0], { strokeDashoffset: 0 });
        gsap.set(xray, { opacity: 0.9 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.set(cam, { x: camX(0), y: camY(0), scale: camS(0) }, 0); // re-measured on every refresh (resize / rotation)
        for (let i = 0; i < N; i++) {
          if (i > 0) {
            const t = i - 0.1;
            tl.to(cam, { x: camX(i), y: camY(i), scale: camS(i), duration: 0.7, ease: "power2.inOut" }, i - 0.25);
            tl.to(xray, { ...rev(i), duration: 0.6, ease: "power2.inOut" }, i - 0.25);
            tl.to(sys[i], { opacity: 1, duration: 0.3 }, t)
              .to(hot[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t)
              .to(con[i], { strokeDashoffset: 0, duration: 0.35, ease: "power1.inOut" }, t + 0.1)
              .to(chip[i], { opacity: 1, x: 0, duration: 0.3 }, t + 0.25)
              .to(info[i], { opacity: 1, y: 0, duration: 0.3 }, t + 0.05);
          }
          if (i < N - 1) {
            const o = i + 0.8;
            tl.to(sys[i], { opacity: GHOST, duration: 0.2 }, o)
              .to(hot[i], { opacity: 0, scale: 0.7, duration: 0.2 }, o)
              .to(con[i], { strokeDashoffset: 1, duration: 0.2, ease: "power1.in" }, o)
              .to(chip[i], { opacity: 0, duration: 0.15 }, o)
              .to(info[i], { opacity: 0, y: -14, duration: 0.2 }, o);
          }
        }
        tl.to(bar, { scaleX: 1, duration: N, ease: "none" }, 0);
        tl.to({}, { duration: 0.001 }, N - 0.001); // pin the timeline length to exactly N units

        const dist = () => window.innerHeight * (narrow ? 0.55 : 0.95) * N;
        const st = ScrollTrigger.create({
          trigger: scene,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(N - 1, Math.max(0, Math.floor(self.progress * N)));
            if (i !== live.current) { live.current = i; setActive(i); }
          },
        });
        trig.current = st;
        const imgs = el.querySelectorAll("img");
        const onLoad = () => ScrollTrigger.refresh();
        imgs.forEach((im) => { if (!im.complete) im.addEventListener("load", onLoad, { once: true }); });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
        return () => { trig.current = null; };
      },
      el
    );
    return () => mm.revert(); // kills the timeline + ScrollTrigger and removes the pin spacer (Strict-Mode safe)
  }, [reduce]);

  // Cursor X-ray lens: hovering the car reveals the skeleton view under the pointer.
  // Ownership: this effect alone drives --px/--py/--pr and the .vx-lens / .vx-ring classes (GSAP never touches them).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return; // touch: stage lens only
    const el = root.current;
    const frame = el.querySelector(".vx-frame"), cam = el.querySelector(".vx-cam");
    const lens = el.querySelector(".vx-lens"), ring = el.querySelector(".vx-ring"), hint = el.querySelector(".vx-hint");
    const smooth = !reduce;
    let tx = 0, ty = 0, cx = 0, cy = 0, inside = false, ticking = false;
    const apply = () => {
      cam.style.setProperty("--px", cx.toFixed(1) + "px");
      cam.style.setProperty("--py", cy.toFixed(1) + "px");
    };
    const tick = () => {
      cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25;
      apply();
    };
    const start = () => { if (!ticking && smooth) { ticking = true; gsap.ticker.add(tick); } };
    const stop = () => { if (ticking) { ticking = false; gsap.ticker.remove(tick); } };
    const local = (e) => {
      const r = cam.getBoundingClientRect(), k = r.width / cam.offsetWidth; // undo the camera scale
      return [(e.clientX - r.left) / k, (e.clientY - r.top) / k, cam.offsetWidth, cam.offsetHeight];
    };
    const show = (on) => {
      if (on === inside) return;
      inside = on;
      lens.classList.toggle("is-on", on); ring.classList.toggle("is-on", on);
      if (on) hint && hint.classList.add("is-gone");
    };
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const [x, y, w, h] = local(e);
      const on = x >= 0 && y >= 0 && x <= w && y <= h;
      if (on) {
        cam.style.setProperty("--pr", Math.round(w * 0.105) + "px");
        if (!inside) { cx = x; cy = y; } // appear exactly under the cursor
        tx = x; ty = y;
        if (smooth) start(); else { cx = x; cy = y; apply(); }
      }
      show(on);
    };
    const leave = () => { show(false); stop(); };
    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerleave", leave);
    return () => {
      frame.removeEventListener("pointermove", move);
      frame.removeEventListener("pointerleave", leave);
      stop();
    };
  }, [reduce]);

  const cur = STAGES[active];
  return (
    <section ref={root} id="vehicle-explorer" className={"vx" + (reduce ? " vx--static" : "")} aria-labelledby="vx-h">
      {/* <div className="vx-intro container">
        <Reveal variant="up">
          <p className="label">Interactive vehicle experience</p>
        </Reveal>
        <Lines as="h2" className="vx-title" lines={["See beyond", "the surface."]} />
        <Reveal variant="blur" delay={0.2}>
          <p className="lead" id="vx-h">
            Step inside the engineering of a modern vehicle. Explore its essential systems through an immersive visual
            experience designed to reveal what lies beneath the surface.
          </p>
        </Reveal>
      </div> */}

      <div className="vx-scene" role="group" aria-roledescription="vehicle explorer" aria-label="Interactive vehicle systems explorer">
        <div className="vx-room" aria-hidden="true">
          <span className="vx-spot" />
          <span className="vx-grid" />
          <span className="vx-floorglow" />
        </div>

        <p className="vx-hint" aria-hidden="true">
          <ScanSearch size={15} /> Hover over the car to reveal the skeleton view
        </p>

        <div className="vx-frame">
          <div className="vx-cam" style={{ aspectRatio: `${W} / ${H}`, "--cy": CAR.contactY }}>
            <span className="vx-plat" aria-hidden="true" />
            <img className="vx-refl" src={CAR.src} alt="" aria-hidden="true" width={W} height={H} draggable="false" />
            <img className="vx-car" src={CAR.src} alt={CAR.alt} width={W} height={H} draggable="false" />
            <img className="vx-xray" src={CAR.skeleton} alt="" aria-hidden="true" width={W} height={H} draggable="false" />
            <img className="vx-lens" src={CAR.skeleton} alt="" aria-hidden="true" width={W} height={H} draggable="false" />
            <span className="vx-ring" aria-hidden="true" />
            <span className="vx-scan" aria-hidden="true" />

            <svg className="vx-art" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
              {STAGES.map((s, i) => {
                const Art = ART[s.id];
                return (
                  <g key={s.id} className={"vx-sys" + (i === active ? " is-on" : "")} data-sys={s.id}>
                    {s.overlay ? <image href={s.overlay} x="0" y="0" width={W} height={H} /> : <Art />}
                  </g>
                );
              })}
              <g className="vx-con">
                {STAGES.map((s, i) => {
                  const hx = s.hotspot.x * W, hy = s.hotspot.y * H, lx = s.label.x * W, ly = s.label.y * H;
                  const ex = lx + (s.label.side === "left" ? 34 : -34);
                  return <path key={s.id} className={i === active ? "is-on" : undefined} d={`M${hx} ${hy}L${ex} ${ly}L${lx} ${ly}`} pathLength="1" strokeDasharray="1" strokeDashoffset="1" />;
                })}
              </g>
            </svg>

            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={"vx-chip vx-chip--" + s.label.side + (i === active ? " is-on" : "")}
                style={{ left: pct(s.label.x), top: pct(s.label.y) }}
                aria-hidden="true"
              >
                <b>{s.number}</b> {s.tag}
              </span>
            ))}
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={"vx-hot" + (i === active ? " is-on" : "")}
                style={{ left: pct(s.hotspot.x), top: pct(s.hotspot.y) }}
                aria-hidden="true"
              >
                <i className="vx-hot-ring" />
                <i className="vx-hot-dot">{s.number}</i>
              </span>
            ))}
          </div>
        </div>

        <div className="vx-hud">
          <div className="vx-infos" aria-live="polite" aria-atomic="true">
            {STAGES.map((s, i) => (
              <article key={s.id} className={"vx-info" + (i === active ? " is-on" : "")} aria-hidden={i !== active}>
                <p className="vx-info-n">
                  <span>{s.number}</span> System {s.number} of {pad(N)}
                </p>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
          <div className="vx-prog">
            <p className="vx-count" aria-hidden="true">
              <b>{pad(active + 1)}</b> / {pad(N)} — {cur.title}
            </p>
            <div className="vx-bar" aria-hidden="true"><i /></div>
            <div className="vx-ctrl">
              <button type="button" className="vx-btn" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous system">
                <ChevronLeft size={18} />
              </button>
              <ol className="vx-dots">
                {STAGES.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={"vx-dot" + (i === active ? " is-on" : "")}
                      onClick={() => goTo(i)}
                      aria-label={`Show ${s.title}`}
                      aria-current={i === active ? "step" : undefined}
                    />
                  </li>
                ))}
              </ol>
              <button type="button" className="vx-btn" onClick={() => goTo(active + 1)} disabled={active === N - 1} aria-label="Next system">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <span className="vx-end" aria-hidden="true" />
      </div>
    </section>
  );
}
