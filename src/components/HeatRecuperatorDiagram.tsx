import React from 'react';

const HeatRecuperatorDiagram: React.FC = () => {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 900 600"
        className="w-full h-auto rounded"
        style={{ fontFamily: 'monospace' }}
      >
        <defs>
          {/* Blueprint grid pattern */}
          <pattern id="recupGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5" />
          </pattern>
          <pattern id="recupGridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3a5070" strokeWidth="1" />
          </pattern>
          
          {/* Temperature gradients */}
          <linearGradient id="hotGasGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="coldGasGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          
          {/* Arrow markers */}
          <marker id="arrowHot" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
          </marker>
          <marker id="arrowCold" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#22d3ee" />
          </marker>
          <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
          </marker>
        </defs>
        
        {/* Background */}
        <rect width="900" height="600" fill="#1a2744" />
        <rect width="900" height="600" fill="url(#recupGrid)" />
        <rect width="900" height="600" fill="url(#recupGridLarge)" />
        
        {/* Title Block */}
        <rect x="10" y="10" width="880" height="50" fill="none" stroke="#4ade80" strokeWidth="2" />
        <text x="450" y="32" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="bold">
          COUNTER-FLOW HEAT RECUPERATOR
        </text>
        <text x="450" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
          PRE-COOLING INCOMING N₂ GAS USING COLD EXHAUST — EFFICIENCY IMPROVEMENT: 30-40%
        </text>

        {/* ============ MAIN DIAGRAM ============ */}
        <g transform="translate(50, 100)">
          {/* Heat exchanger body */}
          <rect x="200" y="50" width="400" height="200" fill="#1e293b" stroke="#4ade80" strokeWidth="2" rx="10" />
          
          {/* Internal tubes representation */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <line 
                x1="220" 
                y1={75 + i * 25} 
                x2="580" 
                y2={75 + i * 25} 
                stroke="#4b5563" 
                strokeWidth="8"
              />
              <line 
                x1="220" 
                y1={75 + i * 25} 
                x2="580" 
                y2={75 + i * 25} 
                stroke={`url(#${i % 2 === 0 ? 'hotGasGradient' : 'coldGasGradient'})`}
                strokeWidth="4"
              />
            </g>
          ))}
          
          {/* Labels on heat exchanger */}
          <text x="400" y="40" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
            COUNTER-FLOW HEAT EXCHANGER
          </text>
          <text x="400" y="270" textAnchor="middle" fill="#64748b" fontSize="10">
            Finned tube or brazed plate type
          </text>
          
          {/* Hot inlet (from membrane) */}
          <line x1="50" y1="100" x2="200" y2="100" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowHot)" />
          <rect x="0" y="80" width="60" height="40" fill="#0f172a" stroke="#dc2626" strokeWidth="1.5" rx="4" />
          <text x="30" y="95" textAnchor="middle" fill="#dc2626" fontSize="9">FROM</text>
          <text x="30" y="108" textAnchor="middle" fill="#dc2626" fontSize="9">MEMBRANE</text>
          <text x="125" y="90" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">300K</text>
          <text x="125" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">(27°C)</text>
          
          {/* Pre-cooled outlet (to cryocooler) */}
          <line x1="600" y1="100" x2="750" y2="100" stroke="#f97316" strokeWidth="4" markerEnd="url(#arrowOrange)" />
          <rect x="750" y="80" width="60" height="40" fill="#0f172a" stroke="#fb923c" strokeWidth="1.5" rx="4" />
          <text x="780" y="95" textAnchor="middle" fill="#fb923c" fontSize="9">TO</text>
          <text x="780" y="108" textAnchor="middle" fill="#fb923c" fontSize="9">CRYOCOOLER</text>
          <text x="675" y="90" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">~180K</text>
          <text x="675" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">(-93°C)</text>
          
          {/* Cold inlet (boil-off from Dewar) */}
          <line x1="750" y1="200" x2="600" y2="200" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowCold)" />
          <rect x="750" y="180" width="60" height="40" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" rx="4" />
          <text x="780" y="195" textAnchor="middle" fill="#22d3ee" fontSize="9">BOIL-OFF</text>
          <text x="780" y="208" textAnchor="middle" fill="#22d3ee" fontSize="9">FROM DEWAR</text>
          <text x="675" y="190" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">77K</text>
          <text x="675" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">(-196°C)</text>
          
          {/* Warm exhaust (to vent) */}
          <line x1="200" y1="200" x2="50" y2="200" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#arrowOrange)" />
          <rect x="0" y="180" width="60" height="40" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
          <text x="30" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9">EXHAUST</text>
          <text x="30" y="208" textAnchor="middle" fill="#94a3b8" fontSize="9">TO VENT</text>
          <text x="125" y="190" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">~250K</text>
          <text x="125" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">(-23°C)</text>
          
          {/* Heat transfer arrows */}
          <g transform="translate(400, 150)">
            <path d="M-60,0 L60,0" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,3" />
            <path d="M-40,-15 L-40,15" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M0,-15 L0,15" stroke="#fbbf24" strokeWidth="1.5" />
            <path d="M40,-15 L40,15" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="0" y="-25" textAnchor="middle" fill="#fbbf24" fontSize="9">HEAT TRANSFER</text>
          </g>
          
          {/* Flow direction indicators */}
          <text x="400" y="95" textAnchor="middle" fill="#dc2626" fontSize="10">HOT N₂ →</text>
          <text x="400" y="210" textAnchor="middle" fill="#22d3ee" fontSize="10">← COLD N₂</text>
        </g>

        {/* ============ ENERGY BALANCE ============ */}
        <g transform="translate(50, 380)">
          <text x="0" y="0" fill="#4ade80" fontSize="13" fontWeight="bold">ENERGY BALANCE</text>
          <line x1="0" y1="8" x2="150" y2="8" stroke="#4ade80" strokeWidth="1" />
          
          <rect x="0" y="20" width="380" height="180" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          
          {/* Without recuperator */}
          <text x="15" y="45" fill="#dc2626" fontSize="11" fontWeight="bold">WITHOUT RECUPERATOR:</text>
          <text x="25" y="65" fill="#94a3b8" fontSize="10">• Inlet: 300K → 77K (ΔT = 223K)</text>
          <text x="25" y="82" fill="#94a3b8" fontSize="10">• Full cooling load on cryocooler</text>
          <text x="25" y="99" fill="#fca5a5" fontSize="10">• Power: ~1.15 kW for 10 L/day</text>
          
          {/* Divider */}
          <line x1="15" y1="115" x2="365" y2="115" stroke="#2a3f5f" strokeWidth="1" />
          
          {/* With recuperator */}
          <text x="15" y="135" fill="#4ade80" fontSize="11" fontWeight="bold">WITH RECUPERATOR:</text>
          <text x="25" y="155" fill="#94a3b8" fontSize="10">• Inlet pre-cooled: 300K → 180K (free!)</text>
          <text x="25" y="172" fill="#94a3b8" fontSize="10">• Cryocooler: 180K → 77K (ΔT = 103K)</text>
          <text x="25" y="189" fill="#4ade80" fontSize="10">• Power: ~0.75 kW for 10 L/day (35% less!)</text>
        </g>

        {/* ============ SPECIFICATIONS ============ */}
        <g transform="translate(470, 380)">
          <text x="0" y="0" fill="#60a5fa" fontSize="13" fontWeight="bold">RECUPERATOR SPECS</text>
          <line x1="0" y1="8" x2="170" y2="8" stroke="#60a5fa" strokeWidth="1" />
          
          <rect x="0" y="20" width="380" height="180" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          
          {[
            ['Type', 'Counter-flow, finned tube'],
            ['Effectiveness', '80-85%'],
            ['Hot Side Flow', '~5 LPM N₂ gas'],
            ['Cold Side Flow', '~5 LPM N₂ boil-off'],
            ['Material', 'SS 304L / Copper fins'],
            ['Insulation', 'Vacuum jacket or perlite'],
            ['Pressure Drop', '<0.1 bar per side'],
          ].map((row, i) => (
            <g key={i}>
              <text x="15" y={45 + i * 22} fill="#94a3b8" fontSize="10">{row[0]}:</text>
              <text x="150" y={45 + i * 22} fill="#e2e8f0" fontSize="10" fontWeight="bold">{row[1]}</text>
            </g>
          ))}
        </g>

        {/* Footer */}
        <line x1="10" y1="580" x2="890" y2="580" stroke="#2a3f5f" strokeWidth="1" />
        <text x="20" y="593" fill="#64748b" fontSize="9">
          DOCUMENT: AMR-RECUP-001 | REV: A | DATE: 2025-11-28 | EFFICIENCY GAIN: 35%
        </text>
        <text x="880" y="593" textAnchor="end" fill="#64748b" fontSize="9">
          SHEET 4 OF 4
        </text>
      </svg>
    </div>
  );
};

export default HeatRecuperatorDiagram;
