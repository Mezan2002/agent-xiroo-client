"use client";
import { useState } from "react";
import AppShell from "../components/AppShell";
import { useMemory } from "../context/MemoryContext";
import Modal from "../components/Modal";

const tagColor = {
  Preference: "text-fg border-line-soft bg-elevated",
  Project: "text-fg border-line-soft bg-elevated",
  Fact: "text-fg border-line-soft bg-elevated",
  Context: "text-warn border-warn/30 bg-warn/5",
};

export default function MemoryPage() {
  const { memories, addMemory, removeMemory } = useMemory();
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("Fact");

  const filtered = memories.filter(
    (m) =>
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      m.tag.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    addMemory(newContent, newTag);
    setNewContent("");
    setIsAdding(false);
  };

  return (
    <AppShell title="Memory" breadcrumb="Capabilities">
      <div className="max-w-[860px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">
              Capabilities
            </p>
            <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">
              Memory
            </h1>
            <p className="text-[13.5px] text-dim">
              Everything your agent remembers — short-term context and long-term
              knowledge.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            id="add-memory"
            className="flex items-center gap-1.5 px-4 py-2 bg-fg text-base text-[13px] font-semibold rounded-md hover:bg-fg/90 transition-all duration-200 shrink-0 w-full sm:w-auto justify-center"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Entry
          </button>
        </div>

        <Modal 
          isOpen={isAdding} 
          onClose={() => setIsAdding(false)} 
          title="Add New Memory"
        >
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">
                Cognitive Content
              </label>
              <textarea
                autoFocus
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Describe the fact, preference, or context..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-fg placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 h-32 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">
                Knowledge Category
              </label>
              <select
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-[15px] text-fg outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
              >
                <option value="Fact">Fact</option>
                <option value="Preference">Preference</option>
                <option value="Project">Project</option>
                <option value="Context">Context</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-fg text-base text-[15px] font-black rounded-2xl hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            >
              Commit to Memory
            </button>
          </form>
        </Modal>

        {/* Search */}
        <div className="flex items-center gap-3 bg-surface border border-line rounded-lg px-4 py-2.5 mb-6 focus-within:border-line-soft transition-all duration-200">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ghost shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="memory-search"
            type="text"
            placeholder="Search memory..."
            className="bg-transparent text-[13px] text-fg placeholder:text-ghost outline-none flex-1"
          />
        </div>

        {/* Memory Sections */}
        {["short", "long"].map((type) => {
          const sectionMemories = filtered.filter((m) => m.type === type);
          if (sectionMemories.length === 0 && search) return null;

          return (
            <div key={type} className="mb-8 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-ghost">
                  {type === "short" ? "Short-Term Memory" : "Long-Term Memory"}
                </p>
                <div className="flex-1 h-px bg-line" />
                <span className="text-[11px] text-ghost">
                  {type === "short"
                    ? "Session only"
                    : "Persists across sessions"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {sectionMemories.length > 0 ? (
                  sectionMemories.map((m) => (
                    <div
                      key={m.id}
                      id={`memory-${m.id}`}
                      className="bg-surface border border-line rounded-[10px] px-4 py-3.5 flex items-start gap-3 hover:border-line-soft transition-all duration-200 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColor[m.tag] || tagColor.Fact}`}
                          >
                            {m.tag}
                          </span>
                          <span className="text-[11px] text-ghost">
                            {m.time}
                          </span>
                        </div>
                        <p className="text-[13px] text-dim group-hover:text-fg transition-colors duration-150">
                          {m.content}
                        </p>
                      </div>
                      <button
                        onClick={() => removeMemory(m.id)}
                        className="text-ghost hover:text-danger transition-colors duration-150 shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-ghost italic py-4 text-center border border-dashed border-line rounded-lg">
                    No entries found.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
