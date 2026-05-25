import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const steps = {
  en: [
    { num: '01', icon: '🏔️', title: 'Pick Your Mountain', desc: 'Choose from 50+ world-class resorts across Utah, Colorado, Andorra, Argentina, Switzerland and more.', tag: '50+ RESORTS' },
    { num: '02', icon: '🎿', title: 'Tell Us Your Level', desc: 'First timer or seasoned shredder — we customize for every ability. Zero to hero, no judgment.', tag: 'ALL LEVELS' },
    { num: '03', icon: '⚡', title: 'We Match You', desc: 'Smart matching with certified, available instructors who speak your language and crush your goals.', tag: 'MINUTES, NOT DAYS' },
    { num: '04', icon: '🏆', title: 'Dominate the Slopes', desc: 'Hit the mountain with an elite professional by your side. Progress fast, ski hard, repeat.', tag: 'GUARANTEED RESULTS' },
  ],
  es: [
    { num: '01', icon: '🏔️', title: 'Elegí tu Montaña', desc: 'Elegí entre 50+ resorts de primer nivel en Utah, Colorado, Andorra, Argentina, Suiza y más.', tag: '50+ RESORTS' },
    { num: '02', icon: '🎿', title: 'Contanos tu Nivel', desc: 'Primera vez o esquiador experimentado — personalizamos para cualquier nivel. De cero a héroe.', tag: 'TODOS LOS NIVELES' },
    { num: '03', icon: '⚡', title: 'Te Conectamos', desc: 'Match inteligente con instructores certificados y disponibles que hablan tu idioma y cumplen tus objetivos.', tag: 'MINUTOS, NO DÍAS' },
    { num: '04', icon: '🏆', title: 'Dominá las Pistas', desc: 'Andá a la montaña con un profesional de élite a tu lado. Progresá rápido, esquiá fuerte, repetí.', tag: 'RESULTADOS GARANTIZADOS' },
  ],
};

export default function HowItWorks({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const tx = steps[lang];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      aria-label="How it works"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066FF]/6 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— HOW IT WORKS' : '— CÓMO FUNCIONA'}
          </span>
          <h2
            className="text-gray-900 font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            {lang === 'en' ? (
              <>Simple. Fast.<br /><span className="text-gradient-blue">Personalized.</span></>
            ) : (
              <>Simple. Rápido.<br /><span className="text-gradient-blue">Personalizado.</span></>
            )}
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tx.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="group relative bg-white border border-gray-100 hover:border-[#0066FF]/40 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-[#0066FF]/8 overflow-hidden shadow-sm"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

              {/* Step number — large watermark */}
              <div
                className="absolute top-4 right-5 font-black text-gray-900/5 leading-none select-none"
                style={{ fontSize: '5rem' }}
                aria-hidden="true"
              >
                {step.num}
              </div>

              <div className="relative z-10">
                <div className="text-4xl mb-5" aria-hidden="true">{step.icon}</div>
                <h3 className="text-gray-900 font-black text-lg mb-3 leading-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.desc}</p>
                <span className="inline-block text-[10px] font-black tracking-[0.25em] text-[#0066FF] border border-[#0066FF]/20 px-3 py-1 rounded-full bg-[#0066FF]/6">
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
