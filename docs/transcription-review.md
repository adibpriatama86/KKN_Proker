# Transcription Review: Ketapang Service Requirements

## Source files

The four user-provided photographs are the sole sources for service names and requirements in this draft:

| Source | Visible subject | Review status |
|---|---|---|
| `IMG_4454.JPEG` | Administrasi Kependudukan, left/main panel | Clear entries transcribed; final service at the bottom is cut off after item 6 |
| `IMG_4455.JPEG` | Administrasi Kependudukan, central/right panel | Main central cards transcribed; adjacent cards at the edges are cut off |
| `IMG_4456.JPEG` | Pindah dan administrasi kependudukan | Akta perceraian and pindah datang dalam satu desa/kelurahan transcribed; two other cards are obstructed/cropped |
| `IMG_4457.JPEG` | Administrasi Lainnya | Six complete cards transcribed |

## Category mapping used

The current UI only accepts exact categories `Kependudukan`, `Sosial`, and `Ekonomi` (`src/components/LayananSuratGrid.jsx`). The photo headings use broader administrative groupings, not the UI taxonomy. Civil-registration/migration items are mapped to `Kependudukan`; the two SKTM items are mapped to `Sosial`. The remaining `Administrasi Lainnya` cards are mapped to `Kependudukan` as the closest existing administrative category. This is a presentation mapping, not a claim that the source poster labels them that way. No `Ekonomi` item is visible in these four photos.

## Included transcription checklist

- [ ] Compare each workbook row against the original full-resolution image.
- [ ] Confirm source spellings and punctuation, including printed typos such as `di ketahui`/`ditahui`.
- [ ] Confirm the numbering for the final parent-death document under `AKTA KELAHIRAN` in `IMG_4455.JPEG`; it appears after item 7 without a visible number.
- [ ] Confirm whether the small sheet overlaid on `IMG_4456.JPEG` should be treated as an authoritative separate requirement source.
- [ ] Have Kelurahan Ketapang validate that the photographed requirements remain current before publication.

The checkboxes are intentionally open. The transcriptions have been visually drafted from the supplied images but have not been independently confirmed by Kelurahan staff.

## Unresolved readings excluded from the import workbook

1. **IMG_4454, bottom card:** `PENAMBAHAN ANGGOTA KARTU KELUARGA (KK) KARENA KELAHIRAN`. Items 1–6 are partly visible, but the card continues beyond the bottom crop. Do not publish a partial list until the complete source is provided.
2. **IMG_4455, right edge:** Several neighboring green/blue/purple cards are clipped; headings and requirement text are incomplete and cannot be reconstructed safely.
3. **IMG_4456, `PINDAH ANTAR DESA/KELURAHAN`:** The heading is partially covered by a paper notice and the requirement text is obstructed/cropped. Excluded pending a clear image.
4. **IMG_4456, lower migration card:** The heading visibly begins `PINDAH ANTAR KECAMATAN D...` but is cut off. Most of its numbered requirements are readable, but the service name and parts of item 3 are not. Excluded pending a full image.
5. **IMG_4456, right edge:** Additional card fragments are not sufficiently legible to transcribe.
6. **IMG_4456, paper overlay:** Tiny unnumbered list appears to concern KK addition and birth certificates. The photo resolution is insufficient to verify the text fully or determine whether it is a separate authoritative source. Excluded pending a close, straight-on photo.

## Transcription conventions

- Source order is preserved: image order supplied by the user, then top-to-bottom within each image.
- Numbering and wording are retained in `persyaratan`; line breaks separate items and wrapped source lines are joined into their original item.
- No entries were deduplicated.
- `[?]` indicates the source visually does not provide a confidently readable numbering/wording. Such uncertainty is called out here rather than silently supplied from mock data.
- The service workbook contains only complete, legible entries. Profile/contact rows are blank because these images do not verify profile information.
