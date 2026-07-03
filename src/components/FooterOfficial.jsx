import { MapPin, Mail, Phone, Shield, ExternalLink } from 'lucide-react';

const LINKS_COL = [
  { label: 'Beranda',        id: 'home' },
  { label: 'Layanan Surat',  id: 'surat' },
  { label: 'Form Pengaduan', id: 'pengaduan' },
  { label: 'Info & Kontak',  id: 'info' },
];

export default function FooterOfficial({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer-official"
      className="bg-red-950 text-slate-200 border-t-2 border-amber-500/30 pt-12 pb-6 px-6"
      role="contentinfo"
      aria-label="Footer Kelurahan Ketapang"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Top 3-Column Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-red-900/60">

          {/* Column 1: Government Emblem + Identity */}
          <div id="footer-col-identity">
            {/* Emblems Row */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/assets/logo-kendal.png"
                alt="Lambang Kabupaten Kendal"
                className="h-12 w-auto object-contain flex-shrink-0 drop-shadow-md"
              />
              <img
                src="/assets/logo-kkn.png"
                alt="Logo KKN USM"
                className="h-12 w-auto object-contain flex-shrink-0 drop-shadow-md"
              />
            </div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Pemerintah Kabupaten Kendal
            </p>
            <h2 className="text-lg font-extrabold text-white leading-tight mb-1">
              Kelurahan Ketapang
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kecamatan Kendal · Kabupaten Kendal
              <br />Provinsi Jawa Tengah
            </p>
            {/* <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs px-3 py-1.5 rounded-full">
              <Shield size={12} />
              Portal Pelayanan Resmi
            </div> */}
          </div>

          {/* Column 2: Contact & Address */}
          <div id="footer-col-contact">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              Kontak &amp; Alamat
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Jl. Masjid Ketapang No. 47,<br />
                  Kec. Kendal, Kabupaten Kendal,<br />
                  Jawa Tengah 51319
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-amber-500 flex-shrink-0" />
                <a
                  href="mailto:kelketapang1@gmail.com"
                  className="hover:text-amber-300 transition break-all"
                >
                  kelketapang1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-amber-500 flex-shrink-0" />
                <span>(0294) 381XXX</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div id="footer-col-links">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
              Tautan Cepat
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {LINKS_COL.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-link-${link.id}`}
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition flex items-center gap-1.5 group"
                  >
                    <span className="text-amber-700 group-hover:text-amber-400 transition text-xs">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://kendalkab.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1.5 group"
                >
                  <span className="text-amber-700 group-hover:text-amber-400 transition text-xs">›</span>
                  Portal Kabupaten Kendal
                  <ExternalLink size={10} className="text-slate-500 group-hover:text-amber-400 transition" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Copyright Bar ─────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} Pemerintah Kelurahan Ketapang. Hak Cipta Dilindungi.
          </p>
          <p className="text-slate-600">
            Dibangun oleh Tim KKN Universitas Semarang · Kab. Kendal
          </p>
        </div>
      </div>
    </footer>
  );
}
