import { PageHero } from "../components/PageHero";
export function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Integritet & demoinformation"
        title="Bra att veta."
        text="Det här är en presentationsdemo framtagen av MediaMagnet för ED Frisör i Trollhättan."
      />
      <section className="wrap prose section compact">
        <h2>Formulär och bokning</h2>
        <p>
          I demoläge skickas eller sparas inga formuläruppgifter och inga tider
          reserveras. Använd exempeluppgifter när du provar. För ett riktigt
          besök, ring salongen.
        </p>
        <h2>Exempelmaterial</h2>
        <p>
          Fotografier kommer från det tillhandahållna Buffalo-projektet och är
          inspirationsmaterial. Recensionerna är uttryckligen exempel.
          Föreslagna priser, behandlingar och tider ska bekräftas inför
          lansering. Herrklippning cirka 250 kr kommer från projektunderlaget.
        </p>
        <h2>Externa tjänster</h2>
        <p>
          Kartan laddas först när du väljer att visa den. Då ansluter din
          webbläsare till Google. Kartlänkar och MediaMagnet-länken öppnar
          externa webbplatser. Denna demo använder inga analysverktyg eller
          marknadsföringscookies.
        </p>
        <h2>Före lansering</h2>
        <p>
          Juridiskt företagsnamn, organisationsnummer, kontakt för dataskydd,
          ändamål, rättslig grund, mottagare och lagringstider för ett skarpt
          kontaktformulär behöver fyllas i och godkännas av verksamheten. Denna
          text är demoinformation, inte en färdig policy för insamling av
          personuppgifter.
        </p>
      </section>
    </>
  );
}
