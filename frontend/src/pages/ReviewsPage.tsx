import { PageHero } from '../components/PageHero';
import { ReviewsRail } from '../components/ReviewsRail';
import { site } from '../content/siteContent';

export function ReviewsPage() {
  return (
    <>
      <PageHero
        label="Kundomdömen · Trollhättan"
        title="Orden efter besöket."
        text="Läs vad våra kunder tycker om klippningen, skäggvården och bemötandet på Österlånggatan."
      />
      <ReviewsRail showFooter={false} />
      <section className="wrap section compact">
        <h2>Har du besökt ED Frisör?</h2>
        <p>Vi uppskattar all feedback från våra kunder. Lämna gärna ett omdöme på Google eller berätta om din upplevelse vid nästa besök.</p>
        <a className="button" href={site.directionsUrl} target="_blank" rel="noreferrer">
          Lämna ett omdöme på Google ↗
        </a>
      </section>
    </>
  );
}
