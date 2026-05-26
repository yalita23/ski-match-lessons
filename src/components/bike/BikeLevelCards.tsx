import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const levels = {
  en: [
    {
      badge: 'BEGINNER',
      title: 'Trail\nNovices',
      img: '/bike-beginner.jpg',
      desc: 'New to mountain biking? Perfect starting point. Learn body position, braking, and confidence on smooth trails — safe, fast, and addictive.',
      points: ['Green & blue smooth trails', 'Body position & braking technique', 'Confidence from day one', 'Private or group lessons'],
      cta: 'Book Beginner Class',
      accentColor: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.3)',
      msg: "Hi! I'm a beginner MTB rider and I'd like to book a lesson with Bike Match Lessons.",
      imgPosition: 'center center',
    },
    {
      badge: 'MOST POPULAR',
      badgePop: true,
      title: 'Trail\nWarriors',
      img: '/bike-intermediate.jpg',
      desc: 'You can ride but want to ride better. Master berms, rock gardens, tabletops — and start conquering technical terrain you\'ve been avoiding.',
      points: ['Rock gardens & rooted trails', 'Cornering & pumping technique', 'Tabletops & small jumps', 'Progression to black trails'],
      cta: 'Book Intermediate Class',
      accentColor: '#F59E0B',
      accentGlow: 'rgba(245, 158, 11, 0.3)',
      msg: "Hi! I'm an intermediate MTB rider and I'd like to improve my technique with Bike Match Lessons.",
      featured: true,
      imgPosition: 'center center',
    },
    {
      badge: 'ADVANCED',
      title: 'Downhill &\nEnduro Masters',
      img: '/bike-advanced.jpg',
      desc: 'Push the limits. Downhill, big drops, enduro coaching — our top coaches are former EWS racers and downhill professionals.',
      points: ['Technical DH & enduro terrain', 'Big drops & gap jumps', 'Enduro race coaching', 'Elite personalized sessions'],
      cta: 'Book Advanced Class',
      accentColor: '#EF4444',
      accentGlow: 'rgba(239, 68, 68, 0.3)',
      msg: "Hi! I'm an advanced MTB rider looking for elite coaching with Bike Match Lessons.",
      imgPosition: 'center 30%',
    },
  ],
  es: [
    {
      badge: 'PRINCIPIANTE',
      title: 'Trail\nNovatos',
      img: '/bike-beginner.jpg',
      desc: '¿Nuevo en el mountain bike? Punto de partida perfecto. Aprendé posición corporal, frenado y confianza en senderos suaves — seguro, rápido y adictivo.',
      points: ['Senderos verdes y azules suaves', 'Posición corporal y técnica de frenado', 'Confianza desde el día uno', 'Clases privadas o grupales'],
      cta: 'Reservar Clase Principiante',
      accentColor: '#10B981',
      accentGlow: 'rgba(16, 185, 129, 0.3)',
      msg: 'Hola! Soy principiante en MTB y quisiera reservar una clase con Bike Match Lessons.',
      imgPosition: 'center center',
    },
    {
      badge: 'MÁS POPULAR',
      badgePop: true,
      title: 'Trail\nWarriors',
      img: '/bike-intermediate.jpg',
      desc: 'Sabés rodar pero querés rodar mejor. Dominá berms, jardines de rocas, tabletops — y empezá a conquistar el terreno técnico que evitabas.',
      points: ['Jardines de rocas y senderos con raíces', 'Técnica de viraje y bombeo', 'Tabletops y saltos pequeños', 'Progresión hacia senderos negros'],
      cta: 'Reservar Clase Intermedia',
      accentColor: '#F59E0B',
      accentGlow: 'rgba(245, 158, 11, 0.3)',
      msg: 'Hola! Soy rider MTB intermedio/a y quisiera mejorar mi técnica con Bike Match Lessons.',
      featured: true,
      imgPosition: 'center center',
    },
    {
      badge: 'AVANZADO',
      title: 'Downhill &\nEnduro Masters',
      img: '/bike-advanced.jpg',
      desc: 'Empujá los límites. Downhill, drops grandes, coaching de enduro — nuestros top coaches son ex-racers de EWS y profesionales del downhill.',
      points: ['DH técnico y terreno de enduro', 'Drops grandes y gap jumps', 'Coaching de carrera enduro', 'Sesiones personalizadas de élite'],
      cta: 'Reservar Clase Avanzada',
      accentColor: '#EF4444',
      accentGlow: 'rgba(239, 68, 68, 0.3)',
      msg: 'Hola! Soy rider MTB avanzado/a buscando coaching elite con Bike Match Lessons.',
      imgPosition: 'center 30%',
    },
  ],
};

export default function BikeLevelCards({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tx = levels[lang];

  return (
    <section id="levels" ref={ref} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden" aria-label="Skill levels">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-20">
          <span className="block text-[#10B981] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— CHOOSE YOUR LEVEL' : '— ELEGÍ TU NIVEL'}
          </span>
          <h2 className="text-gray-900 font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}>
            {lang === 'en' ? <>What&apos;s Your<br /><span className="text-gradient-amber">Riding Level?</span></> : <>¿Cuál es tu<br /><span className="text-gradient-amber">Nivel de Riding?</span></>}
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
                  ? 'border-[#F59E0B]/40 shadow-2xl shadow-[#F59E0B]/15 lg:-mt-6'
                  : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
              }`}
              style={level.featured ? { boxShadow: `0 0 60px ${level.accentGlow}` } : {}}
            >
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img src={level.img} alt={level.title.replace('\n', ' ')} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: level.imgPosition || 'center center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full" style={{ background: level.accentColor + '25', color: level.accentColor, border: `1px solid ${level.accentColor}50` }}>{level.badge}</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-7 bg-white">
                <h3 className="text-gray-900 font-black text-2xl leading-tight mb-4 whitespace-pre-line" style={{ letterSpacing: '-0.02em' }}>{level.title}</h3>
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
                  href={getBikeWhatsAppLink(level.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-xl text-sm font-black tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
                  style={{ background: level.accentColor }}
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
