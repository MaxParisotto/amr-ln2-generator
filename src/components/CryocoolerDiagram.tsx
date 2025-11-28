import React from 'react';

const CryocoolerDiagram: React.FC = () => {
  return (
    <div className="w-full p-4">
      <svg viewBox="0 0 600 380" className="w-full h-auto max-w-2xl mx-auto">
        <defs>
          {/* Blueprint grid pattern */}
          <pattern id="cryoGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5" />
          </pattern>
          
          {/* Gradients */}
          <linearGradient id="stage1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="stage2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="stage3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="coldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="magnetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          {/* Arrow marker */}
          <marker id="arrowCryo" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="600" height="380" fill="#1a2744" />
        <rect x="0" y="0" width="600" height="380" fill="url(#cryoGrid)" />

        {/* Hot Side (Room Temp) */}
        <rect x="30" y="50" width="70" height="50" rx="4" fill="none" stroke="#ef4444" strokeWidth="2" />
        <text x="65" y="72" textAnchor="middle" className="text-xs font-mono" fill="#ef4444">HOT SIDE</text>
        <text x="65" y="88" textAnchor="middle" className="text-xs font-mono font-bold" fill="#fca5a5">300K</text>

        {/* Stage 1: 300K → 200K */}
        <g transform="translate(120, 50)">
          <rect x="0" y="0" width="100" height="50" rx="4" fill="url(#stage1Gradient)" stroke="#f59e0b" strokeWidth="2" />
          <text x="50" y="18" textAnchor="middle" className="text-xs font-mono font-bold" fill="#fcd34d">STAGE 1</text>
          <text x="50" y="32" textAnchor="middle" className="text-[10px] font-mono" fill="#fcd34d">Gd Alloy</text>
          <text x="50" y="45" textAnchor="middle" className="text-[9px] font-mono" fill="#fbbf24">300K → 200K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="18" rx="2" fill="url(#magnetGradient)" stroke="#818cf8" strokeWidth="1" />
          <text x="50" y="67" textAnchor="middle" className="text-[8px] font-mono font-medium" fill="white">HALBACH</text>
        </g>

        {/* Stage 2: 200K → 120K */}
        <g transform="translate(250, 50)">
          <rect x="0" y="0" width="100" height="50" rx="4" fill="url(#stage2Gradient)" stroke="#ea580c" strokeWidth="2" />
          <text x="50" y="18" textAnchor="middle" className="text-xs font-mono font-bold" fill="#fb923c">STAGE 2</text>
          <text x="50" y="32" textAnchor="middle" className="text-[10px] font-mono" fill="#fb923c">LaFeSi</text>
          <text x="50" y="45" textAnchor="middle" className="text-[9px] font-mono" fill="#fdba74">200K → 120K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="18" rx="2" fill="url(#magnetGradient)" stroke="#818cf8" strokeWidth="1" />
          <text x="50" y="67" textAnchor="middle" className="text-[8px] font-mono font-medium" fill="white">HALBACH</text>
        </g>

        {/* Stage 3: 120K → 77K */}
        <g transform="translate(380, 50)">
          <rect x="0" y="0" width="100" height="50" rx="4" fill="url(#stage3Gradient)" stroke="#dc2626" strokeWidth="2" />
          <text x="50" y="18" textAnchor="middle" className="text-xs font-mono font-bold" fill="#f87171">STAGE 3</text>
          <text x="50" y="32" textAnchor="middle" className="text-[10px] font-mono" fill="#f87171">MnFeP</text>
          <text x="50" y="45" textAnchor="middle" className="text-[9px] font-mono" fill="#fca5a5">120K → 77K</text>
          
          {/* Magnet Array */}
          <rect x="10" y="55" width="80" height="18" rx="2" fill="url(#magnetGradient)" stroke="#818cf8" strokeWidth="1" />
          <text x="50" y="67" textAnchor="middle" className="text-[8px] font-mono font-medium" fill="white">HALBACH</text>
        </g>

        {/* Cold Side (LN2 Temp) */}
        <rect x="500" y="50" width="70" height="50" rx="4" fill="url(#coldGradient)" stroke="#22d3ee" strokeWidth="2" />
        <text x="535" y="72" textAnchor="middle" className="text-xs font-mono" fill="#22d3ee">COLD</text>
        <text x="535" y="88" textAnchor="middle" className="text-xs font-mono font-bold" fill="#67e8f9">77K</text>

        {/* Heat Flow Arrows (Top) */}
        <line x1="100" y1="70" x2="115" y2="70" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowCryo)" />
        <line x1="225" y1="70" x2="245" y2="70" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowCryo)" />
        <line x1="355" y1="70" x2="375" y2="70" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowCryo)" />
        <line x1="485" y1="70" x2="495" y2="70" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowCryo)" />

        {/* Heat Transfer Fluid Loop */}
        <g transform="translate(0, 140)">
          <rect x="50" y="0" width="500" height="75" rx="4" fill="none" stroke="#2a3f5f" strokeWidth="2" strokeDasharray="4" />
          <text x="300" y="18" textAnchor="middle" className="text-[10px] font-mono font-bold" fill="#60a5fa">
            HEAT TRANSFER FLUID LOOP (He/N₂ @ 10-20 bar)
          </text>
          
          {/* Regenerator beds representation */}
          <g transform="translate(70, 28)">
            <rect x="0" y="0" width="60" height="35" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="30" y="22" textAnchor="middle" className="text-[9px] font-mono" fill="#fcd34d">HEX 1</text>
          </g>
          <g transform="translate(170, 28)">
            <rect x="0" y="0" width="60" height="35" rx="4" fill="none" stroke="#ea580c" strokeWidth="1.5" />
            <text x="30" y="22" textAnchor="middle" className="text-[9px] font-mono" fill="#fb923c">HEX 2</text>
          </g>
          <g transform="translate(270, 28)">
            <rect x="0" y="0" width="60" height="35" rx="4" fill="none" stroke="#dc2626" strokeWidth="1.5" />
            <text x="30" y="22" textAnchor="middle" className="text-[9px] font-mono" fill="#f87171">HEX 3</text>
          </g>
          <g transform="translate(370, 28)">
            <rect x="0" y="0" width="90" height="35" rx="4" fill="url(#coldGradient)" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="45" y="16" textAnchor="middle" className="text-[9px] font-mono" fill="#22d3ee">CONDENSER</text>
            <text x="45" y="28" textAnchor="middle" className="text-[8px] font-mono" fill="#67e8f9">N₂ → LN₂</text>
          </g>
          
          {/* Flow arrows */}
          <path d="M135 45 L165 45" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
          <path d="M235 45 L265 45" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
          <path d="M335 45 L365 45" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
        </g>

        {/* AMR Cycle Illustration */}
        <g transform="translate(50, 235)">
          <text x="250" y="0" textAnchor="middle" className="text-[10px] font-mono font-bold" fill="#60a5fa">
            ─── MAGNETOCALORIC CYCLE (PER STAGE) ───
          </text>
          
          {/* Cycle steps */}
          <g transform="translate(0, 12)">
            {/* Step 1 */}
            <rect x="0" y="0" width="115" height="55" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="57" y="14" textAnchor="middle" className="text-[9px] font-mono font-bold" fill="#60a5fa">1. MAGNETIZE</text>
            <text x="57" y="27" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Apply B-field</text>
            <text x="57" y="39" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">MCM heats up</text>
            <text x="57" y="51" textAnchor="middle" className="text-[8px] font-mono" fill="#67e8f9">(ΔT_ad ≈ 2-6K)</text>
            
            {/* Step 2 */}
            <rect x="125" y="0" width="115" height="55" rx="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
            <text x="182" y="14" textAnchor="middle" className="text-[9px] font-mono font-bold" fill="#4ade80">2. HOT BLOW</text>
            <text x="182" y="27" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Fluid flows →</text>
            <text x="182" y="39" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Absorbs heat</text>
            <text x="182" y="51" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Rejects to hot HEX</text>
            
            {/* Step 3 */}
            <rect x="250" y="0" width="115" height="55" rx="4" fill="none" stroke="#eab308" strokeWidth="1.5" />
            <text x="307" y="14" textAnchor="middle" className="text-[9px] font-mono font-bold" fill="#facc15">3. DEMAGNETIZE</text>
            <text x="307" y="27" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Remove B-field</text>
            <text x="307" y="39" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">MCM cools down</text>
            <text x="307" y="51" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">(Below T_ambient)</text>
            
            {/* Step 4 */}
            <rect x="375" y="0" width="115" height="55" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="432" y="14" textAnchor="middle" className="text-[9px] font-mono font-bold" fill="#22d3ee">4. COLD BLOW</text>
            <text x="432" y="27" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Fluid flows ←</text>
            <text x="432" y="39" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Cools down</text>
            <text x="432" y="51" textAnchor="middle" className="text-[8px] font-mono" fill="#94a3b8">Absorbs from cold</text>
          </g>
          
          {/* Cycle arrows */}
          <path d="M117 40 L123 40" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
          <path d="M242 40 L248 40" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
          <path d="M367 40 L373 40" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowCryo)" />
        </g>

        {/* Key specs */}
        <g transform="translate(510, 235)">
          <rect x="0" y="0" width="80" height="75" rx="4" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="40" y="14" textAnchor="middle" className="text-[9px] font-mono font-bold" fill="#60a5fa">KEY SPECS</text>
          <line x1="5" y1="20" x2="75" y2="20" stroke="#2a3f5f" strokeWidth="1" />
          <text x="8" y="34" className="text-[8px] font-mono" fill="#94a3b8">B: 1.5-2T</text>
          <text x="8" y="46" className="text-[8px] font-mono" fill="#94a3b8">f: 1-4 Hz</text>
          <text x="8" y="58" className="text-[8px] font-mono" fill="#94a3b8">η: 15% Carnot</text>
          <text x="8" y="70" className="text-[8px] font-mono" fill="#22d3ee">T_c: 77K</text>
        </g>
      </svg>
    </div>
  );
};

export default CryocoolerDiagram;
