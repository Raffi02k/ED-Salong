import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { ReviewsRail } from "../components/ReviewsRail";

export function AboutPage() {
  return (
    <>
      <PageHero
        label="ED Frisör · Österlånggatan 38"
        title="Lokalt. Personligt. Välklippt."
        text="En frisörsalong i Trollhättan för hår, form och de små detaljerna som gör skillnad."
      />
      <section className="story-strip">
        <div className="story-image">
          <img
            src="/images/tools.webp"
            alt="Barberarverktyg i salongen"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">Välkommen till ED</p>
          <h2>
            Din stil
            <br />
            börjar här.
          </h2>
          <p>
            Du hittar ED Frisör på Österlånggatan 38 i hjärtat av Trollhättan.
            Vi fokuserar på genuint hantverk, personligt bemötande och
            klippningar som håller formen länge.
          </p>
          <p>
            Oavsett om det gäller en klassisk herrklippning, en skarp skin fade
            eller noggrann skäggvård tar vi oss alltid tid för precision och
            finish.
          </p>
          <Link className="button light" to="/kontakt">
            Hitta till salongen ↗
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <p className="eyebrow">Plats för hantverket</p>
        <h2>
          Håret. Skägget.
          <br />
          Helheten.
        </h2>
        <p className="lead">
          Upptäck hantverket, se bilder från salongen och hitta tiden som passar
          dig.
        </p>
        <div
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "center",
            marginTop: "26px",
            flexWrap: "wrap",
          }}
        >
          <Link className="button" to="/boka">
            Boka klippning ↗
          </Link>
          <Link className="text-link" to="/galleri">
            Se galleriet ↗
          </Link>
        </div>
      </section>

      <ReviewsRail />
    </>
  );
}
