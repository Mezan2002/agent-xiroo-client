"use client";
import { useState } from "react";
import AppShell from "../components/AppShell";
import { useVoice } from "../context/VoiceContext";
import { useMemory } from "../context/MemoryContext";

const MESSAGES = [
  {
    id: 1,
    role: "user",
    content:
      "Scrape the top 20 AI agent frameworks from GitHub and summarize each one in 2 sentences.",
  },
  {
    id: 2,
    role: "agent",
    content:
      "I'll get started on that right away. Let me search GitHub for the most popular AI agent frameworks.",
    toolCalls: [
      {
        tool: "Web Search",
        input: 'site:github.com "AI agent framework" stars:>500',
        status: "done",
        output: "Found 20+ repositories",
      },
    ],
  },
  {
    id: 3,
    role: "agent",
    content:
      "Here's the summary of the top 20 AI agent frameworks I found on GitHub:\n\n**1. LangChain** — A framework for developing applications powered by language models. It provides tools for chaining LLM calls, managing memory, and integrating external tools.\n\n**2. AutoGPT** — An autonomous AI agent that can perform tasks end-to-end without human intervention. It manages its own prompt chaining and tool use to achieve high-level goals.\n\n**3. CrewAI** — A multi-agent orchestration framework that allows multiple specialized AI agents to collaborate on complex tasks. Each agent has a defined role and set of tools.",
  },
  {
    id: 4,
    role: "user",
    content: "Great! Now filter only the ones that support tool use natively.",
  },
  {
    id: 5,
    role: "agent",
    content: "Filtering the list...",
    toolCalls: [
      {
        tool: "Code Runner",
        input: "filter(frameworks, lambda f: f.tool_use == True)",
        status: "running",
        output: null,
      },
    ],
    thinking: true,
  },
];

