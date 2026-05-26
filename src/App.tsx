import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandProvider, useBrand } from './context/BrandContext';

// Ski components
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

// Bike components
import BikeNavbar from './components/bike/BikeNavbar';
import BikeHero from './components/bike/BikeHero';
import BikeHowItWorks from './components/bike/BikeHowItWorks';
import BikeLevelCards from './components/bike/BikeLevelCards';
import BikeResortsSection from './components/bike/BikeResortsSection';
import BikeTestimonialsCarousel from './components/bike/BikeTestimonialsCarousel';
import BikeFAQ from './components/bike/BikeFAQ';
import BikeBlogSection from './components/bike/BikeBlogSection';
import BikeContactSection from './components/bike/BikeContactSection';
import BikeFooter from './components/bike/BikeFooter';

// Selector
import BrandSelector from './components/BrandSelector';

import { getPreference, savePreference } from './lib/utils';

const LOGO_SRC = '/logo-SkiMatch.png';

function AppContent() {
  const { brand } = useBrand();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = getPreference('darkMode');
    return saved !== null ? saved === 'true' : true;
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

  const toggleDark = () => setDarkMode(d => !d);
  const toggleLang = () => setLang(l => l === 'en' ? 'es' : 'en');

  return (
    <AnimatePresence mode="wait">
      {brand === 'selector' && (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BrandSelector lang={lang} setLang={setLang} />
        </motion.div>
      )}

      {brand === 'ski' && (
        <motion.div
          key="ski"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={darkMode ? 'dark' : ''}
        >
          <div className="min-h-screen bg-[#050810] text-white">
            <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#0066FF] text-white px-4 py-2 rounded-lg z-[100]">
              {lang === 'en' ? 'Skip to main content' : 'Saltar al contenido'}
            </a>
            <Navbar
              darkMode={darkMode}
              toggleDark={toggleDark}
              lang={lang}
              toggleLang={toggleLang}
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
        </motion.div>
      )}

      {brand === 'bike' && (
        <motion.div
          key="bike"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="min-h-screen bg-[#021a0e] text-white">
            <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#10B981] text-white px-4 py-2 rounded-lg z-[100]">
              {lang === 'en' ? 'Skip to main content' : 'Saltar al contenido'}
            </a>
            <BikeNavbar
              darkMode={darkMode}
              toggleDark={toggleDark}
              lang={lang}
              toggleLang={toggleLang}
            />
            <main id="main-content">
              <BikeHero lang={lang} />
              <BikeHowItWorks darkMode={darkMode} lang={lang} />
              <BikeLevelCards darkMode={darkMode} lang={lang} />
              <BikeResortsSection darkMode={darkMode} lang={lang} />
              <BikeTestimonialsCarousel darkMode={darkMode} lang={lang} />
              <BikeFAQ darkMode={darkMode} lang={lang} />
              <BikeBlogSection darkMode={darkMode} lang={lang} />
              <BikeContactSection darkMode={darkMode} lang={lang} />
            </main>
            <BikeFooter darkMode={darkMode} lang={lang} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}
