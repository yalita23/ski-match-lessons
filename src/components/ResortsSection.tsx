import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RESORTS, getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const filters = {
  en: [{ key: 'all', label: 'All Resorts' }, { key: 'usa', label: 'USA' }, { key: 'europe', label: 'Europe' }, { key: 'southamerica', label: 'South America' }, { key: 'other', label: 'Other' }],
  es: [{ key: 'all', label: 'Todos' }, { key: 'usa', label: 'EE.UU.' }, { key: 'europe', label: 'Europa' }, { key: 'southamerica', label: 'Sudamérica' }, { key: 'other', label: 'Otros' }],
};

export default function ResortsSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all' ? RESORTS : RESORTS.filter(r => r.region === activeFilter);

  return (
    <section
      id="resorts"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      aria-label="Featured resorts"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0066FF]/4 rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
              {lang === 'en' ? '— FEATURED RESORTS' : '— RESORTS DESTACADOS'}
            </span>
            <h2
              className="text-gray-900 font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              {lang === 'en' ? <>50+ Resorts.<br /><span className="text-gradient-blue">One Platform.</span></> : <>50+ Resorts.<br /><span className="text-gradient-blue">Una Plataforma.</span></>}
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Utah · Colorado · California · Andorra · España · Argentina · Canadá · Suiza
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
        >
          {filters[lang].map(f => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/30 scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((resort, i) => (
              <motion.div
                key={resort.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0066FF]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#0066FF]/10 bg-white shadow-sm"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={resort.image}
                    alt={`${resort.name} ski resort`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-white text-xs font-bold">{resort.rating}</span>
                  </div>
                  {/* Difficulty badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      resort.difficulty === 'Advanced' ? 'bg-red-500/80 text-white' :
                      resort.difficulty === 'Intermediate+' ? 'bg-orange-500/80 text-white' :
                      'bg-green-500/80 text-white'
                    }`}>
                      {resort.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 font-bold text-sm mb-1">{resort.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">📍 {resort.location}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#0066FF] text-xs font-bold">
                      👨‍🏫 {resort.instructors} {lang === 'en' ? 'instructors' : 'instructores'}
                    </span>
                  </div>
                  <a
                    href={getWhatsAppLink(`Hi! I'd like to book a ski lesson at ${resort.name} (${resort.location}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#0066FF] hover:bg-[#0055DD] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#0066FF]/30"
                  >
                    {lang === 'en' ? 'Book Here' : 'Reservar Aquí'}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
