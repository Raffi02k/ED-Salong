import { Link } from 'react-router-dom';
import { services } from '../content/services';
import { PageHero } from '../components/PageHero';
import { site } from '../content/siteContent';

export function PricesPage() {
  return (
    <>
      <PageHero
        label="Prislista · ED Frisör"
        title="Din stil. Ett tydligt pris."
        text="Välj bland våra behandlingar på Österlånggatan. Från klassiska herrklippningar och skarpa fades till full skäggvård."
      />
      <section className="price-section">
        <div className="wrap section">
          <div className="price-list">
            {services.map((s, i) => (
              <Link className="price-row" key={s.slug} to={'/tjanster/' + s.slug}>
                <span className="price-index">0{i + 1}</span>
                <div className="price-thumb">
                  <img src={'/images/' + s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="price-main">
                  <h2>{s.title}</h2>
                  <p>{s.intro}</p>
                </div>
                <span className="duration">{s.duration}</span>
                <strong>
                  {s.price} kr <span>↗</span>
                </strong>
              </Link>
            ))}
          </div>

          <div className="booking-callout" style={{ marginTop: '55px' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--yellow)', marginBottom: '8px' }}>Redo för ditt nästa besök?</p>
              <h3 style={{ fontSize: '1.9rem', margin: 0 }}>Hitta tiden som passar dig i stolen.</h3>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link className="button" to="/boka">
                Boka klippning ↗
              </Link>
              <a className="button light" href={site.phoneHref}>
                Ring {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
