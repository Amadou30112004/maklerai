// In Google Sheets: Erweiterungen > Apps Script, Code einfügen, SECRET setzen,
// dann Bereitstellen > Neue Bereitstellung > Web-App,
// Ausführen als: Ich, Zugriff: Jeder. Die URL in GOOGLE_SHEETS_WEBHOOK_URL eintragen.
const SECRET = 'HIER_DEN_GLEICHEN_SCHLUESSEL_WIE_IN_GOOGLE_SHEETS_SECRET';
const EMPFAENGER = 'amadou@jalloh.net';
const BLATT = 'Anfragen';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return antwort(false);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BLATT)
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet(BLATT);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Eingegangen', 'Name', 'Maklerbüro', 'E-Mail', 'Telefon',
        'Bürogröße', 'Schwerpunkt', 'Interessen', 'Größter Zeitfresser']);
    }
    const zeile = [new Date(d.eingegangen), d.name, d.buero, d.email, d.telefon,
      d.groesse, d.schwerpunkt, (d.interessen || []).join(', '), d.zeitfresser]
      .map(sauber);
    sheet.appendRow(zeile);
    MailApp.sendEmail(EMPFAENGER, 'Neue Anfrage: ' + sauber(d.buero),
      zeile.slice(1).map((w, i) => sheet.getRange(1, i + 2).getValue() + ': ' + w).join('\n'));
    return antwort(true);
  } catch (err) {
    return antwort(false);
  }
}

// Schutz gegen Formel-Einschleusung in Tabellen
function sauber(w) {
  const s = w == null ? '' : String(w);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function antwort(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok }))
    .setMimeType(ContentService.MimeType.JSON);
}
