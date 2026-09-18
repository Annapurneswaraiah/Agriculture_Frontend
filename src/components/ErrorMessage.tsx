import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  details?: string | Array<{ loc?: (string | number)[]; msg?: string }>;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Inference Error',
  message,
  details,
  onRetry,
  onDismiss,
}) => {
  return (
    <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4.5 my-4 text-slate-800 shadow-xs">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-rose-100/90 text-rose-700 rounded-xl mt-0.5 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-rose-900">{title}</h4>
            <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{message}</p>

            {details && (
              <div className="mt-2.5 p-2 bg-white/70 rounded-lg text-xs font-mono text-rose-950 border border-rose-100 max-h-32 overflow-y-auto">
                {typeof details === 'string' ? (
                  details
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {details.map((d, idx) => (
                      <li key={idx}>
                        {d.loc ? `${d.loc.join('.')}: ` : ''}
                        {d.msg || JSON.stringify(d)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Inference</span>
              </button>
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-rose-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
