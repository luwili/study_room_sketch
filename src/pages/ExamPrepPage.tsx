import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  RotateCw, 
  Check, 
  X, 
  Shuffle, 
  ListFilter, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  Scale, 
  Calendar, 
  Layers, 
  FileCheck2, 
  FileText, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import examQuestionsData from '../data/exam-questions.json';
import sessionData from '../data/session.json';
import { ExamCard } from '../types';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchStar, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

interface ExamPrepPageProps {
  knownCards: string[];
  repeatCards: string[];
  onMarkKnown: (id: string) => void;
  onMarkRepeat: (id: string) => void;
  onResetProgress: () => void;
  onNavigateSubject?: (subjectId: string) => void;
  onNavigateTopic?: (topicId: string) => void;
}

export const ExamPrepPage: React.FC<ExamPrepPageProps> = ({
  knownCards,
  repeatCards,
  onMarkKnown,
  onMarkRepeat,
  onResetProgress,
  onNavigateSubject,
  onNavigateTopic
}) => {
  const [activeTab, setActiveTab] = useState<'session' | 'cards' | 'list'>('session');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffledCards, setShuffledCards] = useState<ExamCard[]>(examQuestionsData as ExamCard[]);
  const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

  const filteredCards = useMemo(() => {
    if (selectedSubject === 'all') return shuffledCards;
    return shuffledCards.filter((c) => c.subjectId === selectedSubject);
  }, [shuffledCards, selectedSubject]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleShuffle = () => {
    const arr = [...filteredCards];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffledCards(arr);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleStartExamStudy = (subjectKey: string) => {
    const mapToSubjectId: Record<string, string> = {
      'финансовое': 'fin-pravo',
      'экологическое': 'eco-pravo',
      'гражданское право (часть 2)': 'grazhd-pravo-2',
      'уголовное право': 'ugolov-pravo-osob',
      'административный': 'admin-proc',
      'уголовный процесс': 'ugolov-proc',
      'гражданский процесс': 'grazhd-proc'
    };

    let targetId = 'all';
    for (const [k, v] of Object.entries(mapToSubjectId)) {
      if (subjectKey.toLowerCase().includes(k)) {
        targetId = v;
        break;
      }
    }
    setSelectedSubject(targetId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setActiveTab('cards');
  };

  const knownCount = examQuestionsData.filter((q) => knownCards.includes(q.id)).length;
  const progressPercent = Math.round((knownCount / examQuestionsData.length) * 100);
  const session = sessionData.currentSession;

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Card with Blueprint Grid */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch-thick shadow-sketch-lg bg-sketch-grid transition-all"
        aria-labelledby="exam-heading"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <SketchStamp label="ЗИМНЯЯ СЕССИЯ" sublabel="5-й семестр" variant="amber" />
              <span>• Учебный план {sessionData.group}</span>
            </div>
            <h1 
              id="exam-heading" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Экзамены, зачёты и сессия
            </h1>
            <div className="w-56 mt-1">
              <SketchUnderline color="#F43F5E" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl font-sans">
              Официальный план аттестации: 4 экзамена, 10 зачётов и банк экзаменационных флеш-карт для самоподготовки.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex flex-wrap p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-sketch shadow-sketch-sm self-start lg:self-auto gap-1">
            <button
              onClick={() => setActiveTab('session')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'session'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-amber-300" />
              <span>План сессии ({session.examsCount + session.creditsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'cards'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-lime-300" />
              <span>Флеш-карты</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                activeTab === 'list'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Все билеты ({examQuestionsData.length})</span>
            </button>
          </div>
        </div>

        {/* Status Quick Bar */}
        <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
            <span className="text-[10px] text-slate-400 block mb-0.5">Курс / Семестр</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {sessionData.course} курс · {sessionData.currentSemester} семестр
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
            <span className="text-[10px] text-slate-400 block mb-0.5">Экзамены</span>
            <span className="font-extrabold text-rose-600 dark:text-rose-400">
              {session.examsCount} экзамена
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
            <span className="text-[10px] text-slate-400 block mb-0.5">Зачёты</span>
            <span className="font-extrabold text-sketch-indigo dark:text-blue-300">
              {session.creditsCount} зачётов
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
            <span className="text-[10px] text-slate-400 block mb-0.5">Всего дисциплин</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {session.totalDisciplines} предметов
            </span>
          </div>
        </div>

        {/* Progress Bar for Flashcards */}
        {activeTab !== 'session' && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Усвоено билетов: {knownCount} из {examQuestionsData.length} ({progressPercent}%)
              </span>
              <button
                onClick={onResetProgress}
                className="text-slate-400 hover:text-slate-600 text-[11px] underline"
              >
                Сбросить отметки
              </button>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-sketch-sm overflow-hidden p-0.5">
              <div
                className="h-full bg-lime-500 dark:bg-lime-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* TAB 1: OFFICIAL SESSION & CURRICULUM */}
      {activeTab === 'session' && (
        <div className="space-y-6">
          {/* Section: Exams */}
          <section className="space-y-3" aria-label="Экзамены зимней сессии">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Итоговая аттестация • {session.examsCount} дисциплины
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Экзамены зимней сессии
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {session.exams.map((exam) => (
                <div
                  key={exam.id}
                  className="rounded-2xl p-5 border-sketch bg-white dark:bg-slate-900 shadow-sketch-hover flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-400">
                        Экзамен
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {exam.credits} з.е. ({exam.hours.total}ч)
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                      {exam.subject}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="text-slate-400">Преподаватель: </span>
                        <span className="font-bold">{exam.teacher}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Кафедра: </span>
                        <span>{exam.department}</span>
                      </div>

                      {'examNote' in exam && exam.examNote && (
                        <div className="mt-2.5 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-950 dark:text-amber-200">
                          <span className="font-bold">К сдаче экзамена: </span>
                          <span>{exam.examNote}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Лек: {exam.hours.lectures}ч</span>
                      <span>Прак: {exam.hours.practice}ч</span>
                      <span>СРС: {exam.hours.self}ч</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">5-й семестр</span>
                    <button
                      onClick={() => handleStartExamStudy(exam.subject)}
                      className="px-3.5 py-1.5 rounded-xl bg-sketch-indigo hover:bg-sketch-indigo-dark text-white font-mono text-xs font-bold border-sketch-sm shadow-sketch-sm hover:shadow-none flex items-center space-x-1 transition-all"
                    >
                      <span>Учить билеты</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Credits */}
          <section className="space-y-3" aria-label="Зачёты зимней сессии">
            <div>
              <div className="text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 uppercase tracking-wider">
                Промежуточная аттестация • {session.creditsCount} дисциплин
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Зачёты зимней сессии
              </h2>
            </div>

            <div className="rounded-2xl border-sketch bg-white dark:bg-slate-900 shadow-sketch overflow-hidden divide-y divide-slate-200 dark:divide-slate-800">
              {session.credits.map((cr, idx) => (
                <div
                  key={cr.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-[#FAF8F3] dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-lg border-sketch-sm bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sketch-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                          {cr.subject}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border border-sketch-sm text-slate-500">
                          {cr.credits} з.е.
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Преподаватель: {cr.teacher}</span>
                        <span>•</span>
                        <span>Кафедра: {cr.department}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-center pl-10 sm:pl-0">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 border border-sketch-indigo shadow-sketch-sm">
                      {cr.controlType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Full Curriculum (Semesters 1-10) */}
          <section className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch shadow-sketch space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3.5 border-b-2 border-sketch-ink dark:border-white/20">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                  Дисциплины и аттестация по всем семестрам (1–10)
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Учебный план специалитета 40.05.01
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((sNum) => {
                const isCurrent = sNum === '5';
                const isSelected = expandedSemester === sNum;
                const courseNum = Math.ceil(parseInt(sNum) / 2);
                return (
                  <button
                    key={sNum}
                    onClick={() => setExpandedSemester(isSelected ? null : sNum)}
                    className={`p-3 rounded-xl border-sketch text-left font-mono transition-all ${
                      isSelected
                        ? 'bg-sketch-indigo text-white shadow-sketch -translate-y-0.5'
                        : isCurrent
                        ? 'bg-lime-100 dark:bg-lime-950 text-lime-950 dark:text-lime-200 border-lime-600 shadow-sketch-lime'
                        : 'bg-[#FAF8F3] dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sketch-sm hover:shadow-sketch'
                    }`}
                  >
                    <div className="text-[9px] uppercase tracking-wider font-bold opacity-75">
                      {isCurrent ? '★ Текущий' : `${courseNum} курс`}
                    </div>
                    <div className="text-sm font-extrabold mt-0.5">
                      {sNum} семестр
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Semester Details */}
            {expandedSemester && sessionData.allSemesters[expandedSemester as keyof typeof sessionData.allSemesters] && (
              <div className="mt-4 p-4 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white pb-2 border-b border-dashed border-slate-300 dark:border-slate-700">
                  <span>Предметы {expandedSemester}-го семестра:</span>
                  <button
                    onClick={() => setExpandedSemester(null)}
                    className="text-slate-500 hover:text-slate-900 underline"
                  >
                    Свернуть
                  </button>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {sessionData.allSemesters[expandedSemester as keyof typeof sessionData.allSemesters].map((disc, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between gap-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {disc.title}
                        <span className="text-slate-400 ml-2">({disc.credits} з.е.)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {disc.controls.map((ctrlType, cIdx) => (
                          <span
                            key={cIdx}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              ctrlType.includes('Экзамен')
                                ? 'bg-rose-100 text-rose-900 border-rose-300'
                                : 'bg-blue-100 text-sketch-indigo border-sketch-indigo'
                            }`}
                          >
                            {ctrlType}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: INTERACTIVE FLASHCARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Subject Filter Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs font-mono font-bold">
            {[
              { id: 'all', label: 'Все предметы' },
              { id: 'fin-pravo', label: 'Финансовое право' },
              { id: 'eco-pravo', label: 'Экологическое право' },
              { id: 'ugolov-pravo-osob', label: 'Уголовное право' },
              { id: 'grazhd-proc', label: 'Гражданский процесс' },
              { id: 'ugolov-proc', label: 'Уголовный процесс' },
              { id: 'admin-proc', label: 'Административный процесс' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedSubject(f.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl border-sketch-sm whitespace-nowrap transition-all ${
                  selectedSubject === f.id
                    ? 'bg-sketch-indigo text-white shadow-sketch-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {currentCard ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Card Meta & Navigation */}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                <span>
                  Билет {currentIndex + 1} из {filteredCards.length}
                </span>
                <button
                  onClick={handleShuffle}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border-sketch-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sketch-sm hover:shadow-none transition-all"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Перемешать</span>
                </button>
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[340px] rounded-2xl p-7 sm:p-9 border-sketch-thick shadow-sketch-lg flex flex-col justify-between transition-all bg-white dark:bg-slate-900 bg-sketch-grid hover:border-sketch-indigo"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase bg-blue-100 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 border border-sketch-indigo shadow-sketch-sm">
                      {currentCard.subjectName}
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-500">
                      {isFlipped ? 'ОТВЕТ' : 'ВОПРОС (нажмите для ответа)'}
                    </span>
                  </div>

                  {!isFlipped ? (
                    <div className="pt-6">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                        {currentCard.question}
                      </h2>
                      <p className="text-xs font-mono text-slate-400 mt-6 italic">
                        Нажмите на карточку, чтобы перевернуть и изучить правовое обоснование.
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2 space-y-4">
                      <div className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed text-justify">
                        {currentCard.answer}
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs font-mono text-amber-950 dark:text-amber-200 font-bold flex items-center space-x-2">
                        <Scale className="w-4 h-4 flex-shrink-0 text-amber-600" />
                        <span>Нормативная основа: {currentCard.legalBasis}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center space-x-1">
                    <RotateCw className="w-3.5 h-3.5 text-sketch-indigo" />
                    <span>Кликните для переворота</span>
                  </span>

                  {knownCards.includes(currentCard.id) && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Усвоено</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Answer grading & Navigation buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border-sketch bg-white dark:bg-slate-900 disabled:opacity-40 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs shadow-sketch-sm hover:shadow-none transition-all flex items-center justify-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Назад</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === filteredCards.length - 1}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border-sketch bg-white dark:bg-slate-900 disabled:opacity-40 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs shadow-sketch-sm hover:shadow-none transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Далее</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onMarkRepeat(currentCard.id);
                      handleNext();
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 font-mono font-bold text-xs border-sketch-sm shadow-sketch-sm hover:shadow-none transition-all flex items-center justify-center space-x-1.5"
                  >
                    <X className="w-4 h-4 text-amber-700" />
                    <span>Повторить позже</span>
                  </button>
                  <button
                    onClick={() => {
                      onMarkKnown(currentCard.id);
                      handleNext();
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-lime-400 dark:bg-lime-500 text-slate-950 font-mono font-bold text-xs border-sketch shadow-sketch-lime hover:shadow-none transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Знаю вопрос</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs rounded-2xl border border-dashed border-sketch-sm">
              По выбранному предмету билетов не найдено.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FLAT LIST OF ALL QUESTIONS */}
      {activeTab === 'list' && (
        <div className="space-y-3">
          {filteredCards.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl p-5 border-sketch bg-white dark:bg-slate-900 shadow-sketch-sm space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg border-sketch-sm bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-sketch-indigo dark:text-blue-400">
                      {q.subjectName}
                    </span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base mt-0.5">
                      {q.question}
                    </h3>
                  </div>
                </div>

                {knownCards.includes(q.id) && (
                  <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-lime-200 dark:bg-lime-950 text-lime-950 dark:text-lime-300 border border-lime-600">
                    Усвоено
                  </span>
                )}
              </div>

              <div className="pl-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                {q.answer}
              </div>

              <div className="pl-10 pt-1 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                Норма: {q.legalBasis}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
