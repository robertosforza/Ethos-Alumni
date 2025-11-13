# ETHOS Alumni Network – Technical Handbook
Versione 1.0 — per amministratori e membri del Comitato Alumni

Questo handbook spiega come **gestire, aggiornare ed estendere** il sito web ETHOS Alumni Network ospitato su GitHub Pages, anche senza competenze tecniche avanzate.  
È pensato per essere chiaro, pratico e sicuro, così che chiunque del team possa aggiornare il sito senza timore di rompere tutto.

---

## 1. Architettura del sito

Il repository contiene questi file principali:

| File | Funzione |
|------|----------|
| `index.html` | Home page del sito (Chi siamo, Directory Alumni, Eventi base) |
| `members.json` | Archivio dati dei membri (nomi, ruoli, affiliazioni, contatti) |
| `main.js` | Logica che legge il JSON e genera le card dei profili |
| `styles.css` | Stile visivo (colori, font, layout) |
| `join.html` | Pagina candidature |
| `privacy.html` | Pagina Privacy & GDPR |
| *(opzionale)* `events.html`, `mentorship.html`, ecc. | Pagine aggiuntive create dagli admin |
| `README.md` | Questo manuale tecnico |

---

## 2. Come modificare un file su GitHub

Ogni modifica al sito passa da GitHub.

1. Vai al repository (es. `https://github.com/TUONOME/ethos-alumni`).
2. Clicca sul file da modificare (es. `members.json`).
3. In alto a destra clicca l’icona **matita** (Edit this file).
4. Modifica il testo nel riquadro.
5. In fondo alla pagina scrivi un breve messaggio di commit (es. `Aggiornato profilo Sforza`).
6. Clicca **Commit changes**.

Il sito si aggiorna automaticamente entro ~1 minuto.

### Se qualcosa si rompe

Nel 90% dei casi è un errore in `members.json` (virgole o virgolette mancanti).

Per tornare indietro:

1. Apri il file problematico (es. `members.json`).
2. Clicca sulla tab **History**.
3. Apri una versione precedente che funzionava.
4. Usa il pulsante per ripristinarla (Revert / Restore).

---

## 3. Gestione dei membri (members.json)

Tutti i membri sono contenuti nel file:

```text
members.json
```

La struttura generale è:

```json
{
  "members": [
    {
      "name": "Nome Cognome",
      "role": "Ruolo principale",
      "affiliation": "Affiliazione principale",
      "affiliations": [
        "Affiliazione A",
        "Affiliazione B"
      ],
      "location": "Città, Paese",
      "areas": ["Area 1", "Area 2"],
      "linkedin": "https://www.linkedin.com/in/username",
      "email": "nome.cognome@example.com",
      "phone": "+39 333 123 4567",
      "website": "https://sitopersonale.com"
    }
    // altri membri...
  ]
}
```

### 3.1 Aggiungere un nuovo membro

1. Apri `members.json` in modalità modifica (matita).
2. Scorri fino in fondo, dentro l’array `"members": [ ... ]`.
3. Assicurati che il penultimo membro termini con una virgola **`,`**.
4. Incolla il seguente template subito prima della chiusura `]`:

```json
{
  "name": "Nome Cognome",
  "role": "Young ETHOS Fellow",
  "affiliation": "ETHOS • LUISS",
  "affiliations": [
    "ETHOS • LUISS",
    "Seconda Affiliazione (facoltativa)"
  ],
  "location": "Roma, Italia",
  "areas": ["AI Ethics", "Etica e Politica"],
  "linkedin": "https://www.linkedin.com/in/username",
  "email": "nome.cognome@example.com",
  "phone": "+39 333 123 4567",
  "website": "https://sitopersonale.com"
}
```

Regole:

- Ogni membro è racchiuso tra `{ ... }`.
- Tra un membro e il successivo deve esserci una **virgola**.
- **L’ultimo membro** non deve avere la virgola finale.

### 3.2 Modificare un membro esistente

1. In `members.json`, trova il blocco corrispondente al membro.
2. Modifica i valori tra virgolette (nome, ruolo, ecc.).
3. Salva con **Commit changes**.

### 3.3 Campi facoltativi

