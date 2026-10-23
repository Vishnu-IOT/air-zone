// Interactive Showroom — content + geometry.
// All coordinates are NORMALIZED (0–1) against the vehicle image frame, so hotspots, connectors and overlays
// scale with the car on every screen size. Re-measure them if you swap the images.

// Base car (transparent cutout) + its skeleton / X-ray render. BOTH files must share the same frame size and
// alignment (car-skeleton.webp was registered onto car.webp). Frame size = real pixel size of the files.
export const SHOWROOM_CAR = {
  src: "/images/showroom/car.png",
  skeleton: "/images/showroom/car-skeleton.png",
  width: 1536,
  height: 780,
  contactY: 0.865, // where the tyres meet the floor (drives the reflection + platform)
  alt: "Luxury sedan displayed in the Air Zone virtual showroom",
  skeletonAlt: "",
};

export const SHOWROOM_STAGES = [
  {
    id: "brakes",
    number: "01",
    title: "Braking System",
    tag: "Disc · Pads · Caliper",
    description:
      "Explore the components responsible for controlled deceleration, from brake discs and pads to the surrounding braking hardware.",
    hotspot: { x: 0.54, y: 0.665 },
    label: { x: 0.6, y: 0.79, side: "right" },
    overlay: null, // optional per-system transparent PNG/WebP, same frame as the car
  },
  {
    id: "engine",
    number: "02",
    title: "Engine & ECU",
    tag: "Engine bay · Control unit",
    description:
      "Discover the systems involved in engine operation, electronic control, and diagnostic monitoring.",
    hotspot: { x: 0.34, y: 0.385 },
    label: { x: 0.24, y: 0.12, side: "left" },
    overlay: null,
  },
  {
    id: "suspension",
    number: "03",
    title: "Suspension & Steering",
    tag: "Strut · Wishbones · Rack",
    description:
      "Explore the components that support vehicle stability, wheel movement, steering response, and ride comfort.",
    hotspot: { x: 0.485, y: 0.545 },
    label: { x: 0.34, y: 0.72, side: "right" },
    overlay: null,
  },
  {
    id: "electrical",
    number: "04",
    title: "Electrical Systems",
    tag: "Battery · Wiring · Alternator",
    description:
      "Discover the electrical architecture that supports starting, charging, lighting, sensors, and vehicle electronics.",
    hotspot: { x: 0.286, y: 0.474 },
    label: { x: 0.15, y: 0.22, side: "left" },
    overlay: null,
  },
  {
    id: "chassis",
    number: "05",
    title: "Underbody & Chassis",
    tag: "Rails · Cross-members · Shields",
    description:
      "Explore the structural and underbody components that support the vehicle and protect important mechanical systems.",
    hotspot: { x: 0.677, y: 0.59 },
    label: { x: 0.79, y: 0.66, side: "right" },
    overlay: null,
  },
  {
    id: "body",
    number: "06",
    title: "Body & Paint",
    tag: "Panels · Doors · Finish",
    description:
      "Examine the exterior surfaces, body panels, and finishes that contribute to the vehicle's appearance and protection.",
    hotspot: { x: 0.729, y: 0.41 },
    label: { x: 0.77, y: 0.03, side: "right" },
    overlay: null,
  },
];
