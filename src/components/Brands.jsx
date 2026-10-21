import { brands } from "../data/content.js";
import Lines from "./Lines.jsx";
const Item = ({ b }) =>
  b.logo ? (
    <img src={b.logo} alt={b.name} loading="lazy" />
  ) : (
    <span className="wm">{b.name}</span>
  );
export default function Brands() {
  const loop = [...brands, ...brands];
  return (
    <section className="brands2" aria-labelledby="brands-h">
      <div className="container">
        <p className="label">Vehicles we care for</p>
        <Lines as="h2" lines={["A world of automotive", "excellence."]} />
        <p className="lead" id="brands-h">
          Explore the automotive marques represented in our service offering.
        </p>
        <ul className="bgrid">
          {brands.map((b) => (
            <li key={b.name}>
              <Item b={b} />
            </li>
          ))}
        </ul>
        <p className="note">
          Brand list to be confirmed by the business. Listing implies no
          partnership or authorised-dealer status.
        </p>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {loop.map((b, i) => (
            <span key={b.name + i} className="mi">
              <Item b={b} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
