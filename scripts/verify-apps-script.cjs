const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('google-apps-script/Code.gs', 'utf8');

function runWithSheets(sheets) {
  const logs = [];
  const context = {
    SPREADSHEET_ID: 'fixture-sheet-id',
    SERVICE_SHEET: 'syarat_surat',
    PROFILE_SHEET: 'info_kelurahan',
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: (name) => sheets[name] || null }),
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (text) => ({
        text,
        mimeType: null,
        setMimeType(type) { this.mimeType = type; return this; },
      }),
    },
    console: { error: (message) => logs.push(message) },
  };
  vm.createContext(context);
  const fixtureSource = source.replace(
    "const SPREADSHEET_ID = 'REPLACE_WITH_REAL_SPREADSHEET_ID';",
    "const SPREADSHEET_ID = 'fixture-sheet-id';",
  );
  vm.runInContext(fixtureSource, context);
  return { response: context.doGet(), logs };
}

const sheet = (values) => ({ getDataRange: () => ({ getDisplayValues: () => values }) });
const success = runWithSheets({
  syarat_surat: sheet([
    ['kategori', 'nama_surat', 'persyaratan'],
    ['Sosial', 'Fixture service', '1. First\n2. Second'],
    ['', '', ''],
    ['Kependudukan', '', 'incomplete row'],
  ]),
  info_kelurahan: sheet([
    ['key', 'value'],
    ['nama_kelurahan', 'Kelurahan Ketapang'],
    ['', ''],
  ]),
});
assert.equal(success.response.mimeType, 'application/json');
const payload = JSON.parse(success.response.text);
assert.deepEqual(Object.keys(payload).sort(), ['info_kelurahan', 'syarat_surat']);
assert.equal(payload.syarat_surat.length, 1);
assert.equal(payload.syarat_surat[0].persyaratan, '1. First\n2. Second');
assert.deepEqual(payload.info_kelurahan, [{ key: 'nama_kelurahan', value: 'Kelurahan Ketapang' }]);

const empty = runWithSheets({
  syarat_surat: sheet([['kategori', 'nama_surat', 'persyaratan']]),
  info_kelurahan: sheet([['key', 'value']]),
});
assert.deepEqual(JSON.parse(empty.response.text), { syarat_surat: [], info_kelurahan: [] });

const missingTab = runWithSheets({ syarat_surat: sheet([['kategori', 'nama_surat', 'persyaratan']]) });
assert.deepEqual(JSON.parse(missingTab.response.text), { error: 'Data layanan sementara tidak tersedia.' });
assert.equal(missingTab.logs.length, 1);

const missingHeader = runWithSheets({
  syarat_surat: sheet([['category', 'nama_surat', 'persyaratan']]),
  info_kelurahan: sheet([['key', 'value']]),
});
assert.deepEqual(JSON.parse(missingHeader.response.text), { error: 'Data layanan sementara tidak tersedia.' });

console.log('Apps Script contract checks passed: valid rows, header exclusion, blank rows, empty tables, missing tab/header, JSON MIME type.');
