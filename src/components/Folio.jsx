export default function Folio({ top }) {
  return (
    <div className={"folio" + (top ? " folio-top" : "")}>
      <span>Air Zone Automobile // {top ? "Company file" : "End of file"}</span>
      <span className="fmid">Servicing · Diagnostics · AC care</span>
      <span>
        {top ? "Vol. 01" : "About"} · {new Date().getFullYear()}
      </span>
    </div>
  );
}
