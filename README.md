# Busola

Aplicație de orientare universitară pentru un proiect de antreprenoriat. Catalogul conține 26 de opțiuni de studiu la 7 universități, cu cerințe și surse oficiale.

## Pentru colegi

- **Aplicația offline:** descarcă [Busola.html](downloads/Busola.html) folosind butonul Download raw file al GitHub și deschide fișierul în Chrome sau Edge. Nu este necesară instalarea.
- **Pachetul complet v4:** [aplicație și materiale](downloads/Busola-pachet-complet-v4.zip).
- **Pentru slide-uri:** [ideile prezentării](docs/Busola-idei-pentru-prezentare.md) și [promptul pentru AI](docs/Busola-prompt-pentru-colegi.txt). Aceste materiale nu cer un scenariu video.
- **Pornire și funcții:** [ghidul rapid](docs/GHID-RAPID.txt).
- **Date și limite:** [catalogul explicat](docs/CATALOG-SI-LIMITE.md).

## Publicare pe Vercel

Importă acest repository. Configurația este inclusă în `vercel.json`:

| Setare | Valoare |
|---|---|
| Framework Preset | Other |
| Root Directory | rădăcina repository-ului (`./`) |
| Build Command | gol; nu este necesar un build pe Vercel |
| Install Command | gol |
| Output Directory | public |
| Environment Variables | niciuna |

Fișierul servit la adresa principală este `public/index.html`. Vercel publică numai folderul `public`; documentele și sursele rămân în repository. După publicare, linkul de producție apare în proiectul Vercel și poate fi trecut aici.

Instrucțiuni complete: [PUBLICARE.md](PUBLICARE.md).

## Dezvoltare și actualizări

Aplicație HTML/CSS/JavaScript fără dependențe externe de execuție. Codul editabil și datele cercetate se află în `src/`.

După modificarea surselor, rulează local cu Python 3:

```sh
python3 scripts/build.py
```

Pe Windows poți folosi `py scripts/build.py`. Scriptul regenerează `public/index.html`, `downloads/Busola.html` și `data/catalog-surse.json`. Include aceste fișiere în commit înainte de push; Vercel servește versiunea generată. Arhiva `downloads/Busola-pachet-complet-v4.zip` este pachetul fix al versiunii v4 și se actualizează separat.

Pentru previzualizare locală:

```sh
python3 -m http.server 8000 --directory public
```

Deschide `http://localhost:8000`. Pentru simpla utilizare offline este suficient `downloads/Busola.html`.

## Funcționalitate

Maximum patru interese, recomandări explicabile, catalog, simulări opționale de admitere, cont local demonstrativ, favorite, comparații, checklist și calendar exportabil. Costurile disting explicit locurile la buget de cele cu taxă.

Conturile sunt locale, fără parolă; publicarea pe Vercel nu adaugă autentificare online sau sincronizare. Folosiți date fictive. Nu există plăți reale sau un asistent AI integrat. Profilul salvat în fișierul offline nu se transferă automat la adresa online.

Anii și sursele sunt indicate pe fiecare fișă. Punctajele istorice nu garantează admiterea, iar oferta nu acoperă toate programele sau toate rutele de acces.
