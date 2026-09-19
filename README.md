# ED Frisör – MediaMagnet presentationsdemo

Flersidig React 18 + TypeScript + Vite + react-router-dom. Handbyggd CSS. Visuell riktning från bifogad Tenon & Wren-export: Alfa Slab One, Archivo, Courier Prime; papper #efe3cc, oxblod #8e2016, gult #ffc93c. Struktur och FastAPI-grund från Buffalo-materialet.

## Starta

Node 22.12 eller senare:

```sh
npm --prefix frontend ci
npm run dev
```

Bygg med `npm run build`. Alla 15 sidor plus 404 förrenderas som HTML för direktlänkar och sökmotorer. Output: frontend/dist. Kontroll av H1, metadata och lokala media ingår i build.

## Demo eller lansering

Demon har noindex och robots Disallow. Det är avsiktligt: påhittade exempelpriser och omdömen ska inte indexeras som företagsfakta. För riktig lansering: bekräfta alla verksamhetsuppgifter, byt bilder/omdömen, konfigurera domän och sätt VITE_INDEXABLE=true.

Herrklippning cirka 250 kr är uppgift från beställaren. Övriga priser, tjänstedetaljer och samtliga tider är demoförslag. Salongens namn, adress och telefon har matchats i företagskataloger. Lördagstider var motstridiga; visas därför som Ring för aktuell tid. Organisationsnummer och juridiskt namn är inte fastställda och har inte hittats på.

Bokningsflödet väljer behandling, önskat datum och exempeltid. Ingen reservation eller lagring sker. En riktig extern bokning kan kopplas till knapparna när Haidar lämnar rätt länk. Den hittade Setmore staging-länken används inte eftersom den visar generiska möten.

Kontaktformuläret är lokalt demoläge som standard. VITE_CONTACT_MODE=live aktiverar POST till VITE_API_BASE_URL/api/contact. FastAPI finns i backend/ med Pydantic-validering, CORS, storleksgräns, honeypot, rate limiting och SMTP med TLS. Pythonservern ingår i källkoden men körs inte på den statiska demolänken. Ange ALLOWED_ORIGINS, ALLOWED_HOSTS och SMTP-inställningar enligt backend/.env.example för separat backend-hosting. Fyll riktig integritetstext innan insamling av personuppgifter aktiveras.

```sh
cd backend
python -m venv .venv
# Aktivera miljön enligt ditt operativsystem.
pip install -r requirements.txt
uvicorn app.main:app --reload
```

GET /api/reviews returnerar tom lista tills verifierade recensioner läggs i backend/data/reviews.json. Frontend visar separata, tydligt märkta demoexempel. Inga aggregateRating eller Review-scheman används.

## Redigera

- frontend/src/content/siteContent.ts: namn, adress, telefon, timmar, navigation, domän
- frontend/src/content/services.ts: priser, tider, tjänstesidor
- frontend/src/content/gallery.ts och reviews.ts: inspirationsbilder och exempelinnehåll
- frontend/src/styles/global.css: hela designen och responsiva regler
- frontend/src/content/seo.ts: varje sidas metadata, routes och HairSalon-schema
- frontend/public/images/: bilder och transparent ED-logotyp

## Vercel

Importera projektroten. vercel.json bygger frontend och använder frontend/dist. Alternativt välj frontend som root och `npm run build`, output `dist`. Vid domänbyte sätt VITE_SITE_URL innan build. Build genererar sitemap.xml/robots.txt från samma route-data. Alla routes förrenderas till katalog/index.html. Befintliga filer serveras direkt, övriga paths faller tillbaka till Reacts 404. En statisk SPA-fallback kan returnera HTTP 200 för okända paths; 404-vyn har noindex. Använd värdens egen 404-routing om strikt HTTP 404 behövs.

## Media & rättigheter

Bilder från användarens Buffalo-projekt är demos och visar inte ED:s lokaler, personal eller kundarbeten. Byt till salongens egna bilder eller bekräfta användningsrätten innan publik lansering. Buffalo-filens reviews var tjänstesammanfattningar; därför har inga Buffalo-recensioner tillskrivits ED. Exempeltexter är märkta DEMO.

Loggan ED / FRISÖR / TROLLHÄTTAN är genererad som transparent PNG. Original och beskuren webbvariant ligger i public/images. MediaMagnet-credit använder en enkel vit textlogotyp eftersom den angivna originalfilen inte fanns i bifogat material; ersätt vid behov med riktig logotyp på samma filnamn.

Lokala typsnitt från Tenon-exporten används. Bekräfta licenser för distributionspaketet innan offentlig lansering. Referensens företagsnamn, texter, bilder och engelska bokningsflöde ingår inte.

## Inför mötet med Haidar

Visa startsidan → tjänster → prislista → galleri → prova boka → kontakt i mobil. Be om organisationsnummer, godkänd prislista, salongsbilder, personalpresentation, exakta öppettider och riktig bokningslänk. Varken SMTP, betalningar eller riktig kalender är aktiverade i demon.

## Verifiering

Produktionsbygget passerar TypeScript och kontroller av alla 16 HTML-sidor, metadata, H1 och lokala bilder. Webbläsarens preview blockerades i arbetsmiljön, så visuell kontroll och interaktionstest på mobil återstår. Backend ingår som konfigurerbar grund och har inte integrationstestats mot SMTP.
