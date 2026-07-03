const QUICK_LINKS = [
  { label: 'Layanan Surat',  hash: '#surat',     id: 'hero-quicknav-surat' },
  { label: 'Form Pengaduan', hash: '#pengaduan',  id: 'hero-quicknav-pengaduan' },
  { label: 'Info Kantor',    hash: '#info',       id: 'hero-quicknav-info' },
];

export default function Hero({ onNavigate }) {
  return (
    <section
      id="hero-banner"
      className="relative w-full min-h-[520px] md:min-h-[580px] flex flex-col items-center justify-center overflow-hidden border-b border-amber-500/20"
    >
      {/* ── Background Image ───────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/gapura.jpg')" }}
        aria-hidden="true"
      />

      {/* ── Gradient Overlay ───────────────────────────── */}
      <div
        className="absolute inset-0 hero-overlay"
        aria-hidden="true"
      />

      {/* ── Subtle texture grain ───────────────────────── */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero Content ───────────────────────────────── */}
      <div className="relative z-10 w-full py-20 px-4 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
          {/* <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" /> */}
          Sistem Pelayanan Digital Resmi
        </div>

        {/* H1 */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm max-w-4xl mx-auto leading-tight">
          PORTAL PELAYANAN PUBLIK
          <br />
          <span className="text-amber-400">KELURAHAN KETAPANG</span>
        </h1>

        {/* Subtitle */}
        <p className="text-amber-100/90 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Sistem Informasi Pelayanan Publik Terpadu, Cepat, Terbuka, dan Transparan. 
          <br className="hidden md:block" />
          Kecamatan Kendal · Kabupaten Kendal · Jawa Tengah 51319
        </p>

        {/* ── Quick Service Pills ──────────────────────── */}
        <div className="mt-8">
          <p className="text-xs md:text-sm font-semibold tracking-wider text-amber-300 uppercase mb-3">
            Pilih Layanan Cepat:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {QUICK_LINKS.map(({ label, hash, id }) => (
              <button
                key={id}
                id={id}
                onClick={() => {
                  window.location.hash = hash;
                  onNavigate(hash.replace('#', ''));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-2 text-xs md:text-sm font-medium transition-all duration-150 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
