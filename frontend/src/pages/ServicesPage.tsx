import { PageHero } from "../components/PageHero";
import { ServiceCards } from "../components/ServiceCards";
export function ServicesPage() {
  return (
    <>
      <PageHero
        label="Hår & skägg · Trollhättan"
        title="Hantverk, från topp till skägg."
        text="Hitta rätt behandling för din nästa look. Här visar vi ett förslag på ED Frisörs tjänsteutbud."
      />
      <section className="wrap section compact">
        <ServiceCards />
        <p className="note">
          DEMO · Tjänsteutbud, innehåll, tider och exempelpriser bekräftas med
          salongen före lansering. Bilderna är inspiration från
          Buffalo-materialet.
        </p>
      </section>
    </>
  );
}
