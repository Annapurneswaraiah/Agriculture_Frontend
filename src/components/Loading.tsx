import React from 'react';
import { Sprout, Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  subMessage?: string;
  fullPage?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Processing ML Model Inference...',
  subMessage = 'Sending input tensors to Render endpoint & evaluating weights',
  fullPage = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center animate-pulse">
          <Sprout className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs border border-emerald-100">
          <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-slate-800">{message}</h3>
      {subMessage && <p className="text-xs text-slate-500 mt-1 max-w-sm">{subMessage}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full mx-4">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
