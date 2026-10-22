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
    image: "Brake-Inspection.jpg",
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
    image: "suspension.png",
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
    image: "battery.webp",
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
    image: "engine inspection.webp",
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
    image: "preventative.webp",
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

  S({
    slug: "obd2-fault-code-scan",
    title: "OBD-II Fault Code Scanning",
    image: "obd2-scanner.jpg",
    category: "Diagnostics",
    cta: "Book OBD-II Scan",
    duration: "30–60 minutes",
    short:
      "Read supported diagnostic trouble codes and investigate dashboard warning lights.",
    overview:
      "An OBD-II scan retrieves diagnostic trouble codes from supported vehicle systems. The technician reviews available codes and freeze-frame information, explains the findings and recommends further testing where necessary.",
    why: "A fault code identifies a detected condition, not necessarily a failed component. Interpreting the code correctly helps avoid unnecessary part replacement.",
    symptoms: [
      "Check-engine warning light",
      "Engine running roughly",
      "Reduced performance or limp mode",
      "Recent warning light or intermittent fault",
    ],
    checklist: [
      "Connect a compatible diagnostic scanner",
      "Read available stored and pending fault codes",
      "Review freeze-frame data where available",
      "Record findings and recommended next steps",
    ],
    includes: [
      "Supported fault-code scan",
      "Explanation of retrieved codes",
      "Diagnostic findings summary",
      "Recommendations for further testing",
    ],
    steps: [
      "Confirm vehicle details and customer concerns",
      "Connect the scanner and retrieve available codes",
      "Review results and explain next steps",
    ],
    faqs: [
      [
        "Does a fault code identify the exact failed part?",
        "Not always. Additional testing may be required to confirm the root cause.",
      ],
      [
        "Can every vehicle be scanned?",
        "Coverage depends on vehicle compatibility, protocol and scanner capabilities.",
      ],
    ],
    related: ["diagnostics", "live-data-diagnostics", "engine-performance"],
  }),

  // S({
  //   slug: "live-data-diagnostics",
  //   title: "Live Data & Sensor Diagnostics",
  //   image: "live-data-diagnostics.jpg",
  //   category: "Diagnostics",
  //   cta: "Book Live Data Check",
  //   duration: "1–2 hours",
  //   short:
  //     "Analyze supported live engine parameters and sensor readings to investigate performance issues.",
  //   overview:
  //     "Live-data diagnostics uses a compatible scanner to observe available engine parameters and sensor readings. The technician compares readings with expected operating behaviour and performs additional tests where necessary.",
  //   why: "Some sensor, fuel and engine performance problems cannot be confirmed from fault codes alone. Live data helps narrow down possible causes.",
  //   symptoms: [
  //     "Rough idle or hesitation",
  //     "Poor fuel economy",
  //     "Loss of engine power",
  //     "Intermittent sensor-related warning lights",
  //   ],
  //   checklist: [
  //     "Review relevant stored fault codes",
  //     "Inspect available live sensor readings",
  //     "Review supported fuel-trim and misfire data",
  //     "Identify readings that require further testing",
  //   ],
  //   includes: [
  //     "Relevant live-data review",
  //     "Sensor and parameter assessment",
  //     "Findings and recommendations",
  //     "Follow-up testing recommendations",
  //   ],
  //   steps: [
  //     "Understand the reported symptoms",
  //     "Select relevant live-data parameters",
  //     "Evaluate readings and perform applicable checks",
  //     "Explain findings and next steps",
  //   ],
  //   faqs: [
  //     [
  //       "Can live data identify a faulty sensor?",
  //       "It can help identify abnormal readings, but further testing may be needed to confirm the cause.",
  //     ],
  //     [
  //       "Are all sensor values available?",
  //       "No. Available parameters depend on the vehicle and diagnostic equipment.",
  //     ],
  //   ],
  //   related: ["obd2-fault-code-scan", "diagnostics", "engine-performance"],
  // }),

  S({
    slug: "full-system-ecu-diagnostics",
    title: "Full-System ECU Diagnostics",
    image: "ecu-diagnostics.png",
    category: "Diagnostics",
    cta: "Request ECU Diagnostics",
    duration: "1–3 hours",
    short:
      "Scan supported electronic control modules to investigate faults across multiple vehicle systems.",
    overview:
      "Advanced diagnostics checks accessible electronic control modules beyond basic engine OBD-II scanning. Depending on the vehicle and equipment, this may include ABS, airbag, transmission, body control and other supported systems.",
    why: "Modern vehicles use multiple electronic modules. A fault outside the engine management system may require enhanced vehicle-specific diagnostics.",
    symptoms: [
      "ABS or stability-control warning",
      "Airbag or SRS warning",
      "Transmission warning or abnormal shifting",
      "Multiple electrical or system warnings",
    ],
    checklist: [
      "Confirm vehicle and scanner compatibility",
      "Scan accessible supported modules",
      "Review module-specific fault codes",
      "Identify communication faults where supported",
    ],
    includes: [
      "Supported multi-module scan",
      "Fault-code review and explanation",
      "Diagnostic findings report",
      "Recommendations for further investigation",
    ],
    steps: [
      "Confirm reported symptoms and vehicle details",
      "Scan available electronic control modules",
      "Review faults and identify additional tests",
      "Explain results and repair options",
    ],
    faqs: [
      [
        "Can the scanner access every ECU?",
        "No. Access depends on vehicle compatibility, equipment and available functions.",
      ],
      [
        "Does an ECU fault code mean the ECU is defective?",
        "No. Wiring, power supply, sensors or network communication can also cause faults.",
      ],
    ],
    related: ["obd2-fault-code-scan", "diagnostics", "battery-electrical"],
  }),

  S({
    slug: "diagnostic-resets-coding",
    title: "Diagnostic Resets & ECU Coding",
    image: "ecu-coding.webp",
    category: "Diagnostics",
    cta: "Request Coding Service",
    duration: "1–3 hours",
    short:
      "Perform supported fault-code clearing, service resets and vehicle-specific coding procedures.",
    overview:
      "This service covers eligible diagnostic resets, maintenance indicator resets, adaptations and ECU coding where supported. The technician verifies vehicle compatibility and the required procedure before starting.",
    why: "Clearing codes without addressing the underlying fault may only provide temporary results. Coding and adaptations also require compatible equipment and correct vehicle-specific procedures.",
    symptoms: [
      "Service reminder after completed maintenance",
      "Persistent warning after an approved repair",
      "Required supported adaptation or relearn",
      "Vehicle configuration or coding requirement",
    ],
    checklist: [
      "Scan and record relevant fault codes",
      "Confirm the required procedure and compatibility",
      "Check relevant repair or maintenance history",
      "Verify results after the procedure",
    ],
    includes: [
      "Compatibility assessment",
      "Agreed supported reset or coding procedure",
      "Post-procedure scan where applicable",
      "Explanation of remaining faults",
    ],
    steps: [
      "Assess the vehicle and required operation",
      "Confirm compatibility and obtain approval",
      "Perform the agreed procedure",
      "Verify the result and report remaining faults",
    ],
    faqs: [
      [
        "Will clearing a code fix the fault?",
        "No. The underlying cause must be diagnosed and repaired when necessary.",
      ],
      [
        "Can every vehicle be coded?",
        "No. Available functions depend on the vehicle, equipment, software and procedure.",
      ],
    ],
    related: [
      "diagnostics",
      "obd2-fault-code-scan",
      "full-system-ecu-diagnostics",
    ],
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
