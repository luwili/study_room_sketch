import React from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';
import { SyncStatus } from '../utils/scheduleSync';

interface SyncToastProps {
  status: SyncStatus | null;
  onDismiss: () => void;
  onReloadNow: () => void;
}

export const SyncToast: React.FC<SyncToastProps> = ({ status, onDismiss, onReloadNow }) => {
  if (!status || status.state === 'idle') return null;

  const isSpinning = status.state === 'starting' || status.state === 'running';
  const isSuccess = status.state === 'success';
  const isError = status.state === 'error';

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div 
        className={`p-4 rounded-sketch-md border-2 border-sketch-line dark:border-sketch-darkLine shadow-sketch dark:shadow-sketch-dark transition-all ${
          isSuccess
            ? 'bg-emerald-900 text-white'
            : isError
            ? 'bg-rose-900 text-white'
            : 'bg-sketch-paper dark:bg-sketch-darkPaper text-slate-900 dark:text-white'
        }`}
      >
        <div className="flex items-start space-x-3.5">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {isSpinning && (
              <div className="p-2 rounded-sketch-xs bg-sketch-indigo/20 text-sketch-indigo dark:text-blue-300 border border-sketch-line">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            )}
            {isSuccess && (
              <div className="p-2 rounded-sketch-xs bg-emerald-700/40 text-emerald-300 border border-white/20">
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
              </div>
            )}
            {isError && (
              <div className="p-2 rounded-sketch-xs bg-rose-700/40 text-rose-200 border border-white/20">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Texts */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-sketch-heading font-bold text-sm leading-snug">
                {status.title}
              </h4>
              {isError && (
                <button
                  onClick={onDismiss}
                  className="p-1 rounded-sketch-xs text-rose-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className={`text-xs mt-1 leading-relaxed font-sketch ${isSuccess || isError ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}`}>
              {status.message}
            </p>

            {/* Success reload button */}
            {isSuccess && (
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-500/40">
                <span className="text-[11px] text-emerald-200 font-mono">
                  {status.countdown ? `Автоперезагрузка: ${status.countdown}с` : 'Готово'}
                </span>
                <button
                  onClick={onReloadNow}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sketch-xs bg-sketch-lime hover:bg-sketch-lime/90 text-slate-900 text-xs font-sketch-heading font-bold transition-all shadow-sketch-xs border border-sketch-line"
                >
                  <span>Обновить сейчас</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
