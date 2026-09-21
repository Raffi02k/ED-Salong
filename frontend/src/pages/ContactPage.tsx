import { useState } from "react";
import { site } from "../content/siteContent";
import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";
export function ContactPage() {
  const [map, setMap] = useState(false);
  return (
    <>
      <PageHero
        label="Kontakt · Hitta hit"
        title="Vi ses på Österlånggatan."
        text="ED Frisör finns på nummer 38 i Trollhättan. Ring oss för att fråga om en tid eller din nästa klippning."
      />
      <section className="wrap section compact">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">Slå en signal</p>
            <a href={site.phoneHref} className="big-phone">
              {site.phone}
            </a>
            <p>
              {site.address}
              <br />
              {site.postcode} {site.city}
            </p>
            <a
              className="text-link"
              target="_blank"
              rel="noreferrer"
              href={site.directionsUrl}
            >
              Öppna i Google Maps ↗
            </a>
          </div>
          <div className="hours">
            <h2>Öppettider</h2>
            {site.hours.map((h) => (
              <div key={h.label}>
                <span>{h.label}</span>
                <strong>{h.value}</strong>
              </div>
            ))}
            <p className="note">
              Kataloguppgifter, behöver bekräftas. Ring om lördagar och
              avvikande tider.
            </p>
          </div>
        </div>
        <div className="map-frame">
          {map ? (
            <iframe
              title="ED Frisör, Österlånggatan 38, Trollhättan"
              src="https://maps.google.com/maps?q=%C3%96sterl%C3%A5nggatan%2038%20Trollh%C3%A4ttan&t=k&z=17&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div>
              <p className="eyebrow">Österlånggatan 38 · Trollhättan</p>
              <h3>Här finns stolen.</h3>
              <button className="button" onClick={() => setMap(true)}>
                Visa karta ↗
              </button>
              <p className="note">Kartan hämtas från Google när du klickar.</p>
            </div>
          )}
        </div>
        <ContactForm />
      </section>
    </>
  );
}
