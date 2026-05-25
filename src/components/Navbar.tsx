import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../lib/constants';

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
  lang: 'en' | 'es';
  toggleLang: () => void;
  logoSrc?: string; // ← drop your logo file path here (e.g. '/logo.png')
}

const t = {
  en: { home: 'Home', how: 'How It Works', levels: 'Levels', resorts: 'Resorts', instructors: 'Instructors', contact: 'Contact', cta: 'Match Now' },
  es: { home: 'Inicio', how: 'Cómo Funciona', levels: 'Niveles', resorts: 'Resorts', instructors: 'Instructores', contact: 'Contacto', cta: 'Match Now' },
};

export default function Navbar({ darkMode, toggleDark, lang, toggleLang, logoSrc }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const tx = t[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: tx.home, href: '#hero' },
    { label: tx.how, href: '#how-it-works' },
    { label: tx.levels, href: '#levels' },
    { label: tx.resorts, href: '#resorts' },
    { label: tx.instructors, href: '#instructors' },
    { label: tx.contact, href: '#contact' },
  ];

  const navBg = scrolled
    ? 'bg-[#050810]/95 shadow-2xl shadow-black/60 border-b border-white/5'
    : 'bg-transparent';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${navBg}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Ski Match Lessons - Home">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Ski Match Lessons"
                className="h-10 w-auto object-contain transition-all group-hover:scale-105"
              />
            ) : (
              <>
                <div className="w-9 h-9 rounded-lg bg-[#0066FF] flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all">
                  <span className="text-white text-lg" aria-hidden="true">⛷</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-white font-black text-base tracking-tight">SKI MATCH</span>
                  <span className="text-[#00C8FF] text-[10px] font-bold tracking-[0.25em] uppercase">Lessons</span>
                </div>
              </>
            )}
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <button
              onClick={toggleLang}
              aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all tracking-widest uppercase"
            >
              {lang === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDark}
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all hover:scale-110"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#0066FF] hover:bg-[#0055DD] text-white px-5 py-2.5 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {tx.cta}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={mobileOpen
                    ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 8 : i === 2 ? -8 : 0, opacity: i === 1 ? 0 : 1 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  className="block w-5 h-0.5 rounded-full bg-white origin-center"
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050810]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                <button onClick={toggleLang} className="flex-1 py-3 rounded-xl text-xs font-black border border-white/10 text-white/60 uppercase tracking-widest">
                  {lang === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
                </button>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl text-xs font-black bg-[#0066FF] text-white text-center uppercase tracking-wide">
                  💬 Match Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
