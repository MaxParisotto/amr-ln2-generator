import React from 'react';

const DewarBlueprint: React.FC = () => {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 900 800"
        className="w-full h-auto rounded"
        style={{ fontFamily: 'monospace' }}
      >
        <defs>
          {/* Blueprint grid pattern */}
          <pattern id="dewarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5" />
          </pattern>
          <pattern id="dewarGridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3a5070" strokeWidth="1" />
          </pattern>
          
          {/* Insulation pattern */}
          <pattern id="insulationPattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="#374151" />
          </pattern>
          
          {/* LN2 gradient */}
          <linearGradient id="ln2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Vacuum gradient */}
          <linearGradient id="vacuumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          
          {/* Steel gradient */}
          <linearGradient id="steelGradientDewar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="30%" stopColor="#9ca3af" />
            <stop offset="70%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          
          {/* Arrow markers */}
          <marker id="arrowCyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#22d3ee" />
          </marker>
        </defs>
        
        {/* Background */}
        <rect width="900" height="800" fill="#1a2744" />
        <rect width="900" height="800" fill="url(#dewarGrid)" />
        <rect width="900" height="800" fill="url(#dewarGridLarge)" />
        
        {/* Title Block */}
        <rect x="10" y="10" width="880" height="50" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <text x="450" y="32" textAnchor="middle" fill="#22d3ee" fontSize="16" fontWeight="bold">
          50L PRESSURIZED DEWAR STORAGE SYSTEM
        </text>
        <text x="450" y="48" textAnchor="middle" fill="#94a3b8" fontSize="11">
          VACUUM-INSULATED CRYOGENIC VESSEL WITH INTEGRATED PRESSURE CONTROL
        </text>

        {/* ============ MAIN CROSS-SECTION VIEW ============ */}
        <text x="30" y="90" fill="#22d3ee" fontSize="13" fontWeight="bold">
          CROSS-SECTION VIEW
        </text>
        <line x1="30" y1="98" x2="200" y2="98" stroke="#22d3ee" strokeWidth="1" />
        
        <g transform="translate(80, 120)">
          {/* Outer vessel */}
          <path
            d="M50,0 L250,0 L250,450 Q250,500 200,500 L100,500 Q50,500 50,450 Z"
            fill="url(#steelGradientDewar)"
            stroke="#94a3b8"
            strokeWidth="3"
          />
          
          {/* Vacuum space */}
          <path
            d="M65,15 L235,15 L235,435 Q235,475 195,475 L105,475 Q65,475 65,435 Z"
            fill="url(#vacuumGradient)"
            stroke="#4b5563"
            strokeWidth="1"
          />
          
          {/* MLI layers representation */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${75 + i * 8},${25 + i * 5} L${225 - i * 8},${25 + i * 5} L${225 - i * 8},${425 - i * 5} Q${225 - i * 8},${460 - i * 6} ${190 - i * 5},${460 - i * 6} L${110 + i * 5},${460 - i * 6} Q${75 + i * 8},${460 - i * 6} ${75 + i * 8},${425 - i * 5} Z`}
              fill="none"
              stroke="#475569"
              strokeWidth="0.5"
              strokeDasharray="5,3"
            />
          ))}
          <text x="150" y="80" textAnchor="middle" fill="#64748b" fontSize="9">
            VACUUM + MLI
          </text>
          <text x="150" y="92" textAnchor="middle" fill="#64748b" fontSize="8">
            (20-30 layers)
          </text>
          
          {/* Inner vessel */}
          <path
            d="M115,100 L185,100 L185,400 Q185,430 165,430 L135,430 Q115,430 115,400 Z"
            fill="#1e293b"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          
          {/* LN2 level (80% full) */}
          <path
            d="M117,160 L183,160 L183,400 Q183,428 165,428 L135,428 Q117,428 117,400 Z"
            fill="url(#ln2Gradient)"
            stroke="none"
          />
          
          {/* Level indicator marks */}
          {[100, 75, 50, 25].map((pct) => {
            const y = 120 + (310 * (100 - pct) / 100);
            return (
              <g key={pct}>
                <line x1="108" y1={y} x2="115" y2={y} stroke="#22d3ee" strokeWidth="1" />
                <text x="103" y={y + 3} textAnchor="end" fill="#22d3ee" fontSize="8">{pct}%</text>
              </g>
            );
          })}
          
          {/* Gas space */}
          <text x="150" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">N₂ GAS</text>
          <text x="150" y="147" textAnchor="middle" fill="#94a3b8" fontSize="8">2-4 bar</text>
          
          {/* LN2 label */}
          <text x="150" y="300" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">LN₂</text>
          <text x="150" y="315" textAnchor="middle" fill="#22d3ee" fontSize="9">50 LITERS</text>
          <text x="150" y="328" textAnchor="middle" fill="#22d3ee" fontSize="8">77K (-196°C)</text>
          
          {/* Top flange */}
          <rect x="30" y="-20" width="240" height="25" fill="url(#steelGradientDewar)" stroke="#94a3b8" strokeWidth="2" rx="3" />
          
          {/* Port connections on top */}
          {/* Fill port */}
          <rect x="70" y="-45" width="30" height="30" fill="#4b5563" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="75" y="-60" width="20" height="20" fill="#374151" stroke="#94a3b8" strokeWidth="1" />
          <text x="85" y="-70" textAnchor="middle" fill="#4ade80" fontSize="8">FILL</text>
          
          {/* Pressure relief */}
          <rect x="120" y="-45" width="25" height="30" fill="#4b5563" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M125,-50 L140,-50 L140,-40 L125,-40 Z" fill="#dc2626" stroke="#fca5a5" strokeWidth="1" />
          <text x="132" y="-55" textAnchor="middle" fill="#fca5a5" fontSize="7">PRV</text>
          <text x="132" y="-70" textAnchor="middle" fill="#fca5a5" fontSize="8">4.5 bar</text>
          
          {/* Pressure gauge */}
          <rect x="155" y="-45" width="25" height="30" fill="#4b5563" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="167" cy="-55" r="12" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="167" y="-52" textAnchor="middle" fill="#60a5fa" fontSize="7">P</text>
          <text x="167" y="-70" textAnchor="middle" fill="#60a5fa" fontSize="8">GAUGE</text>
          
          {/* Vent valve */}
          <rect x="190" y="-45" width="25" height="30" fill="#4b5563" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M195,-45 L210,-45 L202,-35 Z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" />
          <text x="202" y="-70" textAnchor="middle" fill="#fbbf24" fontSize="8">VENT</text>
          
          {/* Dimensions */}
          <line x1="270" y1="-20" x2="270" y2="500" stroke="#60a5fa" strokeWidth="0.5" />
          <line x1="265" y1="-20" x2="275" y2="-20" stroke="#60a5fa" strokeWidth="0.5" />
          <line x1="265" y1="500" x2="275" y2="500" stroke="#60a5fa" strokeWidth="0.5" />
          <text x="285" y="250" fill="#60a5fa" fontSize="10" transform="rotate(90, 285, 250)">650mm</text>
          
          <line x1="30" y1="520" x2="270" y2="520" stroke="#60a5fa" strokeWidth="0.5" />
          <line x1="30" y1="515" x2="30" y2="525" stroke="#60a5fa" strokeWidth="0.5" />
          <line x1="270" y1="515" x2="270" y2="525" stroke="#60a5fa" strokeWidth="0.5" />
          <text x="150" y="535" textAnchor="middle" fill="#60a5fa" fontSize="10">Ø350mm (outer)</text>
          
          {/* Wall thickness callout */}
          <line x1="50" y1="250" x2="115" y2="250" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="82" y="265" textAnchor="middle" fill="#fbbf24" fontSize="8">30mm gap</text>
        </g>

        {/* ============ SPECIFICATIONS TABLE ============ */}
        <g transform="translate(450, 90)">
          <text x="0" y="0" fill="#22d3ee" fontSize="13" fontWeight="bold">SPECIFICATIONS</text>
          <line x1="0" y1="8" x2="150" y2="8" stroke="#22d3ee" strokeWidth="1" />
          
          <rect x="0" y="20" width="400" height="280" fill="none" stroke="#2a3f5f" strokeWidth="1" />
          
          {/* Table header */}
          <rect x="0" y="20" width="400" height="25" fill="#0f172a" />
          <text x="15" y="37" fill="#22d3ee" fontSize="10" fontWeight="bold">PARAMETER</text>
          <text x="200" y="37" fill="#22d3ee" fontSize="10" fontWeight="bold">VALUE</text>
          
          {/* Table rows */}
          {[
            ['Capacity', '50 L liquid / 35,000 L gas (STP)'],
            ['Max Working Pressure', '4 bar (58 psi)'],
            ['Relief Valve Setting', '4.5 bar (65 psi)'],
            ['Design Temperature', '77K to 310K'],
            ['Outer Shell Material', 'SS 304L, 2mm thick'],
            ['Inner Vessel Material', 'SS 304L, 1.5mm thick'],
            ['Insulation Type', 'Vacuum + 25-layer MLI'],
            ['Static Hold Time', '>30 days to 50% loss'],
            ['Evaporation Rate', '<1.5% per day (static)'],
            ['Empty Weight', '~25 kg'],
            ['Full Weight', '~65 kg (with 50L LN₂)'],
          ].map((row, i) => (
            <g key={i}>
              <line x1="0" y1={45 + i * 23} x2="400" y2={45 + i * 23} stroke="#2a3f5f" strokeWidth="0.5" />
              <text x="15" y={60 + i * 23} fill="#94a3b8" fontSize="10">{row[0]}</text>
              <text x="200" y={60 + i * 23} fill="#e2e8f0" fontSize="10" fontWeight="bold">{row[1]}</text>
            </g>
          ))}
        </g>

        {/* ============ PRESSURE BUILD-UP DIAGRAM ============ */}
        <g transform="translate(450, 400)">
          <text x="0" y="0" fill="#22d3ee" fontSize="13" fontWeight="bold">PRESSURE BUILD-UP SYSTEM</text>
          <line x1="0" y1="8" x2="220" y2="8" stroke="#22d3ee" strokeWidth="1" />
          
          {/* Simple schematic */}
          <rect x="0" y="30" width="400" height="160" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          
          {/* Dewar icon */}
          <ellipse cx="60" cy="110" rx="35" ry="50" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <ellipse cx="60" cy="110" rx="25" ry="40" fill="url(#ln2Gradient)" stroke="#22d3ee" strokeWidth="1" />
          <text x="60" y="115" textAnchor="middle" fill="#22d3ee" fontSize="10">LN₂</text>
          
          {/* Pressure coil */}
          <path
            d="M95,90 L130,90 L130,70 L160,70 L160,90 L160,70 L190,70 L190,90 L190,70 L220,70"
            fill="none"
            stroke="#fb923c"
            strokeWidth="2"
          />
          <text x="175" y="60" textAnchor="middle" fill="#fb923c" fontSize="9">PRESSURE COIL</text>
          <text x="175" y="95" textAnchor="middle" fill="#94a3b8" fontSize="8">(ambient heat)</text>
          
          {/* Valve */}
          <path d="M220,65 L230,70 L220,75 Z" fill="#4ade80" stroke="#4ade80" strokeWidth="1" />
          <rect x="230" y="65" width="15" height="10" fill="#374151" stroke="#4ade80" strokeWidth="1" />
          <text x="237" y="58" textAnchor="middle" fill="#4ade80" fontSize="8">PBU</text>
          
          {/* Return to gas space */}
          <path
            d="M245,70 L280,70 L280,110 L95,110"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="5,3"
            markerEnd="url(#arrowCyan)"
          />
          <text x="290" y="95" fill="#94a3b8" fontSize="8">TO GAS</text>
          <text x="290" y="105" fill="#94a3b8" fontSize="8">SPACE</text>
          
          {/* Liquid withdrawal */}
          <line x1="60" y1="160" x2="60" y2="200" stroke="#22d3ee" strokeWidth="2" />
          <path d="M55,195 L60,205 L65,195 Z" fill="#22d3ee" />
          <rect x="45" y="175" width="30" height="10" fill="#374151" stroke="#4ade80" strokeWidth="1" />
          <text x="60" y="220" textAnchor="middle" fill="#22d3ee" fontSize="9">LN₂ OUT</text>
          
          {/* Legend */}
          <text x="320" y="140" fill="#94a3b8" fontSize="9">Self-pressurizing:</text>
          <text x="320" y="155" fill="#94a3b8" fontSize="8">• No external pump needed</text>
          <text x="320" y="168" fill="#94a3b8" fontSize="8">• Uses LN₂ boil-off</text>
          <text x="320" y="181" fill="#94a3b8" fontSize="8">• Auto-regulates to 2-4 bar</text>
        </g>

        {/* ============ SAFETY FEATURES ============ */}
        <g transform="translate(450, 590)">
          <text x="0" y="0" fill="#dc2626" fontSize="13" fontWeight="bold">⚠ SAFETY FEATURES</text>
          <line x1="0" y1="8" x2="180" y2="8" stroke="#dc2626" strokeWidth="1" />
          
          <rect x="0" y="20" width="400" height="100" fill="#0f172a" stroke="#dc2626" strokeWidth="1" rx="4" />
          
          <text x="15" y="45" fill="#fca5a5" fontSize="10">• Pressure Relief Valve (PRV) at 4.5 bar - prevents over-pressure</text>
          <text x="15" y="62" fill="#fca5a5" fontSize="10">• Burst Disc at 6 bar - secondary protection</text>
          <text x="15" y="79" fill="#fca5a5" fontSize="10">• Vacuum loss indicator - monitors insulation integrity</text>
          <text x="15" y="96" fill="#fca5a5" fontSize="10">• O₂ monitor required in enclosed spaces - asphyxiation hazard</text>
          <text x="15" y="113" fill="#fbbf24" fontSize="10">⚡ Ground vessel to prevent static discharge during fills</text>
        </g>

        {/* ============ INTEGRATION NOTES ============ */}
        <g transform="translate(30, 660)">
          <text x="0" y="0" fill="#4ade80" fontSize="13" fontWeight="bold">INTEGRATION WITH AMR SYSTEM</text>
          <line x1="0" y1="8" x2="260" y2="8" stroke="#4ade80" strokeWidth="1" />
          
          <rect x="0" y="20" width="400" height="100" fill="#0f172a" stroke="#4ade80" strokeWidth="1" rx="4" />
          
          <text x="15" y="42" fill="#94a3b8" fontSize="10">• Direct connection to cryocooler cold tip via vacuum-jacketed line</text>
          <text x="15" y="59" fill="#94a3b8" fontSize="10">• Continuous fill mode - no batch transfers needed</text>
          <text x="15" y="76" fill="#94a3b8" fontSize="10">• Back-pressure from Dewar helps maintain cold tip stability</text>
          <text x="15" y="93" fill="#94a3b8" fontSize="10">• Level sensor triggers low-level alarm at 20% remaining</text>
          <text x="15" y="110" fill="#22d3ee" fontSize="10">→ System produces 10-50 L/day directly into storage</text>
        </g>

        {/* Footer */}
        <line x1="10" y1="780" x2="890" y2="780" stroke="#2a3f5f" strokeWidth="1" />
        <text x="20" y="793" fill="#64748b" fontSize="9">
          DOCUMENT: AMR-DEWAR-001 | REV: A | DATE: 2025-11-28 | CAPACITY: 50L | MAWP: 4 bar
        </text>
        <text x="880" y="793" textAnchor="end" fill="#64748b" fontSize="9">
          SHEET 3 OF 4
        </text>
      </svg>
    </div>
  );
};

export default DewarBlueprint;
