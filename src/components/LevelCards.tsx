import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const levels = {
  en: [
    {
      dot: '🔵',
      badge: 'BEGINNER',
      title: 'Never-Evers &\nBeginners',
      img: '/beginner.JPG',
      desc: 'No experience? Perfect starting point. Our instructors specialize in turning first-timers into real skiers — fast, safe, and fun.',
      points: ['Flat terrain & green runs', 'Posture, movement & stopping', 'Confidence from day one', 'Private or group lessons'],
      cta: 'Book Beginner Class',
      accentColor: '#00A8FF',
      accentGlow: 'rgba(0, 168, 255, 0.3)',
      msg: "Hi! I'm a beginner and I'd like to book a lesson with Ski Match Lessons.",
    },
    {
      dot: '🔴',
      badge: 'MOST POPULAR',
      badgePop: true,
      title: 'Intermediate\nSkiers',
      img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      desc: 'You can ski but you want to ski better. Tighten your carving, conquer red runs, and start exploring terrain you\'ve been avoiding.',
      points: ['Coordinated & fluid turns', 'Red runs & technical slopes', 'Carving technique mastery', 'Push toward black runs'],
      cta: 'Book Intermediate Class',
      accentColor: '#FF6B00',
      accentGlow: 'rgba(255, 107, 0, 0.3)',
      msg: "Hi! I'm an intermediate skier and I'd like to improve my technique with Ski Match Lessons.",
      featured: true,
    },
    {
      dot: '⚫',
      badge: 'ADVANCED',
      title: 'Advanced &\nPro Skiers',
      img: '/advanced.JPG',
      desc: 'Push the limits. High-speed carving, off-piste, moguls, freestyle — our top instructors are former racers and freeride professionals.',
      points: ['High-speed precision carving', 'Moguls & off-piste technique', 'Freestyle progressions', 'Elite personalized coaching'],
      cta: 'Book Advanced Class',
      accentColor: '#EF4444',
      accentGlow: 'rgba(239, 68, 68, 0.3)',
      msg: "Hi! I'm an advanced skier looking for elite coaching with Ski Match Lessons.",
    },
  ],
  es: [
    {
      dot: '🔵',
      badge: 'PRINCIPIANTE',
      title: 'Nunca Esquiaste\n& Principiantes',
      img: '/beginner.JPG',
      desc: '¿Sin experiencia? Punto de partida perfecto. Nuestros instructores se especializan en convertir principiantes en esquiadores reales — rápido, seguro y divertido.',
      points: ['Terreno plano y pistas verdes', 'Postura, movimiento y frenado', 'Confianza desde el día uno', 'Clases privadas o grupales'],
      cta: 'Reservar Clase Principiante',
      accentColor: '#00A8FF',
      accentGlow: 'rgba(0, 168, 255, 0.3)',
      msg: 'Hola! Soy principiante y quisiera reservar una clase con Ski Match Lessons.',
    },
    {
      dot: '🔴',
      badge: 'MÁS POPULAR',
      badgePop: true,
      title: 'Esquiadores\nIntermedios',
      img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      desc: 'Sabés esquiar pero querés esquiar mejor. Perfeccioná el carving, dominá las pistas rojas y empezá a explorar el terreno que evitabas.',
      points: ['Giros coordinados y fluidos', 'Pistas rojas y técnicas', 'Dominio del carving', 'Progresión hacia pistas negras'],
      cta: 'Reservar Clase Intermedia',
      accentColor: '#FF6B00',
      accentGlow: 'rgba(255, 107, 0, 0.3)',
      msg: 'Hola! Soy esquiador/a intermedio/a y quisiera mejorar mi técnica con Ski Match Lessons.',
      featured: true,
    },
    {
      dot: '⚫',
      badge: 'AVANZADO',
      title: 'Avanzados\n& Pro',
      img: '/advanced.JPG',
      desc: 'Empujá los límites. Carving de alta velocidad, fuera de pistas, moguls, freestyle — nuestros top instructores son ex-corredores y profesionales del freeride.',
      points: ['Carving de alta precisión', 'Técnica de moguls y off-piste', 'Progressions de freestyle', 'Coaching personalizado de élite'],
      cta: 'Reservar Clase Avanzada',
      accentColor: '#EF4444',
      accentGlow: 'rgba(239, 68, 68, 0.3)',
      msg: 'Hola! Soy esquiador/a avanzado/a buscando coaching elite con Ski Match Lessons.',
    },
  ],
};

export default function LevelCards({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tx = levels[lang];

  return (
    <section
      id="levels"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden"
      aria-label="Skill levels"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— CHOOSE YOUR LEVEL' : '— ELEGÍ TU NIVEL'}
          </span>
          <h2
            className="text-gray-900 font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            {lang === 'en' ? (
              <>What&apos;s Your<br /><span className="text-gradient-fire">Skiing Level?</span></>
            ) : (
              <>¿Cuál es tu<br /><span className="text-gradient-fire">Nivel de Esquí?</span></>
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {tx.map((level, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] flex flex-col ${
                level.featured
                  ? 'border-[#FF6B00]/40 shadow-2xl shadow-[#FF6B00]/15 lg:-mt-6 lg:-mb-0'
                  : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
              }`}
              style={level.featured ? { boxShadow: `0 0 60px ${level.accentGlow}` } : {}}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                  src={level.img}
                  alt={level.title.replace('\n', ' ')}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{ background: level.accentColor + '25', color: level.accentColor, border: `1px solid ${level.accentColor}50` }}
                  >
                    {level.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 bg-white">
                <h3
                  className="text-gray-900 font-black text-2xl leading-tight mb-4 whitespace-pre-line"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {level.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{level.desc}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {level.points.map((pt, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: level.accentColor + '20' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: level.accentColor }} />
                      </span>
                      <span className="text-gray-600 text-sm">{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppLink(level.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
                  style={{
                    background: level.accentColor,
                    boxShadow: `0 0 0 transparent`,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${level.accentGlow}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {level.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
