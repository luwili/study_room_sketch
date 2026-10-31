import React, { useState } from 'react';
import { X, Download, Smartphone, CheckCircle2, ShieldCheck, Zap, RefreshCw, ExternalLink, Globe2, Share2, Check, Sparkles } from 'lucide-react';
import emblemIcon from '../assets/emblem-icon.png';
import scheduleData from '../data/schedule.json';
import { SketchBadge, SketchStamp } from './sketch/SketchDecorations';

interface WidgetDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const APK_DOWNLOAD_URL = 'https://github.com/luwili/study_room/releases/download/widget-apk-latest/StudyRoom-Widget.apk';
export const APK_VERSION = '1.2.0';

export const WidgetDownloadModal: React.FC<WidgetDownloadModalProps> = ({ isOpen, onClose }) => {
  const [synced, setSynced] = useState(false);
  if (!isOpen) return null;

  const handleBrowserSync = () => {
    try {
      const payload = encodeURIComponent(JSON.stringify(scheduleData));
      window.location.href = `studyroom://sync?data=${payload}`;
      setSynced(true);
      setTimeout(() => setSynced(false), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-sketch-paper dark:bg-sketch-darkPaper border-2 border-sketch-line dark:border-sketch-darkLine rounded-sketch-lg shadow-sketch-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-sketch-card dark:bg-sketch-darkCard p-6 border-b-2 border-sketch-line dark:border-sketch-darkLine relative">
          <div className="absolute inset-0 bg-sketch-grid opacity-20 pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-sketch-xs text-slate-500 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-sketch-line/40 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-sketch-sm bg-sketch-lime/30 border-2 border-sketch-line p-1 flex items-center justify-center shadow-sketch-xs flex-shrink-0">
              <img src={emblemIcon} alt="Эмблема" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-sketch-heading font-black text-lg text-slate-900 dark:text-white">
                  Виджет расписания Android
                </h3>
                <SketchBadge variant="lime">
                  v{APK_VERSION}
                </SketchBadge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-sketch">
                Группа ПОНБ-УП-304С · Институт права УУНиТ
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm font-sketch">
          {/* Key Features Callout */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 flex items-start space-x-2.5">
              <Globe2 className="w-4 h-4 text-sketch-indigo dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-sketch-heading font-bold text-xs text-slate-900 dark:text-white">Белые списки и VPN</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">6 CDN-зеркал и прямая синхронизация</div>
              </div>
            </div>

            <div className="p-3 rounded-sketch-sm bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 flex items-start space-x-2.5">
              <Zap className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-sketch-heading font-bold text-xs text-slate-900 dark:text-white">Samsung & Xiaomi</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Работа без засыпания (goAsync)</div>
              </div>
            </div>
          </div>

          {/* Instant Browser-to-Widget Sync Button */}
          <div className="p-4 rounded-sketch-md bg-sketch-lime/15 border-2 border-sketch-line/40 dark:border-sketch-darkLine/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="font-sketch-heading font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Share2 className="w-3.5 h-3.5 text-sketch-indigo dark:text-blue-400" />
                <span>Мгновенная синхронизация из браузера</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Офлайн-режим
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Если в браузере сайт открыт через VPN, вы можете передать свежее расписание в установленный виджет в 1 клик:
            </p>
            <button
              onClick={handleBrowserSync}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-sketch-sm bg-sketch-lime hover:bg-sketch-lime/90 text-slate-900 font-sketch-heading font-black text-xs transition-all shadow-sketch-xs border border-sketch-line active:translate-y-0.5"
            >
              {synced ? <Check className="w-4 h-4 text-slate-900" /> : <RefreshCw className="w-3.5 h-3.5" />}
              <span>{synced ? "Расписание передано в приложение!" : "Передать расписание в виджет прямо сейчас"}</span>
            </button>
          </div>

          {/* Download Button */}
          <div className="space-y-1.5">
            <a
              href={APK_DOWNLOAD_URL}
              download="StudyRoom-Widget.apk"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-sketch-md bg-sketch-indigo hover:bg-sketch-indigo/90 text-white font-sketch-heading font-black text-sm shadow-sketch border-2 border-sketch-line transition-all active:translate-y-0.5"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Скачать StudyRoom-Widget.apk (v{APK_VERSION})</span>
            </a>
            <p className="text-center text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Размер ~2.5 МБ · Поддерживает Android 8.0+ (Samsung One UI, Xiaomi HyperOS, Honor, Pixel)
            </p>
          </div>

          {/* VPN & Whitelists Hint */}
          <div className="rounded-sketch-sm p-3.5 bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 text-xs space-y-1">
            <div className="font-sketch-heading font-bold text-sketch-indigo dark:text-blue-300 flex items-center space-x-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Если у вас работает VPN (V2Ray / Outline / Hiddify):</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              В настройках вашего VPN-клиента (Раздельное туннелирование) включите режим <strong>«Все приложения»</strong> или вручную отметьте <strong>«ПОНБ-УП-304С»</strong>, чтобы трафик виджета шёл через VPN вместе с браузером.
            </p>
          </div>

          {/* Samsung & Xiaomi battery hint */}
          <div className="rounded-sketch-sm p-3.5 bg-white dark:bg-slate-900 border border-sketch-line/30 dark:border-sketch-darkLine/40 text-xs space-y-1">
            <div className="font-sketch-heading font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sketch-lime" />
              <span>Для Samsung и Xiaomi:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              В установленном приложении нажмите кнопку <strong>«Настроить батарею»</strong> и выберите <em>«Без ограничений»</em>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-sketch-card dark:bg-sketch-darkCard border-t-2 border-sketch-line/30 dark:border-sketch-darkLine/40 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Релизы на GitHub</span>
          <a
            href="https://github.com/luwili/study_room/releases/tag/widget-apk-latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sketch-indigo dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>Список изменений</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
