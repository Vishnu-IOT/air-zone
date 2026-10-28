import { motion, useReducedMotion } from "framer-motion";
import { teamMembers } from "../data/team.js";
import { Portrait } from "./TeamCard.jsx";
import Lines from "./Lines.jsx";
import Reveal from "./Reveal.jsx";
import { SecHead } from "./AboutSections.jsx";
const D = [
  ["Service 01", "Servicing & maintenance", "Routine and preventive care"],
  ["Service 02", "Computer diagnostics", "Fault scanning and testing"],
  ["Service 03", "Car AC repair", "Cooling checks and repair"],
];
export default function OwnerSection() {
  const o = teamMembers.find((m) => m.id === "owner");
  const r = useReducedMotion();
  if (!o) return null;
  return (
    <section className="bs-sec">
      <div className="container">
        <SecHead
          n="01"
          title="The person behind the work"
          tag="Air Zone Automobile"
        />
        <div className="bs-owner">
          <motion.div
            className="bs-portrait"
            initial={r ? false : { clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 1.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Portrait m={o} />
          </motion.div>
          <div>
            <span className="chip-tag">{o.designation}</span>
            {o.placeholder && (
              <span className="badge">
                Automotive Diagnostics Specialist
              </span>
            )}
            <Lines as="h2" lines={[o.name]} />
            <p className="role">{o.designation}</p>
            <Reveal variant="right" delay={0.1}>
              <p className="lead">
                With extensive experience in the automotive industry, our
                founder built a strong technical foundation through years of
                hands-on work in Coimbatore and Dubai. From 1995 to 2002, he
                gained valuable automotive experience in Coimbatore, including
                expertise in car air conditioning at Air Tech Car AC. He then
                worked for six years as a BMW technician in Dubai, gaining
                international experience in premium vehicle servicing and
                diagnostics.
              </p>
              <p className="lead">{o.bio}</p>
              <blockquote className="bs-quote">
                Our approach is built around understanding each vehicle's needs
                and helping customers make informed service decisions.
                <cite>The Air Zone approach</cite>
              </blockquote>
              <div className="bs-disc">
                {D.map(([a, b, c]) => (
                  <div key={a}>
                    <small>{a}</small>
                    <b>{b}</b>
                    {c}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
