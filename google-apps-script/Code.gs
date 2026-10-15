/**
 * Read-only JSON API for the Ketapang public-service portal.
 * Set SPREADSHEET_ID to the imported workbook's Google Sheets ID.
 */
const SPREADSHEET_ID = 'REPLACE_WITH_REAL_SPREADSHEET_ID';
const SERVICE_SHEET = 'syarat_surat';
const PROFILE_SHEET = 'info_kelurahan';

function doGet() {
  try {
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'REPLACE_WITH_REAL_SPREADSHEET_ID') {
      throw new Error('Spreadsheet is not configured.');
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const syaratSurat = readTable_(spreadsheet, SERVICE_SHEET, [
      'kategori', 'nama_surat', 'persyaratan',
    ]).map((row) => ({
      kategori: row.kategori,
      nama_surat: row.nama_surat,
      persyaratan: row.persyaratan,
    }));
    const infoKelurahan = readTable_(spreadsheet, PROFILE_SHEET, [
      'key', 'value',
    ]).map((row) => ({
      key: row.key,
      value: row.value,
    }));

    return jsonOutput_({
      syarat_surat: syaratSurat,
      info_kelurahan: infoKelurahan,
    });
  } catch (error) {
    // Details go to Apps Script logs only; never expose spreadsheet IDs or
    // internal exception messages through the public endpoint.
    console.error('Ketapang API request failed: ' + error.message);
    return jsonOutput_({ error: 'Data layanan sementara tidak tersedia.' });
  }
}

function readTable_(spreadsheet, sheetName, requiredHeaders) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error('Required sheet is missing: ' + sheetName);

  const values = sheet.getDataRange().getDisplayValues();
  if (!values.length) throw new Error('Required header row is missing: ' + sheetName);

  const headers = values[0].map((header) => String(header).trim());
  const indexes = {};
  requiredHeaders.forEach((header) => {
    indexes[header] = headers.indexOf(header);
    if (indexes[header] === -1) {
      throw new Error('Required header is missing from ' + sheetName + ': ' + header);
    }
  });

  return values.slice(1)
    .map((cells) => {
      const row = {};
      requiredHeaders.forEach((header) => {
        row[header] = String(cells[indexes[header]] || '').trim();
      });
      return row;
    })
    .filter((row) => requiredHeaders.every((header) => row[header] !== ''));
}

function jsonOutput_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
