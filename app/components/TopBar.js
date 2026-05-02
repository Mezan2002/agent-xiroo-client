"use client";
import { useEffect, useState } from "react";
import { useVoice } from "../context/VoiceContext";
import { useProject } from "../context/ProjectContext";

const PERSONAS = [
  { id: "default", name: "Agent Xiroo", icon: "⭐" },
  { id: "researcher", name: "Researcher", icon: "🔍" },
  { id: "coder", name: "Dev Specialist", icon: "💻" },
  { id: "analyst", name: "Data Analyst", icon: "📊" },
];

export default function TopBar({
  title = "Dashboard",
  breadcrumb = null,
  onMenuToggle,
}) {
  const [theme, setTheme] = useState("dark");
  const { projects, activeProject, setActiveProject } = useProject();
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const { toggleListening, isListening } = useVoice();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header className="h-[60px] bg-surface border-b border-line flex items-center gap-3 px-4 lg:px-6 shrink-0 z-50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuToggle}
        className="w-9 h-9 flex items-center justify-center rounded-lg lg:hidden text-dim hover:bg-elevated hover:text-fg transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="flex items-center gap-4 text-[13px] overflow-hidden">
        {/* Project Switcher */}
        <div className="relative group hidden sm:block">
          <button className="flex items-center gap-2 px-2.5 py-1.5 bg-base border border-line rounded-lg text-dim hover:text-fg hover:border-line-soft transition-all duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span className="font-semibold text-[12.5px] max-w-[100px] truncate">
              {activeProject}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {/* Dropdown placeholder */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-line rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
            <button 
              onClick={() => setActiveProject("All Projects")} 
              className="w-full text-left px-4 py-2 text-[12.5px] text-dim hover:text-fg hover:bg-elevated transition-colors"
            >
              All Projects
            </button>
            {projects.map((p) => (
              <button
                key={p._id}
                onClick={() => setActiveProject(p.name)}
                className="w-full text-left px-4 py-2 text-[12.5px] text-dim hover:text-fg hover:bg-elevated transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-4 bg-line mx-1 hidden sm:block" />

        <div className="flex items-center gap-1.5">
          {breadcrumb && (
            <>
              <span className="text-ghost hidden md:block">{breadcrumb}</span>
              <span className="text-ghost hidden md:block">/</span>
            </>
          )}
          <span className="text-fg font-semibold whitespace-nowrap">
            {title}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Persona Switcher */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-elevated border border-line rounded-lg hover:border-line-soft transition-all duration-200">
            <span className="text-[14px]">{activePersona.icon}</span>
            <span className="text-[12.5px] font-medium text-fg hidden md:block">
              {activePersona.name}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ghost"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-line rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 overflow-hidden z-50">
            <p className="px-4 py-2 text-[10px] font-bold text-ghost uppercase tracking-wider border-b border-line mb-1">
              Switch Persona
            </p>
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePersona(p)}
                className="w-full flex items-center gap-3 px-4 py-2 text-[12.5px] text-dim hover:text-fg hover:bg-elevated transition-colors"
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-5 bg-line mx-1" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={
            theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
          }
          className="w-8 h-8 flex items-center justify-center rounded-md text-dim hover:bg-elevated hover:text-fg transition-all duration-200"
        >
          {theme === "dark" ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Global Voice Command */}
        <button
          onClick={toggleListening}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 
            ${isListening ? "bg-danger text-base animate-pulse" : "text-dim hover:bg-elevated hover:text-fg"}`}
          title="Voice Command"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>

        {/* Search */}
        <button
          id="topbar-search"
          className="w-8 h-8 flex items-center justify-center rounded-md text-dim hover:bg-elevated hover:text-fg transition-all duration-200"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          id="topbar-notif"
          className="relative w-8 h-8 flex items-center justify-center rounded-md text-dim hover:bg-elevated hover:text-fg transition-all duration-200 hidden sm:flex"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-warn border border-surface" />
        </button>

        <div className="w-px h-5 bg-line mx-1" />

        {/* Avatar */}
        <div
          id="topbar-avatar"
          className="w-[30px] h-[30px] rounded-full bg-elevated border border-line-soft flex items-center justify-center text-[11px] font-bold text-fg cursor-pointer hover:border-ghost transition-all duration-200 hidden md:flex"
        >
          U
        </div>
      </div>
    </header>
  );
}
