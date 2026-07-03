import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'home',      label: 'Beranda' },
  { id: 'surat',     label: 'Layanan Surat' },
  { id: 'pengaduan', label: 'Form Pengaduan' },
  { id: 'profil',    label: 'Profil Desa' },
  { id: 'info',      label: 'Info & Kontak' },
];

export default function Navbar({ currentSection, onNavigate }) {
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);

  /* ── Scroll shadow ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock ──────────────────────────────── */
  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => document.body.classList.remove('drawer-open');
  }, [drawerOpen]);

  const handleNav = (id) => {
    onNavigate(id);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ══ STICKY TOP NAVBAR ══════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

          {/* ── Brand / Logos ─────────────────────────────── */}
          <button
            onClick={() => handleNav('home')}
            id="nav-brand-home"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            {/* Logo Pemkab Kendal */}
            <img
              src="/assets/logo-kendal.png"
              alt="Lambang Kabupaten Kendal"
              className="h-9 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            {/* Logo KKN USM */}
            <img
              src="/assets/logo-kkn.png"
              alt="Logo KKN USM"
              className="h-9 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-tight tracking-wide">
                Kelurahan Ketapang
              </p>
              <p className="text-xs text-slate-500 leading-tight">
                Kec. Kendal · Kab. Kendal
              </p>
            </div>
          </button>

          {/* ── Desktop Nav Links ─────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-red-800 border-b-2 border-red-800 pb-1 font-semibold bg-red-50/60'
                      : 'text-slate-600 hover:text-red-800 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────── */}
          <button
            id="nav-cta-hubungi"
            onClick={() => handleNav('info')}
            className="hidden md:inline-flex items-center bg-red-800 hover:bg-red-900 text-white rounded-xl px-5 py-2 text-sm font-medium transition-all duration-150 shadow-sm hover:shadow-md flex-shrink-0"
          >
            Hubungi Kami
          </button>

          {/* ── Mobile Hamburger ──────────────────────────── */}
          <button
            id="nav-hamburger"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:text-red-800 hover:bg-red-50 transition"
            aria-label="Buka menu navigasi"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* ══ MOBILE RIGHT-SIDE DRAWER ═══════════════════════ */}
      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-red-950">
          <div>
            <p className="text-sm font-bold text-white leading-tight">Kelurahan Ketapang</p>
            <p className="text-xs text-amber-300 leading-tight">Kec. Kendal · Kab. Kendal</p>
          </div>
          <button
            id="nav-drawer-close"
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-red-800 transition"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                id={`drawer-link-${link.id}`}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-red-50 text-red-800 font-bold border border-red-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-red-800 font-medium'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-slate-100">
          <button
            id="drawer-cta-hubungi"
            onClick={() => handleNav('info')}
            className="w-full bg-red-800 hover:bg-red-900 text-white rounded-xl py-3 text-sm font-semibold transition shadow-sm"
          >
            Hubungi Kami
          </button>
        </div>
      </div>
    </>
  );
}
