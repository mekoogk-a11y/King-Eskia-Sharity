import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NewsArticle } from '../../types/foundation';
import {
  Newspaper,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
} from 'lucide-react';

interface NewsSectionProps {
  news: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const { language, t, isRTL } = useLanguage();
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="news" className="py-20 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-red-400 text-xs font-bold mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>ميدان العمل الإنساني</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t.news.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-400 max-w-lg leading-relaxed">
            {t.news.subtitle}
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => {
            const title = item.title[language] || item.title.ar;
            const summary = item.summary[language] || item.summary.ar;

            return (
              <article
                key={item.id}
                className="group bg-stone-900/60 rounded-3xl border border-stone-800 hover:border-stone-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  <div className="absolute top-3 start-3">
                    <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 start-3 flex items-center gap-2 text-xs text-stone-300 font-mono">
                    <span className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-stone-800">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-red-400 font-mono mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-3">
                      {summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveArticle(item)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 pt-2 transition"
                  >
                    <span>{t.news.readMore}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="relative h-64">
              <img
                src={activeArticle.image}
                alt={activeArticle.title[language] || activeArticle.title.ar}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 end-4 p-2 rounded-full bg-black/80 text-stone-300 hover:text-white border border-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 start-6">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-mono mb-1">
                  <span>{activeArticle.location}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {activeArticle.title[language] || activeArticle.title.ar}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="prose prose-invert max-w-none text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                {activeArticle.content[language] || activeArticle.content.ar}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-stone-300 hover:bg-stone-800 text-xs font-bold"
                >
                  {t.projects.closeModal}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
