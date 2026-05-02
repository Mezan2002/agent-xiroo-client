import AppShell from "./components/AppShell";

const stats = [
  {
    id: "s-tasks",
    label: "Tasks Completed",
    value: "248",
    trend: "+12%",
    up: true,
    icon: (
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
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: "s-tools",
    label: "Tool Calls",
    value: "1,342",
    trend: "+8%",
    up: true,
    icon: (
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
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "s-tokens",
    label: "Tokens Used",
    value: "2.4M",
    trend: "+3%",
    up: true,
    icon: (
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "s-success",
    label: "Success Rate",
    value: "94.2%",
    trend: "-1.2%",
    up: false,
    icon: (
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
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const tasks = [
  {
    id: 1,
    title: "Scrape top 50 AI startups and compile report",
    status: "done",
    meta: "Web Search · 2 min ago",
  },
  {
    id: 2,
    title: "Analyze Q2 sales data and generate insights",
    status: "done",
    meta: "Data Analyst · 18 min ago",
  },
  {
    id: 3,
    title: "Write and run Python script to sort CSV files",
    status: "running",
    meta: "Code Runner · Running...",
  },
  {
    id: 4,
    title: "Summarize 12 research papers on LLM agents",
    status: "done",
    meta: "Web Search · 1 hr ago",
  },
  {
    id: 5,
    title: "Generate product descriptions for 30 SKUs",
    status: "failed",
    meta: "File Manager · 2 hr ago",
  },
  {
    id: 6,
    title: "Monitor competitor pricing every 6 hours",
    status: "queued",
    meta: "Scheduler · Scheduled",
  },
];

const statusStyle = {
  done: {
    dot: "bg-success",
    badge: "text-success border-success/30 bg-success/5",
    label: "Done",
  },
  running: {
    dot: "bg-warn animate-pulse",
    badge: "text-warn border-warn/30 bg-warn/5",
    label: "Running",
  },
  failed: {
    dot: "bg-danger",
    badge: "text-danger border-danger/30 bg-danger/5",
    label: "Failed",
  },
  queued: {
    dot: "bg-ghost",
    badge: "text-ghost border-ghost/30 bg-transparent",
    label: "Queued",
  },
};

const quickActions = [
  {
    id: "qa-new",
    label: "New Task",
    desc: "Give the agent an instruction",
    icon: (
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    id: "qa-tools",
    label: "Browse Tools",
    desc: "Configure agent capabilities",
    icon: (
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
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "qa-memory",
    label: "View Memory",
    desc: "See what the agent knows",
    icon: (
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
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "qa-logs",
    label: "Read Logs",
    desc: "Full execution history",
    icon: (
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const tools = [
  "Web Search",
  "Code Runner",
  "File Manager",
  "Data Analyst",
  "Image Gen",
  "API Caller",
  "Memory",
  "Scheduler",
];

const activities = [
  {
    id: 1,
    text: (
      <>
        <strong className="text-fg">Web Search</strong> returned 34 results for
        &quot;AI agent frameworks 2025&quot;
      </>
    ),
    time: "Just now",
  },
  {
    id: 2,
    text: (
      <>
        <strong className="text-fg">Code Runner</strong> executed script in 1.4s
        — 0 errors
      </>
    ),
    time: "5 min ago",
  },
  {
    id: 3,
    text: (
      <>
        <strong className="text-fg">Task #248</strong> completed successfully in
        3m 21s
      </>
    ),
    time: "12 min ago",
  },
  {
    id: 4,
    text: (
      <>
        <strong className="text-fg">Memory</strong> updated with 3 new facts
      </>
    ),
    time: "28 min ago",
  },
  {
    id: 5,
    text: (
      <>
        <strong className="text-fg">Task #245</strong> failed — File permission
        denied
      </>
    ),
    time: "2 hr ago",
  },
];

const heatCells = Array.from({ length: 48 }, (_, i) => {
  const lvls = [0, 0, 1, 1, 2, 2, 3, 4, 5];
  return lvls[Math.floor((i * 7 + 3) % lvls.length)];
});
const heatCls = [
  "bg-elevated",
  "bg-white/[0.07]",
  "bg-white/[0.14]",
  "bg-white/[0.25]",
  "bg-white/[0.45]",
  "bg-white/[0.75]",
];

export default function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">
            Overview
          </p>
          <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">
            Command Center
          </h1>
          <p className="text-[13.5px] text-dim">
            Monitor your agent, track tasks, and manage all capabilities from
            one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft hover:bg-elevated transition-all duration-200 cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-elevated border border-line rounded-md flex items-center justify-center text-dim">
                  {s.icon}
                </div>
                <span
                  className={`text-[11px] font-semibold ${s.up ? "text-success" : "text-danger"}`}
                >
                  {s.trend}
                </span>
              </div>
              <div className="text-[28px] font-bold tracking-[-1px] text-fg leading-none mb-1">
                {s.value}
              </div>
              <div className="text-[12px] text-dim">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* Left */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {/* Recent Tasks */}
            <div className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-fg">
                  Recent Tasks
                </span>
                <button className="text-[12px] text-dim hover:text-fg flex items-center gap-1 transition-colors duration-200">
                  View all
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col">
                {tasks.map((t, i) => {
                  const s = statusStyle[t.status];
                  return (
                    <div
                      key={t.id}
                      id={`task-${t.id}`}
                      className={`flex items-center gap-3 py-3 cursor-pointer group ${i < tasks.length - 1 ? "border-b border-line" : ""}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-dim group-hover:text-fg transition-colors duration-150 truncate">
                          {t.title}
                        </p>
                        <p className="text-[11px] text-ghost mt-0.5">
                          {t.meta}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${s.badge}`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-semibold text-fg">
                  Task Activity
                </span>
                <span className="text-[11px] text-ghost">Last 48 hours</span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-12 gap-[3px]">
                {heatCells.map((lvl, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-[2px] ${heatCls[lvl]} transition-all duration-200 hover:opacity-80`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-ghost">
                <span>Less</span>
                {heatCls.map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            {/* Quick Actions */}
            <div className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200">
              <p className="text-[13px] font-semibold text-fg mb-4">
                Quick Actions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickActions.map((qa) => (
                  <button
                    key={qa.id}
                    id={qa.id}
                    className="flex flex-col items-start gap-2 p-3.5 bg-base border border-line rounded-[10px] hover:bg-elevated hover:border-line-soft transition-all duration-200 text-left"
                  >
                    <div className="w-7 h-7 bg-elevated border border-line-soft rounded-md flex items-center justify-center text-dim">
                      {qa.icon}
                    </div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-fg">
                        {qa.label}
                      </p>
                      <p className="text-[11px] text-ghost">{qa.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tools */}
            <div className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-fg">
                  Active Tools
                </p>
                <span className="text-[11px] text-success">8 online</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-elevated border border-line rounded-full text-[11.5px] font-medium text-dim hover:text-fg hover:border-line-soft transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Activity */}
            <div className="bg-surface border border-line rounded-[10px] p-5 hover:border-line-soft transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-fg">
                  Live Activity
                </p>
                <span className="flex items-center gap-1.5 text-[11px] text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex flex-col">
                {activities.map((a, i) => (
                  <div
                    key={a.id}
                    className={`flex gap-3 py-2.5 ${i < activities.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] text-dim leading-relaxed">
                        {a.text}
                      </p>
                      <p className="text-[11px] text-ghost mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
