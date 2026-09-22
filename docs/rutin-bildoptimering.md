# Rutin & Checklista: Projektrensning & Bildoptimering

Generell guide för prestandaoptimering, städning och filhantering för **ED Frisör**.

---

## 1. Sammanfattning
Denna rutin beskriver ett standardiserat tillvägagångssätt för att hålla projektet rent från överflödiga filer och optimera all media för webben. Genom att regelbundet ta bort överflödiga filer och konvertera tung media till moderna format (WebP) säkras:
- Blixtsnabba laddningstider (bra Core Web Vitals / LCP)
- Minimal överföringsmängd för mobila besökare
- Låg repositoriestorlek och snabba byggtider

---

## 2. Genomförda åtgärder & Standarder

### A. Identifiering och rensning av tunga filer
- **Dubblettmappar och oanvända resurser:** Kontrollera rotstrukturen och `frontend/public/images/` regelbundet. Filer som inte refereras i källkoden ska raderas.
- **Okomprimerade bildfiler:** Råa PNG- och JPEG-filer ersätts med komprimerade WebP-motsvarigheter.
- **Virtuella miljöer & cacher:** `.venv`, `node_modules`, build-cacher (`.ssr`, `dist`) och loggar hålls exkluderade i `.gitignore`.

### B. Riktlinjer för bildoptimering (PNG/JPEG ➔ WebP)
Alla bilder konverteras med `cwebp` eller motsvarande verktyg:
1. **Hero- & Storformatsbilder (bredd 1280px–1920px):**
   - Format: WebP (`-q 80–85`)
   - Målstorlek: `< 200 KB` (max 500 KB)
2. **Standard- & Innehållsbilder (bredd 800px–1400px):**
   - Format: WebP (`-q 80–82`)
   - Målstorlek: `< 150 KB` (max 250 KB)
3. **Logotyper & Ikoner:**
   - Format: WebP med bevarad alfa/transparens (`-q 90`) eller SVG
   - Målstorlek: `< 70 KB`
4. **Hero-video (`/media/ed_hero.mp4`):**
   - Streamas progressivt med `muted`, `playsinline`, `loop` och `autoplay`.
   - Alltid kopplad till en WebP-poster (`ed_hero_poster.webp`, ca 40 KB) för omedelbar första visning (Zero LCP delay).

---

## 3. Checklista & Prestandamål

| Område / Kriterium | Målvärde / Riktlinje | Metod / Åtgärd | Status |
| :--- | :--- | :--- | :--- |
| **Total repostorlek** | < 100 MB totalt | Rensa `.venv`, obehövliga assets och cacher | ✅ Uppfyllt (~16 MB git-historik) |
| **Bilder i WebP** | 100% av foton i WebP | Konvertera med `cwebp` med kontrollerad kvalitet | ✅ Uppfyllt (1.3 MB totalt för alla bilder) |
| **Initial laddning (Hero)** | < 1 MB för startinnehåll | WebP-poster (41 KB) som visas direkt innan video startar | ✅ Uppfyllt |
| **Byggkontroll & validering** | Automatisk verifiering | `npm run build` kör `check-build.mjs` för att garantera att alla referenser finns | ✅ Uppfyllt |

---

## 4. Snabbkommandon för optimering

### Konvertera bild till WebP:
```bash
cwebp -q 82 bild.jpg -o bild.webp
```

### Bygg och validera alla referenser och metadata:
```bash
npm run build
```
