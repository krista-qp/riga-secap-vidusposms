# Rīgas SECAP 2022–2030 vidusposma pārskats – vietne

Statiska vietne GitHub Pages publicēšanai. Rāda SECAP2030 vidusposma pārskatu: CO₂ emisijas, 22 mērķu izpildi, 65 rādītājus (2020–2025), 47 pasākumus, sektoru izaicinājumus un nākamos soļus, kā arī atvērto datu lejupielādes.

**Statuss:** darba versija kolēģu pārskatīšanai un papildināšanai (2026. gada oktobris). Vietnei ir `noindex` atzīme – meklētājprogrammas to neindeksē.

## Struktūra

| Ceļš | Saturs |
|---|---|
| `index.html` | Sākums: kopsavilkums, mērķu statuss, sektori, CO₂ emisijas, pasākumu īstenošana |
| `pasvaldiba.html`, `ekas.html`, `energija.html`, `transports.html` | Sektoru lapas: mērķi, rādītāji, pasākumi, izaicinājumi, nākamie soļi |
| `merki.html` | Visi mērķi ar filtriem (saites prezentācijai: `#merki-pas`, `#merki-dz`, `#merki-en`, `#merki-tr`, `#merki-kop`) |
| `pasakumi.html` | Visi pasākumi ar filtriem; saite uz pasākumu, piem. `pasakumi.html#E5` |
| `raditaji.html` | Rādītāju pārlūks; saite uz rādītāju, piem. `raditaji.html#3002` |
| `dati.html`, `par.html`, `en.html` | Lejupielādes un licence; metode un secinājumi; kopsavilkums angliski |
| `assets/` | Stils, skripts, dati (`data.js`), fonts Outfit, ikona |
| `dati/` | Lejupielādes: pārskats (PDF), dati (XLSX, CSV) |
| `avoti/` | Avota datnes, no kurām veidota vietne |
| `build/build.py` | Skripts, kas no avota datnēm izveido `assets/data.js` un `dati/` |

Vietne darbojas arī lokāli – atveriet `index.html` pārlūkā.

## Publicēšana GitHub Pages

1. GitHub izveidojiet jaunu publisku repozitoriju, piem. `riga-secap-vidusposms`.
2. Augšupielādējiet visu šīs mapes saturu (**Add file → Upload files**, ievelciet visas datnes un mapes, arī `.nojekyll`).
3. **Settings → Pages → Build and deployment**: Source – *Deploy from a branch*, Branch – `main`, mape `/ (root)`. Saglabājiet.
4. Pēc 1–2 minūtēm vietne būs pieejama: `https://<lietotājvārds>.github.io/riga-secap-vidusposms/`.

Vēlāk repozitoriju var nodot REA kontam (**Settings → Transfer ownership**) un piesaistīt savu domēnu (**Settings → Pages → Custom domain**).

## Satura atjaunošana

1. Labojiet avota datnes:
   - `avoti/Riga-SECAP-saturs.xlsx` – teksti, pasākumu statuss, izaicinājumi, nākamie soļi (norādījumi lapā “Lasi mani”);
   - `avoti/Riga-SECAP-2025-Raditaji.xlsx` – mērķi un rādītāju vērtības (saglabājiet ar Excel, lai formulu vērtības atjaunotos).
2. Palaidiet: `pip install openpyxl` un `python3 build/build.py` (no repozitorija saknes).
3. Augšupielādējiet mainītās datnes (`avoti/`, `assets/data.js`, `dati/`).

Ja mainās pārskata PDF, aizstājiet `dati/Riga-SECAP-vidusposma-parskats-2026-darba-versija.pdf` un palaidiet skriptu vēlreiz.

**Iestatījumi** (`build/build.py`, `SITE`): e-pasta adrese papildinājumiem (`contact_email`), versijas nosaukums, licence, versiju vēsture. Mērķu sasaiste ar rādītājiem – `TARGETS`.

**Pirms galīgās publicēšanas:** noņemiet `<meta name="robots" content="noindex">` no HTML lapām un nomainiet `version_label` uz galīgo versiju.

## Licences

- Dati un teksti: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.lv) – Rīgas enerģētikas aģentūra (REA).
- Programmkods (`assets/app.js`, `assets/style.css`, `build/`): MIT.
- Fonts Outfit: SIL Open Font License 1.1 (`assets/fonts/OFL-LICENSE.txt`).
- Rīgas logotips un zīmola elementi nav ietverti atvērtajās licencēs; tos izmanto saskaņā ar Rīgas zīmola vadlīnijām.

---

*English:* Static website for the mid-term review of the Riga Sustainable Energy and Climate Action Plan 2022–2030. Content is in Latvian, with an English summary at `en.html`. Data and texts are licensed CC BY 4.0. Rebuild the data with `python3 build/build.py`.
