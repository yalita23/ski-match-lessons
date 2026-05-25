import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "../lib/constants";

interface HeroProps {
  lang: "en" | "es";
}

/* ─── SWAP YOUR VIDEO HERE ─────────────────────────────────────────────────
   YouTube:  type="youtube"  id="YOUR_VIDEO_ID"
   Vimeo:    type="vimeo"    id="YOUR_VIDEO_ID"
   Leave id="" to use the fallback background image.
   ─────────────────────────────────────────────────────────────────────── */
const VIDEO = {
  type: "youtube" as "youtube" | "vimeo" | "",
  id: "t1P0SeYt2TA", // ← YouTube video ID (only the ID, not the full URL)
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1920&q=90";

const content = {
  en: {
    tag: "World-Class Certified Instruction",
    h1a: "MATCH WITH",
    h1b: "THE BEST.",
    sub: "Elite certified instructors. 50+ resorts worldwide. Any level, any mountain.",
    cta1: "Book via WhatsApp",
    cta2: "Explore Resorts",
    stats: [
      { num: "1,200+", label: "Certified Instructors" },
      { num: "50+", label: "Resorts Worldwide" },
      { num: "10K+", label: "Happy Clients" },
      { num: "6+", label: "Languages" },
    ],
  },
  es: {
    tag: "Instrucción Certificada de Clase Mundial",
    h1a: "CONECTA CON",
    h1b: "LOS MEJORES.",
    sub: "Instructores certificados de élite. 50+ resorts en todo el mundo. Cualquier nivel, cualquier montaña.",
    cta1: "Reservar por WhatsApp",
    cta2: "Explorar Resorts",
    stats: [
      { num: "1.200+", label: "Instructores Certificados" },
      { num: "50+", label: "Resorts Mundiales" },
      { num: "10K+", label: "Clientes Satisfechos" },
      { num: "6+", label: "Idiomas" },
    ],
  },
};

function Snowflake({ style }: { style: React.CSSProperties }) {
  const chars = ["❄", "❅", "❆", "✦", "✧"];
  return (
    <span className="snowflake" style={style} aria-hidden="true">
      {chars[Math.floor(Math.random() * chars.length)]}
    </span>
  );
}

function VideoBackground() {
  if (!VIDEO.id) return null;
  const src =
    VIDEO.type === "youtube"
      ? `https://www.youtube.com/embed/${VIDEO.id}?autoplay=1&mute=1&loop=1&playlist=${VIDEO.id}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`
      : `https://player.vimeo.com/video/${VIDEO.id}?autoplay=1&muted=1&loop=1&background=1&quality=1080p`;

  return (
    <div
      className="video-bg absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <iframe
        src={src}
        allow="autoplay; encrypted-media; fullscreen"
        title="Background video"
      />
    </div>
  );
}

export default function Hero({ lang }: HeroProps) {
  const tx = content[lang];
  const mountainRef = useRef<HTMLDivElement>(null);

  const [snowflakes] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 16 + 8,
      duration: `${Math.random() * 18 + 14}s`,
      delay: `${Math.random() * -25}s`,
      opacity: Math.random() * 0.4 + 0.2,
      swayX: `${(Math.random() - 0.5) * 50}px`,
      rotate: `${Math.random() * 720 - 360}deg`,
      zIndex: Math.random() > 0.5 ? 3 : 1,
    })),
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!mountainRef.current) return;
      mountainRef.current.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.05)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void"
      aria-label="Hero"
    >
      {/* ── BACKGROUND ──────────────────────────────────────── */}
      {VIDEO.id ? (
        <VideoBackground />
      ) : (
        <div
          ref={mountainRef}
          className="absolute inset-0 scale-105"
          style={{
            backgroundImage: `url('${FALLBACK_IMG}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
          aria-hidden="true"
        />
      )}

      {/* Multi-layer overlay for drama */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85 z-[1]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 z-[1]"
        aria-hidden="true"
      />
      {/* Blue tint at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#050810] to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* Snowflakes */}
      <div
        className="absolute inset-0 overflow-hidden z-[2] pointer-events-none"
        aria-hidden="true"
      >
        {snowflakes.map((f) => (
          <Snowflake
            key={f.id}
            style={
              {
                left: f.left,
                fontSize: `${f.size}px`,
                opacity: f.opacity,
                zIndex: f.zIndex,
                "--duration": f.duration,
                "--delay": f.delay,
                "--sway-x": f.swayX,
                "--rotate": f.rotate,
                "--flake-opacity": f.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2.5 glass-light border border-white/15 text-white/90 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse" />
            {tx.tag}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center mb-6"
        >
          <h1 className="font-black leading-none tracking-tight">
            <span
              className="block text-white"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {tx.h1a}
            </span>
            <span
              className="block text-gradient-blue text-glow"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {tx.h1b}
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/70 text-base sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          {tx.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 bg-[#0066FF] hover:bg-[#0055DD] text-white px-8 py-4 rounded-xl text-base font-black tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {tx.cta1}
          </a>

          <a
            href="#resorts"
            className="group flex items-center gap-2.5 glass-light border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl text-base font-black tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            {tx.cta2}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/10"
        >
          {tx.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-black/50 backdrop-blur-md px-6 py-5 text-center hover:bg-[#0066FF]/15 transition-colors duration-300"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.num}
              </div>
              <div className="text-xs text-white/50 font-medium uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#how-it-works"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-bold">
          Scroll
        </span>
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.a>
    </section>
  );
}
