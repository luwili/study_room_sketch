import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  User, 
  Building2, 
  FileText, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import subjectsData from '../data/subjects.json';
import topicsMetadata from '../data/topics-metadata.json';
import { Subject, TopicMetadata } from '../types';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchStar, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

const topicsData: TopicMetadata[] = topicsMetadata as TopicMetadata[];

interface SubjectsPageProps {
  onNavigateTopic: (topicId: string) => void;
  onNavigateTeacher: (teacherName: string) => void;
  selectedSubjectId?: string;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({
  onNavigateTopic,
  onNavigateTeacher,
  selectedSubjectId
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(() => {
    if (selectedSubjectId) {
      return (subjectsData.find((s) => s.id === selectedSubjectId) as Subject) || null;
    }
    return null;
  });

  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.shortTitle.toLowerCase().includes(search.toLowerCase()) ||
        s.teacherName.toLowerCase().includes(search.toLowerCase()) ||
        s.departmentName.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;
      if (filterType === 'all') return true;
      if (filterType === 'exam') return s.examType === 'Экзамен';
      if (filterType === 'credit') return s.examType.includes('Зачёт');
      return true;
    });
  }, [search, filterType]);

  const subjectTopics = useMemo(() => {
    if (!activeSubject) return [];
    return topicsData.filter((t) => t.subjectId === activeSubject.id);
  }, [activeSubject]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header with Blueprint Grid */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch-thick shadow-sketch-lg bg-sketch-grid transition-all"
        aria-labelledby="subjects-title"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <SketchStamp label="УЧЕБНЫЙ ПЛАН" sublabel="5-й семестр" variant="indigo" />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                • 40.05.01 ПОНБ
              </span>
            </div>
            <h1 
              id="subjects-title" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Учебные дисциплины
            </h1>
            <div className="w-48 mt-1">
              <SketchUnderline color="#2563EB" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-sans">
              Каталог всех 10 дисциплин семестра: лекционные материалы, преподаватели, кафедры и форма аттестации.
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center space-x-2 px-3 py-1.5 rounded-xl border-sketch bg-[#FAF8F3] dark:bg-slate-800 text-xs font-mono font-bold shadow-sketch-sm">
            <GraduationCap className="w-4 h-4 text-sketch-indigo dark:text-blue-400" />
            <span>Всего дисциплин: {subjectsData.length}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по предмету, преподавателю или кафедре..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-sketch bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sketch-indigo shadow-sketch-sm"
            />
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto text-xs font-mono font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-xl border-sketch-sm transition-all ${
                filterType === 'all'
                  ? 'bg-sketch-indigo text-white shadow-sketch-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              Все (10)
            </button>
            <button
              onClick={() => setFilterType('exam')}
              className={`px-3 py-2 rounded-xl border-sketch-sm transition-all ${
                filterType === 'exam'
                  ? 'bg-rose-600 text-white shadow-sketch-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              Экзамены (5)
            </button>
            <button
              onClick={() => setFilterType('credit')}
              className={`px-3 py-2 rounded-xl border-sketch-sm transition-all ${
                filterType === 'credit'
                  ? 'bg-sketch-indigo text-white shadow-sketch-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              Зачёты (5)
            </button>
          </div>
        </div>
      </section>

      {/* 2. Grid of Subjects */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        aria-label="Список дисциплин"
      >
        {filteredSubjects.map((sub) => {
          const isSelected = activeSubject?.id === sub.id;
          return (
            <div
              key={sub.id}
              className={`rounded-2xl p-5 border-sketch bg-white dark:bg-slate-900 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'border-2 border-sketch-indigo shadow-sketch ring-2 ring-blue-400/30'
                  : 'shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5'
              }`}
              onClick={() => setActiveSubject(isSelected ? null : sub as Subject)}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase border-sketch-sm ${
                      sub.examType === 'Экзамен'
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400'
                        : 'bg-blue-100 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 border-sketch-indigo'
                    }`}
                  >
                    {sub.examType}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {sub.semester}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-sketch-indigo transition-colors">
                  {sub.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                  {sub.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                    <User className="w-3.5 h-3.5 text-sketch-indigo dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate font-semibold">{sub.teacherName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{sub.departmentName}</span>
                  </div>
                </div>

                {sub.examNote && (
                  <div className="mt-3 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{sub.examNote}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400">
                <span>{isSelected ? 'Свернуть' : 'Подробнее о предмете'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Expanded Subject Detail Blueprint View */}
      {activeSubject && (
        <section 
          className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border-sketch-thick shadow-sketch-lg space-y-6 animate-card-appear"
          aria-label="Детальный план выбранного предмета"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b-2 border-sketch-ink dark:border-white/20">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 uppercase tracking-wider mb-1">
                <span>Детальный план дисциплины</span>
                <span>•</span>
                <span>{activeSubject.examType}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeSubject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {activeSubject.description}
              </p>
            </div>

            <button
              onClick={() => setActiveSubject(null)}
              className="inline-flex items-center space-x-1 text-xs font-mono font-bold px-3 py-1.5 rounded-xl border-sketch bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sketch-sm hover:shadow-none transition-all"
            >
              <X className="w-4 h-4" />
              <span>Закрыть</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 cols: Topics List */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center space-x-2">
                <FileText className="w-5 h-5 text-sketch-indigo" />
                <span>Лекционные конспекты ({subjectTopics.length})</span>
              </h3>

              {subjectTopics.length === 0 ? (
                <div className="p-6 rounded-xl border border-dashed border-sketch-sm text-center text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300">
                    Конспекты по этой дисциплине в текущем семестре не сформированы
                  </p>
                  <p>Ознакомьтесь с материалами смежных предметов в разделе «Конспекты».</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {subjectTopics.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm flex items-start justify-between gap-3 shadow-sketch-sm hover:shadow-sketch transition-all"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 font-bold border border-sketch-indigo">
                            ~{t.readTimeMinutes || 5} мин
                          </span>
                          {t.verifiedStatus && (
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                              ✓ {t.verifiedStatus}
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                          {t.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {t.description}
                        </p>
                      </div>

                      <button
                        onClick={() => onNavigateTopic(t.id)}
                        className="px-3 py-1.5 rounded-xl bg-sketch-indigo hover:bg-sketch-indigo-dark text-white font-mono text-xs font-bold border-sketch-sm shadow-sketch-sm hover:shadow-none flex-shrink-0 flex items-center space-x-1 transition-all"
                      >
                        <span>Читать</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right col: Faculty Lead Info */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch shadow-sketch-sm space-y-3 font-mono text-xs">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Информация о дисциплине
                </h4>

                <div>
                  <span className="text-slate-400 block text-[11px] mb-0.5">Преподаватель:</span>
                  <button
                    onClick={() => onNavigateTeacher(activeSubject.teacherName)}
                    className="font-bold text-slate-900 dark:text-white hover:text-sketch-indigo text-sm inline-flex items-center space-x-1.5 transition-colors underline decoration-dotted"
                  >
                    <User className="w-4 h-4 text-sketch-indigo" />
                    <span>{activeSubject.teacherName}</span>
                  </button>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] mb-0.5">Кафедра:</span>
                  <div className="text-slate-800 dark:text-slate-200 font-semibold font-sans">
                    {activeSubject.departmentName}
                  </div>
                </div>

                {activeSubject.examNote && (
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-950 dark:text-amber-200">
                    <span className="font-bold">К сдаче экзамена: </span>
                    <span>{activeSubject.examNote}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between">
                  <span className="text-slate-400">Форма контроля:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {activeSubject.examType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Семестр:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    5 семестр (3 курс)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Конспектов:</span>
                  <span className="font-bold text-sketch-indigo dark:text-blue-400">
                    {subjectTopics.length} лекций
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
