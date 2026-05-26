import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const FEATURED_RESORTS = [
  { id: 1,  name: 'Vail',         location: 'Colorado, USA',            difficulty: 'All Levels',    trailType: 'All-Mountain / XC', coaches: 24, rating: 5.0, image: '/images/bike-resorts/vail.jpg' },
  { id: 2,  name: 'Park City',    location: 'Utah, USA',                difficulty: 'All Levels',    trailType: 'All-Mountain / XC', coaches: 18, rating: 4.9, image: '/images/bike-resorts/parkcity.jpg' },
  { id: 3,  name: 'Lake Tahoe',   location: 'California, USA',          difficulty: 'All Levels',    trailType: 'XC / All-Mountain', coaches: 14, rating: 4.9, image: '/images/bike-resorts/laketahoe.jpg' },
  { id: 4,  name: 'Whistler',     location: 'British Columbia, Canada', difficulty: 'All Levels',    trailType: 'Downhill / Enduro',  coaches: 35, rating: 5.0, image: '/images/bike-resorts/whistler.jpg' },
  { id: 5,  name: 'Big Bear',     location: 'California, USA',          difficulty: 'All Levels',    trailType: 'Downhill / XC',     coaches: 12, rating: 4.6, image: '/images/bike-resorts/bigbear.jpg' },
  { id: 6,  name: 'Mammoth',      location: 'California, USA',          difficulty: 'All Levels',    trailType: 'Downhill / Enduro',  coaches: 20, rating: 4.8, image: '/images/bike-resorts/mammoth.jpg' },
  { id: 7,  name: 'Europa',       location: 'Andorra · España · Francia', difficulty: 'All Levels', trailType: 'All-Mountain / XC', coaches: 22, rating: 4.8, image: '/images/bike-resorts/europa.jpg' },
  { id: 8,  name: 'Argentina',    location: 'Bariloche · Mendoza',      difficulty: 'All Levels',    trailType: 'Enduro / XC',        coaches: 16, rating: 4.9, image: '/images/bike-resorts/argentina.jpg' },
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FEATURED_RESORTS.map((resort, i) => (
            <motion.div
              key={resort.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 hover:border-[#10B981]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/10 bg-white shadow-sm"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={resort.image}
                  alt={`${resort.name} MTB destination`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-white text-xs font-bold">{resort.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#10B981]/80 text-white">
                    {resort.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 font-bold text-sm mb-0.5">{resort.name}</h3>
                <p className="text-gray-400 text-xs mb-1">📍 {resort.location}</p>
                <p className="text-[#10B981] text-xs font-bold mb-3">🚵 {resort.trailType}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#10B981] text-xs font-bold">
                    👨‍🏫 {resort.coaches} {lang === 'en' ? 'coaches' : 'coaches'}
                  </span>
                </div>
                <a
                  href={getBikeWhatsAppLink(`Hi! I'd like to book an MTB lesson at ${resort.name} (${resort.location}).`)}
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
