import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useBrand } from '../context/BrandContext';

interface Props { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void; }

const SNOWFLAKES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${0.6 + Math.random() * 1}rem`,
  duration: `${12 + Math.random() * 14}s`,
  delay: `${Math.random() * 10}s`,
  opacity: 0.3 + Math.random() * 0.5,
  sway: `${15 + Math.random() * 25}px`,
}));

const LEAVES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${0.8 + Math.random() * 1.2}rem`,
  duration: `${14 + Math.random() * 12}s`,
  delay: `${Math.random() * 10}s`,
  opacity: 0.3 + Math.random() * 0.5,
  sway: `${15 + Math.random() * 30}px`,
  char: ['🍃', '🍂', '🌿'][Math.floor(Math.random() * 3)],
}));

export default function BrandSelector({ lang, setLang }: Props) {
  const { setBrand } = useBrand();
  const skiRef = useRef<HTMLDivElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);

  const tx = {
    en: {
      chooseLang: 'Choose Your Adventure',
      skiTitle: 'SKI MATCH LESSONS',
      skiSub: 'Certified Ski Instructors Worldwide',
      skiDesc: 'Private ski lessons with elite certified instructors at 50+ world-class resorts.',
      skiDests: 'Utah · Colorado · California · Andorra · Spain · Argentina',
      skiSeason: '❄️ Winter',
      skiCta: 'Explore Ski Lessons',
      bikeTitle: 'BIKE MATCH LESSONS',
      bikeSub: 'Certified MTB Trail Guides Worldwide',
      bikeDesc: 'Private MTB lessons with expert trail guides at 50+ premier riding destinations.',
      bikeDests: 'Moab · Whistler · Crested Butte · Andorra · Bariloche · Durango',
      bikeSeason: '☀️ Summer',
      bikeCta: 'Explore MTB Lessons',
    },
    es: {
      chooseLang: 'Elegí Tu Aventura',
      skiTitle: 'SKI MATCH LESSONS',
      skiSub: 'Instructores de Esquí Certificados',
      skiDesc: 'Clases privadas de esquí con instructores certificados en 50+ resorts de primer nivel.',
      skiDests: 'Utah · Colorado · California · Andorra · España · Argentina',
      skiSeason: '❄️ Invierno',
      skiCta: 'Explorar Ski Lessons',
      bikeTitle: 'BIKE MATCH LESSONS',
      bikeSub: 'Guías MTB Certificados',
      bikeDesc: 'Clases privadas de MTB con guías expertos en 50+ destinos de trail de primer nivel.',
      bikeDests: 'Moab · Whistler · Crested Butte · Andorra · Bariloche · Durango',
      bikeSeason: '☀️ Verano',
      bikeCta: 'Explorar MTB Lessons',
    },
  }[lang];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#030608]">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img src="/logo-SkiMatch.png" alt="Match Lessons" className="h-8 w-auto object-contain opacity-90" />
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="text-white/50 hover:text-white text-xs font-black tracking-widest uppercase border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
        >
          {lang === 'en' ? '🇦🇷 ES' : '🇺🇸 EN'}
        </button>
      </div>

      {/* Center label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/30 text-[10px] font-black tracking-[0.5em] uppercase rotate-0"
        >
          {lang === 'en' ? 'VS' : 'O'}
        </motion.div>
      </div>

      {/* Split panels */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-screen">

        {/* ── SKI SIDE ── */}
        <motion.div
          ref={skiRef}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onClick={() => setBrand('ski')}
          className="relative flex-1 lg:flex-[1] hover:lg:flex-[1.35] transition-all duration-700 ease-in-out cursor-pointer group overflow-hidden min-h-[50vh] lg:min-h-screen"
          style={{ background: 'linear-gradient(135deg, #020509 0%, #050d1f 50%, #071330 100%)' }}
        >
          {/* Blue glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/15 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0066FF]/8 to-transparent" />

          {/* Snowflakes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {SNOWFLAKES.map(f => (
              <div
                key={f.id}
                className="snowflake absolute text-white select-none"
                style={{
                  left: f.left,
                  fontSize: f.size,
                  '--duration': f.duration,
                  '--delay': f.delay,
                  '--flake-opacity': f.opacity,
                  '--sway-x': f.sway,
                } as React.CSSProperties}
              >
                ❄
              </div>
            ))}
          </div>

          {/* Right edge divider */}
          <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-8 pt-20 pb-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-xs lg:max-w-sm"
            >
              {/* Season badge */}
              <div className="inline-flex items-center gap-2 bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#7eb8ff] text-xs font-black tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
                {tx.skiSeason}
              </div>

              <img src="/logo-SkiMatch.png" alt="Ski Match Lessons" className="h-16 w-auto object-contain mx-auto mb-6 opacity-95" />

              <h1 className="text-white font-black text-2xl lg:text-3xl tracking-tight mb-3 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {tx.skiTitle}
              </h1>
              <p className="text-[#7eb8ff] text-sm font-bold uppercase tracking-widest mb-6">{tx.skiSub}</p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{tx.skiDesc}</p>

              <p className="text-white/25 text-xs uppercase tracking-widest mb-10">{tx.skiDests}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-all hover:shadow-2xl hover:shadow-[#0066FF]/40"
              >
                {tx.skiCta} →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── BIKE SIDE ── */}
        <motion.div
          ref={bikeRef}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onClick={() => setBrand('bike')}
          className="relative flex-1 lg:flex-[1] hover:lg:flex-[1.35] transition-all duration-700 ease-in-out cursor-pointer group overflow-hidden min-h-[50vh] lg:min-h-screen"
          style={{ background: 'linear-gradient(135deg, #021a0e 0%, #032d16 50%, #043d1e 100%)' }}
        >
          {/* Green glow */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[#10B981]/15 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#10B981]/8 to-transparent" />

          {/* Leaves */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {LEAVES.map(l => (
              <div
                key={l.id}
                className="leaf absolute select-none"
                style={{
                  left: l.left,
                  fontSize: l.size,
                  '--duration': l.duration,
                  '--delay': l.delay,
                  '--leaf-opacity': l.opacity,
                  '--sway-x': l.sway,
                  '--leaf-color': '#10B981',
                } as React.CSSProperties}
              >
                {l.char}
              </div>
            ))}
          </div>

          {/* Left edge divider */}
          <div className="hidden lg:block absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-8 pt-12 pb-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-xs lg:max-w-sm"
            >
              {/* Season badge */}
              <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/30 text-[#6ee7b7] text-xs font-black tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
                {tx.bikeSeason}
              </div>

              {/* Bike icon */}
              <div className="text-6xl mb-6" aria-hidden="true">🚵</div>

              <h1 className="text-white font-black text-2xl lg:text-3xl tracking-tight mb-3 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {tx.bikeTitle}
              </h1>
              <p className="text-[#6ee7b7] text-sm font-bold uppercase tracking-widest mb-6">{tx.bikeSub}</p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">{tx.bikeDesc}</p>

              <p className="text-white/25 text-xs uppercase tracking-widest mb-10">{tx.bikeDests}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-all hover:shadow-2xl hover:shadow-[#10B981]/40"
              >
                {tx.bikeCta} →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/20 text-[10px] font-black tracking-[0.4em] uppercase pointer-events-none"
      >
        {tx.chooseLang}
      </motion.div>
    </div>
  );
}
