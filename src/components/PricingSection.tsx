import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PRICING } from '../lib/constants';
import { convertCurrency, CURRENCY_OPTIONS, type Currency } from '../lib/utils';
import { getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

export default function PricingSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [currency, setCurrency] = useState<Currency>('USD');

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-void overflow-hidden"
      aria-label="Pricing"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="block text-[#0066FF] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— PRICING' : '— PRECIOS'}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <h2
              className="text-white font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              {lang === 'en' ? <>Invest in Your<br /><span className="text-gradient-fire">Best Season.</span></> : <>Invertí en tu<br /><span className="text-gradient-fire">Mejor Temporada.</span></>}
            </h2>
            {/* Currency */}
            <div className="flex flex-wrap gap-2 lg:mb-2">
              {CURRENCY_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setCurrency(o.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    currency === o.value
                      ? 'bg-[#0066FF] text-white scale-105'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1 }}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl bg-[#0d1320] ${
                plan.highlight
                  ? 'border-[#FF6B00]/50 shadow-xl shadow-[#FF6B00]/10 xl:-mt-4'
                  : 'border-white/5 hover:border-[#0066FF]/30'
              }`}
            >
              {plan.highlight && (
                <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white text-center text-xs font-black py-2.5 tracking-[0.2em] uppercase">
                  ⭐ {lang === 'en' ? 'MOST POPULAR' : 'MÁS POPULAR'}
                </div>
              )}

              <div className="p-6">
                {/* Badge */}
                {(plan as any)[`badge_${lang}`] && (
                  <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-4 ${
                    plan.highlight ? 'bg-[#FF6B00]/20 text-[#FF9500]' : 'bg-green-500/15 text-green-400'
                  }`}>
                    💰 {(plan as any)[`badge_${lang}`]}
                  </span>
                )}

                <h3 className="text-white font-black text-xl mb-1">{(plan as any)[`title_${lang}`]}</h3>
                <p className="text-white/40 text-sm mb-5">{(plan as any)[`subtitle_${lang}`]}</p>

                <div className="mb-2">
                  {plan.price_usd ? (
                    <>
                      {(plan as any).original_usd && (
                        <div className="text-sm line-through text-white/25 mb-0.5">
                          {convertCurrency((plan as any).original_usd, currency)}
                        </div>
                      )}
                      <div className={`text-4xl font-black tracking-tight ${plan.highlight ? 'text-[#FF9500]' : 'text-white'}`}>
                        {convertCurrency(plan.price_usd, currency)}
                      </div>
                    </>
                  ) : (
                    <div className="text-xl font-bold text-white/70">
                      {lang === 'en' ? 'Custom Quote' : 'Cotización personalizada'}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/30 mb-6 uppercase tracking-wide">
                  {(plan as any)[`duration_${lang}`]}
                </div>

                <ul className="space-y-2.5 mb-7">
                  {((plan as any)[`features_${lang}`] as string[]).map((f: string) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={`text-sm flex-shrink-0 mt-0.5 font-black ${plan.highlight ? 'text-[#FF9500]' : 'text-[#00C8FF]'}`}>✓</span>
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppLink(`Hi! I'm interested in the "${(plan as any)[`title_${lang}`]}" package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 rounded-xl text-sm font-black uppercase tracking-wide transition-all hover:scale-105 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white hover:shadow-xl hover:shadow-[#FF6B00]/30'
                      : 'bg-[#0066FF] text-white hover:bg-[#0055DD] hover:shadow-lg hover:shadow-[#0066FF]/30'
                  }`}
                >
                  {(plan as any)[`cta_${lang}`]}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-8 text-white/20">
          {lang === 'en' ? '* Prices in USD. Currency conversions approximate. Final pricing confirmed via WhatsApp.' : '* Precios en USD. Conversiones aproximadas. Precio final confirmado por WhatsApp.'}
        </p>
      </div>
    </section>
  );
}
