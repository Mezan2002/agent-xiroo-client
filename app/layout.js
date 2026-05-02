import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Agent Xiroo — AI Command Center",
  description: "Professional AI agent workspace. Direct, monitor, and manage your AI agent.",
};

import { ToastProvider } from "./context/ToastContext";
import { VoiceProvider } from "./context/VoiceContext";
import { MemoryProvider } from "./context/MemoryContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ToolProvider } from "./context/ToolContext";
import CommandPalette from "./components/CommandPalette";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full`}>
      <body
        className="h-full antialiased bg-base text-fg"
        style={{ fontFamily: "var(--font-sans, 'Space Grotesk', system-ui, sans-serif)" }}
      >
        <ToastProvider>
          <MemoryProvider>
            <ProjectProvider>
              <ToolProvider>
                <VoiceProvider>
                  {children}
                  <CommandPalette />
                </VoiceProvider>
              </ToolProvider>
            </ProjectProvider>
          </MemoryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
