# Google Sheets + Apps Script Setup

This repository now contains an import workbook, a read-only Apps Script endpoint, and the frontend's existing `VITE_API_URL` integration. No Google account, Drive, Apps Script, or Vercel access was available during this work, so no external resource was created or deployed.

## 1. Import the workbook

1. Open Google Drive and choose **New → File upload**.
2. Upload `artifacts/ketapang-data-template.xlsx`.
3. Open it with Google Sheets (or use **File → Import → Upload** in a new Sheet and choose the workbook).
4. Confirm the tabs are named exactly `syarat_surat`, `info_kelurahan`, and `README`.
5. Confirm the data headers, including exact spelling and lowercase, are:
   - `syarat_surat`: `kategori`, `nama_surat`, `persyaratan`
   - `info_kelurahan`: `key`, `value`
6. Review every service against the photos using `docs/transcription-review.md`. Correct uncertainties only from a clearer source or Kelurahan confirmation. The current 16 rows are drafts from the photographs and need local-office validation before publication.
7. Add profile values only after verification. The template intentionally has no profile records.

The spreadsheet ID is the long identifier in the Google Sheets URL between `/d/` and `/edit`. It is configuration, not a credential, but should not be fabricated.

## 2. Create the read-only Web App

1. In the imported Sheet, open **Extensions → Apps Script**.
2. Replace the editor contents with `google-apps-script/Code.gs`.
3. In the `SPREADSHEET_ID` constant near the top, replace `REPLACE_WITH_REAL_SPREADSHEET_ID` with the actual ID from the Sheet URL. Keep the value quoted.
4. Save the project. Run `doGet` once from the Apps Script editor to trigger authorization for the account that owns/runs the script. Review and grant the requested spreadsheet read access.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to the spreadsheet owner/account that should read the Sheet. Choose access that allows the public website's anonymous visitors to read the endpoint (typically **Anyone**). Do not add any write endpoint or edit permission.
7. Deploy and copy the Web App URL ending in `/exec`.
8. Open that URL in a private browser window. Confirm the response is JSON with `syarat_surat` and `info_kelurahan` arrays and that it contains no error object. Test again after editing a service row.

The public endpoint exposes all nonblank rows in these two tabs to anyone who can reach the URL. Keep private/personal information out of the workbook. The script is read-only and ignores other tabs. A deployment that executes as the owner can read the owner's Sheet, so grant access only to the intended spreadsheet and keep script editors limited to trusted maintainers.

If you edit Apps Script later, deploy a new version through **Deploy → Manage deployments → Edit**. Confirm the deployment is updated; editing the source alone does not update an existing deployed version.

## 3. Configure Vercel

In the Vercel project settings, add/update these environment variables for the production environment:

| Name | Value |
|---|---|
| `VITE_API_URL` | The tested Google Apps Script Web App `/exec` URL |
| `VITE_USE_MOCK` | `false` |

The local `.env` remains machine-local configuration and is not replaced here. Vite embeds `VITE_*` values into the browser bundle, so never put credentials or private tokens in them. After saving Vercel's values, trigger a fresh production deployment, then inspect the website's browser network response and service rendering. Do not claim the integration works until this live check passes.

## Response contract

Successful response:

```json
{
  "syarat_surat": [
    { "kategori": "Kependudukan", "nama_surat": "...", "persyaratan": "..." }
  ],
  "info_kelurahan": [
    { "key": "...", "value": "..." }
  ]
}
```

The Apps Script takes column names from the first row, trims values, excludes the header row, skips completely/partially blank records, and returns text strings. It requires each tab and required header to exist. Detailed errors go to Apps Script execution logs; the public error response is generic. ContentService supports JSON MIME type but not custom HTTP status codes, so a failed Apps Script response can still have an HTTP-success status; the frontend's response-shape check will treat it as an invalid API response and show its generic load error.
