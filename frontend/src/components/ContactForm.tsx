import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { services } from "../content/services";
export function ContactForm() {
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    if (f.get("website")) return;
    setState("sending");
    setFeedback("");
    if (import.meta.env.VITE_CONTACT_MODE !== "live") {
      setState("demo");
      setFeedback(
        "Demonstrationen är klar. Inget meddelande har skickats eller sparats. Ring salongen för en riktig förfrågan.",
      );
      return;
    }
    try {
      const r = await fetch(
        (import.meta.env.VITE_API_BASE_URL || "") + "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            name: f.get("name"),
            email: f.get("email"),
            phone: f.get("phone"),
            service: f.get("service"),
            message: f.get("message"),
            website: f.get("website"),
            consent: f.get("consent") === "on",
          }),
        },
      );
      if (!r.ok)
        throw new Error(
          r.status === 429
            ? "För många försök. Vänta en stund."
            : "Meddelandet kunde inte skickas. Ring gärna salongen.",
        );
      const data = await r.json();
      if (data.status === "sent" && data.delivered === true) {
        setState("sent");
        setFeedback("Tack! Ditt meddelande har skickats.");
        form.reset();
      } else {
        setState("demo");
        setFeedback("Testläge: inget mejl skickades.");
      }
    } catch (e) {
      setState("error");
      setFeedback(
        e instanceof Error ? e.message : "Något gick fel. Försök igen.",
      );
    }
  }
  return (
    <section id="meddelande" className="contact-form-block">
      <div>
        <p className="eyebrow">En fråga innan besöket?</p>
        <h2>Hör av dig.</h2>
        <p>
          Prova formuläret med exempeluppgifter. I denna demo skickas inget
          meddelande.
        </p>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>
            Namn *
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            Telefon *
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={6}
              maxLength={40}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            E-post *
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <label>
            Behandling
            <select name="service">
              <option value="">Välj behandling</option>
              {services.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Meddelande *
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={4}
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Webbplats
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent">
          <input name="consent" type="checkbox" required />
          <span>
            Jag har läst <Link to="/integritet">integritetsinformationen</Link>.
          </span>
        </label>
        <button className="button" disabled={state === "sending"}>
          {state === "sending" ? "Skickar…" : "Prova förfrågan ↗"}
        </button>
        <p role={state === "error" ? "alert" : "status"} className="feedback">
          {feedback}
        </p>
      </form>
    </section>
  );
}
