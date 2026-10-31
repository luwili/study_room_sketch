import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Building2, 
  GraduationCap, 
  Award, 
  ExternalLink, 
  Star, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Maximize2, 
  ZoomIn 
} from 'lucide-react';
import teachersData from '../data/teachers.json';
import departmentsData from '../data/departments.json';
import { Teacher } from '../types';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchStar, 
  SketchCircleHighlight 
} from '../components/sketch/SketchDecorations';

interface TeachersPageProps {
  initialSearch?: string;
  onNavigateSubject?: (subjectId: string) => void;
}

interface FullscreenPhotoState {
  url: string;
  fallbackUrl?: string;
  name: string;
  department?: string;
  position?: string;
}

const resolvePhotoUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const cleaned = url.startsWith('/') ? url.slice(1) : url;
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${cleaned}` : `${base}/${cleaned}`;
};

export const TeachersPage: React.FC<TeachersPageProps> = ({
  initialSearch = '',
  onNavigateSubject
}) => {
  const [tab, setTab] = useState<'group' | 'all'>('group');
  const [search, setSearch] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<FullscreenPhotoState | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenPhoto) {
          setFullscreenPhoto(null);
        } else if (selectedTeacher) {
          setSelectedTeacher(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenPhoto, selectedTeacher]);

  useEffect(() => {
    if (selectedTeacher || fullscreenPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTeacher, fullscreenPhoto]);

  const groupTeachersCount = teachersData.filter((t) => t.isGroupTeacher).length;

  const filteredTeachers = useMemo(() => {
    return (teachersData as Teacher[]).filter((t) => {
      if (tab === 'group' && !t.isGroupTeacher) return false;
      if (selectedDept !== 'all' && t.department !== selectedDept) return false;

      if (selectedDegree === 'doctor' && !t.degree.toLowerCase().includes('доктор')) return false;
      if (selectedDegree === 'kandidat' && !t.degree.toLowerCase().includes('кандидат')) return false;

      if (search) {
        const qNorm = (search || '').toLowerCase().replace(/ё/g, 'е').replace(/зз/g, 'з').trim();
        const searchWords = qNorm.split(/[\s/(),]+/).filter((w) => w.length > 2);
        const tNameNorm = t.name.toLowerCase().replace(/ё/g, 'е').replace(/зз/g, 'з');
        const tDeptNorm = t.department.toLowerCase().replace(/ё/g, 'е');
        const tPosNorm = t.position.toLowerCase().replace(/ё/g, 'е');
        const tIntNorm = (t.interests || '').toLowerCase().replace(/ё/g, 'е');
        const tRoleNorm = (t.groupRole || '').toLowerCase().replace(/ё/g, 'е');
        const tSubjNorm = (t.groupSubjects || []).join(' ').toLowerCase().replace(/ё/g, 'е');

        const matchesFull = (
          tNameNorm.includes(qNorm) ||
          tDeptNorm.includes(qNorm) ||
          tPosNorm.includes(qNorm) ||
          tIntNorm.includes(qNorm) ||
          tRoleNorm.includes(qNorm) ||
          tSubjNorm.includes(qNorm)
        );

        const matchesWords = searchWords.length > 0 && searchWords.some((w) => tNameNorm.includes(w) || tSubjNorm.includes(w));

        return matchesFull || matchesWords;
      }
      return true;
    });
  }, [tab, selectedDept, selectedDegree, search]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header with Blueprint Grid */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch-thick shadow-sketch-lg bg-sketch-grid transition-all"
        aria-labelledby="teachers-title"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 uppercase tracking-wider mb-1">
              <SketchStamp label="КАДРОВЫЙ СОСТАВ" sublabel="Институт права" variant="indigo" />
              <span>• law-bsu.ru</span>
            </div>
            <h1 
              id="teachers-title" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Справочник преподавателей
            </h1>
            <div className="w-56 mt-1">
              <SketchUnderline color="#2563EB" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-sans">
              Подтверждённый профессорско-преподавательский состав Института права УУНиТ.
            </p>
          </div>

          {/* Group vs All Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-sketch shadow-sketch-sm self-start sm:self-auto">
            <button
              onClick={() => setTab('group')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                tab === 'group'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Наша группа ({groupTeachersCount})</span>
            </button>
            <button
              onClick={() => setTab('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                tab === 'all'
                  ? 'bg-sketch-indigo text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Весь институт ({teachersData.length})
            </button>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по ФИО, предмету..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border-sketch bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sketch-indigo shadow-sketch-sm"
            />
          </div>

          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-sketch bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sketch-indigo shadow-sketch-sm truncate"
            >
              <option value="all">Все кафедры института</option>
              {departmentsData.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-sketch bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sketch-indigo shadow-sketch-sm"
            >
              <option value="all">Все ученые степени</option>
              <option value="doctor">Доктора юридических наук</option>
              <option value="kandidat">Кандидаты юридических наук</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. Teachers Grid */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        aria-label="Список преподавателей"
      >
        {filteredTeachers.length === 0 ? (
          <div className="col-span-2 p-12 text-center text-slate-500 font-mono text-xs rounded-2xl border border-dashed border-sketch-sm">
            Преподаватели по указанным критериям не найдены.
          </div>
        ) : (
          filteredTeachers.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTeacher(t)}
              className={`p-5 rounded-2xl border-sketch bg-white dark:bg-slate-900 flex flex-col justify-between cursor-pointer transition-all ${
                t.isGroupTeacher
                  ? 'border-2 border-sketch-indigo shadow-sketch ring-2 ring-blue-400/20'
                  : 'shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5'
              }`}
            >
              <div>
                <div className="flex items-start space-x-3.5 mb-3">
                  {/* Photo Thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border-sketch-sm relative shadow-sketch-sm">
                    {t.photoUrl ? (
                      <img
                        src={resolvePhotoUrl(t.photoUrl)}
                        alt={t.name}
                        className="w-full h-full object-cover object-top block"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (t.fallbackPhotoUrl && target.src !== t.fallbackPhotoUrl) {
                            target.src = t.fallbackPhotoUrl;
                          } else {
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = parent.querySelector('.photo-fallback');
                              if (fallback) fallback.classList.remove('hidden');
                            }
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`photo-fallback w-full h-full flex items-center justify-center text-slate-500 font-mono font-bold text-sm ${
                        t.photoUrl ? 'hidden' : ''
                      }`}
                    >
                      {t.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1 font-mono text-[10px]">
                      <span className="font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sketch-sm">
                        {t.position}
                      </span>

                      {t.isGroupTeacher && (
                        <span className="inline-flex items-center space-x-1 font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border border-amber-400 shadow-[1px_1px_0px_#12161A]">
                          <Star className="w-3 h-3 fill-current text-amber-500" />
                          <span>{t.groupRole || 'Наша группа'}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-sketch-indigo transition-colors">
                      {t.name}
                    </h3>

                    <div className="text-xs font-mono font-semibold text-sketch-indigo dark:text-blue-400 truncate mt-0.5">
                      {t.department}
                    </div>
                  </div>
                </div>

                {/* Group Subjects */}
                {t.isGroupTeacher && t.groupSubjects.length > 0 && (
                  <div className="mt-2.5 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-sketch-indigo text-xs font-mono">
                    <span className="font-bold text-sketch-indigo dark:text-blue-300">Ведет у группы: </span>
                    <span className="text-slate-800 dark:text-slate-200">{t.groupSubjects.join(', ')}</span>
                  </div>
                )}

                {/* Degrees & Titles */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs font-mono">
                  {t.degree && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-sketch-sm">
                      <GraduationCap className="w-3.5 h-3.5 text-sketch-indigo" />
                      <span>{t.degree}</span>
                    </span>
                  )}
                  {t.academicTitle && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-sketch-sm">
                      {t.academicTitle}
                    </span>
                  )}
                </div>

                {/* Scientific Interests */}
                {t.interests && (
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Интересы: </span>
                    <span>{t.interests}</span>
                  </div>
                )}

                {/* Contacts */}
                {(t.phone || t.email || t.room || t.isuPersonId) && (
                  <div className="mt-3 pt-2.5 border-t border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
                    {t.isuPersonId && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-500">
                        ИСУ #{t.isuPersonId}
                      </span>
                    )}
                    {t.room && (
                      <span className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.room}</span>
                      </span>
                    )}
                    {t.phone && (
                      <span className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.phone}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400">
                <span className="inline-flex items-center space-x-1">
                  <span>Открыть досье</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-slate-400 font-normal">{t.retrievedAt}</span>
              </div>
            </div>
          ))
        )}
      </section>

      {/* 3. Teacher Dossier Modal */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="rounded-2xl border-sketch-thick shadow-sketch-lg bg-white dark:bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 relative my-auto animate-card-appear"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl border-sketch bg-[#FAF8F3] dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sketch-sm hover:shadow-none transition-all"
              title="Закрыть (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header with Photo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b-2 border-sketch-ink dark:border-white/20">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl aspect-square overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border-sketch shadow-sketch relative cursor-zoom-in group/modalphoto"
                onClick={() => {
                  const photo = selectedTeacher.photoUrl || selectedTeacher.fallbackPhotoUrl;
                  if (photo) {
                    setFullscreenPhoto({
                      url: resolvePhotoUrl(selectedTeacher.photoUrl || selectedTeacher.fallbackPhotoUrl || ''),
                      fallbackUrl: selectedTeacher.fallbackPhotoUrl,
                      name: selectedTeacher.name,
                      department: selectedTeacher.department,
                      position: selectedTeacher.position
                    });
                  }
                }}
              >
                {selectedTeacher.photoUrl ? (
                  <img
                    src={resolvePhotoUrl(selectedTeacher.photoUrl)}
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/modalphoto:scale-105"
                  />
                ) : null}
                <div
                  className={`modal-photo-fallback w-full h-full flex items-center justify-center text-slate-700 dark:text-slate-300 font-mono font-extrabold text-2xl ${
                    selectedTeacher.photoUrl ? 'hidden' : ''
                  }`}
                >
                  {selectedTeacher.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                </div>
              </div>

              <div className="flex-1 min-w-0 pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-[10px]">
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-sketch-sm">
                    {selectedTeacher.position}
                  </span>
                  {selectedTeacher.isuPersonId && (
                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-500">
                      ИСУ #{selectedTeacher.isuPersonId}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedTeacher.name}
                </h2>

                <div className="text-xs sm:text-sm font-mono font-semibold text-sketch-indigo dark:text-blue-400 mt-1">
                  {selectedTeacher.department}
                </div>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Group Subjects */}
              {selectedTeacher.groupSubjects && selectedTeacher.groupSubjects.length > 0 && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-sketch-indigo space-y-1.5 font-mono">
                  <div className="font-bold text-sketch-indigo dark:text-blue-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Дисциплины в нашей группе</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTeacher.groupSubjects.map((subj, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-sketch-sm shadow-sketch-sm"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {selectedTeacher.room && (
                  <div className="p-3 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
                    <span className="text-slate-400 block mb-0.5 text-[10px]">Кабинет:</span>
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedTeacher.room}</span>
                    </div>
                  </div>
                )}

                {selectedTeacher.phone && (
                  <div className="p-3 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm">
                    <span className="text-slate-400 block mb-0.5 text-[10px]">Телефон:</span>
                    <a
                      href={`tel:${selectedTeacher.phone}`}
                      className="font-bold text-sketch-indigo dark:text-blue-400 hover:underline flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedTeacher.phone}</span>
                    </a>
                  </div>
                )}

                {selectedTeacher.email && (
                  <div className="p-3 rounded-xl bg-[#FAF8F3] dark:bg-slate-800 border-sketch-sm sm:col-span-2">
                    <span className="text-slate-400 block mb-0.5 text-[10px]">E-mail:</span>
                    <a
                      href={`mailto:${selectedTeacher.email}`}
                      className="font-bold text-sketch-indigo dark:text-blue-400 hover:underline flex items-center space-x-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedTeacher.email}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Degrees */}
              {(selectedTeacher.degree || selectedTeacher.academicTitle) && (
                <div className="space-y-1 pt-1 font-mono text-xs">
                  <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sketch-indigo" />
                    <span>Ученая степень и звание</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTeacher.degree && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-sketch-sm">
                        {selectedTeacher.degree}
                      </span>
                    )}
                    {selectedTeacher.academicTitle && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border border-sketch-sm">
                        {selectedTeacher.academicTitle}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Interests */}
              {selectedTeacher.interests && (
                <div className="space-y-1 pt-1">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Научные интересы
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {selectedTeacher.interests}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">law-bsu.ru ({selectedTeacher.retrievedAt})</span>
              <a
                href={selectedTeacher.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sketch-indigo hover:bg-sketch-indigo-dark text-white font-bold border-sketch-sm shadow-sketch-sm hover:shadow-none transition-all"
              >
                <span>Официальный профиль</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Lightbox */}
      {fullscreenPhoto && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
          onClick={() => setFullscreenPhoto(null)}
        >
          <div
            className="w-full max-w-4xl flex items-center justify-between gap-4 py-2 border-b border-white/20 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h3 className="text-white font-extrabold text-base sm:text-lg truncate">
                {fullscreenPhoto.name}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                {fullscreenPhoto.department}
              </p>
            </div>

            <button
              onClick={() => setFullscreenPhoto(null)}
              className="px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              Закрыть (Esc)
            </button>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center w-full max-w-4xl my-auto p-2"
            onClick={() => setFullscreenPhoto(null)}
          >
            <img
              src={fullscreenPhoto.url}
              alt={fullscreenPhoto.name}
              className="max-w-[92vw] max-h-[75vh] object-contain rounded-2xl border-2 border-white/20 shadow-2xl select-none"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Нажмите Esc или в любом месте для закрытия
          </div>
        </div>
      )}
    </div>
  );
};
