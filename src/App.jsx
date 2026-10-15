import { useState, useEffect, useCallback } from 'react';
import {
  Building2, MapPin, Flag, Hash, Maximize2,
  LayoutGrid, Network, Crown, Briefcase, Map,
} from 'lucide-react';
import { useKelurahanData } from './hooks/useKelurahanData';

/* ── Components ─────────────────────────────────────────── */
import Navbar                from './components/Navbar';
import Hero                  from './components/Hero';
import StatsBar              from './components/StatsBar';
import LayananSuratGrid      from './components/LayananSuratGrid';
import FormPengaduanOfficial from './components/FormPengaduanOfficial';
import InfoKontakSection     from './components/InfoKontakSection';
import FooterOfficial        from './components/FooterOfficial';

/* ── Hash ↔ section mapping ─────────────────────────────── */
const HASH_TO_SECTION = {
  '#home':      'home',
  '#surat':     'surat',
  '#pengaduan': 'pengaduan',
  '#profil':    'profil',
  '#info':      'info',
};
const SECTION_TO_HASH = Object.fromEntries(
  Object.entries(HASH_TO_SECTION).map(([h, s]) => [s, h])
);

function getInitialSection() {
  const hash = window.location.hash.toLowerCase();
  return HASH_TO_SECTION[hash] || 'home';
}

/* ── Profil Desa placeholder (inline) ──────────────────── */
function ProfilDesa({ infoKelurahan, loading }) {
  const namaLurah = infoKelurahan?.nama_lurah?.trim() || 'Belum tersedia';
  const namaSekretaris = infoKelurahan?.nama_sekretaris_kelurahan?.trim() || 'Belum tersedia';
  const cards = [
    { label: 'Nama Kelurahan',   icon: Building2,  value: infoKelurahan?.nama_kelurahan   || 'Kelurahan Ketapang' },
    { label: 'Kecamatan',        icon: MapPin,      value: infoKelurahan?.kecamatan        || 'Kecamatan Kendal' },
    { label: 'Kabupaten',        icon: Map,         value: infoKelurahan?.kabupaten        || 'Kabupaten Kendal' },
    { label: 'Provinsi',         icon: Flag,        value: infoKelurahan?.provinsi         || 'Jawa Tengah' },
    { label: 'Kode Pos',         icon: Hash,        value: infoKelurahan?.kode_pos         || '51319' },
    { label: 'Luas Wilayah',     icon: Maximize2,   value: infoKelurahan?.luas_wilayah    || '±1,5 km²' },
    { label: 'Jumlah RT',        icon: LayoutGrid,  value: infoKelurahan?.jumlah_rt       || '26' },
    { label: 'Jumlah RW',        icon: Network,     value: infoKelurahan?.jumlah_rw       || '8' },
    { label: 'Lurah',                  icon: Crown,     value: namaLurah },
    { label: 'Sekretaris Kelurahan', icon: Briefcase, value: namaSekretaris },
  ];

  return (
    <section
      id="profil-desa-section"
      className="max-w-4xl mx-auto px-4 py-14 section-enter"
    >
      <div className="text-center mb-10">
        <span className="inline-block bg-red-50 text-red-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 mb-3">
          Profil Resmi
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Profil Kelurahan Ketapang
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(({ label, icon: Icon, value }) => {
          const isDash  = !value || value === '—' || value === '-' || value.trim() === '';
          const showSkeleton = loading || isDash;
          return (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="bg-red-50 text-red-800 rounded-xl p-2.5 flex-shrink-0">
                <Icon size={17} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                {showSkeleton
                  ? <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-md my-1" />
                  : <p className="text-sm font-semibold text-slate-900">{value}</p>
                }
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Floating WhatsApp FAB ──────────────────────────────── */
function WhatsAppFAB({ number }) {
  const waNumber = number || '6281234567890';
  const message  = encodeURIComponent('Halo, saya ingin bertanya tentang layanan Kelurahan Ketapang. 🙏');
  return (
    <a
      id="whatsapp-fab"
      href={`https://wa.me/${waNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi via WhatsApp"
      className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg p-4 rounded-full transition-all hover:scale-105 z-40 flex items-center justify-center font-medium gap-2 fab-pulse"
      title="Hubungi Kami via WhatsApp"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   ROOT APPLICATION – Hash Router v1.1
   ════════════════════════════════════════════════════════════ */
export default function App() {
  const [currentSection, setCurrentSection] = useState(getInitialSection);
  const [searchQuery,    setSearchQuery]    = useState('');

  /* ── Single data fetch at root ─────────────────────────── */
  const { syaratSurat, infoKelurahan, loading, error } = useKelurahanData();

  /* ── Sync React state → URL hash on navigate ───────────── */
  const handleNavigate = useCallback((section) => {
    const hash = SECTION_TO_HASH[section] || '#home';
    // Only push a new history entry if the hash is actually changing
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      // Same hash clicked again — still update state & scroll
      setCurrentSection(section);
    }
    if (section !== 'surat') setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /* ── Listen to hashchange (Android back button & browser nav) */
  useEffect(() => {
    const onHashChange = () => {
      const hash    = window.location.hash.toLowerCase();
      const section = HASH_TO_SECTION[hash] || 'home';
      setCurrentSection(section);
      if (section !== 'surat') setSearchQuery('');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /* ── Seed hash on first load if missing ────────────────── */
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#home');
    }
  }, []);

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const hash = '#surat';
      if (window.location.hash !== hash) window.location.hash = hash;
      else setCurrentSection('surat');
    }
  }, []);

  /* ── Render active section ─────────────────────────────── */
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <div className="section-enter">
            <Hero onNavigate={handleNavigate} />
            <div className="bg-slate-50/60 pb-16">
              <StatsBar infoKelurahan={infoKelurahan} loading={loading} />
            </div>
          </div>
        );

      case 'surat':
        return (
          <div className="section-enter bg-slate-50/60 min-h-screen">
            <LayananSuratGrid
              syaratSurat={syaratSurat}
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
        );

      case 'pengaduan':
        return (
          <div className="section-enter bg-slate-50/60 min-h-screen">
            <FormPengaduanOfficial infoKelurahan={infoKelurahan} />
          </div>
        );

      case 'profil':
        return (
          <div className="bg-slate-50/60 min-h-screen">
            <ProfilDesa infoKelurahan={infoKelurahan} loading={loading} />
          </div>
        );

      case 'info':
        return (
          <div className="section-enter bg-slate-50/60 min-h-screen">
            <InfoKontakSection infoKelurahan={infoKelurahan} loading={loading} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* ── Sticky Navbar ──────────────────────────────────── */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* ── Main Content ───────────────────────────────────── */}
      <main id="main-content" className="flex-1">
        {renderSection()}
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <FooterOfficial onNavigate={handleNavigate} />

      {/* ── Floating WhatsApp FAB (all views) ─────────────── */}
      <WhatsAppFAB number={infoKelurahan?.whatsapp_pengaduan} />
    </div>
  );
}
