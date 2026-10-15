import { Clock, Phone, Mail, MapPin, ExternalLink, Building2 } from 'lucide-react';

/* ── Static factual anchors (never hallucinate from text search) */
const STATIC = {
  alamat:    'Jl. Masjid Ketapang No. 47, Kec. Kendal, Kabupaten Kendal, Jawa Tengah 51319',
  email:     'kelketapang1@gmail.com',
  telepon:   '(0294) 381XXX',
  jam_kerja: 'Senin – Kamis: 07.30 – 15.30 WIB\nJumat: 07.30 – 11.00 WIB\nSabtu & Minggu: Tutup',
  // Pin the confirmed office coordinates in both the embed and navigation link.
  maps_embed:
    'https://www.google.com/maps?q=-6.938380231426174,110.21399258020509&output=embed',
  maps_link: 'https://www.google.com/maps?q=-6.938380231426174,110.21399258020509',
};

/* ── Skeleton line helper ─────────────────────────────────── */
function SkeletonLine({ width = 'w-32' }) {
  return <div className={`h-5 ${width} bg-slate-200 animate-pulse rounded-md my-1`} />;
}

/* ── Inline value renderer — shows skeleton while loading ─── */
function LiveValue({ loading, value, fallback, className = '' }) {
  const isEmpty = !value || value === '—' || value === '-' || value.trim() === '';
  if (loading || isEmpty) return <SkeletonLine width="w-36" />;
  return <span className={className}>{value || fallback}</span>;
}

function InfoRow({ icon: Icon, label, children, id }) {
  return (
    <div id={id} className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="bg-red-50 text-red-800 p-2.5 rounded-xl flex-shrink-0 h-fit mt-0.5">
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="text-sm text-slate-800 font-medium">{children}</div>
      </div>
    </div>
  );
}

export default function InfoKontakSection({ infoKelurahan, loading }) {
  /* ── Derive display values ────────────────────────────────
     alamat & email are statically anchored (no hook dependency).
     telepon & jam_kerja prefer live hook data, fall back to STATIC.
     The office map uses the confirmed coordinate pin below. */
  const alamat    = STATIC.alamat;
  const email     = STATIC.email;
  const telepon   = infoKelurahan?.telepon   || STATIC.telepon;
  const jamKerja  = infoKelurahan?.jam_kerja || STATIC.jam_kerja;

  // Do not let a stale maps_embed_url from Sheets override the confirmed pin.
  const mapsEmbed = STATIC.maps_embed;
  const mapsReady = !loading && !!mapsEmbed;

  return (
    <section
      id="info-kontak-section"
      aria-label="Informasi dan Kontak Kelurahan Ketapang"
      className="max-w-6xl mx-auto px-4 py-14"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block bg-red-50 text-red-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 mb-3">
          Kontak &amp; Lokasi
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Informasi &amp; Kontak
        </h2>
        <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
          Jam operasional, informasi kontak, dan lokasi kantor Kelurahan Ketapang.
        </p>
      </div>

      {/* Dual-split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

        {/* ── Left Panel: Office Info ──────────────────── */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-7 flex flex-col gap-1">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
            <div className="bg-red-900 p-3 rounded-xl">
              <Building2 size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-base leading-tight">Kantor Kelurahan Ketapang</p>
              <p className="text-xs text-slate-500">Kecamatan Kendal · Kabupaten Kendal</p>
            </div>
          </div>

          {/* Alamat — statically anchored, never needs skeleton */}
          <InfoRow id="info-alamat" icon={MapPin} label="Alamat Resmi">
            <span className="whitespace-pre-line">{alamat}</span>
            <a
              href={STATIC.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 text-xs font-semibold mt-1.5 transition"
            >
              Buka di Google Maps <ExternalLink size={11} />
            </a>
          </InfoRow>

          {/* Jam Kerja — static fallback available immediately */}
          <InfoRow id="info-jam-kerja" icon={Clock} label="Jam Operasional">
            {loading && !infoKelurahan?.jam_kerja
              ? (
                <div className="space-y-2 mt-1">
                  <SkeletonLine width="w-48" />
                  <SkeletonLine width="w-36" />
                  <SkeletonLine width="w-28" />
                </div>
              )
              : <span className="whitespace-pre-line leading-relaxed">{jamKerja}</span>
            }
          </InfoRow>

          {/* Telepon — static fallback available immediately */}
          <InfoRow id="info-telepon" icon={Phone} label="Telepon Kantor">
            {loading && !infoKelurahan?.telepon
              ? <SkeletonLine width="w-28" />
              : (
                <a
                  href={`tel:${telepon.replace(/[^0-9+]/g, '')}`}
                  className="text-slate-800 hover:text-red-800 transition"
                >
                  {telepon}
                </a>
              )
            }
          </InfoRow>

          {/* Email — statically anchored, never needs skeleton */}
          <InfoRow id="info-email" icon={Mail} label="Email Resmi">
            <a
              href={`mailto:${email}`}
              className="text-slate-800 hover:text-red-800 break-all transition"
            >
              {email}
            </a>
          </InfoRow>
        </div>

        {/* ── Right Panel: Google Maps Embed ─────────── */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden">
          <div className="bg-red-950 px-6 py-4 flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Lokasi Kantor Kelurahan</p>
            <a
              id="info-maps-external-link"
              href={STATIC.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-xs font-medium transition"
            >
              Buka Peta <ExternalLink size={12} />
            </a>
          </div>

          {/* Maps: pulse placeholder while loading; iframe only once embed URL is confirmed */}
          <div className="relative" style={{ height: 380 }}>
            {!mapsReady ? (
              /* Loading placeholder — prevents wrong-location iframe flash */
              <div className="animate-pulse bg-slate-200 rounded-b-3xl h-full w-full flex flex-col items-center justify-center gap-3">
                <MapPin size={32} className="text-slate-400" />
                <p className="text-slate-400 text-xs font-medium">Memuat peta lokasi…</p>
              </div>
            ) : (
              <iframe
                id="info-maps-iframe"
                src={mapsEmbed}
                title="Lokasi Kantor Kelurahan Ketapang, Kecamatan Kendal, Kabupaten Kendal"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
