// Region highlights for the Interactive Showroom, drawn in the PICTURE's own pixel space (car.png: 1536 × 1024).
// Showroom.jsx places them with SHOWROOM_FIT, so these numbers can be read straight off the image.
// The X-ray detail itself comes from the real skeleton render; these outlines only mark the active system.
// Replace any of them by setting `overlay` on a stage in src/data/showroom.js.
const Ac = () => (
  <>
    {/* A/C condenser core in front of the radiator, behind the lower bumper */}
    <rect className="vx-ln vx-fl vx-strong" x="208" y="652" width="170" height="76" rx="6" />
    <path className="vx-ln vx-thin vx-dash" d="M216 672H370M216 690H370M216 708H370" />
    <path className="vx-ln vx-thin vx-dash" d="M378 690C410 684 436 664 462 640" />
  </>
);
const Brakes = () => (
  <>
    {/* front brake disc + caliper behind the alloy */}
    <ellipse className="vx-ln vx-fl vx-strong" cx="778" cy="666" rx="34" ry="68" transform="rotate(-4 778 666)" />
    <ellipse className="vx-ln vx-thin" cx="778" cy="666" rx="50" ry="90" transform="rotate(-4 778 666)" />
    <ellipse className="vx-ln vx-thin" cx="800" cy="672" rx="12" ry="22" />
  </>
);
const Electrical = () => (
  <>
    {/* headlamp assembly + its wiring */}
    <ellipse className="vx-ln vx-fl vx-strong" cx="602" cy="530" rx="108" ry="38" transform="rotate(-9 602 530)" />
    <path className="vx-ln vx-thin vx-dash" d="M500 548C540 566 640 562 706 524M520 512C570 494 650 490 706 508" />
  </>
);
const Ecu = () => (
  <>
    {/* engine control module / connector block on the bulkhead side of the engine bay */}
    <rect className="vx-ln vx-fl vx-strong" x="590" y="410" width="80" height="44" rx="6" />
    <path className="vx-ln vx-thin vx-dash" d="M590 432H540M670 432H716M630 410V380M630 454V486" />
  </>
);
const Obd = () => (
  <>
    {/* diagnostic socket under the dash, below the steering column */}
    <circle className="vx-ln vx-fl vx-strong" cx="835" cy="386" r="20" />
    <circle className="vx-ln vx-thin" cx="835" cy="386" r="36" />
    <path className="vx-ln vx-thin vx-dash" d="M800 386H770M870 386H902" />
  </>
);
const Oil = () => (
  <>
    {/* oil filler cap on the engine cover */}
    <ellipse className="vx-ln vx-fl vx-strong" cx="497" cy="471" rx="38" ry="18" />
    <path className="vx-ln vx-thin vx-dash" d="M497 453V420M459 471H420M535 471H574" />
  </>
);

export const ART = { ac: Ac, brakes: Brakes, electrical: Electrical, ecu: Ecu, obd: Obd, oil: Oil };
