"use client";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#000]/60 backdrop-blur-[10px] animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[520px] bg-surface/40 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-fg/20 to-transparent" />
        
        <div className="flex items-center justify-between p-7 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-bold text-fg tracking-tight">{title}</h2>
            <div className="h-1 w-12 bg-fg/10 rounded-full" />
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-ghost hover:bg-white/10 hover:text-fg transition-all duration-300 active:scale-90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        
        <div className="p-7 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
