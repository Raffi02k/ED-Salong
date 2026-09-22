import { Link } from "react-router-dom";
import { site } from "../content/siteContent";
import { ServiceCards } from "../components/ServiceCards";
import { ReviewsRail } from "../components/ReviewsRail";
export function HomePage() {
  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div>
          {[0, 1].map((i) => (
            <div className="ticker-group" key={i}>
              {Array.from({ length: 8 }, (_, j) => (
                <span key={j}>
                  HERRKLIPPNING ✦ SKÄGG & KONTURER ✦ FADE ✦ TROLLHÄTTAN ✦ DIN
                  STIL ✦
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">ED FRISÖR · ÖSTERLÅNGGATAN 38</p>
          <h1>
            Bra hår.
            <br />
            Skarpa
            <br />
            <span>detaljer.</span>
          </h1>
          <p>
            Din frisör i Trollhättan. Klippning och skägg med känsla för formen,
            från första saxklippet till sista finishen.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/boka">
              Boka din klippning ↗
            </Link>
            <Link className="text-link" to="/prislista">
              Se prislistan
            </Link>
          </div>
          <div className="hero-foot">
            <span>HERRKLIPPNING · FRÅN 250 KR</span>
            <span className="stamp">
              Din stil.
              <br />
              Vår sak.
            </span>
          </div>
        </div>
        <div className="hero-photo">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/ed_hero_poster.webp"
          >
            <source src="/media/ed_hero.mp4" type="video/mp4" />
            <img
              src="/media/ed_hero_poster.webp"
              alt="ED Frisör Österlånggatan"
              loading="eager"
            />
          </video>
          <span className="hero-caption">
            01 / HANTVERKET I FOKUS · INSPIRATION
          </span>
          <span className="round-stamp">
            HÅR
            <br />✦<br />
            SKÄGG
          </span>
        </div>
      </section>
      <section className="facts wrap">
        <div>
          <small>Herrklippning</small>
          <strong>
            250<span> kr</span>
          </strong>
          <span>Klassisk klippning</span>
        </div>
        <div>
          <small>Besök oss</small>
          <strong>Nr 38</strong>
          <span>Österlånggatan</span>
        </div>
        <div>
          <small>Här finns vi</small>
          <strong>THN</strong>
          <span>Trollhättan</span>
        </div>
        <div>
          <small>Enkelt att nå oss</small>
          <a href={site.phoneHref}>Ring ↗</a>
          <span>{site.phone}</span>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Menyn för din nästa look</p>
            <h2>
              Välj din
              <br />
              nästa klippning.
            </h2>
          </div>
          <Link className="text-link" to="/tjanster">
            Alla tjänster ↗
          </Link>
        </div>
        <ServiceCards limit={3} />
      </section>
      <section className="story-strip">
        <div className="story-image">
          <img
            src="/images/salon-atmosphere.webp"
            alt="Salongsinspiration"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <p className="eyebrow">En stund i stolen</p>
          <h2>
            Mer stil.
            <br />
            Mindre krångel.
          </h2>
          <p>
            En uppfräschning eller en helt ny riktning? Ta med en bild eller
            berätta hur du vill ha det. Vi börjar där.
          </p>
          <Link className="button light" to="/om-oss">
            Möt ED Frisör ↗
          </Link>
          <span className="stamp">Trollhättan</span>
        </div>
      </section>
      <section className="section wrap">
        <p className="eyebrow">Från idé till finish</p>
        <h2>Så går ett besök till.</h2>
        <div className="steps">
          {[
            [
              "01",
              "Din idé",
              "Berätta vilken längd, form och känsla du vill ha.",
            ],
            [
              "02",
              "Hantverket",
              "Klippning och konturer med fokus på helheten.",
            ],
            [
              "03",
              "Sista finishen",
              "Styling, spegelkoll och en frisyr att trivas i.",
            ],
          ].map(([n, t, p]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <ReviewsRail />
      <section className="final-cta wrap section">
        <p className="eyebrow">Nästa stopp: stolen.</p>
        <h2>
          Dags för
          <br />
          en ny look?
        </h2>
        <Link to="/boka" className="button">
          Hitta ditt nästa besök ↗
        </Link>
        <a className="text-link" href={site.phoneHref}>
          {site.phone}
        </a>
      </section>
    </>
  );
}
