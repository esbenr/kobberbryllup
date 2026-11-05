# kobberbryllup
En enkel, responsiv hjemmeside til vores kobberbryllup, bygget til GitHub Pages.

## Filer og indhold

Åbn `index.html` direkte i en browser. Der er ingen afhængigheder, JavaScript,
byggetrin eller runtime-server.

- Redigér hilsen, festoplysninger, toastmaster og ønskesky i `index.html`.
- Gæstelisten er delt i Familie, Venner og Kolleger. Hver gruppe har en
  `<ul class="guest-list">` med ét `<li>Navn</li>` pr. gæst eller par.
- Udseendet ligger i `styles.css`.
- `assets/invitation.png` er invitationen uden gæstenavne, som vises på siden.
  `assets/invitation.pdf` er en PDF-kopi lavet fra det samme billede.
- `assets/photos/` indeholder billederne: `mark.jpg` er det store billede
  øverst, `kys.jpg` står ved hilsenen, og `ringe.jpg`, `skoven.jpg`,
  `buket.jpg` og `kram.jpg` udgør billedrækken. Udskift en fil med et nyt
  billede med samme navn for at skifte det. Filerne med `-900`/`-1200` er
  mindre udgaver til mobil.
- Skrifttypen Cormorant Garamond ligger lokalt i `assets/fonts/` (OFL-licens),
  så siden ikke henter noget fra tredjeparter.

Siden og dens filer er offentlige, inklusive telefonnumre og gæstelisten.
SU-fristen gengives som en oplysning fra den udsendte invitation, ikke som en
ny tilmeldingsmulighed.

## GitHub Pages

Filerne kan hostes direkte fra repositoryets rod. Når siden skal offentliggøres:

1. Gå til **Settings → Pages** i GitHub.
2. Vælg **Deploy from a branch** som kilde.
3. Vælg den branch, der indeholder hjemmesiden, og mappen **/ (root)**, og gem.

Pages er ikke aktiveret som en del af implementeringen. Alle lokale links er
relative, så siden også virker under GitHub Pages' repository-sti.
