import { useState } from 'react';
import { Send, User, MapPin, Tag, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const RW_OPTIONS = Array.from({ length: 8 }, (_, i) =>
  String(i + 1).padStart(2, '0')
);
const RT_OPTIONS = Array.from({ length: 26 }, (_, i) =>
  String(i + 1).padStart(2, '0')
);
const KATEGORI_OPTIONS = [
  'Infrastruktur & Fasilitas Umum',
  'Pelayanan Administratif Kantor Kelurahan',
  'Sosial & Bantuan Masyarakat',
  'Keamanan & Ketertiban Wilayah',
];

const WA_NUMBER = '6281234567890'; // replaced by infoKelurahan.whatsapp_pengaduan at runtime

function InputLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-1">
      {children}
    </label>
  );
}

export default function FormPengaduanOfficial({ infoKelurahan }) {
  const waNumber = infoKelurahan?.whatsapp_pengaduan || WA_NUMBER;

  const [form, setForm] = useState({
    nama: '',
    rw: '01',
    rt: '01',
    kategori: KATEGORI_OPTIONS[0],
    detail: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const buildMessage = () => {
    return encodeURIComponent(
      `🏛️ *LAPORAN PENGADUAN WARGA*\n` +
      `Kelurahan Ketapang, Kec. Kendal, Kab. Kendal\n` +
      `─────────────────────────\n` +
      `👤 *Nama Pelapor:* ${form.nama}\n` +
      `📍 *Wilayah:* RW ${form.rw} / RT ${form.rt}\n` +
      `🏷️ *Kategori:* ${form.kategori}\n` +
      `─────────────────────────\n` +
      `📝 *Detail Laporan:*\n${form.detail}\n` +
      `─────────────────────────\n` +
      `_Pesan ini dikirim melalui Portal Pelayanan Publik Kelurahan Ketapang._`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.nama.trim()) {
      setFormError('Mohon isi Nama Lengkap Anda.');
      return;
    }
    if (!form.detail.trim()) {
      setFormError('Mohon isi Detail Laporan Anda.');
      return;
    }
    const url = `https://wa.me/${waNumber}?text=${buildMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section
      id="form-pengaduan-section"
      aria-label="Formulir Pengaduan Warga"
      className="max-w-3xl mx-auto px-4 py-14"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block bg-red-50 text-red-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 mb-3">
          Pengaduan Resmi
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Formulir Pengaduan Warga
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
          Sampaikan keluhan, saran, dan laporan Anda secara langsung kepada petugas Kelurahan Ketapang melalui WhatsApp resmi.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 md:p-10">

        {/* Success Banner */}
        {submitted && (
          <div
            id="form-success-banner"
            className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-5 py-4 mb-6 text-sm font-medium"
          >
            <CheckCircle size={18} className="flex-shrink-0" />
            Laporan Anda telah diteruskan via WhatsApp. Terima kasih atas partisipasi Anda!
          </div>
        )}

        {/* Error Banner */}
        {formError && (
          <div
            id="form-error-banner"
            className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4 mb-6 text-sm font-medium"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate id="pengaduan-form" className="space-y-6">

          {/* Nama Lengkap */}
          <div>
            <InputLabel htmlFor="field-nama">
              <User size={13} className="inline mr-1.5 mb-0.5" />
              Nama Lengkap
            </InputLabel>
            <input
              id="field-nama"
              type="text"
              autoComplete="name"
              value={form.nama}
              onChange={handleChange('nama')}
              placeholder="Masukkan nama lengkap Anda…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent text-slate-800 mt-1 transition-all outline-none"
            />
          </div>

          {/* RW + RT Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="field-rw">
                <MapPin size={13} className="inline mr-1.5 mb-0.5" />
                Nomor RW
              </InputLabel>
              <select
                id="field-rw"
                value={form.rw}
                onChange={handleChange('rw')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent text-slate-800 mt-1 transition-all outline-none appearance-none cursor-pointer"
              >
                {RW_OPTIONS.map((v) => (
                  <option key={v} value={v}>RW {v}</option>
                ))}
              </select>
            </div>
            <div>
              <InputLabel htmlFor="field-rt">
                <MapPin size={13} className="inline mr-1.5 mb-0.5" />
                Nomor RT
              </InputLabel>
              <select
                id="field-rt"
                value={form.rt}
                onChange={handleChange('rt')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent text-slate-800 mt-1 transition-all outline-none appearance-none cursor-pointer"
              >
                {RT_OPTIONS.map((v) => (
                  <option key={v} value={v}>RT {v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Kategori Aduan */}
          <div>
            <InputLabel htmlFor="field-kategori">
              <Tag size={13} className="inline mr-1.5 mb-0.5" />
              Kategori Aduan
            </InputLabel>
            <select
              id="field-kategori"
              value={form.kategori}
              onChange={handleChange('kategori')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent text-slate-800 mt-1 transition-all outline-none appearance-none cursor-pointer"
            >
              {KATEGORI_OPTIONS.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Detail Laporan */}
          <div>
            <InputLabel htmlFor="field-detail">
              <FileText size={13} className="inline mr-1.5 mb-0.5" />
              Detail Laporan
            </InputLabel>
            <textarea
              id="field-detail"
              rows={5}
              value={form.detail}
              onChange={handleChange('detail')}
              placeholder="Jelaskan secara rinci lokasi kejadian, kronologi, serta dampak yang dirasakan warga…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:bg-white focus:ring-2 focus:ring-red-800 focus:border-transparent text-slate-800 mt-1 transition-all outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Submit */}
          <button
            id="form-submit-btn"
            type="submit"
            className="w-full mt-2 bg-red-800 hover:bg-red-900 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-150 flex justify-center items-center gap-3 cursor-pointer active:scale-[0.98] group"
          >
            <Send
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            Kirim Laporan via WhatsApp
          </button>

          <p className="text-center text-xs text-slate-400 -mt-2">
            Laporan akan diteruskan ke WhatsApp resmi Kelurahan Ketapang.
            <br />Data Anda hanya digunakan untuk keperluan pengaduan.
          </p>
        </form>
      </div>
    </section>
  );
}
