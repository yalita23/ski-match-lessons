import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';
import { getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { darkMode: boolean; toggleDark: () => void; lang: 'en' | 'es'; toggleLang: () => void; }

export default function BikeNavbar({ toggleDark, lang, toggleLang }: Props) {
  const { setBrand } = useBrand();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = lang === 'en'
    ? [{ label: 'How It Works', href: '#how-it-works' }, { label: 'Levels', href: '#levels' }, { label: 'Destinations', href: '#resorts' }, { label: 'Testimonials', href: '#testimonials' }, { label: 'FAQ', href: '#faq' }, { label: 'Blog', href: '#blog' }, { label: 'Contact', href: '#contact' }]
    : [{ label: 'Cómo Funciona', href: '#how-it-works' }, { label: 'Niveles', href: '#levels' }, { label: 'Destinos', href: '#resorts' }, { label: 'Testimonios', href: '#testimonials' }, { label: 'FAQ', href: '#faq' }, { label: 'Blog', href: '#blog' }, { label: 'Contacto', href: '#contact' }];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-[#021a0e]/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-[#10B981]/10' : 'bg-transparent'}`}
      aria-label="Bike Match Lessons navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left: back to selector + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBrand('selector')}
            className="text-white/40 hover:text-[#10B981] text-xs font-black tracking-widest uppercase border border-white/10 hover:border-[#10B981]/40 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
            title={lang === 'en' ? 'Switch brand' : 'Cambiar marca'}
          >
            ← {lang === 'en' ? 'Switch' : 'Cambiar'}
          </button>
          <a href="#hero" className="flex items-center" aria-label="Bike Match Lessons - Home">
            <img src="/logo-bikematch.png" alt="Bike Match Lessons" className="h-9 w-auto object-contain" />
          </a>
        </div>

        {/* Center: nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg hover:bg-[#10B981]/10 transition-all"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2">
          <button onClick={toggleLang} className="text-white/40 hover:text-white text-xs font-black border border-white/10 hover:border-white/25 px-2.5 py-1.5 rounded-lg transition-all hidden sm:block">
            {lang === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
          </button>
          <button onClick={toggleDark} className="text-white/40 hover:text-white text-base px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all hidden sm:block" aria-label="Toggle dark mode">
            🌙
          </button>
          <a
            href={getBikeWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#10B981]/30"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {lang === 'en' ? 'Book Now' : 'Reservar'}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-xl border border-white/10 hover:border-[#10B981]/40 transition-all"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block h-0.5 w-5 bg-white/60 rounded-full origin-center"
                animate={menuOpen
                  ? i === 0 ? { rotate: 45, y: 8 } : i === 1 ? { opacity: 0, scaleX: 0 } : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#021a0e]/98 backdrop-blur-lg border-t border-[#10B981]/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/60 hover:text-white font-bold text-sm uppercase tracking-wider py-2.5 px-3 rounded-xl hover:bg-[#10B981]/10 transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 pt-3 border-t border-white/5">
                <button onClick={toggleLang} className="flex-1 text-white/40 text-xs font-black border border-white/10 py-2 rounded-xl">
                  {lang === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
                </button>
                <a href={getBikeWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#10B981] text-white py-2 rounded-xl text-xs font-black uppercase">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
