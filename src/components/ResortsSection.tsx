import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const REGIONS = [
  {
    name: 'USA',
    instructors: '+40',
    image: '/images/resorts/keystone.jpg',
    destinations_en: 'Utah · Colorado · California · Nevada',
    destinations_es: 'Utah · Colorado · California · Nevada',
    msg_en: "Hi! I'd like to book a ski lesson in the USA.",
    msg_es: 'Hola! Quisiera reservar una clase de esquí en USA.',
  },
  {
    name: 'Canada',
    instructors: '+30',
    image: '/images/resorts/whistler.jpg',
    destinations_en: 'Whistler · Banff · Lake Louise',
    destinations_es: 'Whistler · Banff · Lake Louise',
    msg_en: "Hi! I'd like to book a ski lesson in Canada.",
    msg_es: 'Hola! Quisiera reservar una clase de esquí en Canadá.',
  },
  {
    name: 'Europa',
    instructors: '+25',
    image: '/images/resorts/baqueira.jpg',
    destinations_en: 'Andorra · Spain · France · Switzerland',
    destinations_es: 'Andorra · España · Francia · Suiza',
    msg_en: "Hi! I'd like to book a ski lesson in Europe.",
    msg_es: 'Hola! Quisiera reservar una clase de esquí en Europa.',
  },
  {
    name: 'Sudamérica',
    instructors: '+25',
    image: '/images/resorts/portillo.webp',
    destinations_en: 'Chile · Argentina',
    destinations_es: 'Chile · Argentina',
    msg_en: "Hi! I'd like to book a ski lesson in South America.",
    msg_es: 'Hola! Quisiera reservar una clase de esquí en Sudamérica.',
  },
];

export default function ResortsSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
              {lang === 'en'
                ? <>50+ Resorts.<br /><span className="text-gradient-blue">One Platform.</span></>
                : <>50+ Resorts.<br /><span className="text-gradient-blue">Una Plataforma.</span></>}
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Utah · Colorado · California · Andorra · España · Argentina · Canadá · Suiza
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0066FF]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#0066FF]/10 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                {/* Instructor badge */}
                <div className="absolute top-3 right-3 bg-[#0066FF] text-white text-xs font-black px-3 py-1.5 rounded-full">
                  {region.instructors} {lang === 'en' ? 'instructors' : 'instructores'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-gray-900 font-black text-xl mb-1" style={{ letterSpacing: '-0.02em' }}>
                  {region.name}
                </h3>
                <p className="text-gray-400 text-xs mb-5">
                  {lang === 'en' ? region.destinations_en : region.destinations_es}
                </p>
                <a
                  href={getWhatsAppLink(lang === 'en' ? region.msg_en : region.msg_es)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#0066FF] hover:bg-[#0055DD] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#0066FF]/30"
                >
                  {lang === 'en' ? 'Book Here' : 'Reservar Aquí'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
