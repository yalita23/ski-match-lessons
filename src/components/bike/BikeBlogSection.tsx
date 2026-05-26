import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BIKE_BLOG_POSTS } from '../../lib/bike-constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

const categories = {
  en: ['All', 'Tips', 'Safety', 'Technique', 'Destinations'],
  es: ['Todos', 'Consejos', 'Seguridad', 'Técnica', 'Destinos'],
};

const catColors: Record<string, string> = {
  'Tips': '#10B981', 'Consejos': '#10B981',
  'Safety': '#EF4444', 'Seguridad': '#EF4444',
  'Technique': '#F59E0B', 'Técnica': '#F59E0B',
  'Destinations': '#8B5CF6', 'Destinos': '#8B5CF6',
};

export default function BikeBlogSection({ lang }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const cats = categories[lang];
  const activeCat = cats[activeCategory];

  const filtered = BIKE_BLOG_POSTS.filter(post => {
    if (activeCategory === 0) return true;
    return post.category === activeCat || post.category_es === activeCat;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const toggleExpand = (id: number) => setExpandedId(prev => prev === id ? null : id);

  const formatContent = (text: string) =>
    text.split('\n\n').map((para, i) => {
      const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (para.startsWith('- ') || para.includes('\n- ')) {
        const items = para.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 text-gray-600 text-sm leading-relaxed mb-3">
            {items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
        );
      }
      return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });

  return (
    <section
      id="blog"
      ref={ref}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden"
      aria-label="Blog"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="block text-[#10B981] text-xs font-black tracking-[0.4em] uppercase mb-4">
            {lang === 'en' ? '— MTB KNOWLEDGE' : '— CONOCIMIENTO MTB'}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2
              className="text-gray-900 font-black leading-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
            >
              {lang === 'en'
                ? <>Ride Smarter.<br /><span className="text-gradient-nature">Go Harder.</span></>
                : <>Rodá Más<br /><span className="text-gradient-nature">Inteligente.</span></>}
            </h2>
            <div className="flex flex-wrap gap-2 lg:mb-2" role="tablist">
              {cats.map((cat, i) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === i}
                  onClick={() => { setActiveCategory(i); setShowAll(false); setExpandedId(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === i
                      ? 'bg-[#10B981] text-white scale-105'
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {displayed.map((post, i) => {
              const postCat = lang === 'en' ? post.category : post.category_es;
              const catColor = catColors[postCat] || '#10B981';
              const isExpanded = expandedId === post.id;
              const content = lang === 'en' ? post.content_en : post.content_es;
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={lang === 'en' ? post.title_en : post.title_es}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wide"
                      style={{ background: catColor + '25', color: catColor, border: `1px solid ${catColor}40` }}
                    >
                      {postCat}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                      {post.date} · {post.author}
                    </div>
                    <h3 className="text-gray-900 font-bold text-base mb-2 leading-snug group-hover:text-[#10B981] transition-colors">
                      {lang === 'en' ? post.title_en : post.title_es}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {lang === 'en' ? post.excerpt_en : post.excerpt_es}
                    </p>

                    <AnimatePresence initial={false}>
                      {isExpanded && content && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="border-t border-gray-100 pt-4 mb-4">
                            {formatContent(content)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="text-sm font-bold text-[#10B981] hover:text-[#059669] flex items-center gap-1.5 transition-all hover:gap-2.5"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded
                        ? (lang === 'en' ? 'Show Less ↑' : 'Ver Menos ↑')
                        : (lang === 'en' ? 'Read More →' : 'Leer Más →')
                      }
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {!showAll && filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3.5 rounded-xl font-black text-sm border border-gray-300 text-gray-500 hover:border-[#10B981]/50 hover:text-[#10B981] transition-all hover:scale-105 uppercase tracking-wide"
            >
              {lang === 'en' ? 'Load More Articles' : 'Ver Más Artículos'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
