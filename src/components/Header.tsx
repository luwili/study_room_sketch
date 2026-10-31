import React, { useEffect, useState } from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  Clock, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { getUfaTimeInfo, UfaTimeInfo } from '../utils/time';
import { SketchOrbitPencil } from './sketch/SketchOrbitPencil';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  favoritesCount: number;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenWidgetModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenSearch,
  onOpenMobileMenu,
  favoritesCount,
  currentTab,
  onSelectTab,
  onOpenWidgetModal
}) => {
  const [timeInfo, setTimeInfo] = useState<UfaTimeInfo>(getUfaTimeInfo());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getUfaTimeInfo());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/95 dark:bg-[#0D121D]/95 backdrop-blur-md border-b-2 border-sketch-ink dark:border-white/20 transition-colors">
      {/* Decorative Blueprint Micro-Ruler on top */}
      <div 
        className="h-1.5 w-full bg-repeat-x opacity-40 dark:opacity-20 select-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #12161A 1px, transparent 1px)',
          backgroundSize: '12px 6px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left section: mobile menu toggle + brand */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl border-sketch bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              aria-label="Открыть навигационное меню"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button 
              onClick={() => onSelectTab('home')}
              className="flex items-center space-x-2.5 sm:space-x-3 text-left group"
            >
              {/* Mascot Orbit-Pencil Emblem */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-slate-800 border-sketch p-0.5 shadow-sketch-sm group-hover:shadow-sketch transition-all group-hover:-rotate-2 flex items-center justify-center flex-shrink-0">
                <SketchOrbitPencil size={42} showOrbits={false} />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-sketch-indigo transition-colors font-mono">
                    ПОНБ-УП-304С
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-sketch-indigo bg-blue-50 dark:bg-blue-950/80 text-sketch-indigo dark:text-blue-300 shadow-[1px_1px_0px_#2563EB]">
                    УУНиТ
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-sans tracking-wide">
                  Институт права · Интерактивный скетчбук
                </span>
              </div>
            </button>
          </div>

          {/* Center section: Live Ufa clock & pair status stamp */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Live Ufa Clock */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-xl border-sketch shadow-sketch-sm text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
              <Clock className="w-3.5 h-3.5 text-sketch-indigo dark:text-blue-400" />
              <span className="tracking-widest font-bold">{timeInfo.timeString}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">(Уфа, UTC+5)</span>
            </div>

            {/* Live Pair Status Stamp */}
            {timeInfo.currentPairStatus === 'ongoing' && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border-2 border-[#65A30D] bg-lime-100 dark:bg-lime-950/60 text-lime-950 dark:text-lime-300 font-mono text-xs font-bold shadow-[2px_2px_0px_#84CC16]">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-ping" />
                <span>ИДЕТ {timeInfo.currentPair}-Я ПАРА</span>
              </div>
            )}

            {timeInfo.currentPairStatus === 'break' && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border-2 border-sketch-indigo bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 font-mono text-xs font-bold shadow-[2px_2px_0px_#2563EB]">
                <Sparkles className="w-3.5 h-3.5 text-sketch-indigo" />
                <span>ПЕРЕМЕНА</span>
              </div>
            )}

            {timeInfo.currentPairStatus === 'before' && (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border-sketch bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs shadow-sketch-sm">
                <span>ДО НАЧАЛА ЗАНЯТИЙ</span>
              </div>
            )}

            {timeInfo.currentPairStatus === 'after' && (
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border-sketch bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs shadow-sketch-sm">
                <span>ЗАНЯТИЯ ЗАВЕРШЕНЫ</span>
              </div>
            )}
          </div>

          {/* Right section: Search button + Theme toggle + Android widget */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl bg-white dark:bg-slate-800 border-sketch text-slate-800 dark:text-slate-200 shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 text-xs font-medium transition-all"
              title="Глобальный поиск по конспектам и расписанию (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-sketch-indigo" />
              <span className="hidden sm:inline">Поиск</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-mono border border-slate-300 dark:border-slate-600">
                ⌘K
              </kbd>
            </button>

            {/* Android Widget Companion Link */}
            {onOpenWidgetModal && (
              <button
                onClick={onOpenWidgetModal}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-2 rounded-xl border-sketch bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 text-xs font-bold shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                title="Виджет расписания для Android"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="hidden md:inline">Виджет APK</span>
              </button>
            )}

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800 border-sketch text-slate-800 dark:text-slate-200 shadow-sketch-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              aria-label={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sketch-indigo" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
