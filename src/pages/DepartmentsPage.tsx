import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  ExternalLink, 
  ArrowRight 
} from 'lucide-react';
import departmentsData from '../data/departments.json';
import { Department } from '../types';
import { 
  SketchStamp, 
  SketchUnderline, 
  SketchStar 
} from '../components/sketch/SketchDecorations';

interface DepartmentsPageProps {
  onSelectDepartment: (deptName: string) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onSelectDepartment
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <section 
        className="rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-7 border-sketch-thick shadow-sketch-lg bg-sketch-grid transition-all"
        aria-labelledby="dept-title"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-sketch-indigo dark:text-blue-400 uppercase tracking-wider mb-1">
              <SketchStamp label="СТРУКТУРА" sublabel="Институт права" variant="indigo" />
              <span>• 8 специализированных кафедр</span>
            </div>
            <h1 
              id="dept-title" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              Кафедры Института права
            </h1>
            <div className="w-56 mt-1">
              <SketchUnderline color="#2563EB" />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-sans max-w-3xl">
              Специализированные кафедры института, обеспечивающие фундаментальную теоретическую и практическую подготовку специалистов специальности ПОНБ.
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center space-x-2 px-3 py-1.5 rounded-xl border-sketch bg-[#FAF8F3] dark:bg-slate-800 text-xs font-mono font-bold shadow-sketch-sm">
            <Building2 className="w-4 h-4 text-sketch-indigo" />
            <span>Кафедр: {departmentsData.length}</span>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section 
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        aria-label="Список кафедр института"
      >
        {(departmentsData as Department[]).map((dept) => (
          <div
            key={dept.id}
            className="p-5 sm:p-6 rounded-2xl border-sketch bg-white dark:bg-slate-900 shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl border-sketch-sm bg-blue-50 dark:bg-blue-950 text-sketch-indigo dark:text-blue-300 flex items-center justify-center shadow-sketch-sm">
                  <Building2 className="w-5 h-5" />
                </div>

                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#FAF8F3] dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-sketch-sm shadow-sketch-sm">
                  <Users className="w-3.5 h-3.5 text-sketch-indigo" />
                  <span>{dept.facultyCount} преподавателей</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug mb-2">
                {dept.name}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {dept.description}
              </p>

              {/* Office & Contacts */}
              <div className="space-y-1.5 pt-3 border-t border-dashed border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{dept.room} (ул. Достоевского, 131)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{dept.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{dept.email}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold">
              <button
                onClick={() => onSelectDepartment(dept.name)}
                className="inline-flex items-center space-x-1.5 text-sketch-indigo dark:text-blue-400 hover:underline"
              >
                <span>Преподаватели кафедры</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={dept.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <span>law-bsu.ru</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
