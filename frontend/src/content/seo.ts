import {site} from './siteContent';import {services} from './services';
const pages:Record<string,[string,string]>={
'/':['Frisör i Trollhättan | ED Frisör','ED Frisör på Österlånggatan 38 i Trollhättan. Läs om klippning och skägg, se prisförslag och kontakta salongen. Presentationsdemo.'],
'/tjanster':['Klippning & skägg i Trollhättan | ED Frisör','Utforska ED Frisörs föreslagna tjänster: herrklippning, fade och skäggtrimning i Trollhättan.'],
'/prislista':['Priser för klippning i Trollhättan | ED Frisör','Herrklippning cirka 250 kr. Se prisförslag och exempel på behandlingstider i ED Frisörs presentationsdemo.'],
'/om-oss':['Om salongen i Trollhättan | ED Frisör','Lär känna förslaget till ED Frisörs nya hemsida. Salongen finns på Österlånggatan 38 i Trollhättan.'],
'/galleri':['Frisyrinspiration & galleri | ED Frisör Trollhättan','Utforska klippningar, skägg och salongsinspiration i demonstrationsgalleriet för ED Frisör.'],
'/kontakt':['Kontakt & hitta hit | ED Frisör Trollhättan','Ring ED Frisör på 073-423 62 22. Hitta adress, karta och preliminära öppettider för salongen på Österlånggatan 38.'],
'/recensioner':['Omdömen | ED Frisör','Se hur en recensionssektion kan se ut på ED Frisörs hemsida. Samtliga visade omdömen är exempel.'],
'/boka':['Boka klippning | ED Frisör','Välj behandling och exempeltid i ED Frisörs bokningsdemo. För en riktig bokning, ring salongen i Trollhättan.'],
'/integritet':['Integritet & demoinformation | ED Frisör','Information om demonstrationsmaterial, kontaktformulär och externa kartor på ED Frisörs hemsideförslag.']};
for(const s of services)pages['/tjanster/'+s.slug]=[s.title+' i Trollhättan | ED Frisör',s.intro+' '+s.description];
export const routePaths=Object.keys(pages);
export function getMetadata(path:string){const clean=path.replace(/\/$/,'')||'/';const p=pages[clean];return {title:p?.[0]||'Sidan saknas | ED Frisör',description:p?.[1]||'Hitta tillbaka till ED Frisörs startsida.',noindex:!site.indexable||!p||clean==='/boka'||clean==='/integritet',canonical:site.url+clean}}
export const schema={ '@context':'https://schema.org','@type':'HairSalon',name:site.name,telephone:site.phone,address:{'@type':'PostalAddress',streetAddress:site.address,postalCode:site.postcode,addressLocality:site.city,addressCountry:'SE'}};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export function renderHead(path:string){const m=getMetadata(path);return `<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"><meta name="robots" content="${m.noindex?'noindex, nofollow':'index, follow'}"><link rel="canonical" href="${esc(m.canonical)}"><meta property="og:title" content="${esc(m.title)}"><meta property="og:description" content="${esc(m.description)}"><meta property="og:url" content="${esc(m.canonical)}"><meta property="og:type" content="website"><meta property="og:locale" content="sv_SE"><meta property="og:image" content="${site.url}/og.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(m.title)}"><meta name="twitter:description" content="${esc(m.description)}"><meta name="twitter:image" content="${site.url}/og.png"><script type="application/ld+json">${JSON.stringify(schema)}</script>`}
