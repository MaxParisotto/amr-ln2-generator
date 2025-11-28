import React from 'react';

const CryocoolerDiagram: React.FC = () => {
  return (
    <div className="w-full py-8">
      <svg viewBox="0 0 600 400" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          {/* Gradients */}
          <linearGradient id="stage1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <linearGradient id="stage2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="stage3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fecaca" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
          <linearGradient id="coldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="magnetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Arrow marker */}
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="600" height="400" fill="#f8fafc" rx="12" />
        
        {/* Title */}
        <text x="300" y="30" textAnchor="middle" className="text-sm font-bold" fill="#334155">
          Active Magnetic Regenerator (AMR) Cryocooler
        </text>
        <text x="300" y="48" textAnchor="middle" className="text-xs" fill="#64748b">
          3-Stage Cascade Configuration
        </text>

        {/* Hot Side (Room Temp) */}
        <rect x="40" y="70" width="80" height="50" rx="8" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2" />
        <text x="80" y="95" textAnchor="middle" className="text-xs font-semibold" fill="#dc2626">Hot Side</text>
        <text x="80" y="110" textAnchor="middle" className="text-xs" fill="#dc2626">300K</text>

        {/* Stage 1: 300K → 200K */}
        <g transform="translate(150, 70)">
          {/* MCM Bed */}
          <rect x="0" y="0" width="100" height="50" rx="8" fill="url(#stage1Gradient)" stroke="#f59e0b" strokeWidth="2" />
          <text x="50" y="20" textAnchor="middle" className="text-xs font-bold" fill="#92400e">Stage 1</text>
          <text x="50" y="35" textAnchor="middle" className="text-[10px]" fill="#92400e">Gd Alloy</text>
          <text x="50" y="48" textAnchor="middle" className="text-[9px]" fill="#78350f">300K → 200K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="20" rx="4" fill="url(#magnetGradient)" />
          <text x="50" y="68" textAnchor="middle" className="text-[8px] font-medium" fill="white">Halbach Magnet</text>
        </g>

        {/* Stage 2: 200K → 120K */}
        <g transform="translate(280, 70)">
          {/* MCM Bed */}
          <rect x="0" y="0" width="100" height="50" rx="8" fill="url(#stage2Gradient)" stroke="#ea580c" strokeWidth="2" />
          <text x="50" y="20" textAnchor="middle" className="text-xs font-bold" fill="#9a3412">Stage 2</text>
          <text x="50" y="35" textAnchor="middle" className="text-[10px]" fill="#9a3412">LaFeSi</text>
          <text x="50" y="48" textAnchor="middle" className="text-[9px]" fill="#7c2d12">200K → 120K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="20" rx="4" fill="url(#magnetGradient)" />
          <text x="50" y="68" textAnchor="middle" className="text-[8px] font-medium" fill="white">Halbach Magnet</text>
        </g>

        {/* Stage 3: 120K → 77K */}
        <g transform="translate(410, 70)">
          {/* MCM Bed */}
          <rect x="0" y="0" width="100" height="50" rx="8" fill="url(#stage3Gradient)" stroke="#dc2626" strokeWidth="2" />
          <text x="50" y="20" textAnchor="middle" className="text-xs font-bold" fill="#991b1b">Stage 3</text>
          <text x="50" y="35" textAnchor="middle" className="text-[10px]" fill="#991b1b">MnFeP</text>
          <text x="50" y="48" textAnchor="middle" className="text-[9px]" fill="#7f1d1d">120K → 77K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="20" rx="4" fill="url(#magnetGradient)" />
          <text x="50" y="68" textAnchor="middle" className="text-[8px] font-medium" fill="white">Halbach Magnet</text>
        </g>

        {/* Cold Side (LN2 Temp) */}
        <rect x="530" y="70" width="60" height="50" rx="8" fill="url(#coldGradient)" stroke="#06b6d4" strokeWidth="2" filter="url(#glow)" />
        <text x="560" y="92" textAnchor="middle" className="text-xs font-semibold" fill="#0e7490">Cold</text>
        <text x="560" y="107" textAnchor="middle" className="text-xs" fill="#0e7490">77K</text>

        {/* Heat Flow Arrows (Top) */}
        <line x1="120" y1="85" x2="145" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="255" y1="85" x2="275" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="385" y1="85" x2="405" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="515" y1="85" x2="525" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Heat Transfer Fluid Loop */}
        <g transform="translate(0, 160)">
          <rect x="60" y="0" width="480" height="80" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
          <text x="300" y="20" textAnchor="middle" className="text-[10px] font-semibold" fill="#475569">
            Heat Transfer Fluid Loop (He/N₂ @ 10-20 bar)
          </text>
          
          {/* Regenerator beds representation */}
          <g transform="translate(80, 30)">
            <rect x="0" y="0" width="60" height="40" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="30" y="25" textAnchor="middle" className="text-[9px]" fill="#92400e">HEX 1</text>
          </g>
          <g transform="translate(180, 30)">
            <rect x="0" y="0" width="60" height="40" rx="6" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
            <text x="30" y="25" textAnchor="middle" className="text-[9px]" fill="#9a3412">HEX 2</text>
          </g>
          <g transform="translate(280, 30)">
            <rect x="0" y="0" width="60" height="40" rx="6" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
            <text x="30" y="25" textAnchor="middle" className="text-[9px]" fill="#991b1b">HEX 3</text>
          </g>
          <g transform="translate(380, 30)">
            <rect x="0" y="0" width="80" height="40" rx="6" fill="#a5f3fc" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="40" y="18" textAnchor="middle" className="text-[9px]" fill="#0e7490">Condenser</text>
            <text x="40" y="32" textAnchor="middle" className="text-[8px]" fill="#0e7490">N₂ → LN₂</text>
          </g>
          
          {/* Flow arrows */}
          <path d="M145 50 L175 50" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <path d="M245 50 L275 50" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <path d="M345 50 L375 50" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        </g>

        {/* AMR Cycle Illustration */}
        <g transform="translate(60, 270)">
          <text x="240" y="0" textAnchor="middle" className="text-[10px] font-semibold" fill="#475569">
            Magnetocaloric Cycle (per stage)
          </text>
          
          {/* Cycle steps */}
          <g transform="translate(0, 15)">
            {/* Step 1 */}
            <rect x="0" y="0" width="110" height="55" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <text x="55" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="#1e40af">1. Magnetize</text>
            <text x="55" y="28" textAnchor="middle" className="text-[8px]" fill="#1e40af">Apply B-field</text>
            <text x="55" y="40" textAnchor="middle" className="text-[8px]" fill="#1e40af">MCM heats up</text>
            <text x="55" y="52" textAnchor="middle" className="text-[8px]" fill="#1e40af">(ΔT_ad ≈ 2-6K)</text>
            
            {/* Step 2 */}
            <rect x="120" y="0" width="110" height="55" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" />
            <text x="175" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="#166534">2. Hot Blow</text>
            <text x="175" y="28" textAnchor="middle" className="text-[8px]" fill="#166534">Fluid flows →</text>
            <text x="175" y="40" textAnchor="middle" className="text-[8px]" fill="#166534">Absorbs heat</text>
            <text x="175" y="52" textAnchor="middle" className="text-[8px]" fill="#166534">Rejects to hot HEX</text>
            
            {/* Step 3 */}
            <rect x="240" y="0" width="110" height="55" rx="6" fill="#fef9c3" stroke="#eab308" strokeWidth="1" />
            <text x="295" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="#854d0e">3. Demagnetize</text>
            <text x="295" y="28" textAnchor="middle" className="text-[8px]" fill="#854d0e">Remove B-field</text>
            <text x="295" y="40" textAnchor="middle" className="text-[8px]" fill="#854d0e">MCM cools down</text>
            <text x="295" y="52" textAnchor="middle" className="text-[8px]" fill="#854d0e">(Below T_ambient)</text>
            
            {/* Step 4 */}
            <rect x="360" y="0" width="110" height="55" rx="6" fill="#cffafe" stroke="#06b6d4" strokeWidth="1" />
            <text x="415" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="#0e7490">4. Cold Blow</text>
            <text x="415" y="28" textAnchor="middle" className="text-[8px]" fill="#0e7490">Fluid flows ←</text>
            <text x="415" y="40" textAnchor="middle" className="text-[8px]" fill="#0e7490">Cools down</text>
            <text x="415" y="52" textAnchor="middle" className="text-[8px]" fill="#0e7490">Absorbs from cold HEX</text>
          </g>
          
          {/* Cycle arrows */}
          <path d="M115 42 L118 42" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
          <path d="M235 42 L238 42" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
          <path d="M355 42 L358 42" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowhead)" />
          
          {/* Circular arrow back */}
          <path d="M470 30 C490 30 490 85 240 95 C80 95 60 42 -10 42" stroke="#64748b" strokeWidth="1" fill="none" strokeDasharray="3" markerEnd="url(#arrowhead)" />
        </g>

        {/* Key specs */}
        <g transform="translate(490, 270)">
          <rect x="0" y="0" width="100" height="85" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <text x="50" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="#334155">Key Specs</text>
          <text x="10" y="32" className="text-[8px]" fill="#475569">B-field: 1.5-2T</text>
          <text x="10" y="45" className="text-[8px]" fill="#475569">Freq: 1-4 Hz</text>
          <text x="10" y="58" className="text-[8px]" fill="#475569">η: 15% Carnot</text>
          <text x="10" y="71" className="text-[8px]" fill="#475569">T_cold: 77K</text>
        </g>
      </svg>
    </div>
  );
};

export default CryocoolerDiagram;
