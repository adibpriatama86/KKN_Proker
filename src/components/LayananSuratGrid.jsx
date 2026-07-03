import { useState, useMemo } from 'react';
import {
  CreditCard, Heart, Briefcase,
  FileText, ChevronDown, ChevronUp, AlertCircle, RefreshCw, Search,
} from 'lucide-react';

/* ── Category icon map ──────────────────────────────────── */
const CATEGORY_ICON = {
  Kependudukan: CreditCard,
  Sosial: Heart,
  Ekonomi: Briefcase,
};

const CATEGORY_COLOR = {
  Kependudukan: { bg: 'bg-red-50',   text: 'text-red-800',   pill: 'bg-red-800 text-white' },
  Sosial:       { bg: 'bg-rose-50',  text: 'text-rose-700',  pill: 'bg-rose-700 text-white' },
  Ekonomi:      { bg: 'bg-amber-50', text: 'text-amber-700', pill: 'bg-amber-600 text-white' },
};

const FILTERS = ['Semua', 'Kependudukan', 'Sosial', 'Ekonomi'];

/* ── Skeleton placeholder ───────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 animate-pulse h-44 skeleton-shimmer" />
  );
}

/* ── Individual Document Card ───────────────────────────── */
function DocumentCard({ item, isExpanded, onToggle, index }) {
  const Icon   = CATEGORY_ICON[item.kategori] || FileText;
  const colors = CATEGORY_COLOR[item.kategori] || CATEGORY_COLOR.Kependudukan;

  return (
    <article
      id={`card-layanan-${index}`}
      className="bg-white border border-slate-200 shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={onToggle}
    >
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className={`${colors.bg} ${colors.text} p-3 rounded-xl w-fit flex-shrink-0`}>
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.pill} flex-shrink-0 mt-0.5`}>
            {item.kategori}
          </span>
        </div>

        {/* Document Name */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug mb-4">
          {item.nama_surat}
        </h3>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
            Lihat Persyaratan Dokumen
          </span>
          {isExpanded
            ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" />
            : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
        </div>
      </div>

      {/* Accordion Expand */}
      {isExpanded && (
        <div className="border-t border-amber-100 mx-0">
          <div
            id={`card-requirements-${index}`}
            className="whitespace-pre-line leading-relaxed text-sm text-slate-700 bg-amber-50/40 p-5 rounded-b-2xl border-t border-amber-100"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Persyaratan Dokumen:
            </p>
            {item.persyaratan}
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export default function LayananSuratGrid({ syaratSurat, loading, error, searchQuery, onSearchChange }) {
  const [activeFilter,   setActiveFilter]   = useState('Semua');
  const [expandedIndex,  setExpandedIndex]  = useState(null);

  const filtered = useMemo(() => {
    let list = syaratSurat;
    if (activeFilter !== 'Semua') {
      list = list.filter((item) => item.kategori === activeFilter);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.nama_surat.toLowerCase().includes(q) ||
          item.kategori.toLowerCase().includes(q) ||
          item.persyaratan.toLowerCase().includes(q)
      );
    }
    return list;
  }, [syaratSurat, activeFilter, searchQuery]);

  const handleToggle = (i) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <section
      id="layanan-surat-section"
      aria-label="Direktori Layanan Surat Kelurahan"
      className="max-w-5xl mx-auto px-4 py-14"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block bg-red-50 text-red-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 mb-3">
          Direktori Layanan
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Layanan Surat &amp; Administrasi
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
          Temukan persyaratan lengkap untuk setiap jenis surat keterangan yang dikeluarkan oleh Kelurahan Ketapang.
        </p>
      </div>

      {/* ── Search Bar ───────────────────────────────────── */}
      <div className="mb-6 relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search
            size={17}
            className="text-slate-400 group-focus-within:text-red-800 transition-colors"
          />
        </div>
        <input
          id="surat-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama surat atau kata kunci persyaratan…"
          className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            id="surat-search-clear"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-3 flex items-center px-2 text-slate-400 hover:text-slate-700 transition text-xs font-semibold"
            aria-label="Hapus pencarian"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div
        id="filter-pills"
        className="flex flex-wrap gap-2 justify-center mb-8"
        role="group"
        aria-label="Filter kategori layanan"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            id={`filter-pill-${f.toLowerCase()}`}
            onClick={() => { setActiveFilter(f); setExpandedIndex(null); }}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-150 ${
              activeFilter === f
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Loading Skeleton ─────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* ── Error State ──────────────────────────────── */}
      {!loading && error && (
        <div
          id="layanan-error"
          className="flex flex-col items-center justify-center py-16 text-center gap-4"
        >
          <div className="bg-red-50 p-4 rounded-full">
            <AlertCircle size={32} className="text-red-700" />
          </div>
          <p className="text-slate-700 font-semibold">Gagal memuat data layanan</p>
          <p className="text-slate-500 text-sm max-w-xs">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-red-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-900 transition mt-1"
          >
            <RefreshCw size={14} /> Muat Ulang
          </button>
        </div>
      )}

      {/* ── Document Grid ────────────────────────────── */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div id="layanan-empty" className="text-center py-16">
              <FileText size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Tidak ada layanan yang ditemukan.</p>
              <p className="text-slate-400 text-sm mt-1">Coba ubah kata kunci atau pilih kategori lain.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-400 mb-4 text-right">
                Menampilkan <span className="font-semibold text-slate-600">{filtered.length}</span> layanan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((item, i) => (
                  <DocumentCard
                    key={`${item.kategori}-${i}`}
                    item={item}
                    index={i}
                    isExpanded={expandedIndex === i}
                    onToggle={() => handleToggle(i)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
