import AppShell from "../components/AppShell";

const logs = [
  { id: 1, level: "info",  time: "14:03:21", source: "Agent",       message: "Task #248 started — Scraping AI startups" },
  { id: 2, level: "tool",  time: "14:03:22", source: "Web Search",   message: 'Calling search("top AI startups 2025 site:crunchbase.com")' },
  { id: 3, level: "info",  time: "14:03:24", source: "Web Search",   message: "Returned 34 results in 1.8s" },
  { id: 4, level: "tool",  time: "14:03:25", source: "Code Runner",  message: "Executing Python: parse_results(data, limit=50)" },
  { id: 5, level: "info",  time: "14:03:27", source: "Code Runner",  message: "Script completed in 1.4s — 0 errors, 50 records parsed" },
  { id: 6, level: "info",  time: "14:03:28", source: "Memory",       message: "Saved 3 new facts to long-term memory" },
  { id: 7, level: "success",time: "14:03:30",source: "Agent",        message: "Task #248 completed successfully in 3m 21s" },
  { id: 8, level: "info",  time: "13:45:10", source: "Agent",        message: "Task #247 started — Analyze Q2 sales data" },
  { id: 9, level: "tool",  time: "13:45:11", source: "Data Analyst", message: "Loaded sales_q2.csv — 1,204 rows, 8 columns" },
  { id: 10, level: "warn", time: "13:45:14", source: "Data Analyst", message: "Missing values detected in column 'region' (12 rows)" },
  { id: 11, level: "info", time: "13:45:18", source: "Data Analyst", message: "Analysis complete — generated 5 insights" },
  { id: 12, level: "success",time:"13:45:20",source: "Agent",        message: "Task #247 completed in 1m 08s" },
  { id: 13, level: "error",time: "12:20:04", source: "File Manager", message: "Permission denied: /output/products.csv — EACCES" },
  { id: 14, level: "error",time: "12:20:05", source: "Agent",        message: "Task #245 failed — stopping execution" },
];

const levelStyle = {
  info:    { cls: "text-dim",     label: "INFO",    dot: "bg-dim" },
  tool:    { cls: "text-fg",      label: "TOOL",    dot: "bg-fg" },
  success: { cls: "text-success", label: "OK",      dot: "bg-success" },
  warn:    { cls: "text-warn",    label: "WARN",    dot: "bg-warn" },
  error:   { cls: "text-danger",  label: "ERROR",   dot: "bg-danger" },
};

export default function LogsPage() {
  return (
    <AppShell title="Logs" breadcrumb="System">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">System</p>
            <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">Logs</h1>
            <p className="text-[13.5px] text-dim">Full raw execution log of every agent action and tool call.</p>
          </div>
          <button id="logs-export" className="flex items-center gap-1.5 px-4 py-2 bg-surface border border-line text-dim text-[13px] font-medium rounded-md hover:border-line-soft hover:text-fg transition-all duration-200 shrink-0 w-full sm:w-auto justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {["All", "Info", "Tool", "Success", "Warn", "Error"].map((f, i) => (
              <button key={f} id={`log-filter-${f.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium border transition-all duration-200 shrink-0
                  ${i === 0 ? "bg-elevated border-line-soft text-fg" : "border-transparent text-dim hover:bg-elevated hover:text-fg"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 bg-surface border border-line rounded-lg px-3 py-1.5 focus-within:border-line-soft transition-all duration-200">
            <svg width="13" height="13" className="text-ghost" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="log-search" placeholder="Search logs..." className="bg-transparent text-[12px] text-fg placeholder:text-ghost outline-none w-full sm:w-36" />
          </div>
        </div>

        {/* Log Terminal */}
        <div className="bg-surface border border-line rounded-[10px] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-elevated">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <span className="text-[11px] font-mono text-dim">agent-xiroo · live stream</span>
            <div className="flex-1" />
            <span className="text-[11px] text-ghost">{logs.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            {logs.map((log, i) => {
              const s = levelStyle[log.level];
              return (
                <div key={log.id} className={`flex items-start gap-4 px-4 py-2.5 font-mono text-[12px] hover:bg-elevated transition-colors duration-100 group ${i < logs.length - 1 ? "border-b border-line" : ""}`}>
                  <span className="text-ghost shrink-0 mt-px">{log.time}</span>
                  <span className={`w-12 shrink-0 font-bold ${s.cls}`}>{s.label}</span>
                  <span className="text-ghost shrink-0 w-24 truncate">{log.source}</span>
                  <span className={`flex-1 ${s.cls}`}>{log.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
