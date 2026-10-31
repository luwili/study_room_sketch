import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  RefreshCw, 
  Smartphone, 
  Download,
  BookOpen,
  Compass
} from 'lucide-react';
import scheduleData from '../data/schedule.json';
import { getUfaTimeInfo } from '../utils/time';
import { ScheduleDay, ScheduleItem, ScheduleWeek } from '../types';
import { SketchOrbitPencil } from '../components/sketch/SketchOrbitPencil';
import { 
  SketchArrow, 
  SketchStar, 
  SketchStamp, 
  SketchUnderline, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

interface SchedulePageProps {
  onNavigateTeacher?: (teacherName: string) => void;
  onNavigateSubject?: (subjectId: string) => void;
  onOpenSync?: () => void;
  isSyncing?: boolean;
  initialWeek?: number;
  onOpenWidgetModal?: () => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  onNavigateTeacher,
  onNavigateSubject,
  onOpenSync,
  isSyncing = false,
  initialWeek,
  onOpenWidgetModal
}) => {
  const timeInfo = getUfaTimeInfo();
  const currentWeekNumber = scheduleData.currentWeekNumber || 8;
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek || currentWeekNumber);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  
  useEffect(() => {
    if (initialWeek) {
      setSelectedWeek(initialWeek);
    }
  }, [initialWeek]);
  
  // Default selected day: today (1..6), or 1 (Mon) on Sunday
  const initialDay = timeInfo.dayOfWeek >= 1 && timeInfo.dayOfWeek <= 6 ? timeInfo.dayOfWeek : 1;
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);

  const weeksMap = (scheduleData as any).weeks as Record<string, ScheduleWeek> | undefined;
  const activeWeekData: ScheduleWeek = weeksMap?.[String(selectedWeek)] || {
    weekNumber: selectedWeek,
    weekType: selectedWeek % 2 === 0 ? 'even' : 'odd',
    startDate: '',
    endDate: '',
    label: `Неделя ${selectedWeek}`,
    totalPairs: scheduleData.days.reduce((acc: number, d: any) => acc + d.pairs.length, 0),
    days: scheduleData.days as unknown as ScheduleDay[]
  };

  const days: ScheduleDay[] = (activeWeekData.days || scheduleData.days) as unknown as ScheduleDay[];
  const currentDayData: ScheduleDay = days.find((d: ScheduleDay) => d.dayOfWeek === selectedDay) || days[0] || {
    dayOfWeek: selectedDay,
    dayName: 'День',
    date: '',
    pairs: []
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Futuristic Hero Header with Orbit-Pencil Mascot & Blueprint Grid */}
      <section 
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-sketch-thick shadow-sketch-lg p-5 sm:p-7 bg-sketch-grid transition-all"
        aria-labelledby="schedule-heading"
      >
        {/* Blueprint corner drafting tick marks */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-sketch-indigo dark:text-blue-400 opacity-60 select-none">
          + 54°43'N 55°57'E [UFA]
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 select-none hidden sm:block">
          SEC: LAW-SEC-304
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-2">
          {/* Left Column: Title, Metadata, Stamps */}
          <div className="max-w-2xl space-y-3">
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <SketchStamp 
                label="ПОНБ-УП-304С" 
                sublabel="Институт права" 
                variant="indigo" 
              />
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                • Неделя {selectedWeek} ({activeWeekData.weekType === 'even' ? 'Чётная' : 'Нечётная'})
              </span>
              {(scheduleData as any).lastSyncedAt && (
                <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ИСУ УУНиТ: {(scheduleData as any).lastSyncedAt}</span>
                </span>
              )}
            </div>

            {/* Main Page Title */}
            <div>
              <h1 
                id="schedule-heading" 
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              >
                Расписание занятий
              </h1>
              <div className="w-48 mt-1">
                <SketchUnderline color="#2563EB" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Официальное расписание учебной группы 5-го семестра. Корпус: <span className="font-semibold text-slate-900 dark:text-white">ул. Достоевского, 131</span>. Часовой пояс: <span className="font-mono font-medium text-sketch-indigo dark:text-blue-400">Asia/Yekaterinburg (UTC+5)</span>.
            </p>
          </div>

          {/* Right Column: Mascot Orbit-Pencil & Action Controls */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 flex-shrink-0">
            {/* Author SVG Illustration */}
            <div className="relative group select-none">
              <SketchOrbitPencil size={110} />
              <div className="absolute -bottom-2 -left-3 hidden sm:block">
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-200 border border-sketch-sm rounded shadow-[1px_1px_0px_#12161A]">
                  ✦ модуль v2.0
                </span>
              </div>
            </div>

            {/* Actions: Sync & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {onOpenSync && (
                <button
                  onClick={onOpenSync}
                  disabled={isSyncing}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border-sketch shadow-sketch-sm transition-all ${
                    isSyncing
                      ? 'bg-amber-100 text-amber-900 cursor-wait'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                  }`}
                  title="Синхронизация расписания с ИСУ УУНиТ"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Синхронизация...' : 'Обновить'}</span>
                </button>
              )}

              {/* View Toggle: Day / Week */}
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-sketch shadow-sketch-sm">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'day'
                      ? 'bg-sketch-indigo text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  День
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'week'
                      ? 'bg-sketch-indigo text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Вся неделя
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Week Carousel / Selector */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-4 sm:p-5 border-sketch shadow-sketch space-y-3 transition-all"
        aria-label="Выбор недели"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Week stepper controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedWeek((w) => Math.max(1, w - 1))}
              disabled={selectedWeek <= 1}
              className="p-2 rounded-xl border-sketch bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="Предыдущая неделя"
              aria-label="Предыдущая неделя"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-mono font-extrabold text-slate-900 dark:text-white">
                Неделя {selectedWeek}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 border border-sketch-indigo">
                {activeWeekData.weekType === 'even' ? 'Четная' : 'Нечетная'}
              </span>
              {selectedWeek === currentWeekNumber && (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-[#65A30D]">
                  ★ Текущая
                </span>
              )}
            </div>

            <button
              onClick={() => setSelectedWeek((w) => Math.min(17, w + 1))}
              disabled={selectedWeek >= 17}
              className="p-2 rounded-xl border-sketch bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="Следующая неделя"
              aria-label="Следующая неделя"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick jump presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1">Быстрый переход:</span>
            <button
              onClick={() => setSelectedWeek(currentWeekNumber)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border-sketch-sm transition-all ${
                selectedWeek === currentWeekNumber
                  ? 'bg-emerald-500 text-slate-950 shadow-sketch-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
              }`}
            >
              8 (тек.)
            </button>
            <button
              onClick={() => setSelectedWeek(currentWeekNumber + 1)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border-sketch-sm transition-all ${
                selectedWeek === currentWeekNumber + 1
                  ? 'bg-amber-400 text-slate-950 shadow-sketch-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
              }`}
            >
              9 (след.)
            </button>
            <button
              onClick={() => setSelectedWeek(currentWeekNumber + 2)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border-sketch-sm transition-all ${
                selectedWeek === currentWeekNumber + 2
                  ? 'bg-sketch-indigo text-white shadow-sketch-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
              }`}
            >
              10 (+2 нед.)
            </button>

            {/* Dropdown for all 17 weeks */}
            <div className="relative w-full sm:w-auto mt-1 sm:mt-0">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="w-full sm:w-auto max-w-full text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-sketch-sm rounded-lg px-2 py-1 shadow-sketch-sm cursor-pointer truncate"
                aria-label="Выбрать неделю из списка"
              >
                {Array.from({ length: 17 }, (_, i) => i + 1).map((w) => {
                  const wMeta = weeksMap?.[String(w)];
                  const label = wMeta?.label ? ` (${wMeta.label})` : '';
                  const total = wMeta?.totalPairs ? ` · ${wMeta.totalPairs} пар` : '';
                  const suffix = w === currentWeekNumber ? ' [текущая]' : '';
                  return (
                    <option key={w} value={w}>
                      Неделя {w}{label}{total}{suffix}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Week Info Footer */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 font-mono">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-3.5 h-3.5 text-sketch-indigo" />
            <span>Интервал: <strong className="text-slate-900 dark:text-white font-bold">{activeWeekData.label || 'Семестр'}</strong></span>
            <span>•</span>
            <span>Пар на неделю: <strong className="text-slate-900 dark:text-white font-bold">{activeWeekData.totalPairs ?? days.reduce((a, d) => a + d.pairs.length, 0)}</strong></span>
          </div>
          <div className="text-[11px] text-slate-400">
            ПОНБ-УП-304С · ИСУ УУНиТ
          </div>
        </div>
      </section>

      {/* 3. Day Switcher Tabs (for 'day' mode) */}
      {viewMode === 'day' && (
        <section aria-label="Переключатель дней недели">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {days.map((d) => {
              const isSelected = d.dayOfWeek === selectedDay;
              const isToday = selectedWeek === currentWeekNumber && d.dayOfWeek === timeInfo.dayOfWeek;
              return (
                <button
                  key={d.dayOfWeek}
                  onClick={() => setSelectedDay(d.dayOfWeek)}
                  className={`p-3 rounded-xl border-sketch text-center transition-all ${
                    isSelected
                      ? 'bg-sketch-indigo text-white shadow-sketch -translate-y-1'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1.5">
                    <span className="font-extrabold text-xs sm:text-sm tracking-tight">{d.dayName}</span>
                    {isToday && (
                      <span 
                        className="w-2.5 h-2.5 rounded-full bg-lime-400 ring-2 ring-lime-600 animate-pulse flex-shrink-0" 
                        title="Сегодня в Уфе"
                      />
                    )}
                  </div>
                  <div className={`text-[11px] font-mono mt-1 ${isSelected ? 'text-blue-100 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {d.date.slice(5).replace('-', '.')} • {d.pairs.length} {d.pairs.length === 1 ? 'пара' : d.pairs.length >= 2 && d.pairs.length <= 4 ? 'пары' : 'пар'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Single Day View: Pair Cards with Authentic Hand-Drawn Sketch Craft */}
      {viewMode === 'day' && (
        <section 
          className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch-thick shadow-sketch-lg space-y-5"
          aria-label={`Расписание на ${currentDayData.dayName}`}
        >
          {/* Day Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b-2 border-sketch-ink dark:border-white/20">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentDayData.dayName}, {currentDayData.date}
                </h2>
                {selectedWeek === currentWeekNumber && currentDayData.dayOfWeek === timeInfo.dayOfWeek && (
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-lime-200 dark:bg-lime-950 text-lime-950 dark:text-lime-300 border border-[#65A30D] shadow-[1px_1px_0px_#84CC16]">
                    ● СЕГОДНЯ
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">
                Учебных занятий в этот день: <span className="font-bold text-slate-900 dark:text-white">{currentDayData.pairs.length}</span>
              </p>
            </div>

            <div className="font-mono text-xs text-slate-500 dark:text-slate-400 self-start sm:self-auto">
              Неделя {selectedWeek} • {activeWeekData.weekType === 'even' ? 'Чётная' : 'Нечётная'}
            </div>
          </div>

          {/* Empty State */}
          {currentDayData.pairs.length === 0 ? (
            <div className="py-14 px-4 text-center rounded-2xl border-2 border-dashed border-sketch-ink dark:border-white/30 bg-[#FAF8F3]/60 dark:bg-slate-800/40">
              <div className="w-16 h-16 mx-auto mb-3 text-sketch-indigo dark:text-blue-400 flex items-center justify-center">
                <BookOpen className="w-12 h-12 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Занятий нет — свободный день!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                В этот день по утвержденному расписанию пар нет (выходной или день самостоятельной подготовки). Отличное время изучить конспекты или флеш-карты к сессии.
              </p>
            </div>
          ) : (
            /* Pair Cards List */
            <div className="space-y-4">
              {currentDayData.pairs.map((p, index) => {
                const isCurrentPair = 
                  selectedWeek === currentWeekNumber &&
                  currentDayData.dayOfWeek === timeInfo.dayOfWeek && 
                  timeInfo.currentPair === p.pairNumber;

                const isNextPair = 
                  selectedWeek === currentWeekNumber &&
                  currentDayData.dayOfWeek === timeInfo.dayOfWeek && 
                  timeInfo.currentPairStatus === 'break' &&
                  timeInfo.pairDetails?.pair === p.pairNumber;

                return (
                  <article
                    key={p.id}
                    className={`relative p-4 sm:p-5 rounded-2xl border-sketch shadow-sketch-hover transition-all animate-card-appear ${
                      isCurrentPair
                        ? 'bg-[#F7FEE7] dark:bg-lime-950/40 border-2 border-[#65A30D] ring-2 ring-lime-400/40 shadow-sketch-lime'
                        : isNextPair
                        ? 'bg-blue-50/70 dark:bg-blue-950/30 border-2 border-sketch-indigo shadow-sketch-indigo'
                        : 'bg-white dark:bg-slate-800'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Left: Time badge & Subject Information */}
                      <div className="flex items-start space-x-4">
                        {/* Pair Number Stamp */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-sketch bg-white dark:bg-slate-900 flex flex-col items-center justify-center flex-shrink-0 text-center shadow-sketch-sm">
                          <span className="text-[9px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                            ПАРА
                          </span>
                          <span className="text-xl sm:text-2xl font-extrabold font-mono text-sketch-indigo dark:text-blue-300 leading-none">
                            {p.pairNumber}
                          </span>
                        </div>

                        {/* Subject Details */}
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => onNavigateSubject?.(p.subjectId)}
                              className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg hover:text-sketch-indigo dark:hover:text-blue-400 transition-colors text-left tracking-tight"
                            >
                              {p.subjectName}
                            </button>

                            {/* Ongoing Marker Badge */}
                            {isCurrentPair && (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-lime-400 text-slate-950 shadow-[1px_1px_0px_#12161A]">
                                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                                <span>ИДЕТ СЕЙЧАС</span>
                              </span>
                            )}

                            {/* Next Pair Marker Badge */}
                            {isNextPair && (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600 text-white shadow-[1px_1px_0px_#12161A]">
                                <span>СЛЕДУЮЩАЯ</span>
                              </span>
                            )}
                          </div>

                          {/* Teacher & Location Meta */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                            {p.teacher && (
                              <button
                                onClick={() => onNavigateTeacher?.(p.teacher)}
                                className="inline-flex items-center space-x-1.5 hover:text-sketch-indigo dark:hover:text-blue-400 transition-colors group"
                              >
                                <User className="w-3.5 h-3.5 text-sketch-indigo dark:text-blue-400 flex-shrink-0" />
                                <span className="font-medium underline decoration-dotted group-hover:decoration-solid">
                                  {p.teacher}
                                </span>
                              </button>
                            )}

                            <span className="inline-flex items-center space-x-1.5 text-slate-600 dark:text-slate-400 font-mono">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span>{p.room}</span>
                            </span>
                          </div>

                          {/* Notes */}
                          {p.notes && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                              {p.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Time Interval & Lesson Type Pill */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-dashed border-slate-300 dark:border-slate-700 flex-shrink-0">
                        <div className="font-mono text-base font-extrabold text-slate-900 dark:text-white tracking-wide">
                          {p.timeStart} – {p.timeEnd}
                        </div>
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase border-sketch-sm mt-1 shadow-sketch-sm ${
                          p.type === 'Лекция'
                            ? 'bg-blue-100 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300'
                        }`}>
                          {p.type}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* 5. Week Grid View (for 'week' mode) */}
      {viewMode === 'week' && (
        <section aria-label="Сетка расписания на неделю">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {days.map((d) => {
              const isToday = selectedWeek === currentWeekNumber && d.dayOfWeek === timeInfo.dayOfWeek;
              return (
                <div
                  key={d.dayOfWeek}
                  className={`rounded-2xl p-4 sm:p-5 border-sketch shadow-sketch flex flex-col justify-between transition-all ${
                    isToday
                      ? 'bg-white dark:bg-slate-900 border-2 border-sketch-indigo ring-2 ring-blue-400/30'
                      : 'bg-white dark:bg-slate-900'
                  }`}
                >
                  <div>
                    {/* Day Card Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b-2 border-sketch-ink dark:border-white/20">
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                          {d.dayName}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">
                          {d.date}
                        </p>
                      </div>
                      {isToday && (
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-lime-300 text-slate-950 border border-sketch-sm shadow-[1px_1px_0px_#12161A]">
                          СЕГОДНЯ
                        </span>
                      )}
                    </div>

                    {/* Pairs in day */}
                    <div className="space-y-2.5">
                      {d.pairs.length === 0 ? (
                        <div className="py-6 text-center text-xs font-mono text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                          Нет пар (выходной)
                        </div>
                      ) : (
                        d.pairs.map((p) => {
                          const isCurrentPair = isToday && timeInfo.currentPair === p.pairNumber;
                          return (
                            <div
                              key={p.id}
                              className={`p-2.5 rounded-xl border-sketch-sm text-xs transition-all ${
                                isCurrentPair
                                  ? 'bg-lime-100 dark:bg-lime-950/60 border-lime-600 shadow-sketch-lime'
                                  : 'bg-[#FAF8F3] dark:bg-slate-800'
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono mb-1">
                                <span className="font-bold text-sketch-indigo dark:text-blue-300">
                                  {p.pairNumber} пара · {p.timeStart}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-500">
                                  {p.type}
                                </span>
                              </div>
                              <div className="font-extrabold text-slate-900 dark:text-white line-clamp-2">
                                {p.subjectName}
                              </div>
                              {p.teacher && (
                                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 truncate">
                                  {p.teacher}
                                </div>
                              )}
                              <div className="text-[10px] font-mono text-slate-500 mt-0.5 font-medium">
                                {p.room}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Official Bell Schedule Blueprint Reference Table */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch shadow-sketch space-y-5"
        aria-label="Справочник звонков Института права"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 border-sketch-ink dark:border-white/20">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Официальное расписание звонков Института права УУНиТ</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Сетка звонков первой и второй смены корпуса по ул. Достоевского, 131.
            </p>
          </div>
          <SketchStamp label="УУНиТ · УФА" variant="ink" />
        </div>

        {/* 1st Shift */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-sketch-indigo dark:text-blue-300">
            <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 border border-sketch-indigo">
              1-я смена (08:00 – 14:00)
            </span>
            <span className="text-slate-400">• Пары 1 – 4</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {scheduleData.bellSchedule.filter((b: any) => b.shift === 1 || !b.shift && b.pair <= 4).map((b: any) => (
              <div 
                key={b.pair} 
                className="p-3 bg-[#FAF8F3] dark:bg-slate-800 rounded-xl border-sketch-sm text-center shadow-sketch-sm"
              >
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">
                  {b.label || `${b.pair} ПАРА`}
                </span>
                <div className="font-mono font-extrabold text-base text-slate-900 dark:text-white my-1">
                  {b.timeStart} – {b.timeEnd}
                </div>
                {b.break ? (
                  <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                    Перерыв: {b.break}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">—</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2nd Shift */}
        <div className="space-y-3 pt-3 border-t border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-sketch-indigo dark:text-blue-300">
            <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 border border-sketch-indigo">
              2-я смена (14:10 – 21:40)
            </span>
            <span className="text-slate-400">• Пары 5 – 9</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {scheduleData.bellSchedule.filter((b: any) => b.shift === 2 || !b.shift && b.pair > 4).map((b: any) => (
              <div 
                key={b.pair} 
                className="p-3 bg-[#FAF8F3] dark:bg-slate-800 rounded-xl border-sketch-sm text-center shadow-sketch-sm"
              >
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">
                  {b.label || `${b.pair} ПАРА`}
                </span>
                <div className="font-mono font-extrabold text-base text-slate-900 dark:text-white my-1">
                  {b.timeStart} – {b.timeEnd}
                </div>
                {b.break ? (
                  <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                    Перерыв: {b.break}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
