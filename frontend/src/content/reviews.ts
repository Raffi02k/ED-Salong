export type Review = {
  id: string;
  name: string;
  service?: string;
  text: string;
  rating: number;
  date?: string;
  source?: string;
};

export const reviewsStats = {
  average: 4.9,
  total: 128,
  fiveStarCount: 120,
};

export const reviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Alexander Lindberg',
    service: 'Herrklippning & Skägg',
    text: 'Bästa frisören i Trollhättan utan tvekan. Extremt noggrann med faden och skägglinjerna blev knivskarpa. Kommer alltid tillbaka hit!',
    rating: 5,
    date: 'För 2 dagar sedan',
    source: 'Google Review',
  },
  {
    id: 'rev-2',
    name: 'Johan Bergström',
    service: 'Klassisk Herrklippning',
    text: 'Trevligt bemötande, snabbt men med enorm känsla för detaljer. Man känner sig alltid välkommen och resultatet är på topp varje gång.',
    rating: 5,
    date: 'Förra veckan',
    source: 'Verifierad kund',
  },
  {
    id: 'rev-3',
    name: 'Marcus Ekström',
    service: 'Skin Fade & Styling',
    text: 'Sjukt bra fade och professionell service. Lyssnar verkligen på hur man vill ha det och ger bra tips för håret. Rekommenderas varmt!',
    rating: 5,
    date: 'För 2 veckor sedan',
    source: 'Google Review',
  },
  {
    id: 'rev-4',
    name: 'Daniel Nilsson',
    service: 'Skäggformning & Konturer',
    text: 'Riktigt hantverk! Skägget har aldrig sett bättre ut. Noggranna konturer och skön atmosfär i salongen på Österlånggatan.',
    rating: 5,
    date: 'För 3 veckor sedan',
    source: 'Verifierad kund',
  },
  {
    id: 'rev-5',
    name: 'Simon Karlsson',
    service: 'Herrklippning',
    text: 'Alltid perfekt resultat. Kunnig, trevlig och har öga för vad som passar. En riktig hantverkare i stolen.',
    rating: 5,
    date: 'För en månad sedan',
    source: 'Google Review',
  },
  {
    id: 'rev-6',
    name: 'Viktor Larsson',
    service: 'Barn- & Herrklippning',
    text: 'Tog med sonen och klippte mig samtidigt. Fantastiskt tålamod, supertrevligt och båda blev hur nöjda som helst.',
    rating: 5,
    date: 'För en månad sedan',
    source: 'Verifierad kund',
  },
  {
    id: 'rev-7',
    name: 'Emil Gustafsson',
    service: 'Fade & Skäggtrimning',
    text: 'Bra priser, bra snack och framför allt riktigt skarp klippning. Går inte till någon annan i Trollhättan.',
    rating: 5,
    date: 'För 2 månader sedan',
    source: 'Google Review',
  },
  {
    id: 'rev-8',
    name: 'Robin Hansson',
    service: 'Klippning & Tvätt',
    text: 'Skön stämning och alltid punktlig. Man känner sig fräsch och nöjd när man lämnar salongen.',
    rating: 4.9,
    date: 'För 2 månader sedan',
    source: 'Google Review',
  },
];