I campi seguenti sono facoltativi (possono mancare senza causare errori):

- `affiliations`
- `phone`
- `website`

Se non presenti, semplicemente non vengono mostrati nelle card.

### 3.4 Aggiungere campi personalizzati

Puoi aggiungere altri campi, ad esempio:

```json
"research_interests": ["Etica del digitale", "Pluralismo", "AI Governance"]
```

Se non vengono usati in `main.js`, restano “nascosti” ma non danno errore.

---

## 4. Aree tematiche e filtri

Le opzioni del filtro “Area” si trovano in `index.html`:

```html
<select id="areaFilter">
  <option value="">Tutte le aree</option>
  <option>Business Ethics</option>
  <option>Digital Ethics</option>
  <option>Bioetica</option>
  <option>AI Ethics</option>
  <option>Etica e Politica</option>
  <option>Etica della Globalizzazione</option>
</select>
```

Per aggiungere una nuova area (es. “Etica Ambientale”):

1. Aggiungi una riga:

```html
<option>Etica Ambientale</option>
```

2. Nei membri pertinenti aggiungi la stessa stringa in `areas`, ad esempio:

```json
"areas": ["Etica Ambientale", "Etica e Politica"]
```

Il filtro userà automaticamente quel valore.

---

## 5. Visualizzazione dei profili (main.js)

La funzione `renderCards` in `main.js` decide come vengono mostrate le informazioni dei membri.

### 5.1 Versione estesa consigliata

Sostituisci **tutta** la funzione `renderCards` con questa versione, che supporta:

- affiliazioni multiple (`affiliations`),
- telefono (`phone`),
- sito personale (`website`),
- campi facoltativi (se mancanti, non rompono il layout).

```js
function renderCards(list) {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';

  list.forEach(m => {
    const el = document.createElement('div');
    el.className = 'card';

    const allAffiliations = (m.affiliations && m.affiliations.length > 0)
      ? m.affiliations
      : (m.affiliation ? [m.affiliation] : []);

    const affiliationsText = allAffiliations.join(' • ');

    el.innerHTML = `
      <h3>${m.name}</h3>
      <p><strong>${m.role || ''}</strong>${affiliationsText ? ' • ' + affiliationsText : ''}</p>
      <p>${m.location || ''}</p>
      <div class="badges">
        ${(m.areas || []).map(a => `<span class="badge">${a}</span>`).join('')}
      </div>
      <p>
        ${m.linkedin ? `<a href="${m.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
        ${m.email ? `${m.linkedin ? ' • ' : ''}<a href="mailto:${m.email}">Email</a>` : ''}
        ${m.phone ? `${(m.linkedin || m.email) ? ' • ' : ''}<a href="tel:${m.phone.replace(/\\s+/g, '')}">Tel: ${m.phone}</a>` : ''}
        ${m.website ? `${(m.linkedin || m.email || m.phone) ? ' • ' : ''}<a href="${m.website}" target="_blank" rel="noopener">Sito personale</a>` : ''}
      </p>
    `;

    cards.appendChild(el);
  });
}
```

Dopo aver salvato:

- se un membro ha più affiliazioni (`affiliations`), saranno mostrate tutte,
- se ha telefono e/o sito, compariranno come link cliccabili,
- se un campo manca, non viene mostrato ma il sito continua a funzionare.

---

## 6. Aggiungere sezioni alla Home (index.html)

La home (`index.html`) è organizzata in sezioni:

```html
<section id="nome-sezione" class="container">
  <h2>Titolo</h2>
  <p>Testo...</p>
</section>
```

### 6.1 Esempio: sezione “Mentorship”

Inserisci questo blocco **tra** la sezione directory e la sezione eventi:

```html
<section id="mentorship" class="container">
  <h2>Mentorship</h2>
  <p>
    Il programma di mentorship ETHOS collega alumni senior con studenti e giovani ricercatori
    interessati all'etica pubblica.
  </p>
  <ul class="events">
    <li><strong>Ciclo pilota 2025</strong> – 3 incontri one-to-one, abbinamento per area tematica.</li>
  </ul>
