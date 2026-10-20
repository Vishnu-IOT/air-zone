// Editable site content. List only brands the business actually services; this is not an official-partner claim.
export const brands = [
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Lexus",
  "Jaguar",
  "Land Rover",
  "Volvo",
  "Volkswagen",
  "MINI",
].map((name) => ({ name, logo: "" })); // set logo:'/images/brands/<file>.svg' once the official asset is supplied
// published:false records are NEVER shown. Add genuine, approved reviews with published:true.
export const reviews = [
  {
    id: 1,
    published: true,
    name: "Arun Kumar",
    service: "General Car Service",
    date: "2026-09-12",
    text: "The service experience was smooth and professional. The team explained the maintenance requirements clearly and completed the work with great attention to detail.",
  },
  {
    id: 2,
    published: true,
    name: "Praveen Raj",
    service: "Engine Oil & Filter Replacement",
    date: "2026-09-18",
    text: "Excellent service and transparent communication. The team explained the work before starting and kept the entire process simple and hassle-free.",
  },
  {
    id: 3,
    published: true,
    name: "Karthik S",
    service: "Computer Diagnostics",
    date: "2026-09-25",
    text: "They took the time to identify the issue and explain the recommended repairs. I appreciated the professional approach and clear communication.",
  },
  {
    id: 4,
    published: true,
    name: "Vijay Anand",
    service: "Car AC Service",
    date: "2026-10-02",
    text: "The AC inspection was handled professionally. The team explained the problem and the next steps clearly, making the whole experience reassuring.",
  },
  {
    id: 5,
    published: true,
    name: "Manoj Kumar",
    service: "Brake Inspection & Repair",
    date: "2026-10-10",
    text: "A well-organized workshop with a helpful team. They explained the brake inspection findings and discussed the necessary work before proceeding.",
  },
];
export const homeFaqs = [
  [
    "How do I book an appointment?",
    "Send a quote request with your vehicle and service details. The team will follow up to discuss next steps.",
  ],
  [
    "Will I get an estimate first?",
    "Estimates are provided after assessment, and additional work is discussed with you before proceeding.",
  ],
  [
    "What does computer diagnostics involve?",
    "Scanning the vehicle’s modules for fault codes, reviewing live data and testing to confirm the cause.",
  ],
  [
    "Why is AC repair priced differently for each car?",
    "Components, refrigerant and procedures differ by make and model, so cost depends on the vehicle and findings.",
  ],
  [
    "Is pricing the same for every vehicle?",
    "No. Luxury and premium vehicles can need different parts, fluids and labour.",
  ],
];
export const whyPoints = [
  [
    "Structured inspection",
    "Each vehicle is checked against a clear list, not a quick glance.",
  ],
  ["Clear explanations", "Findings are explained in plain language."],
  [
    "Condition-based advice",
    "Recommendations follow your vehicle’s actual condition.",
  ],
  ["Approval first", "Extra work is discussed with you before it proceeds."],
  [
    "Vehicle-specific care",
    "Specifications differ by make and model, and we treat them that way.",
  ],
];
