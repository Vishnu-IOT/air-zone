// Single source of truth for services, durations and prices.
// price: null => shown as "Price to be confirmed". Set e.g. {min:1500,max:3000} ONLY once the owner confirms.
const img = (s) => `/images/services/${s}`; // drop a real photo with this name to replace the placeholder
// const S = (o) => ({ price: null, image: img(o.image), ...o });
const S = (o) => ({
  price: null,
  ...o,
  image: img(o.image),
});
export const services = [
  S({
    slug: "general-service",
    title: "General Car Service",
    image: "car-service.jpg",
    category: "Servicing",
    cta: "Book General Service",
    duration: "3–6 hours",
    short:
      "A structured service and inspection to keep your car running as its maker intended.",
    overview:
      "A general service combines scheduled maintenance with a multi-point inspection. The scope follows your vehicle’s service schedule, mileage and condition rather than a one-size-fits-all checklist.",
    why: "Regular servicing catches wear early, protects reliability and keeps maintenance records consistent, which also supports resale value.",
    symptoms: [
      "Service interval or mileage reached",
      "Warning or service reminder lights",
      "Reduced smoothness or economy",
      "Before a long trip or after a long idle period",
    ],
    checklist: [
      "Fluid levels and condition",
      "Belts, hoses and visible leaks",
      "Brakes, tyres and lights",
      "Scan for stored fault codes",
    ],
    includes: [
      "Scheduled maintenance items",
      "Filter and consumable replacement as needed",
      "Written findings and recommendations",
    ],
    steps: [
      "Vehicle intake and service history review",
      "Inspection and scheduled maintenance",
      "Findings explained and handover",
    ],
    faqs: [
      [
        "How often should I service my car?",
        "Follow the schedule in your owner’s manual, which depends on make, model, engine and driving conditions.",
      ],
      [
        "Will extra work be done without asking?",
        "Additional work should only proceed after you approve it.",
      ],
    ],
    related: ["oil-filter", "preventive", "engine-performance"],
  }),
  S({
    slug: "oil-filter",
    title: "Engine Oil & Filter Replacement",
    image: "oil filter.jpeg",
    category: "Servicing",
    cta: "Book Oil Service",
    duration: "45 min–1.5 hours",
    short:
      "Correct-specification engine oil and filter change for your engine.",
    overview:
      "Engine oil lubricates, cools and cleans internal parts. We replace oil and filter using the grade and specification your engine calls for.",
    why: "Using the wrong grade or leaving oil too long can accelerate engine wear, particularly in high-performance and turbocharged engines.",
    symptoms: [
      "Oil change interval reached",
      "Oil warning light",
      "Darkened, thick or low oil",
      "Increased engine noise",
    ],
    checklist: [
      "Oil level and condition",
      "Sump plug and filter seal",
      "Visible leaks",
      "Service reminder reset",
    ],
    includes: [
      "Oil drain and refill",
      "Filter replacement",
      "Level check after running",
    ],
    steps: [
      "Confirm oil specification for your engine",
      "Drain, replace filter, refill",
      "Check for leaks and reset reminder",
    ],
    faqs: [
      [
        "Which oil will be used?",
        "The grade your manufacturer specifies; confirm preferences when booking.",
      ],
      [
        "Is synthetic oil required?",
        "Many modern and premium engines specify it. Check your manual.",
      ],
    ],
    related: ["general-service", "preventive"],
  }),
  S({
    slug: "diagnostics",
    title: "Computer Diagnostics",
    image: "diagnostics.png",
    category: "Diagnostics",
    cta: "Request Diagnostics",
    duration: "1–2 hours",
    short:
      "Fault-code scanning and system testing to find the cause of warning lights.",
    overview:
      "Modern cars run on networked electronic modules. Diagnostics reads stored fault codes and live data, then testing confirms the root cause. This service also covers scanning and reset, and ECU coding or programming where the vehicle and task allow.",
    why: "A fault code points to a system, not always a failed part. Proper testing avoids replacing parts unnecessarily.",
    symptoms: [
      "Check-engine or other warning lights",
      "Rough running or limp mode",
      "Features not working",
      "Intermittent faults",
    ],
    checklist: [
      "Full-system fault scan",
      "Live data review",
      "Wiring and sensor checks",
      "Code clearing and retest",
    ],
    includes: [
      "Scan report explained",
      "Troubleshooting of identified faults",
      "Coding or reset where applicable",
    ],
    steps: [
      "Connect and scan all modules",
      "Test to confirm the cause",
      "Explain findings and options",
    ],
    faqs: [
      [
        "Does clearing a code fix the problem?",
        "No. If the cause remains, the code will return.",
      ],
      [
        "Can every car be coded?",
        "Support varies by make, model and year; confirm after assessment.",
      ],
    ],
    related: ["battery-electrical", "engine-performance"],
  }),
  S({
    slug: "ac-repair",
    title: "Car AC Inspection & Repair",
    image: "ac inspection.png",
    category: "Climate",
    cta: "Book AC Repair",
    duration: "2–4 hours",
    short:
      "Cooling checks,Leak detection, refrigerant recovery and repair for weak, noisy or inconsistent climate control.",
    overview:
      "We assess cooling performance, airflow and the components in the climate system, then explain what repair, if any, is needed. Luxury cars often use dual-zone systems and electronic controls that need vehicle-specific procedures.",
    why: "A struggling AC works components harder and affects comfort and cabin air quality.",
    symptoms: [
      "Weak or warm cooling",
      "Unusual noises or smells",
      "Poor airflow",
      "Cooling that comes and goes",
    ],
    checklist: [
      "Vent temperature and airflow",
      "Compressor operation",
      "Condenser and cooling fan",
      "Cabin filter and controls",
    ],
    includes: [
      "Performance test",
      "Component diagnostics",
      "Repair or replacement after approval",
    ],
    steps: [
      "Test cooling performance",
      "Inspect system components",
      "Estimate, approval and repair",
    ],
    faqs: [
      [
        "Why is my AC blowing warm air?",
        "Causes range from low refrigerant to compressor, fan or electrical faults; inspection identifies which.",
      ],
      [
        "Do luxury cars need different parts?",
        "Often, yes: components and refrigerant specs vary by vehicle.",
      ],
    ],
    related: ["ac-gas-leak", "battery-electrical"],
  }),
//   S({
//     slug: "ac-gas-leak",
//     title: "AC Gas Leak Diagnosis & Refrigerant Service",
//     image: "car-service.jpg",
//     category: "Climate",
//     cta: "Book AC Gas Service",
//     duration: "1–3 hours",
//     short:
//       "Leak detection, refrigerant recovery and recharge to the correct specification.",
//     overview:
//       "If refrigerant escapes, cooling drops. We look for the leak, repair what is found and refill with the refrigerant type and quantity your vehicle specifies.",
//     why: "Topping up without finding a leak is a short-term fix; the system loses gas again.",
//     symptoms: [
//       "Cooling fading over weeks",
//       "Hissing or oily residue near AC parts",
//       "AC clutch not engaging",
//       "Recent AC repair or accident",
//     ],
//     checklist: [
//       "System pressure readings",
//       "Leak detection",
//       "Seals, hoses and connections",
//       "Refrigerant type check",
//     ],
//     includes: [
//       "Leak diagnosis",
//       "Recovery and recharge",
//       "Post-service cooling test",
//     ],
//     steps: [
//       "Pressure check and leak search",
//       "Repair confirmed leak points",
//       "Recharge and test",
//     ],
//     faqs: [
//       [
//         "Is a gas refill enough?",
//         "Only if there is no leak; otherwise the cause should be fixed first.",
//       ],
//       ["Which refrigerant is used?", "The one specified for your vehicle."],
//     ],
//     related: ["ac-repair"],
//   }),
  S({
    slug: "brakes",
    title: "Brake Inspection & Repair",
    image: "car-service.jpg",
    category: "Safety",
    cta: "Book Brake Service",
    duration: "2–4 hours",
    short:
      "Pads, discs, fluid and lines checked and repaired for confident stopping.",
    overview:
      "We inspect pad and disc condition, brake fluid, lines and calipers, and recommend repair based on measured wear.",
    why: "Brakes are a safety system; performance cars are often heavier and faster, making condition matter more.",
    symptoms: [
      "Squealing or grinding",
      "Soft or long pedal",
      "Vibration when braking",
      "Pulling to one side",
    ],
    checklist: [
      "Pad thickness",
      "Disc condition",
      "Fluid level and condition",
      "Hoses and calipers",
    ],
    includes: [
      "Pad or disc replacement as needed",
      "Fluid service",
      "Test after repair",
    ],
    steps: ["Measure and inspect", "Explain findings", "Repair and test"],
    faqs: [
      [
        "How do I know pads are worn?",
        "Noise, longer stopping and warning lights are signs; inspection measures it.",
      ],
      [
        "Do discs always need replacing with pads?",
        "Not always; it depends on measured condition.",
      ],
    ],
    related: ["suspension-steering", "preventive"],
  }),
  S({
    slug: "suspension-steering",
    title: "Suspension & Steering Inspection",
    image: "car-service.jpg",
    category: "Safety",
    cta: "Book Suspension Check",
    duration: "2–5 hours",
    short: "Ride, handling and steering checked for wear, play and noise.",
    overview:
      "Bushes, links, shock absorbers and steering parts wear gradually. We inspect them and diagnose noises, drift and uneven ride.",
    why: "Worn components affect control, comfort and tyre life.",
    symptoms: [
      "Knocking over bumps",
      "Vehicle drifting or pulling",
      "Uneven tyre wear",
      "Steering vibration",
    ],
    checklist: [
      "Shock absorbers and mounts",
      "Bushes and links",
      "Steering rack and joints",
      "Tyre wear pattern",
    ],
    includes: [
      "Component diagnosis",
      "Replacement after approval",
      "Road test",
    ],
    steps: [
      "Inspection on lift",
      "Diagnose noise or play",
      "Repair and road test",
    ],
    faqs: [
      [
        "Is air suspension different?",
        "Yes, it needs vehicle-specific diagnosis.",
      ],
      ["Is alignment included?", "Only if listed in your agreed scope."],
    ],
    related: ["brakes", "general-service"],
  }),
  S({
    slug: "battery-electrical",
    title: "Battery & Electrical System Service",
    image: "car-service.jpg",
    category: "Electrical",
    cta: "Book Electrical Check",
    duration: "1–3 hours",
    short: "Battery, charging and wiring faults traced and repaired.",
    overview:
      "We test battery health, charging output and electrical consumers, and trace wiring or component faults causing drain or failures.",
    why: "Luxury vehicles depend on stable voltage; weak batteries can trigger multiple unrelated faults.",
    symptoms: [
      "Slow cranking",
      "Battery draining overnight",
      "Flickering lights",
      "Random warning messages",
    ],
    checklist: [
      "Battery load test",
      "Alternator output",
      "Terminals and earths",
      "Parasitic drain",
    ],
    includes: [
      "Battery testing and replacement",
      "Wiring and component repair",
      "Fault retest",
    ],
    steps: [
      "Test battery and charging",
      "Trace drain or fault",
      "Repair and verify",
    ],
    faqs: [
      [
        "Can any battery be fitted?",
        "Many modern cars need the correct type and registration.",
      ],
      [
        "Why does my battery keep dying?",
        "Could be the battery, charging system or a drain; testing finds out.",
      ],
    ],
    related: ["diagnostics", "ac-repair"],
  }),
  S({
    slug: "engine-performance",
    title: "Engine Performance Inspection",
    image: "car-service.jpg",
    category: "Servicing",
    cta: "Book Engine Inspection",
    duration: "2–4 hours",
    short: "Inspection of running quality, power delivery and engine health.",
    overview:
      "We assess how the engine runs and look into causes of rough idle, power loss, leaks or overheating before recommending repair, up to overhaul where required.",
    why: "Early inspection can prevent small issues becoming major repairs.",
    symptoms: [
      "Rough idle or misfire",
      "Loss of power",
      "Overheating",
      "Oil or coolant leaks",
    ],
    checklist: [
      "Fault scan and live data",
      "Ignition and fuel basics",
      "Cooling system",
      "Leak inspection",
    ],
    includes: ["Performance diagnosis", "Repair after approval", "Retest"],
    steps: [
      "Scan and observe running",
      "Test suspected systems",
      "Report and recommend",
    ],
    faqs: [
      [
        "Is engine overhaul often needed?",
        "Rarely; most issues are fixed with targeted repairs.",
      ],
      ["How long does it take?", "Depends on the fault found."],
    ],
    related: ["diagnostics", "general-service"],
  }),
  S({
    slug: "preventive",
    title: "Preventive Maintenance",
    image: "car-service.jpg",
    category: "Servicing",
    cta: "Plan Maintenance",
    duration: "Varies by plan",
    short: "A maintenance plan built around your vehicle, mileage and use.",
    overview:
      "Preventive maintenance schedules checks and replacements before parts fail, based on your vehicle’s specification and how you drive.",
    why: "Planned upkeep is usually more predictable than breakdown repairs.",
    symptoms: [
      "New to owning the vehicle",
      "Approaching high mileage",
      "Infrequent use",
      "Planning long-term ownership",
    ],
    checklist: [
      "Service history",
      "Wear items",
      "Fluids and belts",
      "Seasonal needs",
    ],
    includes: [
      "Written plan",
      "Scheduled reminders if offered",
      "Service as approved",
    ],
    steps: [
      "Review history and use",
      "Build a maintenance plan",
      "Service on schedule",
    ],
    faqs: [
      [
        "Is this different from a general service?",
        "A general service is a visit; preventive maintenance is the plan across visits.",
      ],
      ["Is a plan mandatory?", "No."],
    ],
    related: ["general-service", "oil-filter"],
  }),
];
export const bySlug = (s) => services.find((x) => x.slug === s);
export const priceText = (s) =>
  s.price
    ? `₹${s.price.min.toLocaleString("en-IN")}–₹${s.price.max.toLocaleString("en-IN")}`
    : "Price to be confirmed";
export const factors = [
  "Vehicle make and model",
  "Vehicle year and engine variant",
  "Parts and consumables required",
  "Vehicle condition",
  "Faults found during inspection",
  "Labour and repair complexity",
];
export const disclaimer =
  "Prices and durations are indicative estimates, not guaranteed quotations. The final amount and completion time depend on the vehicle, inspection findings, parts availability, and the agreed scope of work. Confirmation is provided after assessment.";
