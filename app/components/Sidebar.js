"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    section: "Workspace",
    links: [
      { id: "dashboard", href: "/", label: "Dashboard", badge: null,
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
      { id: "agent", href: "/agent", label: "Agent Chat", badge: null,
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
      { id: "tasks", href: "/tasks", label: "Task History", badge: "12",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
    ],
  },
  {
    section: "Capabilities",
    links: [
      { id: "projects", href: "/projects", label: "Projects", badge: "4",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> },
      { id: "tools", href: "/tools", label: "Tools", badge: "8",
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
      { id: "memory", href: "/memory", label: "Memory", badge: null,
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
      { id: "logs", href: "/logs", label: "Logs", badge: null,
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
    ],
  },
  {
    section: "System",
    links: [
      { id: "settings", href: "/settings", label: "Settings", badge: null,
        icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
    ],
  },
];

import { useVoice } from "../context/VoiceContext";

export default function Sidebar({ onNavClick }) {
  const pathname = usePathname();
  const { toggleListening, isListening } = useVoice();

  return (
    <aside className="w-60 h-full bg-surface border-r border-line flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-[60px] border-b border-line shrink-0">
        <div className="w-7 h-7 bg-fg rounded-md flex items-center justify-center shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <span className="text-[15px] font-bold tracking-tight text-fg">
          xiroo<span className="text-dim font-normal">.ai</span>
        </span>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto">
        {nav.map((section) => (
          <div key={section.section} className="pt-5 pb-2 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-ghost px-2 mb-1">
              {section.section}
            </p>
            <nav className="flex flex-col gap-0.5">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    id={`nav-${link.id}`}
                    onClick={onNavClick}
                    className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] font-medium transition-all duration-200
                      ${isActive
                        ? "bg-white/[0.08] text-fg"
                        : "text-dim hover:bg-elevated hover:text-fg"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-fg rounded-r-full" />
                    )}
                    <span className={`shrink-0 ${isActive ? "opacity-100" : "opacity-60"}`}>
                      {link.icon}
                    </span>
                    {link.label}
                    {link.badge && (
                      <span className="ml-auto text-[10px] font-semibold px-1.5 py-px rounded-full border border-line-soft bg-elevated text-dim">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Agent Status */}
      <div className="p-3 border-t border-line shrink-0">
        <div className="bg-elevated border border-line rounded-[10px] p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="relative w-2 h-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-success" />
              <div className="absolute inset-0 rounded-full bg-success opacity-30 animate-ping" style={{ animationDuration: "2s" }} />
            </div>
            <div>
              <p className="text-[12.5px] font-semibold text-fg leading-none mb-0.5">Agent Xiroo</p>
              <p className="text-[11px] text-dim">Online · Ready</p>
            </div>
          </div>
          
          <button
            onClick={toggleListening}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 
              ${isListening ? "bg-danger text-base animate-pulse" : "bg-base border border-line text-ghost hover:text-fg hover:border-line-soft"}`}
            title="Voice Command"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
