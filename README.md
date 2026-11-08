# kobberbryllup
En enkel, responsiv hjemmeside til vores kobberbryllup, bygget til GitHub Pages.

## Filer og indhold

Åbn `index.html` direkte i en browser. Der er ingen afhængigheder, byggetrin
eller runtime-server. Den eneste JavaScript er `upload.js` til billedupload.

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

- Billedupload: se afsnittet nedenfor. Sektionen er skjult, indtil der er
  indsat en upload-adresse.

Siden og dens filer er offentlige, inklusive telefonnumre og gæstelisten.

## GitHub Pages

Filerne kan hostes direkte fra repositoryets rod. Når siden skal offentliggøres:

1. Gå til **Settings → Pages** i GitHub.
2. Vælg **Deploy from a branch** som kilde.
3. Vælg den branch, der indeholder hjemmesiden, og mappen **/ (root)**, og gem.

Pages er ikke aktiveret som en del af implementeringen. Alle lokale links er
relative, så siden også virker under GitHub Pages' repository-sti.

## Billedupload til Google Drive

Gæster kan tage eller vælge billeder på telefonen uden login. Billederne gemmes
i fuld opløsning i en mappe i jeres Google Drive via et lille Google Apps
Script (`google-apps-script/Code.gs`).

1. Opret en mappe i Google Drive, fx "Kobberbryllup billeder". Mappe-id'et er
   den sidste del af adressen: `drive.google.com/drive/folders/<MAPPE-ID>`.
2. Gå til [script.google.com](https://script.google.com), og opret et nyt
   projekt. Erstat indholdet med `google-apps-script/Code.gs`.
3. Indsæt mappe-id'et i `FOLDER_ID`, og gem.
4. Vælg **Implementér → Ny implementering → Webapp** med
   **Kør som: Mig** og **Hvem har adgang: Alle** (ikke "Alle med en
   Google-konto"). Godkend adgangen til Drive.
5. Kopiér webapp-adressen, der slutter på `/exec`. Åbn den i en browser for at
   tjekke, at der står "Upload-tjenesten kører."
6. Indsæt adressen i `data-upload-url=""` på sektionen `id="billeder"` i
   `index.html`. Så vises sektionen og linket "Billeder" øverst.

Efter festen kan mappen downloades samlet fra Google Drive som zip. Fjern
adressen fra `index.html` igen, eller slet implementeringen i Apps Script, når
der ikke skal uploades flere billeder.

Ændrer I `Code.gs` senere, skal I bruge **Administrer implementeringer →
Rediger → Ny version**, så adressen forbliver den samme.
