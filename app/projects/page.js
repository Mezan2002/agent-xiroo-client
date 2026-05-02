"use client";
import { useState } from "react";
import AppShell from "../components/AppShell";
import { useProject } from "../context/ProjectContext";
import Link from "next/link";
import Modal from "../components/Modal";

export default function ProjectsPage() {
  const { projects, addProject, loading } = useProject();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("Active");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await addProject({ 
      name: newName, 
      status: newStatus,
      color: newStatus === "Active" ? "bg-success" : newStatus === "Idle" ? "bg-ghost" : "bg-danger"
    });
    setNewName("");
    setIsAdding(false);
  };

  return (
    <AppShell title="Projects" breadcrumb="Capabilities">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">Organization</p>
            <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">Projects</h1>
            <p className="text-[13.5px] text-dim">Group your tasks, tools, and memories into dedicated workspaces.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            id="new-project" 
            className="flex items-center gap-1.5 px-4 py-2 bg-fg text-base text-[13px] font-semibold rounded-md hover:bg-fg/90 transition-all duration-200 shrink-0 w-full sm:w-auto justify-center"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Project
          </button>
        </div>

        <Modal 
          isOpen={isAdding} 
          onClose={() => setIsAdding(false)} 
          title="Create New Project"
        >
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">Workspace Identity</label>
              <div className="relative">
                <input 
                  autoFocus
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Q2 Marketing Campaign"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-fg placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-ghost uppercase tracking-[1.5px] ml-1">Initial Priority Status</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-[15px] text-fg outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
              >
                <option value="Active">Active</option>
                <option value="Idle">Idle</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-fg text-base text-[15px] font-black rounded-2xl hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
              Initialize Project
            </button>
          </form>
        </Modal>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 bg-surface border border-line rounded-lg px-4 py-2 focus-within:border-line-soft transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ghost"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search projects..." className="bg-transparent text-[13px] text-fg placeholder:text-ghost outline-none flex-1" />
          </div>
          <select className="bg-surface border border-line rounded-lg px-3 py-2 text-[12px] text-dim outline-none hover:border-line-soft transition-all duration-200 cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Idle</option>
            <option>Archived</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Link key={p._id} href={`/projects/${p._id}`}>
              <div className="bg-surface border border-line rounded-xl p-5 hover:border-line-soft hover:bg-elevated transition-all duration-200 group cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-base border border-line rounded-lg flex items-center justify-center text-ghost group-hover:text-fg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-line flex items-center gap-1.5 text-dim`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                    {p.status}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-fg mb-1">{p.name}</h3>
                <p className="text-[12px] text-ghost mb-4">Dedicated workspace for {p.name.toLowerCase()} agentic workflows.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] text-ghost uppercase tracking-wider font-bold">Tasks</p>
                      <p className="text-[13px] font-semibold text-fg">{p.tasks}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-ghost uppercase tracking-wider font-bold">Last Run</p>
                      <p className="text-[13px] font-semibold text-fg">{p.lastActivity}</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-dim group-hover:text-fg font-medium transition-colors">Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
