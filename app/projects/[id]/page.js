"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "../../components/AppShell";
import { useProject } from "../../context/ProjectContext";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { projects, updateProject, deleteProject, loading } = useProject();
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const found = projects.find(p => p._id === id);
      if (found) {
        setProject(found);
        setEditName(found.name);
        setEditStatus(found.status);
      }
    }
  }, [id, projects, loading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProject(id, { 
      name: editName, 
      status: editStatus,
      color: editStatus === "Active" ? "bg-success" : editStatus === "Idle" ? "bg-ghost" : "bg-danger"
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      router.push("/projects");
    }
  };

  if (loading || !project) {
    return <AppShell title="Loading..."><div className="p-8 text-dim">Loading project details...</div></AppShell>;
  }

  return (
    <AppShell title={project.name} breadcrumb="Projects">
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="bg-surface border border-line rounded-2xl p-8 shadow-sm">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-ghost uppercase tracking-wider">Project Name</label>
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-base border border-line rounded-lg px-4 py-3 text-fg outline-none focus:border-line-soft transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-ghost uppercase tracking-wider">Status</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-base border border-line rounded-lg px-4 py-3 text-fg outline-none focus:border-line-soft transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Idle">Idle</option>
                  <option value="Archived">Archived</option>
                </select>
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
                  <h1 className="text-3xl font-bold text-fg mb-2">{project.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-line flex items-center gap-1.5 text-dim`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${project.color}`} />
                      {project.status}
                    </span>
                    <span className="text-[12px] text-ghost">Created on {new Date(project.createdAt).toLocaleDateString()}</span>
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
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-line">
                <div>
                  <p className="text-[10px] font-bold text-ghost uppercase tracking-wider mb-1">Tasks Completed</p>
                  <p className="text-2xl font-bold text-fg">{project.tasks}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ghost uppercase tracking-wider mb-1">Last Activity</p>
                  <p className="text-lg font-medium text-fg">{project.lastActivity}</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-base border border-line rounded-xl">
                <p className="text-[13px] text-dim italic">This is a dedicated workspace for {project.name}. All agent actions, memories, and tool executions within this project are tracked here.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
