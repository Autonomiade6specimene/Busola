# Publicare Busola pe GitHub și Vercel

## 1. GitHub

1. Autentifică-te pe [GitHub](https://github.com/).
2. Creează un repository numit, de exemplu, `busola`. Alege **Public** dacă vrei acces pentru colegi fără invitații; **Private** dacă vrei să le acorzi acces individual. Un repository privat poate avea un site Vercel public.
3. Dacă încarci prin browser, extrage întâi arhiva pregătită. Încarcă fișierele și directoarele **din interiorul** folderului `Busola-GitHub`, păstrând structura. Folosește **Add file → Upload files**, apoi **Commit changes**. Nu încărca doar ZIP-ul ca sursă a site-ului.
4. Verifică în rădăcină `README.md`, `vercel.json`, `public`, `src`, `scripts`, `docs`, `downloads` și `data`. Pagina aplicației trebuie să fie la `public/index.html`.

Alternativ, în folderul proiectului folosește GitHub Desktop pentru commit și **Publish repository**. Dacă folosești Git în terminal, setează remote-ul la adresa exactă a repository-ului creat; nu publica alte directoare din calculator.

Documentație: [încărcarea fișierelor în GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## 2. Vercel

1. Autentifică-te pe [Vercel](https://vercel.com/).
2. Alege **Add New → Project** și importă repository-ul `busola` din GitHub. Dacă nu apare, configurează accesul integrării GitHub la acest repository.
3. Păstrează Root Directory la rădăcină (`./`), Framework Preset **Other**, fără Build Command sau Install Command și Output Directory **public**. Configurația inclusă în `vercel.json` definește aceste valori.
4. Apasă **Deploy** și așteaptă terminarea publicării.
5. Deschide adresa de producție `.vercel.app`, apoi testează catalogul și profilul. Trimite colegilor adresa de producție, nu un link către dashboard.
6. Dacă un coleg vede o cerere de autentificare Vercel, verifică accesul/deployment protection al adresei distribuite. Folosește adresa de producție cu accesul dorit pentru concurs.

Nu este necesar un domeniu cumpărat sau o cheie API pentru acest proiect. Nu activa servicii plătite pentru simpla publicare a HTML-ului.

Documentație: [configurația unui site static](https://vercel.com/docs/builds/configure-a-build), [import din Git](https://vercel.com/docs/git), [vercel.json](https://vercel.com/docs/project-configuration/vercel-json).

## 3. Actualizări

Modifică `src`, rulează `python3 scripts/build.py`, apoi fă commit și push inclusiv pentru fișierele generate. Repository-ul conectat permite publicarea actualizărilor prin Vercel. Documentele pentru colegi se editează în `docs`.

În varianta online, conturile rămân demonstrative, în browser. Nu sunt trimise unui server și nu se sincronizează între dispozitive.
