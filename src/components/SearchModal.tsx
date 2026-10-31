import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, FileText, Users, Building2, ArrowRight } from 'lucide-react';
import subjectsData from '../data/subjects.json';
import topicsMetadata from '../data/topics-metadata.json';
import teachersData from '../data/teachers.json';
import departmentsData from '../data/departments.json';
import { TopicMetadata } from '../types';
import { SketchBadge } from './sketch/SketchDecorations';

const topicsData: TopicMetadata[] = topicsMetadata as TopicMetadata[];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

function normalize(text: string): string {
  return (text || '').toLowerCase().replace(/ё/g, 'е').replace(/зз/g, 'з').trim();
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else inputRef.current?.focus();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];

    const list: {
      id: string;
      title: string;
      subtitle: string;
      category: string;
      tab: string;
      itemId?: string;
      icon: any;
    }[] = [];

    // 1. Subjects
    if (filterType === 'all' || filterType === 'subjects') {
      subjectsData.forEach((s) => {
        if (normalize(s.title).includes(q) || normalize(s.departmentName).includes(q) || normalize(s.teacherName).includes(q)) {
          list.push({
            id: `sub-${s.id}`,
            title: s.title,
            subtitle: `${s.departmentName} · ${s.teacherName}`,
            category: 'Дисциплина',
            tab: 'subjects',
            itemId: s.id,
            icon: BookOpen
          });
        }
      });
    }

    // 2. Topics & Notes
    if (filterType === 'all' || filterType === 'topics') {
      topicsData.forEach((t) => {
        const matchToc = t.tableOfContents?.some((item) => normalize(item.text).includes(q));
        if (
          normalize(t.title).includes(q) ||
          normalize(t.description).includes(q) ||
          matchToc
        ) {
          list.push({
            id: `top-${t.id}`,
            title: t.title,
            subtitle: t.description || 'Конспект лекции',
            category: 'Конспект',
            tab: 'topics',
            itemId: t.id,
            icon: FileText
          });
        }
      });
    }

    // 3. Teachers
    if (filterType === 'all' || filterType === 'teachers') {
      teachersData.forEach((t) => {
        const role = 'groupRole' in t && t.groupRole ? normalize(String(t.groupRole)) : '';
        const subjects = 'groupSubjects' in t && Array.isArray(t.groupSubjects) ? t.groupSubjects.map(s => normalize(String(s))) : [];
        if (
          normalize(t.name).includes(q) ||
          normalize(t.department).includes(q) ||
          normalize(t.interests).includes(q) ||
          normalize(t.position).includes(q) ||
          role.includes(q) ||
          subjects.some(s => s.includes(q))
        ) {
          list.push({
            id: `teach-${t.id}`,
            title: t.name,
            subtitle: `${t.position} · ${t.department} ${t.isGroupTeacher ? '★ Преподаватель группы' : ''}`,
            category: 'Преподаватель',
            tab: 'teachers',
            itemId: t.id,
            icon: Users
          });
        }
      });
    }

    // 4. Departments
    if (filterType === 'all' || filterType === 'departments') {
      departmentsData.forEach((d) => {
        if (normalize(d.name).includes(q) || normalize(d.description).includes(q) || normalize(d.room).includes(q)) {
          list.push({
            id: `dept-${d.id}`,
            title: d.name,
            subtitle: `${d.room} · ${d.phone}`,
            category: 'Кафедра',
            tab: 'departments',
            itemId: d.id,
            icon: Building2
          });
        }
      });
    }

    return list.slice(0, 25);
  }, [query, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative mx-auto max-w-2xl transform rounded-sketch-lg bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch-lg transition-all overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-1 border-b-2 border-sketch-line/30 dark:border-sketch-darkLine/40 bg-sketch-card dark:bg-sketch-darkCard">
          <Search className="w-5 h-5 text-sketch-indigo dark:text-blue-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по дисциплинам, конспектам, статьям, преподавателям..."
            className="w-full h-14 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base font-sketch"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-[11px] font-mono font-bold px-2 py-1 bg-white dark:bg-slate-800 border border-sketch-line/30 dark:border-sketch-darkLine/40 text-slate-700 dark:text-slate-300 rounded-sketch-xs shadow-sketch-xs"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 px-4 py-2.5 border-b border-sketch-line/20 dark:border-sketch-darkLine/30 bg-sketch-paper dark:bg-sketch-darkPaper overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Все разделы' },
            { id: 'subjects', label: 'Предметы' },
            { id: 'topics', label: 'Конспекты' },
            { id: 'teachers', label: 'Преподаватели' },
            { id: 'departments', label: 'Кафедры' },
          ].map((f) => {
            const isActive = filterType === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-sketch-sm font-sketch-heading text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-sketch-indigo text-white shadow-sketch-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sketch-line/30 dark:border-sketch-darkLine/40 hover:bg-sketch-card'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3">
          {query && results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="font-sketch-heading font-bold text-sm">Ничего не найдено по запросу «{query}»</p>
              <p className="text-xs mt-1 font-sketch">Попробуйте изменить формулировку или выбрать категорию «Все разделы»</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1.5">
              {results.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.tab, item.itemId);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/20 dark:border-sketch-darkLine/30 hover:border-sketch-indigo hover:shadow-sketch-xs transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start space-x-3 truncate">
                      <div className="p-2 rounded-sketch-xs bg-sketch-indigo/10 text-sketch-indigo dark:text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center space-x-2">
                          <span className="font-sketch-heading font-bold text-slate-900 dark:text-white text-sm truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sketch-card dark:bg-sketch-darkCard text-slate-600 dark:text-slate-400 border border-sketch-line/30">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-sketch">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sketch-indigo dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 font-sketch">
              Начните вводить название темы, статьи закона, преподавателя или предмета.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
