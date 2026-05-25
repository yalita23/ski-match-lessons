import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { INSTRUCTORS, getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

export default function InstructorsCarousel({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setCurrent(c => (c - 1 + INSTRUCTORS.length) % INSTRUCTORS.length), []);
  const next = useCallback(() => setCurrent(c => (c + 1) % INSTRUCTORS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next]);

  const getVisible = () => [
    (current - 1 + INSTRUCTORS.length) % INSTRUCTORS.length,
    current,
    (current + 1) % INSTRUCTORS.length,
  ];

  return (
    <section
      id="instructors"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-void overflow-hidden"
      aria-label="Our instructors"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0066FF]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— OUR INSTRUCTORS' : '— NUESTROS INSTRUCTORES'}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <h2
              className="text-white font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              {lang === 'en' ? <>Elite.<br /><span className="text-gradient-blue">Certified. Proven.</span></> : <>Élite.<br /><span className="text-gradient-blue">Certificados. Probados.</span></>}
            </h2>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed lg:mb-2">
              {lang === 'en'
                ? 'ISIA · PSIA · BASI · ESF certified. Former racers. Freeride professionals.'
                : 'Certificados ISIA · PSIA · BASI · ESF. Ex-corredores. Profesionales del freeride.'}
            </p>
          </div>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          <div className="grid grid-cols-3 gap-5">
            {getVisible().map((idx, pos) => {
              const isCenter = pos === 1;
              const instructor = INSTRUCTORS[idx];
              return (
                <motion.div
                  key={idx}
                  layout
                  className={`rounded-2xl border p-6 transition-all duration-500 bg-[#0d1320] ${
                    isCenter
                      ? 'border-[#0066FF]/50 shadow-2xl shadow-[#0066FF]/15 scale-105'
                      : 'border-white/5 opacity-60 scale-95'
                  }`}
                >
                  <InstructorCard instructor={instructor} lang={lang} />
                </motion.div>
              );
            })}
          </div>

          <button onClick={prev} aria-label="Previous" className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0d1320] border border-white/10 hover:border-[#0066FF]/50 text-white text-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-[#0066FF]/20">‹</button>
          <button onClick={next} aria-label="Next" className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0d1320] border border-white/10 hover:border-[#0066FF]/50 text-white text-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-[#0066FF]/20">›</button>
        </div>

        {/* Mobile: 1 card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/10 p-6 bg-[#0d1320]"
            >
              <InstructorCard instructor={INSTRUCTORS[current]} lang={lang} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist">
          {INSTRUCTORS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2 bg-[#0066FF]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstructorCard({ instructor, lang }: { instructor: typeof INSTRUCTORS[0]; lang: 'en' | 'es' }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          loading="lazy"
          className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[#0066FF]/30"
        />
        <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center border-2 border-[#050810] text-white text-xs font-black shadow-lg shadow-[#0066FF]/40">
          ✓
        </div>
      </div>
      <h3 className="text-white font-black text-lg mb-1">{instructor.name}</h3>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < Math.floor(instructor.rating) ? 'text-yellow-400' : 'text-white/15'}`}>★</span>
        ))}
        <span className="text-white/40 text-xs ml-1">{instructor.rating} ({instructor.reviews})</span>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
        {instructor.certifications.map(c => (
          <span key={c} className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#0066FF]/15 text-[#00C8FF] border border-[#0066FF]/20">{c}</span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
        {instructor.specialties.map(s => (
          <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">{s}</span>
        ))}
      </div>
      <div className="flex gap-1.5 mb-5">
        {instructor.languages.map(l => (
          <span key={l} className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60 font-bold">{l}</span>
        ))}
      </div>
      <a
        href={getWhatsAppLink(`Hi! I'd like to request ${instructor.name} as my instructor.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white py-3 rounded-xl text-sm font-black uppercase tracking-wide hover:scale-105 hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all"
      >
        {lang === 'en' ? 'Request this Instructor' : 'Solicitar este Instructor'}
      </a>
    </div>
  );
}
