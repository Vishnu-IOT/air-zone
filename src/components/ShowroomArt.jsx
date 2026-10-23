// Region highlights for the Interactive Showroom, drawn in the car image's pixel space (SHOWROOM_CAR.width × height).
// The X-ray detail itself now comes from the real skeleton render; these outlines only mark the active system.
// Replace any of them by setting `overlay` on a stage in src/data/showroom.js.
const Brakes = () => (
  <>
    <ellipse className="vx-ln vx-fl vx-strong" cx="834" cy="522" rx="74" ry="116" />
    <ellipse className="vx-ln vx-thin" cx="834" cy="522" rx="96" ry="138" />
    <ellipse className="vx-ln vx-thin" cx="834" cy="522" rx="26" ry="40" />
  </>
);
const Engine = () => (
  <path className="vx-ln vx-fl vx-strong" d="M300 292L470 246 700 282 690 352 470 372 312 346z" />
);
const Suspension = () => (
  <>
    <ellipse className="vx-ln vx-fl vx-strong" cx="738" cy="430" rx="84" ry="100" />
    <path className="vx-ln vx-thin vx-dash" d="M834 522L640 470M834 540L650 560" />
  </>
);
const Electrical = () => (
  <>
    <ellipse className="vx-ln vx-fl vx-strong" cx="470" cy="378" rx="190" ry="62" transform="rotate(-6 470 378)" />
    <path className="vx-ln vx-thin vx-dash" d="M300 400L260 330M640 360L700 300" />
  </>
);
const Chassis = () => (
  <>
    <path className="vx-ln vx-fl vx-strong" d="M870 540L1290 478 1302 522 886 590z" />
    <path className="vx-ln vx-thin vx-dash" d="M120 560C300 600 520 606 640 580" />
  </>
);
const Body = () => (
  <>
    <path className="vx-ln vx-fl" d="M150 262L470 226 760 286 690 330 330 362z" />
    <path className="vx-ln vx-fl vx-strong" d="M850 300L1050 330 1045 452 860 432z" />
    <path className="vx-ln vx-fl vx-strong" d="M1052 332L1196 346 1190 432 1047 452z" />
  </>
);

export const ART = { brakes: Brakes, engine: Engine, suspension: Suspension, electrical: Electrical, chassis: Chassis, body: Body };
