import React from 'react';
import { Github, Zap } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-100 blueprint-grid">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#1a2744]/95 backdrop-blur-xl border-b-2 border-[#60a5fa]">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a2744] border-2 border-[#60a5fa] rounded flex items-center justify-center text-[#60a5fa] shadow-[0_0_15px_rgba(96,165,250,0.4)]">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-[#60a5fa] tracking-wider leading-none font-mono">AMR GEN</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase leading-none mt-0.5">LN2 SYSTEMS</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0f172a] rounded border border-[#2a3f5f]">
              <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <span className="text-xs text-[#22d3ee] font-mono tracking-wide">ACTIVE</span>
            </div>
            <a 
              href="#" 
              className="text-slate-500 hover:text-[#60a5fa] transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a3f5f] py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-xs text-slate-600 font-mono">
          <span>DOCUMENT: AMR-LN2-SYS-001</span>
          <span>REV: A | SCALE: NTS</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
