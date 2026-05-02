"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "../../components/AppShell";
import { useTool } from "../../context/ToolContext";

export default function ToolDetailPage() {
  const { id } = useParams(); // This is the slug 'web-search'
  const router = useRouter();
  const { tools, updateTool, deleteTool, loading } = useTool();
  const [tool, setTool] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    if (!loading && tools.length > 0) {
      const found = tools.find(t => t.id === id);
      if (found) {
        setTool(found);
        setEditName(found.name);
        setEditDesc(found.desc);
      }
    }
  }, [id, tools, loading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTool(id, { name: editName, desc: editDesc });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tool?")) {
      await deleteTool(id);
      router.push("/tools");
    }
  };

  if (loading || !tool) {
    return <AppShell title="Loading..."><div className="p-8 text-dim">Loading tool details...</div></AppShell>;
  }

  return (
    <AppShell title={tool.name} breadcrumb="Tools">
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="bg-surface border border-line rounded-2xl p-8 shadow-sm">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-ghost uppercase tracking-wider">Tool Name</label>
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-base border border-line rounded-lg px-4 py-3 text-fg outline-none focus:border-line-soft transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-ghost uppercase tracking-wider">Description</label>
                <textarea 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-base border border-line rounded-lg px-4 py-3 text-fg outline-none focus:border-line-soft transition-all h-32 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-fg text-base font-bold py-3 rounded-lg hover:bg-fg/90 transition-all">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-elevated text-fg font-bold py-3 rounded-lg hover:bg-line transition-all">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-fg mb-2">{tool.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-[11px] font-medium ${tool.active ? "text-success" : "text-ghost"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tool.active ? "bg-success" : "bg-ghost"}`} />
                      {tool.active ? "Active" : "Inactive"}
                    </span>
                    <span className="text-[12px] text-ghost">Registered on {new Date(tool.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(true)} className="p-2 bg-elevated border border-line rounded-lg text-dim hover:text-fg transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={handleDelete} className="p-2 bg-elevated border border-line rounded-lg text-danger hover:bg-danger hover:text-base transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              
              <p className="text-[15px] text-dim leading-relaxed mb-8">{tool.desc}</p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-line">
                <div>
                  <p className="text-[10px] font-bold text-ghost uppercase tracking-wider mb-1">Total Calls</p>
                  <p className="text-2xl font-bold text-fg">{tool.calls.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ghost uppercase tracking-wider mb-1">Slug ID</p>
                  <code className="text-[13px] bg-base px-2 py-1 rounded border border-line text-ghost">{tool.id}</code>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
