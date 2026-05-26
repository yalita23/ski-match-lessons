import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { lang: 'en' | 'es'; }

const LEAVES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${0.8 + Math.random() * 1.4}rem`,
  duration: `${14 + Math.random() * 16}s`,
  delay: `${Math.random() * 12}s`,
  opacity: 0.25 + Math.random() * 0.5,
  sway: `${15 + Math.random() * 35}px`,
  char: ['🍃', '🍂', '🌿', '🍃', '🍃'][Math.floor(Math.random() * 5)],
}));

export default function BikeHero({ lang }: Props) {
  const mountainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (mountainRef.current) {
        mountainRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tx = lang === 'en'
    ? {
        badge: '— CERTIFIED MTB INSTRUCTORS WORLDWIDE',
        line1: 'DOMINATE THE',
        line2: 'TRAILS.',
        sub: 'Private mountain bike lessons with elite certified coaches at 50+ premier trail destinations. All levels. Any terrain.',
        cta: 'Book My MTB Lesson',
        ctaSub: 'Via WhatsApp · Instant Response',
        scroll: 'Explore Destinations',
        stats: [
          { val: '50+', label: 'Trail Destinations' },
          { val: '200+', label: 'Certified Coaches' },
          { val: '10,000+', label: 'Riders Coached' },
          { val: '4.9/5', label: 'Average Rating' },
        ],
      }
    : {
        badge: '— INSTRUCTORES MTB CERTIFICADOS MUNDIAL',
        line1: 'DOMINÁ LOS',
        line2: 'SENDEROS.',
        sub: 'Clases privadas de mountain bike con coaches certificados de élite en 50+ destinos de trail premium. Todos los niveles.',
        cta: 'Reservar Mi Clase MTB',
        ctaSub: 'Por WhatsApp · Respuesta Inmediata',
        scroll: 'Explorar Destinos',
        stats: [
          { val: '50+', label: 'Destinos de Trail' },
          { val: '200+', label: 'Coaches Certificados' },
          { val: '10,000+', label: 'Riders Entrenados' },
          { val: '4.9/5', label: 'Calificación Promedio' },
        ],
      };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex flex-col" aria-label="Hero">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #021a0e 0%, #032d16 40%, #043d1e 70%, #052e16 100%)' }}
      />

      {/* Mountain silhouette (parallax) */}
      <div ref={mountainRef} className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        {/* Back ridge — lush green */}
        <div className="absolute bottom-0 left-0 right-0 h-72 opacity-30"
          style={{ background: 'linear-gradient(to top, #064e3b, transparent)', clipPath: 'polygon(0 60%, 8% 40%, 18% 50%, 28% 25%, 40% 45%, 52% 20%, 64% 38%, 76% 18%, 88% 35%, 100% 15%, 100% 100%, 0 100%)' }}
        />
        {/* Mid ridge — deeper green */}
        <div className="absolute bottom-0 left-0 right-0 h-56 opacity-50"
          style={{ background: 'linear-gradient(to top, #047857, transparent)', clipPath: 'polygon(0 55%, 12% 35%, 22% 48%, 35% 22%, 45% 40%, 58% 15%, 70% 32%, 82% 12%, 92% 28%, 100% 8%, 100% 100%, 0 100%)' }}
        />
        {/* Front ridge — darkest */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-70"
          style={{ background: 'linear-gradient(to top, #021a0e, transparent)', clipPath: 'polygon(0 70%, 15% 50%, 28% 62%, 42% 40%, 55% 58%, 68% 35%, 80% 52%, 92% 38%, 100% 48%, 100% 100%, 0 100%)' }}
        />
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#021a0e]" />
      </div>

      {/* Leaf particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {LEAVES.map(l => (
          <div
            key={l.id}
            className="leaf absolute"
            style={{
              left: l.left,
              fontSize: l.size,
              '--duration': l.duration,
              '--delay': l.delay,
              '--leaf-opacity': l.opacity,
              '--sway-x': l.sway,
            } as React.CSSProperties}
          >
            {l.char}
          </div>
        ))}
      </div>

      {/* Green accent glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10B981]/8 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#F59E0B]/6 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-36">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#10B981]" />
              <span className="text-[#10B981] text-xs font-black tracking-[0.4em] uppercase">{tx.badge}</span>
            </div>

            {/* Headline */}
            <h1
              className="font-black text-white leading-none mb-8 uppercase"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', letterSpacing: '-0.03em' }}
            >
              {tx.line1}<br />
              <span className="text-gradient-nature">{tx.line2}</span>
            </h1>

            {/* Sub */}
            <p className="text-white/50 text-lg max-w-xl leading-relaxed mb-10" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              {tx.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-6">
              <motion.a
                href={getBikeWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wide transition-all hover:shadow-2xl hover:shadow-[#10B981]/40"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {tx.cta}
              </motion.a>
              <a
                href="#resorts"
                className="flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wide transition-all"
              >
                {tx.scroll} ↓
              </a>
            </div>
            <p className="text-white/25 text-xs uppercase tracking-widest">{tx.ctaSub}</p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-black/40 backdrop-blur-md border-t border-[#10B981]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {tx.stats.map((s, i) => (
                <div key={i} className={`py-5 px-4 text-center ${i < tx.stats.length - 1 ? 'border-r border-white/5' : ''}`}>
                  <div className="text-[#10B981] font-black text-2xl" style={{ letterSpacing: '-0.02em' }}>{s.val}</div>
                  <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
