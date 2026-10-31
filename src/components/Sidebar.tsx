import React from 'react';
import {
  Home,
  Calendar,
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  Building2,
  ExternalLink,
  Bookmark,
  X,
  HeartHandshake,
  Smartphone
} from 'lucide-react';
import { SketchStamp } from './sketch/SketchDecorations';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  favoritesCount?: number;
  onOpenWidgetModal?: () => void;
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: Home, badge: null },
  { id: 'schedule', label: 'Расписание', icon: Calendar, badge: 'Недели 1–17' },
  { id: 'subjects', label: 'Предметы', icon: BookOpen, badge: '10' },
  { id: 'topics', label: 'Темы и конспекты', icon: FileText, badge: '28' },
  { id: 'exam', label: 'Подготовка к экзаменам', icon: GraduationCap, badge: 'Флеш-карты' },
  { id: 'teachers', label: 'Преподаватели', icon: Users, badge: '186' },
  { id: 'departments', label: 'Кафедры', icon: Building2, badge: '8' },
  { id: 'institute', label: 'Институт и ссылки', icon: ExternalLink, badge: null },
  { id: 'gratitude', label: 'Благодарность', icon: HeartHandshake, badge: null },
  { id: 'favorites', label: 'Избранное', icon: Bookmark, badgeKey: 'favorites' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  favoritesCount = 0,
  onOpenWidgetModal
}) => {
  const handleNavClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-[#FAF8F3] dark:bg-[#0D121D] select-none">
      <div className="space-y-4">
        {/* Curricular Tag: Blueprint Sketch Card */}
        <div className="p-3.5 rounded-xl border-sketch bg-white dark:bg-slate-800 shadow-sketch-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sketch-indigo dark:text-blue-300">
              Специалитет 40.05.01
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-lime-500">
              Очная
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
            Правовое обеспечение национальной безопасности
          </div>
          <div className="mt-2 pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <span>5 семестр (3 курс)</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Уфа · Достоевского 131</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5" aria-label="Основное меню">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            let badgeText = item.badge;
            if (item.badgeKey === 'favorites' && favoritesCount > 0) {
              badgeText = `${favoritesCount}`;
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sketch-indigo text-white border-2 border-sketch-ink shadow-sketch translate-x-1 dark:border-white/40'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800/80 border border-transparent hover:border-sketch-sm hover:shadow-sketch-sm'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-sketch-indigo dark:text-blue-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {badgeText && (
                  <span
                    className={`ml-2 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                      isActive
                        ? 'bg-white text-sketch-indigo border border-sketch-ink'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-800 space-y-2">
        {onOpenWidgetModal && (
          <button
            onClick={onOpenWidgetModal}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border-sketch bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 hover:bg-amber-100 transition-all text-xs font-bold shadow-sketch-sm hover:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Виджет для Android</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-800 text-amber-950 dark:text-amber-100">
              APK
            </span>
          </button>
        )}

        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-center">
          ПОНБ-УП-304С · Версия Скетчбук
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 border-r-2 border-sketch-ink dark:border-white/20 min-h-[calc(100vh-5rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-xs h-full bg-[#FAF8F3] dark:bg-[#0D121D] shadow-2xl flex flex-col z-10 border-r-2 border-sketch-ink dark:border-white/30">
            <div className="p-3.5 flex items-center justify-between border-b-2 border-sketch-ink dark:border-white/20">
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                МЕНЮ КАБИНЕТА
              </span>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg border-sketch bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                aria-label="Закрыть меню"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {navContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
