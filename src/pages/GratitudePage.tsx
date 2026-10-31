import React from 'react';
import { HeartHandshake, ShieldCheck, CheckCircle2, Sparkles, Award } from 'lucide-react';
import patronsData from '../data/patrons.json';
import { SketchBadge, SketchStamp } from '../components/sketch/SketchDecorations';

export const GratitudePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-sketch-lg bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark overflow-hidden">
        <div className="absolute inset-0 bg-sketch-grid opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <SketchBadge variant="indigo">
                ПОНБ-УП-304С · Институт права УУНиТ
              </SketchBadge>
              <span className="text-xs font-mono text-slate-500">Меценаты проекта</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-sketch-heading font-black text-slate-900 dark:text-white tracking-tight">
              Искренняя благодарность
            </h1>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sketch max-w-2xl">
              Создание и поддержание учебного кабинета группы ПОНБ-УП-304С состоялось благодаря финансовой помощи и неравнодушному участию. Выражаем искреннюю признательность людям, благодаря которым этот ресурс существует и открыт для всех студентов.
            </p>
          </div>

          <div className="flex-shrink-0">
            <SketchStamp text="СПАСИБО!" color="lime" />
          </div>
        </div>
      </div>

      {/* Benefactors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patronsData.map((patron) => (
          <div
            key={patron.id}
            className="p-6 rounded-sketch-md bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark flex flex-col justify-between relative group hover:-translate-y-0.5 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <SketchBadge variant="indigo">
                  Поддержка портала
                </SketchBadge>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {patron.date}
                </span>
              </div>

              <h2 className="text-xl font-sketch-heading font-bold text-slate-900 dark:text-white mb-1">
                {patron.name}
              </h2>
              <div className="text-xs text-sketch-indigo dark:text-blue-300 font-mono font-semibold mb-4">
                {patron.role}
              </div>

              <div className="p-4 rounded-sketch-sm bg-sketch-card dark:bg-sketch-darkCard border-l-4 border-sketch-indigo dark:border-blue-400 border-sketch-line/30 dark:border-sketch-darkLine/40 mb-4">
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic font-sketch">
                  «{patron.citation}»
                </p>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-sketch-heading font-bold text-slate-800 dark:text-slate-200">
                  Направление поддержки:
                </div>
                <p className="leading-relaxed font-sketch">
                  {patron.contribution}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-sketch-line/30 dark:border-sketch-darkLine/40 text-xs text-slate-500 flex items-center space-x-1.5 font-sketch">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Благодарность от студентов ПОНБ-УП-304С</span>
            </div>
          </div>
        ))}
      </div>

      {/* Practical Impact in Sketch Container */}
      <div className="p-6 sm:p-7 rounded-sketch-lg bg-sketch-card dark:bg-sketch-darkCard border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark space-y-4">
        <h3 className="font-sketch-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-sketch-indigo dark:text-blue-400" />
          <span>Что реализовано благодаря поддержке:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {[
            'Автоматическая синхронизация расписания занятий и объявлений с серверами ИСУ УУНиТ.',
            'Оцифровка и структурирование конспектов лекций по 10 дисциплинам учебного семестра.',
            'Интерактивные карточки для подготовки к зачётам и экзаменам с правовыми статьями.',
            'Бесплатный, быстрый и независимый доступ к учебным материалам для всех студентов 24/7.'
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 p-3.5 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40">
              <div className="w-2 h-2 rounded-full bg-sketch-lime border border-sketch-line mt-1.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-sketch leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-dashed border-sketch-line/30 dark:border-sketch-darkLine/40 text-center text-xs text-slate-600 dark:text-slate-400 italic font-sketch">
          «От имени всего коллектива студентов группы ПОНБ-УП-304С — искреннее человеческое спасибо!»
        </div>
      </div>
    </div>
  );
};