const ToolCallCard = ({ call }) => (
  <div className="mt-4 bg-[#0c0c0c] border border-white/10 rounded-lg overflow-hidden shadow-2xl animate-slide-up">
    {/* Terminal Header */}
    <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[10px] font-mono text-ghost uppercase tracking-widest">
          {call.tool} — exec
        </span>
      </div>
      <div className="w-12" />
    </div>
    {/* Terminal Content */}
    <div className="p-4 font-mono text-[12px] leading-relaxed">
      <div className="flex gap-2 text-success mb-1">
        <span className="shrink-0 opacity-50">$</span>
        <span className="text-fg">{call.input}</span>
      </div>
      {call.status === "running" && (
        <div className="flex items-center gap-2 text-warn mt-2">
          <span className="animate-pulse">●</span>
          <span>Executing in sandbox...</span>
        </div>
      )}
      {call.output && (
        <div className="mt-3 text-dim border-t border-white/5 pt-3">
          <p className="text-[11px] text-ghost mb-1 uppercase font-bold tracking-tighter opacity-50">
            Output
          </p>
          <pre className="whitespace-pre-wrap">{call.output}</pre>
        </div>
      )}
    </div>
    {/* Footer Status */}
    <div className="px-3 py-1.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
      <span className="text-[9px] text-ghost font-mono uppercase">
        Status: {call.status}
      </span>
      <span className="text-[9px] text-ghost font-mono">1.4s</span>
    </div>
  </div>
);

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AgentPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "agent",
      content:
        "Hello! I'm Agent Xiroo, powered by Gemini. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toggleListening, isListening, speak, isSpeaking, stopSpeaking } = useVoice();
  const { memories } = useMemory();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Speak the first message on mount if it's from the agent
  useEffect(() => {
    if (voiceEnabled && messages.length === 1 && messages[0].role === "agent") {
      // Small delay to ensure voices are loaded and browser allows speech
      const timer = setTimeout(() => {
        speak(messages[0].content);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle global voice command from URL
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setInput(query);
      // We need a small delay to ensure the state is updated before sending
      const timer = setTimeout(() => {
        sendMessage(query);
        // Clear the URL parameter without refreshing
        router.replace("/agent", undefined, { shallow: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const msgText = text || input;
    if (!msgText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msgText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgText,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          memories: memories.map(m => `[${m.tag}] ${m.content}`),
        }),
      });
      // ... rest of the logic

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "agent",
            content: "⚠️ Error: " + data.error,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "agent",
            content: data.text,
          },
        ]);
        if (voiceEnabled) {
          speak(data.text);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "agent",
          content: "⚠️ System Error: Could not reach the AI server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell title="Agent Chat" breadcrumb="Workspace">
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
        {/* Chat Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                {msg.role === "agent" && (
                  <div className="w-7 h-7 rounded-md bg-fg flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[85%] lg:max-w-[70%] rounded-xl px-4 py-3 text-[13.5px] leading-relaxed
                  ${
                    msg.role === "user"
                      ? "bg-fg text-base font-medium rounded-tr-sm"
                      : "bg-surface border border-line text-fg rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-slide-up">
                <div className="w-7 h-7 rounded-md bg-fg flex items-center justify-center shrink-0 mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="max-w-[85%] lg:max-w-[70%] rounded-xl px-4 py-3 bg-surface border border-line flex items-center gap-2">
                  <div className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-ghost animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-ghost animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-ghost animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span className="text-[12px] text-ghost font-medium">
                    Gemini is thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={sendMessage}
            className="border-t border-line bg-surface px-4 lg:px-6 py-4"
          >
            <div className="flex items-end gap-3 bg-base border border-line rounded-xl px-4 py-3 focus-within:border-line-soft transition-all duration-200">
              <textarea
                id="agent-input"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Give the agent an instruction..."
                className="flex-1 bg-transparent text-[13.5px] text-fg placeholder:text-ghost resize-none outline-none leading-relaxed"
                style={{ minHeight: 24, maxHeight: 120 }}
              />
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200 
                    ${isListening ? "bg-danger text-base animate-pulse" : "text-ghost hover:text-dim"}`}
                  title="Voice Command"
                >
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
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isSpeaking) {
                      stopSpeaking();
                    } else {
                      setVoiceEnabled(!voiceEnabled);
                    }
                  }}
                  className={`w-7 h-7 flex items-center justify-center rounded-md transition-all duration-200 
                    ${isSpeaking ? "bg-success text-base animate-pulse" : voiceEnabled ? "text-success hover:text-success/80" : "text-ghost hover:text-dim"}`}
                  title={isSpeaking ? "Stop Speaking" : voiceEnabled ? "Voice Enabled" : "Voice Disabled"}
                >
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
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    {voiceEnabled || isSpeaking ? (
                      <>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </>
                    ) : (
                      <line x1="23" y1="9" x2="17" y2="15" />
                    )}
                  </svg>
                </button>
                <button
                  type="button"
                  id="agent-attach"
                  className="w-7 h-7 flex items-center justify-center rounded-md text-ghost hover:text-dim transition-colors"
                >
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
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-7 h-7 bg-fg rounded-md flex items-center justify-center text-base hover:bg-fg/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-[10.5px] text-ghost mt-2 text-center">
              Agent Xiroo · Powered by Gemini 1.5 Flash · Press Enter to send
            </p>
          </form>
        </div>

        {/* Right Panel — Tool Details */}
        <div className="w-full lg:w-[260px] border-t lg:border-t-0 lg:border-l border-line bg-surface flex flex-col shrink-0 overflow-hidden">
          <div className="px-4 py-4 border-b border-line">
            <p className="text-[12px] font-semibold text-fg">Execution Panel</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {[
              { label: "Status", value: "Thinking...", color: "text-warn" },
              { label: "Step", value: "2 of 3", color: "text-dim" },
              { label: "Tokens", value: "1,240", color: "text-dim" },
              { label: "Elapsed", value: "4.2s", color: "text-dim" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <span className="text-[11px] text-ghost">{row.label}</span>
                <span className={`text-[12px] font-semibold ${row.color}`}>
                  {row.value}
                </span>
              </div>
            ))}
            <div className="border-t border-line pt-3 mt-1">
              <p className="text-[11px] text-ghost mb-2">Tools Used</p>
              {["Web Search", "Code Runner"].map((t) => (
                <div key={t} className="flex items-center gap-2 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-[12px] text-dim">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-line">
            <button
              id="agent-stop"
              className="w-full py-2 rounded-md border border-danger/30 text-danger text-[12px] font-semibold hover:bg-danger/5 transition-all duration-200"
            >
              Stop Agent
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
