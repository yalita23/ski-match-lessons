import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

export default function TestimonialsCarousel({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-deep overflow-hidden"
      aria-label="Testimonials"
    >
      {/* Background image with heavy overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531168586822-7dea31c78de8?w=1200&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#050810]/90" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— SUCCESS STORIES' : '— HISTORIAS DE ÉXITO'}
          </span>
          <h2
            className="text-white font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            {lang === 'en' ? <>Real People.<br /><span className="text-gradient-blue">Real Results.</span></> : <>Gente Real.<br /><span className="text-gradient-blue">Resultados Reales.</span></>}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {[
              { val: '4.9/5', label: lang === 'en' ? 'Average Rating' : 'Calificación Promedio', icon: '⭐' },
              { val: '10,000+', label: lang === 'en' ? 'Lessons Completed' : 'Clases Completadas', icon: '🎿' },
              { val: '98%', label: lang === 'en' ? 'Would Recommend' : 'Lo Recomendarían', icon: '🏆' },
            ].map(s => (
              <div key={s.val} className="bg-[#0d1320] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <div className="text-2xl font-black text-white">{s.val}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-[#0d1320] border border-white/8 rounded-2xl p-8 lg:p-10"
                aria-live="polite"
              >
                {/* Quote mark */}
                <div className="text-6xl font-black text-[#0066FF]/30 leading-none mb-4 select-none">"</div>
                <div className="flex text-yellow-400 text-lg mb-5" aria-label={`${testimonial.rating} stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <blockquote className="text-white text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                  {testimonial.text}
                </blockquote>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0066FF]/30"
                    />
                    <div>
                      <div className="text-white font-bold">{testimonial.name}</div>
                      <div className="text-white/40 text-xs">📍 {testimonial.country} · {testimonial.resort}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-[#0066FF]/15 text-[#00C8FF] border border-[#0066FF]/20">{testimonial.type}</span>
                    {testimonial.instructor && (
                      <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-white/5 text-white/50 border border-white/5">👨‍🏫 {testimonial.instructor}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6" role="tablist">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2 bg-[#0066FF]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
