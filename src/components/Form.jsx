import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { services } from "../data/services.js";

const WHATSAPP_NUMBER = "919746440740";

const R = {
  name: (v) => (v.trim() ? "" : "Please enter your name."),

  phone: (v) =>
    /^\+?[0-9\s-]{7,15}$/.test(v.trim()) ? "" : "Enter a valid phone number.",

  email: (v) =>
    !v.trim() || /^\S+@\S+\.\S+$/.test(v.trim())
      ? ""
      : "Enter a valid email address.",

  message: (v) => (v.trim() ? "" : "Please add a few details."),
};

// Create the WhatsApp message
function createWhatsAppMessage(data, quote) {
  const selectedService = services.find((s) => s.slug === data.service);

  const lines = [
    "*AIR ZONE AUTOMOBILE*",
    quote ? "*New Service Request*" : "*New Customer Enquiry*",
    "",
    "*Customer Details*",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
  ];

  if (data.email.trim()) {
    lines.push(`Email: ${data.email}`);
  }

  if (data.make.trim() || data.model.trim()) {
    lines.push(
      "",
      "*Vehicle Details*",
      `Make: ${data.make || "Not specified"}`,
      `Model: ${data.model || "Not specified"}`,
    );

    if (data.year.trim()) {
      lines.push(`Year: ${data.year}`);
    }
  }

  if (selectedService) {
    lines.push("", `*Service Required:* ${selectedService.title}`);
  }

  if (quote && (data.date || data.time)) {
    lines.push("", "*Preferred Appointment*");

    if (data.date) {
      lines.push(`Date: ${data.date}`);
    }

    if (data.time) {
      lines.push(`Time: ${data.time}`);
    }
  }

  if (data.message.trim()) {
    lines.push("", "*Additional Details*", data.message.trim());
  }

  lines.push("", "Sent via Air Zone Automobile Website");

  return lines.join("\n");
}

// Stable component: prevents losing focus when typing
function Field({ k, label, type = "text", req = false, v, err, set }) {
  return (
    <label className="field">
      <span>
        {label}
        {req && " *"}
      </span>

      <input
        name={k}
        type={type}
        value={v[k]}
        onChange={set(k)}
        required={req}
        aria-invalid={!!err[k]}
        aria-describedby={err[k] ? `${k}-error` : undefined}
      />

      {err[k] && (
        <small id={`${k}-error`} role="alert">
          {err[k]}
        </small>
      )}
    </label>
  );
}

export default function Form({ quote = false, contact = false }) {
  const [sp] = useSearchParams();

  const [v, setV] = useState({
    name: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    service: sp.get("service") || "",
    date: "",
    time: "",
    message: "",
  });

  const [err, setErr] = useState({});

  const set = (k) => (e) => {
    const value = e.target.value;

    setV((prev) => ({
      ...prev,
      [k]: value,
    }));

    setErr((prev) => {
      if (!prev[k]) return prev;

      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  function go(e) {
    e.preventDefault();

    const fields = quote
      ? ["name", "phone", "email"]
      : ["name", "phone", "email", "message"];

    const nextErrors = {};

    fields.forEach((k) => {
      const error = R[k](v[k] || "");

      if (error) {
        nextErrors[k] = error;
      }
    });

    setErr(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const message = createWhatsAppMessage(v, quote);

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the message prefilled.
    // The customer must press Send in WhatsApp.
    window.location.assign(whatsappUrl);
  }

  return (
    <form onSubmit={go} noValidate className="form">
      <Field k="name" label="Full name" req v={v} err={err} set={set} />

      <Field
        k="phone"
        label="Phone number"
        type="tel"
        req
        v={v}
        err={err}
        set={set}
      />

      <Field
        k="email"
        label="Email (optional)"
        type="email"
        v={v}
        err={err}
        set={set}
      />

      {(quote || contact) && (
        <>
          <Field k="make" label="Vehicle make" v={v} err={err} set={set} />

          <Field k="model" label="Vehicle model" v={v} err={err} set={set} />

          {quote && (
            <Field k="year" label="Year (optional)" v={v} err={err} set={set} />
          )}

          <label className="field">
            <span>Service required</span>

            <select name="service" value={v.service} onChange={set("service")}>
              <option value="">Select a service</option>

              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>

          {quote && (
            <>
              <Field
                k="date"
                label="Preferred date"
                type="date"
                v={v}
                err={err}
                set={set}
              />

              <Field
                k="time"
                label="Preferred time"
                type="time"
                v={v}
                err={err}
                set={set}
              />
            </>
          )}
        </>
      )}

      <label className="field full">
        <span>{quote ? "Additional details" : "Message *"}</span>

        <textarea
          name="message"
          rows="4"
          value={v.message}
          onChange={set("message")}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
        />

        {err.message && (
          <small id="message-error" role="alert">
            {err.message}
          </small>
        )}
      </label>

      <button type="submit" className="btn full">
        {quote ? "Request Service via WhatsApp" : "Send Enquiry via WhatsApp"}
      </button>
    </form>
  );
}
