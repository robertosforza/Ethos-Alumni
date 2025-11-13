# ETHOS Alumni Network – GitHub Pages Starter

Questo repository contiene un sito statico minimal per ospitare l'**ETHOS Alumni Network** su **GitHub Pages**.

## 🚀 Avvio rapido
1. Crea un nuovo repository su GitHub (pubblico o privato con Pages abilitate).
2. Copia i file di questa cartella (o carica lo zip) nel branch `main`.
3. Vai su **Settings → Pages** e imposta `Deploy from branch: main / root`.
4. Dopo il deploy, il sito sarà visibile su `https://USERNAME.github.io/REPO` (o su dominio personalizzato).

## 🧱 Struttura
- `index.html` – home + directory membri (renderizzata da `members.json`)
- `members.json` – dati dei membri (nome, ruolo, aree, link)
- `join.html` – istruzioni di candidatura
- `privacy.html` – placeholder GDPR
- `styles.css` – stile minimale
- `main.js` – logica di ricerca/filtri

## 🔐 Accesso e controllo
GitHub Pages è pubblico per impostazione predefinita. Per un **accesso riservato** valuta:
- **Cloudflare Access** (SSO con email LUISS/ETHOS; un livello di login davanti al sito)
- Oppure, ospitare su **Cloudflare Pages / Vercel / Netlify** con protezione via password/SSO

## 👥 Governance del network
- **Candidature** tramite modulo (Google Forms/Typeform) → revisione manuale.
- **Aggiornamenti profilo** tramite Pull Request su `members.json` o issue template.
- **Verifica**: mantieni un piccolo comitato editoriale (2–3 admin).

## 🧩 Personalizzazioni utili
- Aggiungi badge/filtri per aree: Business Ethics, Digital Ethics, Bioetica, AI Ethics, Etica e Politica, ecc.
- Integra newsletter (Buttondown, Mailchimp) con un semplice form.
- Crea una pagina `events.html` con calendario (Google Calendar embed).

## 📄 Note legali (GDPR)
- Minimizza i dati raccolti; conserva consenso esplicito.
- Pubblica una privacy policy adeguata; gestisci diritti degli interessati.
- Valuta la localizzazione dei dati (GitHub: USA).

## 🛠️ Per sviluppatori
Nessun build step: è un sito statico HTML/CSS/JS. Se vuoi evolvere:
- Migrazione a **Jekyll/Hugo/Astro** per contenuti complessi.
- Aggiungi CI (link checker, lint) in `.github/workflows/`.
