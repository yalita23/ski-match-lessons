import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const REGIONS = [
  {
    name: 'USA',
    instructors: '+40',
    image: '/images/bike-resorts/mammoth-mtb.png',
    destinations_en: 'Vail · Park City · Mammoth · Lake Tahoe',
    destinations_es: 'Vail · Park City · Mammoth · Lake Tahoe',
    msg_en: "Hi! I'd like to book an MTB lesson in the USA.",
    msg_es: 'Hola! Quisiera reservar una clase de MTB en USA.',
  },
  {
    name: 'Canada',
    instructors: '+30',
    image: '/images/bike-resorts/bigbear-mtb.jpg',
    destinations_en: 'Whistler · Squamish · Revelstoke',
    destinations_es: 'Whistler · Squamish · Revelstoke',
    msg_en: "Hi! I'd like to book an MTB lesson in Canada.",
    msg_es: 'Hola! Quisiera reservar una clase de MTB en Canadá.',
  },
  {
    name: 'Europa',
    instructors: '+25',
    image: '/images/bike-resorts/europa-mtb.jpg',
    destinations_en: 'Andorra · Spain · France',
    destinations_es: 'Andorra · España · Francia',
    msg_en: "Hi! I'd like to book an MTB lesson in Europe.",
    msg_es: 'Hola! Quisiera reservar una clase de MTB en Europa.',
  },
  {
    name: 'Sudamérica',
    instructors: '+25',
    image: '/images/bike-resorts/argentina-mtb.jpg',
    destinations_en: 'Bariloche · Mendoza · Santiago',
    destinations_es: 'Bariloche · Mendoza · Santiago',
    msg_en: "Hi! I'd like to book an MTB lesson in South America.",
    msg_es: 'Hola! Quisiera reservar una clase de MTB en Sudamérica.',
  },
];

export default function BikeResortsSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="resorts"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      aria-label="Featured trail destinations"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/4 rounded-full blur-[160px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <span className="block text-[#10B981] text-xs font-black tracking-[0.4em] uppercase mb-4">
              {lang === 'en' ? '— TRAIL DESTINATIONS' : '— DESTINOS DE TRAIL'}
            </span>
            <h2
              className="text-gray-900 font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              {lang === 'en'
                ? <>+50 Trails.<br /><span className="text-gradient-nature">One Platform.</span></>
                : <>+50 Senderos.<br /><span className="text-gradient-nature">Una Plataforma.</span></>}
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
            Utah · Colorado · California · Andorra · España · Argentina · Canadá
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REGIONS.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-[#10B981]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/10 bg-white shadow-sm"
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
                <div className="absolute top-3 right-3 bg-[#10B981] text-white text-xs font-black px-3 py-1.5 rounded-full">
                  {region.instructors} {lang === 'en' ? 'coaches' : 'coaches'}
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
                  href={getBikeWhatsAppLink(lang === 'en' ? region.msg_en : region.msg_es)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#10B981]/30"
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
