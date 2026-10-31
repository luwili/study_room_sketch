import React from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Users, 
  Scale, 
  BookOpen, 
  ShieldCheck,
  Globe,
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import instituteData from '../data/institute.json';
import { SketchBadge, SketchStamp } from '../components/sketch/SketchDecorations';

export const InstitutePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner in Sketch Style */}
      <div className="relative p-6 sm:p-8 rounded-sketch-lg bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark overflow-hidden">
        {/* Blueprint background grid */}
        <div className="absolute inset-0 bg-sketch-grid opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <SketchBadge variant="indigo">
                Институт права · УУНиТ
              </SketchBadge>
              <SketchBadge variant="lime">
                г. Уфа · Башкортостан
              </SketchBadge>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Официальные реквизиты
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sketch-heading font-black text-slate-900 dark:text-white tracking-tight">
              Институт права УУНиТ
            </h1>
            
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sketch">
              {instituteData.fullName}. Старейший и ведущий научно-образовательный центр правоведения Республики Башкортостан, осуществляющий подготовку специалистов в сфере юриспруденции и национальной безопасности.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sketch-sm bg-sketch-indigo/10 text-sketch-indigo dark:text-blue-300 border border-sketch-indigo/30">
                <MapPin className="w-3.5 h-3.5 text-sketch-indigo dark:text-blue-400" />
                <span>г. Уфа, Республика Башкортостан</span>
              </div>
              <a
                href={instituteData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sketch-sm bg-white dark:bg-slate-800 border-2 border-sketch-line dark:border-sketch-darkLine text-sketch-indigo dark:text-blue-300 hover:bg-sketch-lime/20 transition-all font-mono"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>law-bsu.ru</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sketch-sm bg-white dark:bg-slate-800 border border-sketch-line/40 dark:border-sketch-darkLine/60">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href={`tel:${instituteData.phone}`} className="hover:underline">{instituteData.phone}</a>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sketch-sm bg-white dark:bg-slate-800 border border-sketch-line/40 dark:border-sketch-darkLine/60">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${instituteData.email}`} className="hover:underline">{instituteData.email}</a>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 flex md:flex-col items-center gap-3">
            <SketchStamp text="ВЕДУЩИЙ ВУЗ" color="indigo" />
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-sketch-lime" />
              <span>База знаний 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Group Dossier Card */}
      <div className="p-6 rounded-sketch-md bg-sketch-card dark:bg-sketch-darkCard border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b-2 border-dashed border-sketch-line/30 dark:border-sketch-darkLine/40 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-sketch-sm bg-sketch-lime/30 border border-sketch-line dark:border-sketch-darkLine flex items-center justify-center text-sketch-indigo dark:text-sketch-lime">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-sketch-indigo dark:text-blue-300 font-bold">
                Учебное подразделение
              </div>
              <h2 className="text-lg font-sketch-heading font-black text-slate-900 dark:text-white">
                Группа {instituteData.group.code}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SketchBadge variant="default">
              {instituteData.group.semester}
            </SketchBadge>
            <SketchBadge variant="lime">
              {instituteData.group.studyForm}
            </SketchBadge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 space-y-1">
            <div className="text-slate-400 font-mono uppercase text-[10px]">Специальность</div>
            <div className="font-bold text-slate-900 dark:text-white">{instituteData.group.specialty}</div>
          </div>

          <div className="p-3.5 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 space-y-1">
            <div className="text-slate-400 font-mono uppercase text-[10px]">Специализация / Профиль</div>
            <div className="font-bold text-slate-900 dark:text-white">{instituteData.group.specialization}</div>
          </div>

          <div className="p-3.5 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 space-y-1">
            <div className="text-slate-400 font-mono uppercase text-[10px]">Куратор группы</div>
            <div className="font-bold text-sketch-indigo dark:text-blue-300">{instituteData.group.curator}</div>
          </div>
        </div>
      </div>

      {/* Campuses & Buildings */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Building className="w-5 h-5 text-sketch-indigo dark:text-blue-400" />
          <h2 className="text-lg font-sketch-heading font-bold text-slate-900 dark:text-white">
            Учебные корпуса и локации
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-sketch-md bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark space-y-3 relative group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-sketch-sm bg-sketch-indigo/15 text-sketch-indigo dark:text-blue-400 border border-sketch-indigo/30 w-fit">
                <Building className="w-5 h-5" />
              </div>
              <SketchBadge variant="lime">Основной корпус</SketchBadge>
            </div>
            
            <h3 className="font-sketch-heading font-bold text-slate-900 dark:text-white text-base">
              Корпус Института права (ул. Достоевского, 131)
            </h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sketch">
              Все семинарские и лекционные занятия группы ПОНБ-УП-304С, дирекция, 8 выпускающих кафедр, криминалистический полигон и учебный зал судебных заседаний.
            </p>
            
            <div className="pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2 border-t border-sketch-line/20 dark:border-sketch-darkLine/30">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="font-mono">{instituteData.address}</span>
            </div>
          </div>

          <div className="p-6 rounded-sketch-md bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark space-y-3 relative group hover:-translate-y-0.5 transition-transform">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-sketch-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-sketch-line/30 w-fit">
                <Building className="w-5 h-5" />
              </div>
              <SketchBadge variant="default">Ректорат УУНиТ</SketchBadge>
            </div>
            
            <h3 className="font-sketch-heading font-bold text-slate-900 dark:text-white text-base">
              Главный кампус УУНиТ (ул. Заки Валиди, 32)
            </h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sketch">
              Ректорат Уфимского университета науки и технологий, центральная научная библиотека, спорткомплекс, актовые залы и единый студенческий офис.
            </p>
            
            <div className="pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-2 border-t border-sketch-line/20 dark:border-sketch-darkLine/30">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="font-mono">{instituteData.secondCampus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Verified Student Links */}
      <div className="p-6 rounded-sketch-lg bg-sketch-card dark:bg-sketch-darkCard border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-sketch-heading font-bold text-slate-900 dark:text-white">
              Официальные разделы портала law-bsu.ru
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Быстрый переход к официальным сервисам Института права УУНиТ
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">9 разделов</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            {
              title: 'Расписание занятий',
              desc: 'Официальные расписания всех курсов и сессий',
              url: instituteData.officialSchedules,
              icon: Calendar
            },
            {
              title: 'Заказ справок онлайн',
              desc: 'Официальная форма заказа справок об обучении',
              url: instituteData.officialCertificates,
              icon: FileText
            },
            {
              title: 'Кафедры института',
              desc: 'Страницы всех 8 кафедр и преподавателей',
              url: instituteData.officialDepartments,
              icon: Building
            },
            {
              title: 'Учебная документация',
              desc: 'Учебные планы, фонды оценочных средств, практика',
              url: instituteData.officialPractice,
              icon: BookOpen
            },
            {
              title: 'Студенческое самоуправление',
              desc: 'Студенческий совет, СНО, профбюро Института',
              url: instituteData.officialClubs,
              icon: Users
            },
            {
              title: 'Специалитет ПОНБ',
              desc: 'Специальность Правовое обеспечение нацбезопасности',
              url: 'https://law-bsu.ru/specialitet',
              icon: ShieldCheck
            },
            {
              title: 'Научная деятельность',
              desc: 'Конференции, сборники научных статей, аспирантура',
              url: 'https://law-bsu.ru/nauka',
              icon: GraduationCap
            },
            {
              title: 'Контакты и приемная',
              desc: 'Часы приема дирекции, деканатов и отделов',
              url: instituteData.officialContacts,
              icon: Phone
            },
            {
              title: 'Дирекция института',
              desc: 'Руководство Института права УУНиТ',
              url: 'https://law-bsu.ru/directors',
              icon: Award
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-sketch-sm bg-white dark:bg-slate-900 border-2 border-sketch-line/40 dark:border-sketch-darkLine/60 hover:border-sketch-indigo hover:shadow-sketch-sm transition-all flex items-start justify-between group"
              >
                <div className="flex items-start space-x-3 truncate">
                  <div className="p-2 rounded-sketch-xs bg-sketch-indigo/10 text-sketch-indigo dark:text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate font-sketch-heading">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sketch-indigo dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2 mt-1" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Federal Legal Portals */}
      <div className="p-6 rounded-sketch-md bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark space-y-3">
        <h2 className="text-sm font-sketch-heading font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Scale className="w-4 h-4 text-sketch-indigo dark:text-blue-400" />
          <span>Государственные правовые порталы и справочные правовые системы</span>
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { name: 'Официальный интернет-портал правовой информации (pravo.gov.ru)', url: 'http://pravo.gov.ru/' },
            { name: 'СПС КонсультантПлюс', url: 'http://www.consultant.ru/' },
            { name: 'СПС Гарант', url: 'https://www.garant.ru/' },
            { name: 'Судебные и нормативные акты РФ (СудАкт)', url: 'https://sudact.ru/' },
            { name: 'Верховный Суд РФ', url: 'https://vsrf.ru/' },
            { name: 'ГАС «Правосудие»', url: 'https://sudrf.ru/' },
          ].map((portal, i) => (
            <a
              key={i}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/50 dark:border-sketch-darkLine/60 text-slate-800 dark:text-slate-200 font-medium hover:border-sketch-indigo hover:text-sketch-indigo dark:hover:text-blue-300 transition-colors inline-flex items-center space-x-1.5 shadow-sm"
            >
              <span>{portal.name}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
