// Interactive Showroom — content + geometry.
// Hotspots, labels and overlays are authored in the REAL PIXELS of car.png (1536 × 1024) with the helper `at(x, y)` below,
// so you can read them straight off the picture in any image editor. `at()` converts them to the 0–1 frame the scene uses
// (the scene frame is 1536 × 780 and the 1536 × 1024 picture is letterboxed inside it, hence the conversion).
// If you swap the images, keep the same pixel size and re-measure the numbers.

// Base car (transparent cutout) + its skeleton / X-ray render. BOTH files must share the same pixel size AND be registered
// onto each other, so the same component sits at the same pixel in both. car-skeleton.png was registered onto car.png
// (front-end and front-wheel included), which is what makes a hotspot reveal the correct part.
export const SHOWROOM_CAR = {
  src: "/images/showroom/car.png",
  skeleton: "/images/showroom/car-skeleton.png",
  width: 1536, // scene frame (drives the layout)
  height: 780,
  imageWidth: 1536, // real pixel size of the two pictures
  imageHeight: 1024,
  contactY: 0.865, // where the tyres meet the floor (drives the reflection + platform)
  alt: "Luxury sedan displayed in the Air Zone virtual showroom",
  skeletonAlt: "",
};

// picture pixels -> scene frame (object-fit: contain, centred)
const _k = Math.min(SHOWROOM_CAR.width / SHOWROOM_CAR.imageWidth, SHOWROOM_CAR.height / SHOWROOM_CAR.imageHeight);
const _ox = (SHOWROOM_CAR.width - SHOWROOM_CAR.imageWidth * _k) / 2;
const _oy = (SHOWROOM_CAR.height - SHOWROOM_CAR.imageHeight * _k) / 2;
export const SHOWROOM_FIT = { transform: `translate(${_ox} ${_oy}) scale(${_k})` }; // for SVG overlays drawn in picture pixels
const at = (x, y) => ({
  x: +((_ox + x * _k) / SHOWROOM_CAR.width).toFixed(4),
  y: +((_oy + y * _k) / SHOWROOM_CAR.height).toFixed(4),
});

export const SHOWROOM_STAGES = [
  {
    id: "ac",
    number: "01",
    title: "AC Inspection & Repair",
    tag: "Condenser · Cooling check",
    description:
      "Check cooling performance, airflow and the climate-system components behind the front grille, then repair what the inspection finds.",
    hotspot: at(292, 690), // condenser core behind the lower bumper grille
    label: { ...at(430, 850), side: "right" },
    overlay: null, // optional per-system transparent PNG/WebP, same frame as the car
  },
  {
    id: "brakes",
    number: "02",
    title: "Brake Inspection",
    tag: "Disc · Pads · Caliper",
    description:
      "Inspect pad thickness, disc condition, brake fluid and the caliper hardware so stopping stays controlled and consistent.",
    hotspot: at(776, 668), // front brake disc / caliper
    label: { ...at(960, 850), side: "right" },
    overlay: null,
  },
  {
    id: "electrical",
    number: "03",
    title: "Electrical System Service",
    tag: "Battery · Wiring · Charging",
    description:
      "Test the battery and charging system and trace wiring or component faults behind starting, lighting and sensor problems.",
    hotspot: at(600, 530), // headlamp + wiring unit
    label: { ...at(340, 330), side: "left" },
    overlay: null,
  },
  {
    id: "ecu",
    number: "04",
    title: "ECU Reset & Diagnosis",
    tag: "Control unit · Fault reset",
    description:
      "Read stored faults from the engine control unit, find the cause, and reset or re-learn systems once the issue is dealt with.",
    hotspot: at(625, 432), // control-module connector block (bulkhead side of the engine bay)
    label: { ...at(600, 150), side: "left" },
    overlay: null,
  },
  {
    id: "obd",
    number: "05",
    title: "OBD Scanning",
    tag: "OBD-II port · Live data",
    description:
      "Connect through the diagnostic port under the dashboard to scan every module for fault codes and review live sensor data.",
    hotspot: at(835, 385), // under the steering column, below the wheel
    label: { ...at(1060, 140), side: "right" },
    overlay: null,
  },
  {
    id: "oil",
    number: "06",
    title: "Engine Oil Inspection",
    tag: "Oil level · Condition · Filter",
    description:
      "Check engine oil level and condition, look for leaks around the sump and filter, and confirm the correct grade for your engine.",
    hotspot: at(497, 471), // oil filler cap on the engine cover
    label: { ...at(340, 250), side: "left" },
    overlay: null,
  },
];
