import AppShell from "../components/AppShell";

const tasks = [
  { id: 248, title: "Scrape top 50 AI startups and compile report", status: "done",    tool: "Web Search",   duration: "3m 21s",  time: "2 min ago" },
  { id: 247, title: "Analyze Q2 sales data and generate insights",  status: "done",    tool: "Data Analyst", duration: "1m 08s",  time: "18 min ago" },
  { id: 246, title: "Write and run Python script to sort CSV files", status: "running", tool: "Code Runner",  duration: "—",       time: "Running..." },
  { id: 245, title: "Summarize 12 research papers on LLM agents",   status: "done",    tool: "Web Search",   duration: "5m 44s",  time: "1 hr ago" },
  { id: 244, title: "Generate product descriptions for 30 SKUs",    status: "failed",  tool: "File Manager", duration: "0m 32s",  time: "2 hr ago" },
  { id: 243, title: "Monitor competitor pricing every 6 hours",     status: "queued",  tool: "Scheduler",    duration: "—",       time: "Scheduled" },
  { id: 242, title: "Build summary email from weekly task outputs",  status: "done",    tool: "API Caller",   duration: "0m 55s",  time: "5 hr ago" },
  { id: 241, title: "Extract all contact info from 40-page PDF",    status: "done",    tool: "File Manager", duration: "2m 10s",  time: "Yesterday" },
  { id: 240, title: "Create Python dashboard for sensor data",      status: "failed",  tool: "Code Runner",  duration: "1m 02s",  time: "Yesterday" },
  { id: 239, title: "Find and summarize recent papers on RAG",      status: "done",    tool: "Web Search",   duration: "4m 31s",  time: "2 days ago" },
];

const statusStyle = {
  done:    { dot: "bg-success", badge: "text-success border-success/30 bg-success/5",    label: "Done" },
  running: { dot: "bg-warn animate-pulse", badge: "text-warn border-warn/30 bg-warn/5", label: "Running" },
  failed:  { dot: "bg-danger", badge: "text-danger border-danger/30 bg-danger/5",       label: "Failed" },
  queued:  { dot: "bg-ghost",  badge: "text-ghost border-line bg-transparent",          label: "Queued" },
};

const filters = ["All", "Done", "Running", "Failed", "Queued"];
const toolFilters = ["All Tools", "Web Search", "Code Runner", "File Manager", "Data Analyst", "API Caller", "Scheduler"];

export default function TasksPage() {
  return (
    <AppShell title="Task History" breadcrumb="Workspace">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">History</p>
          <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">Task History</h1>
          <p className="text-[13.5px] text-dim">All past agent sessions. Click a task to view details or re-run.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex items-center bg-surface border border-line rounded-lg p-1 gap-0.5 overflow-x-auto no-scrollbar">
            {filters.map((f, i) => (
              <button key={f} id={`filter-${f.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200 shrink-0
                  ${i === 0 ? "bg-elevated text-fg" : "text-dim hover:text-fg"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <select id="filter-tool" className="bg-surface border border-line rounded-lg px-3 py-2 text-[12px] text-dim outline-none hover:border-line-soft transition-all duration-200 cursor-pointer flex-1 sm:flex-none">
              {toolFilters.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button id="tasks-export" className="flex items-center gap-1.5 px-3 py-2 bg-surface border border-line rounded-lg text-[12px] text-dim hover:text-fg hover:border-line-soft transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface border border-line rounded-[10px] overflow-x-auto">
          <div className="min-w-[800px]">
          {/* Head */}
          <div className="grid grid-cols-[40px_1fr_120px_120px_90px_80px] gap-4 px-5 py-3 border-b border-line">
            {["#", "Task", "Tool", "Duration", "Time", "Status"].map((h) => (
              <p key={h} className="text-[10px] font-semibold uppercase tracking-[1px] text-ghost">{h}</p>
            ))}
          </div>
          {/* Rows */}
          {tasks.map((t, i) => {
            const s = statusStyle[t.status];
            return (
              <div key={t.id} id={`task-row-${t.id}`}
                className={`grid grid-cols-[40px_1fr_120px_120px_90px_80px] gap-4 px-5 py-3.5 items-center cursor-pointer group hover:bg-elevated transition-all duration-150
                  ${i < tasks.length - 1 ? "border-b border-line" : ""}`}>
                <p className="text-[12px] font-mono text-ghost">{t.id}</p>
                <p className="text-[13px] font-medium text-dim group-hover:text-fg transition-colors duration-150 truncate">{t.title}</p>
                <p className="text-[12px] text-ghost">{t.tool}</p>
                <p className="text-[12px] font-mono text-ghost">{t.duration}</p>
                <p className="text-[12px] text-ghost">{t.time}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${s.badge}`}>{s.label}</span>
              </div>
            );
          })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-[12px] text-ghost">Showing 10 of 248 tasks</p>
          <div className="flex items-center gap-1">
            {["←", "1", "2", "3", "...", "25", "→"].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-md text-[12px] font-medium transition-all duration-200
                ${p === "1" ? "bg-elevated text-fg border border-line-soft" : "text-dim hover:bg-elevated hover:text-fg"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
