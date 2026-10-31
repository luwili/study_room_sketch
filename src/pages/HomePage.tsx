import React, { useMemo, useState } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Users, 
  Building2, 
  Pin, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Bookmark, 
  RefreshCw, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  HeartHandshake, 
  Smartphone, 
  Download,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import emblemImg from '../assets/emblem.png';
import scheduleData from '../data/schedule.json';
import rawAnnouncements from '../data/announcements.json';
import topicsMetadata from '../data/topics-metadata.json';
import subjectsData from '../data/subjects.json';
import { getUfaTimeInfo } from '../utils/time';
import { Announcement, TopicMetadata } from '../types';
import { SketchOrbitPencil } from '../components/sketch/SketchOrbitPencil';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchArrow, 
  SketchStar, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

const announcementsData: Announcement[] = rawAnnouncements as unknown as Announcement[];
const topicsData: TopicMetadata[] = topicsMetadata as TopicMetadata[];

interface HomePageProps {
  onNavigate: (tab: string, itemId?: string) => void;
  onOpenSync?: () => void;
  isSyncing?: boolean;
  onOpenWidgetModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenSync, 
  isSyncing = false, 
  onOpenWidgetModal 
}) => {
  const timeInfo = getUfaTimeInfo();
  const [announcementFilter, setAnnouncementFilter] = useState<string>('all');
  const [showAllAnnouncements, setShowAllAnnouncements] = useState<boolean>(false);

  // Filtered and sorted announcements
  const filteredAnnouncements = useMemo(() => {
    if (announcementFilter === 'all') return announcementsData;
    return announcementsData.filter((a) => a.tag === announcementFilter);
  }, [announcementFilter]);

  const displayedAnnouncements = useMemo(() => {
    return showAllAnnouncements ? filteredAnnouncements : filteredAnnouncements.slice(0, 6);
  }, [filteredAnnouncements, showAllAnnouncements]);

  // Find schedule for today (or Monday if Sunday)
  const todayDayOfWeek = timeInfo.dayOfWeek > 6 ? 1 : timeInfo.dayOfWeek;
  const todaySchedule = useMemo(() => {
    return scheduleData.days.find((d) => d.dayOfWeek === todayDayOfWeek) || scheduleData.days[0];
  }, [todayDayOfWeek]);

  // Featured study notes
  const featuredTopics = useMemo(() => {
    return topicsData.slice(0, 4);
  }, []);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Futuristic Hero Banner in Sketchbook / Blueprint aesthetic */}
      <section 
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-sketch-thick shadow-sketch-lg p-5 sm:p-8 bg-sketch-grid transition-all"
        aria-label="Главный баннер учебного кабинета"
      >
        {/* Technical drafting metadata stamp */}
        <div className="absolute top-2.5 left-3 text-[10px] font-mono text-sketch-indigo dark:text-blue-400 opacity-70 select-none">
          DOC: UUST-LAW-304 · REVISION 2.0
        </div>
        <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 select-none hidden sm:block">
          UFA · 54°43'N 55°57'E
        </div>

        <div className="relative z-10 max-w-2xl pt-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <SketchStamp label="ИНСТИТУТ ПРАВА" sublabel="УУНиТ · Уфа" variant="indigo" />
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              • Осенний семестр 2026/2027
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-lime-500">
              ● Очная форма
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Кабинет группы ПОНБ-УП-304С
            </h1>
            <div className="w-56 mt-1.5">
              <SketchUnderline color="#2563EB" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-xl">
            Специальность «Правовое обеспечение национальной безопасности» (уголовно-правовая специализация). 5-й семестр (3 курс). Интерактивное расписание, 28 лекций, 186 преподавателей и подготовка к сессии.
          </p>

          {/* Action buttons with sketch borders and hard offset shadows */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => onNavigate('schedule')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sketch-indigo hover:bg-sketch-indigo-dark text-white font-mono text-xs sm:text-sm font-bold border-2 border-sketch-ink shadow-sketch hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Расписание пар</span>
            </button>

            <button
              onClick={() => onNavigate('topics')}
              className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm font-bold border-sketch shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <BookOpen className="w-4 h-4 text-sketch-indigo dark:text-blue-400" />
              <span>Конспекты ({topicsData.length})</span>
            </button>

            <button
              onClick={() => onNavigate('exam')}
              className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-lime-100 dark:bg-lime-950/80 text-lime-950 dark:text-lime-200 font-mono text-xs sm:text-sm font-bold border-2 border-lime-600 shadow-sketch-lime hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-lime-700 dark:text-lime-300" />
              <span>Сессия (4 экз. · 10 зач.)</span>
            </button>

            <button
              onClick={() => onNavigate('subjects')}
              className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs sm:text-sm font-bold border-sketch shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-sketch-indigo dark:text-blue-400" />
              <span>Предметы (10)</span>
            </button>
          </div>
        </div>

        {/* Mascot Orbit-Pencil floating on the right */}
        <div className="absolute -right-4 sm:right-6 -bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 pointer-events-none select-none opacity-40 sm:opacity-90">
          <SketchOrbitPencil size={150} />
        </div>
      </section>

      {/* 2. Android Widget Companion Card */}
      <section 
        className="rounded-2xl p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/30 border-sketch shadow-sketch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
        aria-label="Нативный виджет для Android"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-400 border-sketch flex items-center justify-center text-slate-950 shadow-sketch-sm flex-shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                Нативный виджет расписания для Android
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-300 text-slate-950 border border-sketch-sm uppercase">
                v1.2.0 (Белые списки & VPN)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Пары и сетка звонков на домашнем экране смартфона. Поддержка VPN, 6 зеркал CDN и мгновенная отправка из браузера.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto flex-shrink-0">
          <a
            href="https://github.com/luwili/study_room/releases/download/widget-apk-latest/StudyRoom-Widget.apk"
            download="StudyRoom-Widget.apk"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs border-sketch shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать APK</span>
          </a>
          {onOpenWidgetModal && (
            <button
              onClick={onOpenWidgetModal}
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border-sketch shadow-sketch-sm hover:shadow-none transition-all"
            >
              Инструкция
            </button>
          )}
        </div>
      </section>

      {/* 3. Grid: Today's Schedule & Featured Study Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols on lg) */}
        <section 
          className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border-sketch shadow-sketch flex flex-col justify-between"
          aria-label="Расписание занятий на сегодня"
        >
          <div>
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-sketch-ink dark:border-white/20">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl border-sketch bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-400 shadow-sketch-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Расписание: {todaySchedule.dayName}
                  </h2>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Неделя {(scheduleData as any).currentWeekNumber || 8} • {timeInfo.dateString}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                {onOpenSync && (
                  <button
                    onClick={onOpenSync}
                    disabled={isSyncing}
                    className="p-1.5 rounded-lg border-sketch-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sketch-sm hover:shadow-none transition-all"
                    title="Синхронизация с ИСУ УУНиТ"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sketch-indigo' : ''}`} />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('schedule')}
                  className="text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 hover:underline flex items-center space-x-1"
                >
                  <span>Вся неделя</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List of pairs */}
            <div className="space-y-3">
              {todaySchedule.pairs.length === 0 ? (
                <div className="py-8 text-center border border-dashed border-sketch-sm rounded-xl font-mono text-xs text-slate-500">
                  Сегодня занятий нет (выходной)
                </div>
              ) : (
                todaySchedule.pairs.map((p) => {
                  const isCurrentPair = timeInfo.currentPair === p.pairNumber && timeInfo.dayOfWeek === todaySchedule.dayOfWeek;
                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl border-sketch transition-all ${
                        isCurrentPair
                          ? 'bg-[#F7FEE7] dark:bg-lime-950/40 border-2 border-[#65A30D] shadow-sketch-lime ring-2 ring-lime-400/40'
                          : 'bg-white dark:bg-slate-800 shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl border-sketch bg-white dark:bg-slate-900 text-center shadow-sketch-sm flex-shrink-0">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400">Пара</span>
                            <span className="text-base font-extrabold font-mono text-sketch-indigo dark:text-blue-300 leading-none">
                              {p.pairNumber}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                                {p.subjectName}
                              </span>
                              {isCurrentPair && (
                                <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-lime-400 text-slate-950 animate-pulse border border-sketch-sm">
                                  СЕЙЧАС
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 truncate">
                              {p.teacher}
                            </div>
                            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                              <span className="font-bold text-sketch-indigo dark:text-blue-400">{p.type}</span>
                              <span>•</span>
                              <span>{p.room}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 font-mono text-xs font-bold text-slate-900 dark:text-white">
                          {p.timeStart} – {p.timeEnd}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick jump to upcoming weeks */}
            <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Следующие недели:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => onNavigate('schedule', '9')}
                  className="px-2.5 py-1 rounded-lg font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-sketch-sm shadow-sketch-sm hover:shadow-none transition-all"
                >
                  Неделя 9 (26.10–01.11) →
                </button>
                <button
                  onClick={() => onNavigate('schedule', '10')}
                  className="px-2.5 py-1 rounded-lg font-bold bg-blue-100 dark:bg-blue-950/60 text-sketch-indigo dark:text-blue-300 border-sketch-sm shadow-sketch-sm hover:shadow-none transition-all"
                >
                  Неделя 10 (02–08.11) →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-sketch-indigo" />
              <span>Звонки: 08:00, 09:30, 11:10, 12:40 (1 см.) · 14:10, 15:40, 17:20 (2 см.)</span>
            </span>
            <span>ул. Достоевского, 131</span>
          </div>
        </section>

        {/* Right col: Featured Study Notes */}
        <section 
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border-sketch shadow-sketch flex flex-col justify-between"
          aria-label="Популярные конспекты"
        >
          <div>
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-sketch-ink dark:border-white/20">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl border-sketch bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-sketch-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Конспекты лекций
                  </h2>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {topicsData.length} тем из архива Study
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('topics')}
                className="text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Все</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {featuredTopics.map((topic) => {
                const sub = subjectsData.find((s) => s.id === topic.subjectId);
                const readTime = topic.readTimeMinutes || 5;
                return (
                  <div
                    key={topic.id}
                    onClick={() => onNavigate('topics', topic.id)}
                    className="p-3 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm hover:border-sketch-indigo shadow-sketch-sm hover:shadow-sketch cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-sketch-indigo dark:text-blue-300 mb-1">
                      <span className="truncate">{sub?.shortTitle || sub?.title || 'Конспект'}</span>
                      <span className="text-slate-400 flex-shrink-0">{readTime} мин</span>
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-sketch-indigo transition-colors line-clamp-1">
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {topic.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              УПК, УК, ГПК, КАС РФ
            </span>
            <button
              onClick={() => onNavigate('topics')}
              className="text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 hover:underline"
            >
              Открыть каталог →
            </button>
          </div>
        </section>
      </div>

      {/* 4. Announcements Section */}
      <section 
        className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border-sketch-thick shadow-sketch-lg space-y-4"
        aria-label="Объявления института и куратора"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b-2 border-sketch-ink dark:border-white/20">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl border-sketch bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-400 shadow-sketch-sm">
              <Pin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  Объявления института и куратора
                </h2>
                <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-500">
                  ИСУ УУНиТ
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Актуальные новости для студентов группы ПОНБ-УП-304С
              </p>
            </div>
          </div>

          {onOpenSync && (
            <button
              onClick={onOpenSync}
              disabled={isSyncing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-sketch-sm shadow-sketch-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Синхронизация...' : 'Обновить из ИСУ'}</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {['all', 'Куратор', 'Институт', 'Расписание', 'Наука'].map((tag) => {
            const label = tag === 'all' ? 'Все новости' : tag;
            const count = tag === 'all' 
              ? announcementsData.length 
              : announcementsData.filter(a => a.tag === tag).length;
            if (count === 0 && tag !== 'all') return null;
            return (
              <button
                key={tag}
                onClick={() => setAnnouncementFilter(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-sketch-sm transition-all ${
                  announcementFilter === tag
                    ? 'bg-sketch-indigo text-white shadow-sketch-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {label} <span className="opacity-75 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {displayedAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`p-4 rounded-xl border-sketch flex flex-col justify-between transition-all hover:shadow-sketch hover:-translate-y-0.5 ${
                ann.isPinned
                  ? 'bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-600 shadow-sketch'
                  : 'bg-white dark:bg-slate-800 shadow-sketch-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-sketch-sm ${
                        ann.tag === 'Куратор'
                          ? 'bg-indigo-100 text-indigo-900'
                          : ann.tag === 'Институт'
                          ? 'bg-blue-100 text-blue-900'
                          : ann.tag === 'Расписание'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {ann.tag}
                    </span>
                    {ann.isPinned && (
                      <span className="flex items-center space-x-0.5 text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                        <Pin className="w-3 h-3 fill-current" />
                        <span>Важно</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {ann.date}
                  </span>
                </div>

                {ann.imageUrl && (
                  <div className="mb-2.5 rounded-lg overflow-hidden border-sketch-sm max-h-36">
                    <img
                      src={ann.imageUrl}
                      alt={ann.title}
                      className="w-full h-28 object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug mb-1.5">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                  {ann.content}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="truncate font-semibold">{ann.author}</span>
                {ann.url && (
                  <a
                    href={ann.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-sketch-indigo dark:text-blue-400 hover:underline font-bold ml-2 flex-shrink-0"
                  >
                    <span>ИСУ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        {filteredAnnouncements.length > 6 && (
          <div className="pt-2 text-center">
            <button
              onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-sketch shadow-sketch-sm hover:shadow-none transition-all"
            >
              <span>{showAllAnnouncements ? 'Свернуть' : `Показать все (${filteredAnnouncements.length})`}</span>
              {showAllAnnouncements ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </section>

      {/* 5. Quick Navigation 9-Grid */}
      <section aria-label="Быстрый переход по всем разделам">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3.5 flex items-center space-x-2">
          <span>Быстрый переход по кабинету</span>
          <SketchStar className="w-4 h-4 text-amber-500" />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {[
            { id: 'subjects', title: 'Предметы', desc: '10 дисциплин семестра', icon: BookOpen, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950' },
            { id: 'topics', title: 'Конспекты лекций', desc: '28 лекций архива', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950' },
            { id: 'schedule', title: 'Расписание', desc: 'Звонки и пары на 17 недель', icon: Calendar, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950' },
            { id: 'exam', title: 'Сессия и экзамены', desc: '4 экзамена, 10 зачётов', icon: Sparkles, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950' },
            { id: 'teachers', title: 'Преподаватели', desc: 'Справочник института (186)', icon: Users, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950' },
            { id: 'departments', title: 'Кафедры', desc: '8 кафедр Института права', icon: Building2, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950' },
            { id: 'gratitude', title: 'Благодарность', desc: 'Патроны проекта', icon: HeartHandshake, color: 'text-pink-600 bg-pink-50 dark:bg-pink-950' },
            { id: 'institute', title: 'Институт УУНиТ', desc: 'Контакты, корпуса, ссылки', icon: ArrowRight, color: 'text-slate-600 bg-slate-100 dark:bg-slate-800' },
            { id: 'favorites', title: 'Избранное', desc: 'Сохранённые материалы', icon: Bookmark, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-sketch shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl border-sketch-sm flex items-center justify-center mb-2.5 ${item.color} shadow-sketch-sm`}>
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
