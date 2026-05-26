import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BIKE_FAQS } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

export default function BikeFAQ({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      aria-label="FAQ"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[#10B981] text-xs font-black tracking-[0.4em] uppercase mb-4">FAQ</span>
          <h2
            className="text-gray-900 font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            {lang === 'en'
              ? <>Got<br /><span className="text-gradient-nature">Questions?</span></>
              : <>¿Tenés<br /><span className="text-gradient-nature">Preguntas?</span></>}
          </h2>
        </motion.div>

        <div className="space-y-2" role="list">
          {BIKE_FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            const q = lang === 'en' ? faq.q_en : faq.q_es;
            const a = lang === 'en' ? faq.a_en : faq.a_es;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.04 + i * 0.04 }}
                role="listitem"
                className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm ${
                  isOpen
                    ? 'border-[#10B981]/40 bg-white shadow-md'
                    : 'border-gray-200 bg-white hover:border-[#10B981]/30 hover:shadow-md'
                }`}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
                >
                  <span className="text-gray-900 font-semibold text-sm sm:text-base pr-4">{q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-lg transition-colors ${
                      isOpen ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-400'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-4">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
