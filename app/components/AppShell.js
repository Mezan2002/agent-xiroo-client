"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children, title, breadcrumb }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-base relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-base/60 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-[70] transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onNavClick={() => setIsMobileMenuOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar 
          title={title} 
          breadcrumb={breadcrumb} 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
