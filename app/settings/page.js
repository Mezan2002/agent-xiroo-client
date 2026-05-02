"use client";
import AppShell from "../components/AppShell";

const providers = [
  { id: "anthropic", name: "Anthropic Claude", desc: "claude-3-5-sonnet, claude-3-opus" },
  { id: "openai",    name: "OpenAI GPT",       desc: "gpt-4o, gpt-4-turbo" },
  { id: "gemini",    name: "Google Gemini",    desc: "gemini-1.5-pro, gemini-flash" },
];

const Section = ({ title, desc, children }) => (
  <div className="mb-8">
    <div className="mb-5">
      <h2 className="text-[15px] font-semibold text-fg">{title}</h2>
      {desc && <p className="text-[12.5px] text-dim mt-0.5">{desc}</p>}
    </div>
    <div className="bg-surface border border-line rounded-[10px] divide-y divide-line">
      {children}
    </div>
  </div>
);

const Row = ({ label, desc, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 px-5 py-4">
    <div>
      <p className="text-[13px] font-medium text-fg">{label}</p>
      {desc && <p className="text-[11.5px] text-dim mt-0.5">{desc}</p>}
    </div>
    <div className="shrink-0 w-full sm:w-auto">{children}</div>
  </div>
);

const Toggle = ({ on = false, id }) => (
  <div id={id} className={`relative w-10 h-5 rounded-full cursor-pointer transition-all duration-300 ${on ? "bg-fg" : "bg-elevated border border-line"}`}>
    <div className={`absolute top-[2px] w-4 h-4 rounded-full transition-all duration-300 ${on ? "left-[22px] bg-base" : "left-[2px] bg-ghost"}`} />
  </div>
);

import { useVoice } from "../context/VoiceContext";
import { useMemory } from "../context/MemoryContext";

export default function SettingsPage() {
  const { 
    voices, 
    selectedVoice, 
    setSelectedVoice, 
    recognitionLang, 
    setRecognitionLang, 
    speak 
  } = useVoice();
  const { clearAllMemory } = useMemory();

  const handleClearMemory = () => {
    if (confirm("Are you sure you want to delete all long-term memories? This cannot be undone.")) {
      clearAllMemory();
    }
  };
  return (
    <AppShell title="Settings" breadcrumb="System">
      <div className="max-w-[700px] mx-auto px-4 lg:px-8 py-6 lg:py-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-ghost mb-1.5">System</p>
          <h1 className="text-[26px] font-bold tracking-tight text-fg leading-none mb-2">Settings</h1>
          <p className="text-[13.5px] text-dim">Configure your agent, provider, and workspace preferences.</p>
        </div>

        {/* AI Provider */}
        <Section title="AI Provider" desc="Choose which model powers your agent.">
          {providers.map((p) => (
            <div key={p.id} id={`provider-${p.id}`} className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-elevated transition-all duration-200 ${p.id === "anthropic" ? "bg-elevated" : ""}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${p.id === "anthropic" ? "border-fg" : "border-line-soft"}`}>
                {p.id === "anthropic" && <div className="w-2 h-2 rounded-full bg-fg" />}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-fg">{p.name}</p>
                <p className="text-[11.5px] text-dim">{p.desc}</p>
              </div>
              {p.id === "anthropic" && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-success/30 bg-success/5 text-success">Active</span>}
            </div>
          ))}
        </Section>

        {/* API Keys */}
        <Section title="API Keys" desc="Your keys are stored locally and never sent to our servers.">
          {[
            { id: "key-anthropic", label: "Anthropic API Key", placeholder: "sk-ant-..." },
            { id: "key-openai",    label: "OpenAI API Key",    placeholder: "sk-..." },
          ].map((k) => (
            <Row key={k.id} label={k.label}>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input id={k.id} type="password" placeholder={k.placeholder}
                  className="bg-base border border-line rounded-lg px-3 py-2 text-[12.5px] font-mono text-dim placeholder:text-ghost outline-none focus:border-line-soft transition-all duration-200 flex-1 sm:w-52" />
                <button className="px-3 py-2 bg-elevated border border-line rounded-lg text-[12px] text-dim hover:text-fg hover:border-line-soft transition-all duration-200">Save</button>
              </div>
            </Row>
          ))}
        </Section>

        {/* Agent Config */}
        <Section title="Agent Configuration" desc="Tune how your agent behaves.">
          <Row label="Agent Name" desc="How the agent identifies itself">
            <input id="setting-agent-name" type="text" defaultValue="Agent Xiroo"
              className="bg-base border border-line rounded-lg px-3 py-2 text-[12.5px] text-fg outline-none focus:border-line-soft transition-all duration-200 w-full sm:w-44" />
          </Row>
          <Row label="Max Tokens Per Task" desc="Limit token usage per task run">
            <input id="setting-max-tokens" type="number" defaultValue="8000"
              className="bg-base border border-line rounded-lg px-3 py-2 text-[12.5px] text-fg outline-none focus:border-line-soft transition-all duration-200 w-full sm:w-28" />
          </Row>
          <Row label="Auto-save to Memory" desc="Automatically save facts from completed tasks">
            <Toggle id="toggle-memory" on={true} />
          </Row>
          <Row label="Confirm Before Running" desc="Show a confirmation before each task execution">
            <Toggle id="toggle-confirm" on={false} />
          </Row>
          <Row label="Show Thinking Steps" desc="Display the agent's reasoning in chat">
            <Toggle id="toggle-thinking" on={true} />
          </Row>
          <Row label="Voice Commands" desc="Enable hands-free voice control and dictation">
            <Toggle id="toggle-voice" on={true} />
          </Row>
        </Section>

        {/* Voice Selection */}
        <Section title="Voice Settings" desc="Choose how the agent hears and speaks to you.">
          <Row label="Recognition Language" desc="Select the language you will speak in">
            <select 
              value={recognitionLang} 
              onChange={(e) => setRecognitionLang(e.target.value)}
              className="bg-base border border-line rounded-lg px-3 py-2 text-[12.5px] text-fg outline-none focus:border-line-soft transition-all duration-200 w-full sm:w-48"
            >
              <option value="en-US">English (US)</option>
              <option value="bn-BD">Bangla (Bangladesh)</option>
              <option value="bn-IN">Bangla (India)</option>
              <option value="hi-IN">Hindi</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
            </select>
          </Row>
          <Row label="Agent Voice" desc="Select a high-quality voice for the agent">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                value={selectedVoice || ""} 
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="bg-base border border-line rounded-lg px-3 py-2 text-[12.5px] text-fg outline-none focus:border-line-soft transition-all duration-200 w-full sm:w-64"
              >
                {voices.length === 0 && <option value="">No voices available</option>}
                {voices
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
              </select>
              <button 
                onClick={() => speak("Hello! This is how I sound with the selected voice.")}
                className="px-3 py-2 bg-elevated border border-line rounded-lg text-[12px] text-dim hover:text-fg hover:border-line-soft transition-all duration-200 shrink-0"
              >
                Test
              </button>
            </div>
          </Row>
        </Section>

        {/* Danger Zone */}
        <div>
          <div className="mb-4">
            <h2 className="text-[15px] font-semibold text-fg">Danger Zone</h2>
            <p className="text-[12.5px] text-dim mt-0.5">Irreversible actions — proceed with caution.</p>
          </div>
          <div className="bg-surface border border-danger/20 rounded-[10px] divide-y divide-line">
            {[
              { id: "clear-memory", label: "Clear All Memory",    desc: "Permanently delete all long-term memory entries" },
              { id: "clear-tasks",  label: "Clear Task History",  desc: "Delete all past task records and logs" },
              { id: "reset-agent",  label: "Reset Agent",         desc: "Restore all settings to factory defaults" },
            ].map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 gap-4">
                <div>
                  <p className="text-[13px] font-medium text-fg">{item.label}</p>
                  <p className="text-[11.5px] text-dim mt-0.5">{item.desc}</p>
                </div>
                <button 
                  id={item.id} 
                  onClick={item.id === "clear-memory" ? handleClearMemory : undefined}
                  className="px-3 py-1.5 rounded-md border border-danger/30 text-danger text-[12px] font-semibold hover:bg-danger/5 transition-all duration-200 w-full sm:w-auto"
                >
                  {item.label.split(" ")[0]}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
