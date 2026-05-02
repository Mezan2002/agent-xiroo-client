"use client";
import { useState } from "react";
import AppShell from "../components/AppShell";
import { useTool } from "../context/ToolContext";
import Link from "next/link";
import Modal from "../components/Modal";

export default function ToolsPage() {
  const { tools, toggleTool, addTool, loading } = useTool();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newId, setNewId] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newId.trim()) return;
    await addTool({ 
      id: newId,
      name: newName, 
      desc: newDesc,
      calls: 0,
      active: true
    });
    setNewName("");
    setNewDesc("");
    setNewId("");
    setIsAdding(false);
  };

  return (
    <AppShell title="Tools" breadcrumb="Capabilities">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">Capabilities</p>
            <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">Tools</h1>
            <p className="text-[13.5px] text-dim">Enable, configure, and monitor everything your agent can do.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            id="add-tool" 
            className="flex items-center gap-1.5 px-4 py-2 bg-fg text-base text-[13px] font-semibold rounded-md hover:bg-fg/90 transition-all duration-200 shrink-0 w-full sm:w-auto justify-center"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Tool
          </button>
        </div>

        <Modal 
          isOpen={isAdding} 
          onClose={() => setIsAdding(false)} 
          title="Register New Tool"
        >
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">Tool Identity</label>
                <div className="relative">
                  <input 
                    autoFocus
                    required
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Weather Engine"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-fg placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">System Slug (Unique ID)</label>
                <input 
                  required
                  type="text"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  placeholder="e.g. weather-engine"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-fg placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">Capabilities Description</label>
                <textarea 
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Clearly define what this tool enables the agent to do..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-fg placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 h-28 resize-none"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-fg text-base text-[15px] font-black rounded-2xl hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                Register Tool
              </button>
            </div>
          </form>
        </Modal>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { label: "Active Tools", value: "7" },
            { label: "Total Calls Today", value: "1,734" },
            { label: "Avg. Response Time", value: "1.2s" },
          ].map((s) => (
            <div key={s.label} className="bg-surface border border-line rounded-[10px] px-5 py-4 flex items-center justify-between hover:border-line-soft transition-all duration-200">
              <span className="text-[13px] text-dim">{s.label}</span>
              <span className="text-[20px] font-bold tracking-tight text-fg">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.id}`}>
              <div id={`tool-${tool.id}`} className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200 group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-elevated border border-line rounded-[10px] flex items-center justify-center text-dim group-hover:text-fg transition-colors duration-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-fg">{tool.name}</p>
                      <p className="text-[11px] text-ghost">{tool.calls.toLocaleString()} calls</p>
                    </div>
                  </div>
                  {/* Toggle */}
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleTool(tool.id, !tool.active);
                    }}
                    id={`toggle-${tool.id}`} 
                    className={`relative w-10 h-5 rounded-full cursor-pointer transition-all duration-300 shrink-0 mt-0.5 ${tool.active ? "bg-fg" : "bg-elevated border border-line"}`}
                  >
                    <div className={`absolute top-[2px] w-4 h-4 rounded-full transition-all duration-300 ${tool.active ? "left-[22px] bg-base" : "left-[2px] bg-ghost"}`} />
                  </div>
                </div>
                <p className="text-[12.5px] text-dim leading-relaxed mb-4">{tool.desc}</p>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-[11px] font-medium ${tool.active ? "text-success" : "text-ghost"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${tool.active ? "bg-success" : "bg-ghost"}`} />
                    {tool.active ? "Active" : "Inactive"}
                  </span>
                  <div className="flex-1" />
                  <span className="text-[11.5px] text-dim group-hover:text-fg transition-colors duration-150 font-medium">Configure →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
