# Backend Restoration Test Report

## Passed

- Workbook builder produced an `.xlsx` with tabs `syarat_surat`, `info_kelurahan`, and `README`.
- Workbook inspection found headers `kategori`, `nama_surat`, `persyaratan` and 16 service rows, plus `key`, `value` profile headers and no unverified profile data.
- Apps Script code review confirms tab/header checks, header exclusion, string mapping, blank-row filtering, JSON MIME output, and generic public errors.
- `node scripts/verify-apps-script.cjs` passed against a local Apps Script API stub: valid rows, exact success keys, header exclusion, empty/partial rows, empty tables, missing tab/header, and JSON MIME type.
- Node syntax check (`node --check` via stdin) passed for `google-apps-script/Code.gs`.
- `git diff --check` passed for repository edits.

## Failed / unavailable

- Frontend `npm run build` and `npm run lint` are unavailable in this checkout because project dependencies are not installed; no install was attempted because network access is blocked in this environment.
- Direct Apps Script and production-site requests were blocked by the environment's network proxy.
- No Google Drive/Sheets or Apps Script authorization was available. The spreadsheet and deployment were not created, configured, or published.

## Not run

- Live Apps Script syntax execution/authorization and browser CORS verification.
- Vercel environment-variable configuration or production deployment.
- End-to-end fetch/render against live data.
- Pixel-level line-by-line image comparison by a Kelurahan reviewer. Known photo limitations are documented in `transcription-review.md`.
- Frontend automated tests: the project has no test script or configured test framework.

The local workbook and Apps Script source are artifacts only; they do not establish a working production integration until the manual setup and live checks in `google-sheets-backend.md` are complete.
