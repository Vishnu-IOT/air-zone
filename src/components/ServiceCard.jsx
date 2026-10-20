import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SmartImage from "./SmartImage.jsx";
import { priceText } from "../data/services.js";
export default function ServiceCard({ s, i, wide }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className={"card" + (wide ? " wide" : "")}>
      <Link to={"/services/" + s.slug} data-cursor="View">
        <div className="card-img">
          <SmartImage src={s.image} alt={s.title} />
        </div>
        <div className="card-body">
          <span className="label">
            {String(i + 1).padStart(2, "0")} · {s.category}
          </span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <p className="meta">
            <Clock size={13} /> {s.duration} · {priceText(s)}
          </p>
          <span className="more">
            Explore service <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
