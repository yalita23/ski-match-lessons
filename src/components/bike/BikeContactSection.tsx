import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BIKE_RESORTS, getBikeWhatsAppLink } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const levelOptions = {
  en: ['Beginner / First Timer', 'Intermediate', 'Advanced / Enduro', 'Elite / Downhill Pro'],
  es: ['Principiante / Primera Vez', 'Intermedio', 'Avanzado / Enduro', 'Elite / Downhill Pro'],
};

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function BikeContactSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', resort: '', level: '', message: '', newsletter: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! My name is ${formData.name}.\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDestination: ${formData.resort}\nRiding Level: ${formData.level}\n\n${formData.message}`;
    window.open(getBikeWhatsAppLink(msg), '_blank');
    setSubmitted(true);
  };

  const update = (k: string, v: string | boolean) => setFormData(p => ({ ...p, [k]: v }));

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-white/8 bg-white/4 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#10B981]/60 focus:bg-[#10B981]/5 transition-all";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Contact"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=60')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#021a0e]/92" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[#10B981] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— BOOK NOW' : '— RESERVAR AHORA'}
          </span>
          <h2
            className="text-white font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            {lang === 'en'
              ? <>Your Trail<br /><span className="text-gradient-nature">Is Waiting.</span></>
              : <>Tu Sendero<br /><span className="text-gradient-nature">Te Espera.</span></>}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#032d16] p-10 text-center">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="text-white text-2xl font-black mb-3">
                  {lang === 'en' ? "You're on the list!" : '¡Estás en la lista!'}
                </h3>
                <p className="text-white/50">
                  {lang === 'en' ? "Your message went straight to WhatsApp. We'll reach out within 24h." : 'Tu consulta fue al WhatsApp. Te contactamos en menos de 24h.'}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/5 bg-[#032d16] p-8 space-y-4"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bc-name" className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">
                      {lang === 'en' ? 'Full Name *' : 'Nombre *'}
                    </label>
                    <input id="bc-name" required type="text" value={formData.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="bc-email" className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">Email *</label>
                    <input id="bc-email" required type="email" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bc-phone" className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">WhatsApp</label>
                    <input id="bc-phone" type="tel" value={formData.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 555 0000" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="bc-resort" className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">
                      {lang === 'en' ? 'Destination' : 'Destino'}
                    </label>
                    <select id="bc-resort" value={formData.resort} onChange={e => update('resort', e.target.value)} className={inputClass + ' appearance-none cursor-pointer'}>
                      <option value="" className="bg-[#032d16]">{lang === 'en' ? 'Select destination...' : 'Seleccioná...'}</option>
                      {BIKE_RESORTS.map(r => <option key={r.id} value={r.name} className="bg-[#032d16]">{r.name}</option>)}
                      <option value="Other" className="bg-[#032d16]">{lang === 'en' ? 'Other' : 'Otro'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <fieldset>
                    <legend className="text-xs font-black text-white/40 uppercase tracking-widest mb-3 block">
                      {lang === 'en' ? 'Riding Level' : 'Nivel de Riding'}
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {levelOptions[lang].map(lv => (
                        <label
                          key={lv}
                          className={`flex items-center gap-2 cursor-pointer text-xs p-3 rounded-xl border transition-all ${
                            formData.level === lv
                              ? 'border-[#10B981]/60 bg-[#10B981]/10 text-[#34d399]'
                              : 'border-white/5 text-white/40 hover:border-white/15'
                          }`}
                        >
                          <input type="radio" name="bike-level" value={lv} checked={formData.level === lv} onChange={() => update('level', lv)} className="sr-only" />
                          <span className={`w-3 h-3 rounded-full flex-shrink-0 border-2 ${formData.level === lv ? 'bg-[#10B981] border-[#10B981]' : 'border-white/20'}`} aria-hidden="true" />
                          {lv}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div>
                  <label htmlFor="bc-msg" className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 block">
                    {lang === 'en' ? 'Message' : 'Mensaje'}
                  </label>
                  <textarea
                    id="bc-msg"
                    rows={4}
                    value={formData.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder={lang === 'en' ? 'Dates, group size, terrain goals...' : 'Fechas, tamaño del grupo, objetivos...'}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.newsletter} onChange={e => update('newsletter', e.target.checked)} className="w-4 h-4 rounded mt-0.5 accent-[#10B981]" />
                  <span className="text-xs text-white/30">
                    {lang === 'en' ? 'Send me MTB tips, trail news & exclusive deals.' : 'Enviame tips de MTB, novedades y ofertas exclusivas.'}
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/30 flex items-center justify-center gap-2"
                >
                  {WA_ICON}
                  {lang === 'en' ? 'Send via WhatsApp' : 'Enviar por WhatsApp'}
                </button>
                <p className="text-center text-xs text-white/20">
                  ⚡ {lang === 'en' ? 'Response within 24 hours' : 'Respuesta en menos de 24h'}
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-5"
          >
            <div className="rounded-2xl border border-white/5 bg-[#032d16] p-7">
              <h3 className="text-white font-black text-xl mb-6 tracking-tight">
                {lang === 'en' ? 'Reach Us Directly' : 'Contacto Directo'}
              </h3>
              {[
                {
                  icon: WA_ICON,
                  color: '#10B981',
                  label: 'WhatsApp',
                  value: lang === 'en' ? 'Chat now — fastest response' : 'Chat ahora — respuesta más rápida',
                  href: getBikeWhatsAppLink(),
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: '#F59E0B',
                  label: 'Email',
                  value: 'info@bikematchlessons.com',
                  href: 'mailto:info@bikematchlessons.com',
                },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/3 transition-all group mb-3"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.color + '20', color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white/30 text-xs font-black uppercase tracking-widest mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold text-sm group-hover:text-[#34d399] transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}

              <div className="mt-5 pt-5 border-t border-white/5">
                <div className="text-white/25 text-xs uppercase tracking-widest font-black mb-3">
                  {lang === 'en' ? 'Response Hours' : 'Horarios de Respuesta'}
                </div>
                <div className="text-white/50 text-xs space-y-1">
                  <div>{lang === 'en' ? 'Mon–Fri: 8:00 AM – 8:00 PM MST' : 'Lun–Vie: 8:00 – 20:00 MST'}</div>
                  <div>{lang === 'en' ? 'Sat–Sun: 9:00 AM – 6:00 PM MST' : 'Sáb–Dom: 9:00 – 18:00 MST'}</div>
                  <div className="text-[#10B981] font-bold mt-2">⚡ {lang === 'en' ? 'WhatsApp preferred for instant replies' : 'WhatsApp preferido para respuesta inmediata'}</div>
                </div>
              </div>
            </div>

            <a
              href={getBikeWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white py-5 px-8 rounded-2xl font-black text-lg uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#10B981]/30"
            >
              {WA_ICON}
              {lang === 'en' ? 'Open WhatsApp Now' : 'Abrir WhatsApp Ahora'}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
