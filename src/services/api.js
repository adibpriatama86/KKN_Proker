// ============================================================
// API Service Layer – Kelurahan Ketapang Portal
// Geographic anchor: Kel. Ketapang, Kec. Kendal, Kab. Kendal,
// Jawa Tengah 51319 | Coords: -6.9387, 110.2139
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetches all data from the Google Apps Script Web App endpoint.
 * @returns {{ syarat_surat: Array, info_kelurahan: Array }}
 */
export async function fetchKelurahanData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
      mode: 'cors',
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} – ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.syarat_surat || !data.info_kelurahan) {
      throw new Error('Format data dari server tidak valid.');
    }

    return {
      syarat_surat: data.syarat_surat ?? [],
      info_kelurahan: data.info_kelurahan ?? [],
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Permintaan data timeout. Periksa koneksi internet Anda.');
    }
    throw error;
  }
}

/**
 * Convert info_kelurahan array into a key-value map.
 * @param {Array} infoArray
 * @returns {Object}
 */
export function mapInfoKelurahan(infoArray = []) {
  return infoArray.reduce((acc, item) => {
    if (item.key) acc[item.key] = item.value ?? '';
    return acc;
  }, {});
}

// ============================================================
// MOCK DATA – Rich, realistic, factually anchored to
// Kelurahan Ketapang, Kecamatan Kendal, Kabupaten Kendal,
// Provinsi Jawa Tengah 51319
// ============================================================
export const MOCK_DATA = {
  syarat_surat: [
    // ── KEPENDUDUKAN ─────────────────────────────────────────
    {
      kategori: 'Kependudukan',
      nama_surat: 'Surat Pengantar Kartu Keluarga (KK)',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW setempat\n' +
        '2. Fotokopi KTP elektronik kepala keluarga\n' +
        '3. Fotokopi akta nikah / akta lahir (sesuai perubahan yang terjadi)\n' +
        '4. Formulir permohonan KK (Formulir F-1.06) yang telah diisi dan ditandatangani\n' +
        '5. Dokumen pendukung perubahan KK (jika ada penambahan/pengurangan anggota)',
    },
    {
      kategori: 'Kependudukan',
      nama_surat: 'Surat Pengantar KTP Elektronik (e-KTP)',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi Kartu Keluarga (KK)\n' +
        '3. Pas foto terbaru ukuran 3×4 (latar merah untuk usia 17–25 tahun, latar biru untuk usia >25 tahun)\n' +
        '4. Akta kelahiran atau ijazah (khusus perekaman pertama kali)\n' +
        '5. Surat keterangan domisili (apabila alamat tinggal berbeda dengan data KK)',
    },
    {
      kategori: 'Kependudukan',
      nama_surat: 'Surat Keterangan Domisili (SKD)',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemohon\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Surat pernyataan atau keterangan dari pemilik/pengelola tempat tinggal (khusus kos/kontrak/indekos)\n' +
        '5. Tujuan penggunaan surat keterangan domisili',
    },
    {
      kategori: 'Kependudukan',
      nama_surat: 'Surat Keterangan Pindah Datang',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW tujuan\n' +
        '2. Surat Keterangan Pindah (SKP) dari kelurahan asal\n' +
        '3. Fotokopi KTP elektronik\n' +
        '4. Fotokopi Kartu Keluarga lama\n' +
        '5. Formulir F-1.03 yang sudah diisi lengkap\n' +
        '6. Surat pernyataan dari kepala keluarga yang dituju (jika bergabung dengan KK lain)',
    },
    {
      kategori: 'Kependudukan',
      nama_surat: 'Surat Keterangan Belum Menikah',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemohon\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Dua orang saksi warga setempat beserta fotokopi KTP mereka\n' +
        '5. Tujuan penggunaan surat (lamaran kerja, persyaratan nikah, dll.)',
    },
    // ── SOSIAL ────────────────────────────────────────────────
    {
      kategori: 'Sosial',
      nama_surat: 'Surat Keterangan Tidak Mampu (SKTM)',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemohon\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Surat keterangan kondisi sosial-ekonomi dari Ketua RT\n' +
        '5. Tujuan penggunaan SKTM (beasiswa, keringanan biaya kesehatan, bantuan sosial, dll.)\n' +
        '6. Dokumen pendukung tujuan penggunaan (jika ada)',
    },
    {
      kategori: 'Sosial',
      nama_surat: 'Surat Keterangan Kematian',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik almarhum/almarhumah\n' +
        '3. Fotokopi Kartu Keluarga yang masih memuat nama almarhum\n' +
        '4. Surat visum dokter atau surat keterangan dari fasilitas kesehatan (bila tersedia)\n' +
        '5. Dua orang saksi dari lingkungan setempat beserta fotokopi KTP',
    },
    {
      kategori: 'Sosial',
      nama_surat: 'Surat Keterangan Lahir',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Surat keterangan lahir dari rumah sakit, bidan, atau puskesmas\n' +
        '3. Fotokopi KTP elektronik kedua orang tua\n' +
        '4. Fotokopi buku nikah / akta perkawinan orang tua\n' +
        '5. Fotokopi Kartu Keluarga orang tua',
    },
    {
      kategori: 'Sosial',
      nama_surat: 'Surat Rekomendasi Bantuan Sosial',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemohon\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Surat permohonan yang menjelaskan jenis bantuan yang diajukan\n' +
        '5. Dokumen pendukung kondisi ekonomi (slip gaji, keterangan penghasilan, dll.)\n' +
        '6. Pas foto terbaru 3×4 (2 lembar)',
    },
    // ── EKONOMI ───────────────────────────────────────────────
    {
      kategori: 'Ekonomi',
      nama_surat: 'Surat Keterangan Usaha (SKU)',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemilik usaha\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Deskripsi usaha: jenis usaha, alamat lokasi usaha, dan lama operasional\n' +
        '5. Pas foto terbaru ukuran 3×4 (1 lembar)\n' +
        '6. Dokumen lain yang relevan (SIUP, HO, dll. jika sudah ada)',
    },
    {
      kategori: 'Ekonomi',
      nama_surat: 'Surat Keterangan Penghasilan',
      persyaratan:
        '1. Surat pengantar dari Ketua RT dan RW\n' +
        '2. Fotokopi KTP elektronik pemohon\n' +
        '3. Fotokopi Kartu Keluarga\n' +
        '4. Slip gaji atau keterangan penghasilan dari atasan/pemberi kerja (khusus karyawan)\n' +
        '5. Surat pernyataan penghasilan mandiri (khusus wiraswasta/petani/buruh harian)\n' +
        '6. Tujuan penggunaan surat (pengajuan kredit, beasiswa, dll.)',
    },
  ],

  info_kelurahan: [
    // ── IDENTITAS ─────────────────────────────────────────────
    { key: 'nama_kelurahan',    value: 'Kelurahan Ketapang' },
    { key: 'kecamatan',         value: 'Kecamatan Kendal' },
    { key: 'kabupaten',         value: 'Kabupaten Kendal' },
    { key: 'provinsi',          value: 'Jawa Tengah' },
    { key: 'kode_pos',          value: '51319' },
    // ── KONTAK ────────────────────────────────────────────────
    { key: 'alamat',            value: 'Jl. Ketapang, Kec. Kendal, Kabupaten Kendal, Jawa Tengah 51319' },
    { key: 'telepon',           value: '(0294) 381XXX' },
    { key: 'whatsapp_pengaduan',value: '6285190853321' }, // ← ganti nomor resmi
    { key: 'email',             value: 'kelurahan.ketapang@kendalkab.go.id' },
    // ── JAM KERJA ─────────────────────────────────────────────
    {
      key: 'jam_kerja',
      value: 'Senin – Kamis: 07.30 – 15.30 WIB\nJumat: 07.30 – 11.00 WIB\nSabtu & Minggu: Tutup',
    },
    // ── PEJABAT ───────────────────────────────────────────────
    { key: 'kepala_lurah',      value: 'Kepala Kelurahan Ketapang' },
    { key: 'sekretaris_lurah',  value: 'Sekretaris Kelurahan' },
    // ── WILAYAH ───────────────────────────────────────────────
    { key: 'luas_wilayah',      value: '±1,5 km²' },
    { key: 'jumlah_rt',         value: '26' },
    { key: 'jumlah_rw',         value: '8' },
    // ── MAPS: Geo-coords -6.938749039229245, 110.21389789208276
    {
      key: 'maps_embed_url',
      value:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3!2d110.21389789208276!3d-6.938749039229245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTYnMTkuNSJTIDExMMKwMTInNTAuMCJF!5e0!3m2!1sid!2sid!4v1719460000000',
    },
  ],
};
