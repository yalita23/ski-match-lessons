import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LevelCards from './components/LevelCards';
import ResortsSection from './components/ResortsSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import FAQ from './components/FAQ';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import { getPreference, savePreference } from './lib/utils';

/* ─── LOGO ──────────────────────────────────────────────────────────────────
   Drop your logo file into /public/ and set the path here.
   ────────────────────────────────────────────────────────────────────────── */
const LOGO_SRC = '/logo-SkiMatch.png';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = getPreference('darkMode');
    return saved !== null ? saved === 'true' : true; // dark by default
  });

  const [lang, setLang] = useState<'en' | 'es'>(() => {
    const saved = getPreference('lang');
    if (saved === 'en' || saved === 'es') return saved;
    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    savePreference('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    savePreference('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#050810] text-white">
        <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#0066FF] text-white px-4 py-2 rounded-lg z-[100]">
          {lang === 'en' ? 'Skip to main content' : 'Saltar al contenido'}
        </a>

        <Navbar
          darkMode={darkMode}
          toggleDark={() => setDarkMode(d => !d)}
          lang={lang}
          toggleLang={() => setLang(l => l === 'en' ? 'es' : 'en')}
          logoSrc={LOGO_SRC || undefined}
        />

        <main id="main-content">
          <Hero lang={lang} />
          <HowItWorks darkMode={darkMode} lang={lang} />
          <LevelCards darkMode={darkMode} lang={lang} />
          <ResortsSection darkMode={darkMode} lang={lang} />
          <TestimonialsCarousel darkMode={darkMode} lang={lang} />
          <FAQ darkMode={darkMode} lang={lang} />
          <BlogSection darkMode={darkMode} lang={lang} />
          <ContactSection darkMode={darkMode} lang={lang} />
        </main>

        <Footer darkMode={darkMode} lang={lang} />
        <ChatBot darkMode={darkMode} lang={lang} />
      </div>
    </div>
  );
}
