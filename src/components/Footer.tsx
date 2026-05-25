import { useState } from 'react';
import { getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

export default function Footer({ lang }: Props) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const links = {
    en: {
      quick: [
        { label: 'Home', href: '#hero' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Levels', href: '#levels' },
        { label: 'Resorts', href: '#resorts' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
      ],
      legal: [
        { label: 'Terms of Service', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
    es: {
      quick: [
        { label: 'Inicio', href: '#hero' },
        { label: 'Cómo Funciona', href: '#how-it-works' },
        { label: 'Niveles', href: '#levels' },
        { label: 'Resorts', href: '#resorts' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contacto', href: '#contact' },
      ],
      legal: [
        { label: 'Términos de Servicio', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Política de Cookies', href: '#' },
      ],
    },
  };

  const tx = links[lang];

  const socials = [
    { label: 'Instagram', icon: '📸', href: '#' },
    { label: 'TikTok', icon: '🎵', href: '#' },
    { label: 'Facebook', icon: '👥', href: '#' },
    { label: 'YouTube', icon: '▶️', href: '#' },
  ];

  return (
    <footer className="bg-[#020509] text-white pt-16 pb-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand — logo real */}
          <div className="lg:col-span-1">
            <a href="#hero" className="block mb-5" aria-label="Ski Match Lessons - Home">
              <img
                src="/logo-SkiMatch.png"
                alt="Ski Match Lessons"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-white/35 text-sm leading-relaxed mb-5">
              {lang === 'en'
                ? 'Connecting skiers with the world\'s best certified instructors at 50+ resorts worldwide.'
                : 'Conectando esquiadores con los mejores instructores certificados del mundo en 50+ resorts.'}
            </p>
            <div className="flex gap-2.5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0066FF] flex items-center justify-center transition-all hover:scale-110 border border-white/5"
                >
                  <span role="img" aria-hidden="true">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-5">
              {lang === 'en' ? 'Quick Links' : 'Links Rápidos'}
            </h3>
            <ul className="space-y-3">
              {tx.quick.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + WhatsApp */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-5">Legal</h3>
            <ul className="space-y-3 mb-6">
              {tx.legal.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide transition-all hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-5">Newsletter</h3>
            <p className="text-white/35 text-sm mb-4">
              {lang === 'en'
                ? 'Ski tips, resort news & exclusive offers.'
                : 'Tips, novedades de resorts y ofertas exclusivas.'}
            </p>
            {subscribed ? (
              <div className="text-green-400 text-sm font-bold flex items-center gap-2">
                ✅ {lang === 'en' ? 'Subscribed! Thanks!' : '¡Suscripto! ¡Gracias!'}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={lang === 'en' ? 'Your email...' : 'Tu email...'}
                  aria-label={lang === 'en' ? 'Newsletter email' : 'Email para newsletter'}
                  className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#0066FF] hover:bg-[#0055DD] text-white py-2.5 rounded-xl text-sm font-black uppercase tracking-wide transition-all hover:scale-105"
                >
                  {lang === 'en' ? 'Subscribe' : 'Suscribirse'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Ski Match Lessons. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
          <p className="text-white/15 text-xs">
            {lang === 'en' ? 'Made with ❤️ for skiers worldwide' : 'Hecho con ❤️ para esquiadores de todo el mundo'}
          </p>
        </div>
      </div>
    </footer>
  );
}