</section>
```

Per collegarla dal menu di navigazione in alto, modifica il `<nav>`:

```html
<nav>
  <a href="index.html">Home</a>
  <a href="#directory">Membri</a>
  <a href="#mentorship">Mentorship</a>
  <a href="#events">Eventi</a>
  <a href="join.html">Candidature</a>
  <a href="privacy.html">Privacy</a>
</nav>
```

---

## 7. Creare nuove pagine (es. events.html)

Puoi creare pagine dedicate per Eventi, Mentorship, Progetti, ecc.

### 7.1 Creare `events.html`

1. In GitHub clicca **Add file → Create new file**.
2. Nome del file: `events.html`.
3. Incolla il template seguente:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Eventi – ETHOS Alumni Network</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <div class="brand">
        <div class="logo">ETHOS</div>
        <div class="subtitle">Observatory of Public Ethics</div>
      </div>
      <nav>
        <a href="index.html">Home</a>
        <a href="#directory">Membri</a>
        <a href="events.html">Eventi</a>
        <a href="join.html">Candidature</a>
        <a href="privacy.html">Privacy</a>
      </nav>
    </div>
  </header>

  <main class="container" style="padding:24px 0">
    <h1>Eventi &amp; Iniziative</h1>
    <p>Questa pagina raccoglie gli eventi principali collegati a ETHOS e alla rete Alumni.</p>

    <h2>Prossimi eventi</h2>
    <ul class="events">
      <li><strong>ETHOS Talk – Etica dell'Intelligenza Artificiale</strong> (Roma, data TBA)</li>
    </ul>

    <h2>Eventi passati</h2>
    <ul class="events">
      <li><strong>Workshop: Etica e Impresa</strong> – Luiss Business School (2024)</li>
    </ul>
  </main>
</body>
</html>
```

4. Salva con **Commit changes**.

### 7.2 Collegarla nel menu

In `index.html`, nel `<nav>`, sostituisci o aggiungi:

```html
<a href="events.html">Eventi</a>
```

---

## 8. Candidature e Privacy

### 8.1 Candidature (join.html)

Nel file `join.html` c’è il bottone per aprire il modulo di candidatura.  
Sostituisci `#` con il link reale del form (Google Forms, Typeform, ecc.):

```html
<a class="btn" href="https://forms.gle/IL_TUO_LINK" target="_blank" rel="noopener">
  Apri modulo candidatura
</a>
```

### 8.2 Privacy (privacy.html)

La pagina `privacy.html` contiene un testo base.  
Gli admin possono:

- aggiornare i riferimenti istituzionali (ETHOS, LUISS),
- aggiornare la mail di contatto per richieste GDPR (es. `privacy@ethos.example`),
- sostituire il testo con una privacy policy ufficiale se/quando fornita.

---

## 9. GitHub Pages: attivazione e controllo

Per verificare che il sito sia pubblicato:

1. Vai in **Settings → Pages** del repository.
2. Controlla che:
   - **Source** sia `Deploy from a branch`,
   - **Branch** sia `main` e directory `/ (root)`.
3. Sopra le impostazioni comparirà l’URL del sito, ad esempio:

```text
https://TUONOME.github.io/ethos-alumni
```

Se fai modifiche e non vedi aggiornamenti:

- ricarica la pagina con `Ctrl + F5` (refresh forzato),
- attendi 1–2 minuti (GitHub Pages può avere un lieve ritardo).

---

## 10. Risoluzione rapida dei problemi

| Problema | Causa probabile | Soluzione |
|---------|------------------|----------|
| La directory Alumni non si vede più | JSON non valido in `members.json` | Controlla virgole e virgolette / ripristina una versione precedente |
| Una card appare vuota o “strana” | Campo mancante o valore formato male | Confronta con un membro che funziona e correggi la struttura |
| Un link del menu non porta da nessuna parte | Percorso errato (es. `events.htm` invece di `events.html`) | Correggi l’attributo `href` nel `<nav>` |
| Il sito non si aggiorna subito | Cache del browser o deploy in corso | Hard refresh (Ctrl+F5) e attendi qualche minuto |

---

Per modifiche strutturali più complesse (nuovi template, login protetto, dominio personalizzato), è consigliabile confrontarsi con un referente tecnico o con il team che ha avviato il progetto.
