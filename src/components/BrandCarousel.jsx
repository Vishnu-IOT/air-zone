// import { useState } from "react";
// import { brands } from "../data/content.js";
// import Lines from "./Lines.jsx";

// // Logo files go in /public/images/brands/<slug>.svg (or .png / .webp), e.g. mercedes-benz.svg, land-rover.png.
// // Use transparent-background logos. If a file is missing, the brand name is shown as a text wordmark instead.
// const EXTS = ["svg", "png", "webp"];
// const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// function Logo({ b }) {
//   const [i, setI] = useState(0);
//   const src = b.logo || (i < EXTS.length ? `/images/brands/${slug(b.name)}.${EXTS[i]}` : "");
//   if (!src) return <span className="bc-wm">{b.name}</span>;
//   return (
//     <img
//       src={src}
//       alt={b.name}
//       loading="lazy"
//       draggable="false"
//       onError={() => setI((n) => n + 1)}
//     />
//   );
// }

// export default function BrandCarousel() {
//   // Each group holds the list twice so it always spans wide screens; two identical groups give a seamless -50% loop.
//   const group = [...brands, ...brands];
//   return (
//     <section className="container bc" aria-label="Brands we service">
//       {/* <p className="label">Brands we service</p>
//       <Lines as="h2" lines={["Trusted with the", "marques you drive."]} /> */}
//       <div className="bc-view">
//         <div className="bc-track">
//           {[0, 1].map((g) => (
//             <ul className="bc-group" key={g} aria-hidden={g === 1 ? "true" : undefined}>
//               {group.map((b, k) => (
//                 <li className="bc-item" key={b.name + k}>
//                   <Logo b={b} />
//                 </li>
//               ))}
//             </ul>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { brands } from "../data/content.js";
import Lines from "./Lines.jsx";

function Logo({ b }) {
  if (!b.logo) {
    return <span className="bc-wm">{b.name}</span>;
  }

  return (
    <img
      src={b.logo}
      alt={`${b.name} logo`}
      loading="lazy"
      draggable="false"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export default function BrandCarousel() {
  const group = [...brands, ...brands];

  return (
    <section className="container bc" aria-label="Brands we service">
      <div className="bc-view">
        <div className="bc-track">
          {[0, 1].map((g) => (
            <ul
              className="bc-group"
              key={g}
              aria-hidden={g === 1 ? "true" : undefined}
            >
              {group.map((b, k) => (
                <li className="bc-item" key={`${b.name}-${g}-${k}`}>
                  <Logo b={b} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}