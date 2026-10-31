import React from 'react';
import { Bookmark, FileText, Trash2, ArrowRight, BookOpen, Star } from 'lucide-react';
import topicsMetadata from '../data/topics-metadata.json';
import subjectsData from '../data/subjects.json';
import { TopicMetadata } from '../types';
import { SketchBadge, SketchStamp } from '../components/sketch/SketchDecorations';

const topicsData: TopicMetadata[] = topicsMetadata as TopicMetadata[];

interface FavoritesPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateTopic: (id: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onToggleFavorite,
  onNavigateTopic
}) => {
  const favoriteTopics = topicsData.filter((t) => favorites.includes(t.id));
  const totalCount = favoriteTopics.length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative p-6 sm:p-8 rounded-sketch-lg bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="absolute inset-0 bg-sketch-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <SketchBadge variant="indigo">
              Персональные закладки
            </SketchBadge>
            <span className="text-xs font-mono text-slate-500">Local Storage</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-sketch-heading font-black text-slate-900 dark:text-white tracking-tight">
            Избранные конспекты
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl font-sketch">
            Сохраненные лекции, нормативные акты и сжатые конспекты для быстрой подготовки к семинарам и зачетам.
          </p>
        </div>

        <div className="relative z-10 flex sm:flex-col items-center sm:items-end gap-2">
          <SketchStamp text={`${totalCount} ТЕМ`} color="lime" />
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="p-12 sm:p-16 text-center bg-sketch-card dark:bg-sketch-darkCard rounded-sketch-lg border-2 border-dashed border-sketch-line/40 dark:border-sketch-darkLine/50 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-sketch-md bg-sketch-lime/20 border-2 border-sketch-line dark:border-sketch-darkLine flex items-center justify-center text-sketch-indigo dark:text-sketch-lime">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="font-sketch-heading font-black text-lg text-slate-900 dark:text-white">
            В избранном пока пусто
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-sketch">
            Перейдите в раздел <span className="font-semibold text-sketch-indigo dark:text-blue-300">«Темы и конспекты»</span> и нажмите на иконку закладки возле любой интересующей лекции или темы.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-sketch-heading font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-sketch-indigo dark:text-blue-400" />
              <span>Сохраненные материалы ({favoriteTopics.length})</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Доступны офлайн</span>
          </div>

          <div className="space-y-3">
            {favoriteTopics.map((t) => {
              const sub = subjectsData.find((s) => s.id === t.subjectId);
              return (
                <div
                  key={t.id}
                  className="p-4 sm:p-5 rounded-sketch-md bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch-sm hover:shadow-sketch transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <SketchBadge variant="indigo">
                        {sub?.shortTitle || sub?.title || 'Конспект'}
                      </SketchBadge>
                      {t.readTimeMinutes && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sketch-lime/30 text-slate-900 font-semibold border border-sketch-line/30">
                          ~{t.readTimeMinutes} мин
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-sketch-heading font-bold text-slate-900 dark:text-white text-base">
                      {t.title}
                    </h3>
                    
                    {t.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-sketch">
                        {t.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-sketch-line/10 dark:border-sketch-darkLine/20">
                    <button
                      onClick={() => onNavigateTopic(t.id)}
                      className="px-4 py-2 rounded-sketch-sm bg-sketch-indigo hover:bg-sketch-indigo/90 text-white font-sketch-heading font-bold text-xs flex items-center space-x-1.5 shadow-sketch-sm active:translate-y-0.5 transition-all"
                    >
                      <span>Читать</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(t.id)}
                      className="p-2 rounded-sketch-sm border border-sketch-line/30 dark:border-sketch-darkLine/40 text-slate-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                      title="Удалить из закладок"
                      aria-label="Удалить из закладок"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
