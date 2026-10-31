import React from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  FileText, 
  Menu
} from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMobileMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMobileMenu
}) => {
  const items = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'schedule', label: 'Расписание', icon: Calendar },
    { id: 'subjects', label: 'Предметы', icon: BookOpen },
    { id: 'topics', label: 'Конспекты', icon: FileText },
  ];

  return (
    <nav 
      aria-label="Мобильная навигация" 
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F3]/95 dark:bg-[#0D121D]/95 backdrop-blur-md border-t-2 border-sketch-ink dark:border-white/20 pb-safe"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
                isActive
                  ? 'text-sketch-indigo dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'border-sketch bg-white dark:bg-slate-800 shadow-sketch-sm -translate-y-1'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* Menu button to open the full drawer */}
        <button
          onClick={onOpenMobileMenu}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          <div className="p-1.5 rounded-xl border-sketch-sm bg-white dark:bg-slate-800 shadow-sketch-sm">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Меню</span>
        </button>
      </div>
    </nav>
  );
};
