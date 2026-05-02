"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { id: "nav-dash", label: "Go to Dashboard", icon: "🏠", shortcut: "G D", href: "/" },
  { id: "nav-chat", label: "Start New Chat", icon: "💬", shortcut: "G C", href: "/agent" },
  { id: "nav-tasks", label: "View Task History", icon: "📋", shortcut: "G T", href: "/tasks" },
  { id: "nav-tools", label: "Manage Tools", icon: "🔧", shortcut: "G M", href: "/tools" },
  { id: "nav-projects", label: "Open Projects", icon: "📁", shortcut: "G P", href: "/projects" },
  { id: "nav-settings", label: "System Settings", icon: "⚙️", shortcut: "G S", href: "/settings" },
  { id: "cmd-clear", label: "Clear Current Chat", icon: "🗑️", shortcut: "C L" },
  { id: "cmd-export", label: "Export Logs", icon: "📤", shortcut: "E X" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAction = useCallback((action) => {
    if (action.href) {
      router.push(action.href);
    }
    setOpen(false);
    setQuery("");
  }, [router]);

  if (!open) return null;

  const filtered = ACTIONS.filter((a) => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-base/60 backdrop-blur-sm transition-opacity animate-in fade-in" onClick={() => setOpen(false)} />
      
      {/* Palette */}
      <div className="relative w-full max-w-[640px] bg-surface border border-line rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line bg-elevated">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ghost"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            autoFocus
            type="text"
            placeholder="Search commands or navigate..."
            className="flex-1 bg-transparent text-[15px] text-fg placeholder:text-ghost outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:block px-2 py-1 bg-base border border-line rounded text-[10px] text-ghost font-bold uppercase tracking-widest shadow-inner">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className="w-full flex items-center gap-4 px-5 py-3 hover:bg-elevated transition-colors text-left group"
              >
                <span className="text-[18px] opacity-70 group-hover:opacity-100 transition-opacity">{action.icon}</span>
                <span className="flex-1 text-[14px] font-medium text-dim group-hover:text-fg transition-colors">{action.label}</span>
                {action.shortcut && (
                  <span className="text-[10px] font-bold text-ghost uppercase tracking-widest opacity-40 group-hover:opacity-80 transition-opacity">{action.shortcut}</span>
                )}
              </button>
            ))
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-[14px] text-ghost">No commands found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-line bg-elevated/50 flex items-center justify-between text-[11px] text-ghost">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-base border border-line rounded text-[9px] font-bold">↵</kbd> Select</span>
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-base border border-line rounded text-[9px] font-bold">↑↓</kbd> Navigate</span>
          </div>
          <p>Agent Xiroo Command Center</p>
        </div>
      </div>
    </div>
  );
}
