import { Users, Map, Layers } from 'lucide-react';

/* ── Hardcoded fallbacks anchored to Ketapang monograph data ── */
const FALLBACK = {
  penduduk:      '4.164 Jiwa',
  tahun:         'Data Monografi 2019',
  luas_hektar:   '±150 Hektar',
  luas_km:       '±1,5 km²',
  rt_rw:         '26 RT / 8 RW',
  kecamatan:     'Kecamatan Kendal',
};

/* ── Skeleton value placeholder ───────────────────────────────── */
function StatSkeleton() {
  return (
    <div className="space-y-1.5">
      <div className="h-6 w-28 bg-slate-200 animate-pulse rounded-md" />
      <div className="h-3.5 w-20 bg-slate-100 animate-pulse rounded-md" />
    </div>
  );
}

export default function StatsBar({ infoKelurahan, loading }) {
  /* ── Derive dynamic values, fall back to monograph constants ── */
  const penduduk = infoKelurahan?.total_penduduk     || FALLBACK.penduduk;
  const tahun    = infoKelurahan?.tahun_monografi    || FALLBACK.tahun;
  const luas     = infoKelurahan?.luas_wilayah       || FALLBACK.luas_hektar;
  const luasSub  = infoKelurahan?.luas_wilayah
    ? `Setara ${infoKelurahan.luas_km}`
    : FALLBACK.luas_km;

  const rt     = infoKelurahan?.jumlah_rt;
  const rw     = infoKelurahan?.jumlah_rw;
  const rtRw   = rt && rw ? `${rt} RT / ${rw} RW` : FALLBACK.rt_rw;
  const rtRwSub = infoKelurahan?.kecamatan || FALLBACK.kecamatan;

  const STATS = [
    {
      id:      'stat-penduduk',
      icon:    Users,
      title:   'Total Penduduk',
      value:   penduduk,
      sub:     tahun,
      accent:  'text-red-700',
      iconBg:  'bg-red-50',
    },
    {
      id:      'stat-wilayah',
      icon:    Map,
      title:   'Luas Wilayah',
      value:   luas,
      sub:     luasSub,
      accent:  'text-amber-600',
      iconBg:  'bg-amber-50',
    },
    {
      id:      'stat-pembagian',
      icon:    Layers,
      title:   'Pembagian Wilayah',
      value:   rtRw,
      sub:     rtRwSub,
      accent:  'text-slate-700',
      iconBg:  'bg-slate-50',
    },
  ];

  return (
    <section
      id="stats-bar"
      aria-label="Statistik Kelurahan Ketapang"
      className="max-w-5xl mx-auto px-4 -mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 z-10 relative"
    >
      {STATS.map(({ id, icon: Icon, title, value, sub, accent, iconBg }) => (
        <div
          key={id}
          id={id}
          className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 flex items-center gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className={`${iconBg} p-3.5 rounded-xl flex-shrink-0`}>
            <Icon size={26} className={accent} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
              {title}
            </p>
            {loading
              ? <StatSkeleton />
              : (
                <>
                  <p className={`text-xl font-extrabold ${accent} leading-tight`}>
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </>
              )
            }
          </div>
        </div>
      ))}
    </section>
  );
}
