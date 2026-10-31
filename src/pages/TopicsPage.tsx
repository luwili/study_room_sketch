import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Bookmark, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  BookOpen, 
  Scale, 
  ChevronDown, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import topicsData from '../data/topics.json';
import subjectsData from '../data/subjects.json';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { Topic } from '../types';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchStar, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

interface TopicsPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  selectedTopicId?: string;
}

export const TopicsPage: React.FC<TopicsPageProps> = ({
  favorites,
  onToggleFavorite,
  selectedTopicId
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(() => {
    return selectedTopicId || topicsData[0]?.id || '';
  });

  const [viewMode, setViewMode] = useState<'full' | 'short'>('full');
  const [fontScale, setFontScale] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const activeTopic = useMemo(() => {
    return topicsData.find((t) => t.id === activeTopicId) || topicsData[0];
  }, [activeTopicId]);

  const activeSubject = useMemo(() => {
    if (!activeTopic) return null;
    return subjectsData.find((s) => s.id === activeTopic.subjectId);
  }, [activeTopic]);

  const isFavorited = favorites.includes(activeTopic.id);

  const handleCopy = () => {
    const text = viewMode === 'full' ? activeTopic.fullContent : activeTopic.shortContent;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = viewMode === 'full' ? activeTopic.fullContent : activeTopic.shortContent;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTopic.id}-${viewMode}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Selector & Tool Bar */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-4 sm:p-5 border-sketch shadow-sketch flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all"
        aria-label="Панель выбора и настроек конспекта"
      >
        {/* Topic dropdown */}
        <div className="flex-1 max-w-xl">
          <label className="block text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Тема лекционного материала:
          </label>
          <div className="relative">
            <select
              value={activeTopicId}
              onChange={(e) => setActiveTopicId(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sketch-indigo shadow-sketch-sm cursor-pointer"
            >
              {topicsData.map((t) => {
                const sub = subjectsData.find((s) => s.id === t.subjectId);
                return (
                  <option key={t.id} value={t.id}>
                    [{sub?.shortTitle || 'Предмет'}] {t.title}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* View Mode Toggle & Reader Toolset */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Full vs Short Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-sketch shadow-sketch-sm">
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'full'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Полный
            </button>
            <button
              onClick={() => setViewMode('short')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'short'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Тезисы
            </button>
          </div>

          {/* Font Zoom Controls */}
          <div className="hidden sm:flex items-center space-x-1 p-1 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch shadow-sketch-sm">
            <button
              onClick={() => setFontScale((s) => Math.max(0.85, s - 0.1))}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-white"
              title="Уменьшить шрифт"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFontScale(1)}
              className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 rounded"
              title="Сбросить масштаб"
            >
              {Math.round(fontScale * 100)}%
            </button>
            <button
              onClick={() => setFontScale((s) => Math.min(1.3, s + 0.1))}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-white"
              title="Увеличить шрифт"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Actions: Favorite, Copy, Download, Print */}
          <button
            onClick={() => onToggleFavorite(activeTopic.id)}
            className={`p-2 rounded-xl border-sketch shadow-sketch-sm hover:shadow-none transition-all ${
              isFavorited
                ? 'bg-amber-100 text-amber-900 border-amber-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
            title={isFavorited ? 'В избранном' : 'Добавить в избранное'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border-sketch shadow-sketch-sm hover:shadow-none text-slate-700 dark:text-slate-300 transition-all"
            title="Копировать текст конспекта"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border-sketch shadow-sketch-sm hover:shadow-none text-slate-700 dark:text-slate-300 transition-all"
            title="Скачать .md файл"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border-sketch shadow-sketch-sm hover:shadow-none text-slate-700 dark:text-slate-300 transition-all"
            title="Распечатать конспект (Ctrl+P)"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Main Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Table of Contents */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 border-sketch shadow-sketch sticky top-24">
            <h3 className="font-mono font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3 pb-2 border-b-2 border-sketch-ink dark:border-white/20">
              Оглавление темы
            </h3>
            <div className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {activeTopic.tableOfContents && activeTopic.tableOfContents.length > 0 ? (
                activeTopic.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(item.id);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`block p-2 rounded-lg transition-all ${
                      item.level === 3 ? 'pl-4 text-[11px]' : 'font-semibold text-xs'
                    } text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-sketch-indigo dark:hover:text-blue-300 truncate`}
                    title={item.text}
                  >
                    {item.text}
                  </a>
                ))
              ) : (
                <div className="text-slate-400 font-mono text-xs italic py-2">
                  Оглавление формируется по тексту
                </div>
              )}
            </div>

            {/* Legal basis box */}
            {activeTopic.legalBasis && activeTopic.legalBasis.length > 0 && (
              <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
                <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Scale className="w-3.5 h-3.5 text-amber-500" />
                  <span>Нормативная база</span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  {activeTopic.legalBasis.map((lb, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
                      {lb}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right 3 Cols: Reader Paper Canvas */}
        <main className="lg:col-span-3 rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-10 border-sketch-thick shadow-sketch-lg">
          {/* Header Metadata */}
          <div className="pb-6 mb-6 border-b-2 border-sketch-ink dark:border-white/20">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <SketchStamp label={activeSubject?.shortTitle || 'КОНСПЕКТ'} variant="indigo" />
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center space-x-1 border border-sketch-sm">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>~{Math.max(5, Math.ceil(activeTopic.fullContent.length / 800))} мин</span>
              </span>
              {activeTopic.verifiedStatus && (
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-[#65A30D]">
                  ✓ {activeTopic.verifiedStatus}
                </span>
              )}
              {activeTopic.updatedAt && (
                <span className="text-[11px] text-slate-400 ml-auto font-mono">
                  Обновлено: {activeTopic.updatedAt}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {activeTopic.title}
            </h1>

            {activeTopic.sourceNote && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic font-mono">
                {activeTopic.sourceNote}
              </div>
            )}
          </div>

          {/* Render Markdown Content */}
          <div
            className="print-readable max-w-none text-slate-900 dark:text-slate-100 leading-relaxed"
            style={{ fontSize: `${fontScale}rem` }}
          >
            {viewMode === 'full' ? (
              <MarkdownViewer
                content={activeTopic.fullContent}
                tableOfContents={activeTopic.tableOfContents}
              />
            ) : (
              <div className="p-5 sm:p-7 rounded-2xl bg-[#FAF8F3] dark:bg-slate-800/60 border-sketch-thick shadow-sketch space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sketch-indigo dark:text-blue-300 uppercase tracking-wider pb-3 border-b-2 border-sketch-ink dark:border-white/20">
                  <BookOpen className="w-4 h-4" />
                  <span>Краткий конспект для быстрой записи и повторения к семинару</span>
                </div>
                <MarkdownViewer
                  content={activeTopic.shortContent}
                  tableOfContents={activeTopic.tableOfContents}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
