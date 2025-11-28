import React from 'react';

const AMRMagnetBlueprint: React.FC = () => {
  return (
    <div className="my-8">
      <h4 className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
        AMR Magnet Assembly Blueprint
      </h4>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto bg-[#1a2744] rounded-xl border border-slate-700 shadow-xl"
        style={{ fontFamily: 'monospace' }}
      >
        <defs>
          {/* Blueprint grid pattern */}
          <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5" />
          </pattern>
          <pattern id="blueprintGridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3a5070" strokeWidth="1" />
          </pattern>
          
          {/* Magnet gradient - N pole */}
          <linearGradient id="nPoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          
          {/* Magnet gradient - S pole */}
          <linearGradient id="sPoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          
          {/* Steel yoke */}
          <linearGradient id="steelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          
          {/* MCM bed */}
          <linearGradient id="mcmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          
          {/* Arrow marker */}
          <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
          </marker>
          <marker id="arrowWhite" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#94a3b8" />
          </marker>
        </defs>
        
        {/* Background grid */}
        <rect width="800" height="600" fill="url(#blueprintGrid)" />
        <rect width="800" height="600" fill="url(#blueprintGridLarge)" />
        
        {/* Title block */}
        <rect x="10" y="10" width="780" height="50" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <text x="400" y="42" textAnchor="middle" fill="#60a5fa" fontSize="20" fontWeight="bold">
          HALBACH ARRAY AMR MAGNET ASSEMBLY
        </text>
        <text x="770" y="35" textAnchor="end" fill="#94a3b8" fontSize="10">
          SCALE: NTS | REV: A
        </text>
        
        {/* ============ TOP VIEW - Halbach Array ============ */}
        <text x="200" y="90" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">
          TOP VIEW - HALBACH ARRAY CONFIGURATION
        </text>
        
        {/* Outer ring (steel yoke) */}
        <circle cx="200" cy="200" r="95" fill="url(#steelGrad)" stroke="#94a3b8" strokeWidth="1" />
        <circle cx="200" cy="200" r="95" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,2" />
        
        {/* Halbach magnets - 8 segment configuration */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const innerR = 45;
          const outerR = 85;
          const cx = 200;
          const cy = 200;
          
          // Magnet segment
          const x1 = cx + innerR * Math.cos(rad - 0.35);
          const y1 = cy + innerR * Math.sin(rad - 0.35);
          const x2 = cx + outerR * Math.cos(rad - 0.35);
          const y2 = cy + outerR * Math.sin(rad - 0.35);
          const x3 = cx + outerR * Math.cos(rad + 0.35);
          const y3 = cy + outerR * Math.sin(rad + 0.35);
          const x4 = cx + innerR * Math.cos(rad + 0.35);
          const y4 = cy + innerR * Math.sin(rad + 0.35);
          
          // Magnetization direction arrow
          const arrowAngle = angle + (i % 2 === 0 ? 0 : 90);
          const arrowRad = (arrowAngle * Math.PI) / 180;
          const midR = (innerR + outerR) / 2;
          const arrowCx = cx + midR * Math.cos(rad);
          const arrowCy = cy + midR * Math.sin(rad);
          const arrowLen = 12;
          
          return (
            <g key={angle}>
              <path
                d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`}
                fill={i % 2 === 0 ? 'url(#nPoleGrad)' : 'url(#sPoleGrad)'}
                stroke="#1a2744"
                strokeWidth="1"
              />
              {/* Magnetization direction */}
              <line
                x1={arrowCx - arrowLen * Math.cos(arrowRad)}
                y1={arrowCy - arrowLen * Math.sin(arrowRad)}
                x2={arrowCx + arrowLen * Math.cos(arrowRad)}
                y2={arrowCy + arrowLen * Math.sin(arrowRad)}
                stroke="white"
                strokeWidth="2"
                markerEnd="url(#arrowWhite)"
              />
            </g>
          );
        })}
        
        {/* Center bore (MCM bed location) */}
        <circle cx="200" cy="200" r="40" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="200" cy="200" r="35" fill="url(#mcmGrad)" stroke="#34d399" strokeWidth="1" />
        <text x="200" y="195" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MCM</text>
        <text x="200" y="207" textAnchor="middle" fill="white" fontSize="9">BED</text>
        
        {/* Dimension lines */}
        <line x1="200" y1="300" x2="200" y2="320" stroke="#60a5fa" strokeWidth="1" />
        <line x1="105" y1="200" x2="105" y2="320" stroke="#60a5fa" strokeWidth="1" />
        <line x1="295" y1="200" x2="295" y2="320" stroke="#60a5fa" strokeWidth="1" />
        <line x1="105" y1="315" x2="295" y2="315" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arrowBlue)" markerStart="url(#arrowBlue)" />
        <text x="200" y="330" textAnchor="middle" fill="#60a5fa" fontSize="11">Ø190mm OUTER</text>
        
        <line x1="160" y1="200" x2="130" y2="170" stroke="#60a5fa" strokeWidth="1" />
        <text x="115" y="165" textAnchor="end" fill="#60a5fa" fontSize="10">Ø70mm BORE</text>
        
        {/* Legend */}
        <rect x="320" y="110" width="15" height="15" fill="url(#nPoleGrad)" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="340" y="122" fill="#94a3b8" fontSize="10">N-pole (outward)</text>
        <rect x="320" y="130" width="15" height="15" fill="url(#sPoleGrad)" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="340" y="142" fill="#94a3b8" fontSize="10">S-pole (tangential)</text>
        <rect x="320" y="150" width="15" height="15" fill="url(#mcmGrad)" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="340" y="162" fill="#94a3b8" fontSize="10">MCM Regenerator Bed</text>
        <rect x="320" y="170" width="15" height="15" fill="url(#steelGrad)" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="340" y="182" fill="#94a3b8" fontSize="10">Low-carbon Steel Yoke</text>
        
        {/* Field concentration note */}
        <text x="200" y="255" textAnchor="middle" fill="#fbbf24" fontSize="10" fontStyle="italic">
          Peak field: 1.5-2.0 T at center
        </text>
        
        {/* ============ SIDE VIEW - Cross Section ============ */}
        <text x="600" y="90" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SIDE VIEW - CROSS SECTION A-A
        </text>
        
        {/* Steel housing */}
        <rect x="480" y="120" width="240" height="180" fill="url(#steelGrad)" stroke="#60a5fa" strokeWidth="2" />
        
        {/* Top magnet array */}
        <rect x="500" y="130" width="200" height="30" fill="url(#nPoleGrad)" stroke="#1a2744" strokeWidth="1" />
        <text x="600" y="150" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NdFeB N52</text>
        
        {/* Bottom magnet array */}
        <rect x="500" y="260" width="200" height="30" fill="url(#sPoleGrad)" stroke="#1a2744" strokeWidth="1" />
        <text x="600" y="280" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">NdFeB N52</text>
        
        {/* Gap / MCM bed area */}
        <rect x="500" y="165" width="200" height="90" fill="#0f172a" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4,2" />
        
        {/* MCM bed */}
        <rect x="520" y="185" width="160" height="50" fill="url(#mcmGrad)" stroke="#34d399" strokeWidth="2" rx="4" />
        <text x="600" y="205" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MAGNETOCALORIC</text>
        <text x="600" y="218" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MATERIAL BED</text>
        <text x="600" y="230" textAnchor="middle" fill="#a7f3d0" fontSize="8">(Gd / LaFeSi / MnFeP)</text>
        
        {/* Fluid channels */}
        <rect x="505" y="195" width="12" height="30" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" rx="2" />
        <rect x="683" y="195" width="12" height="30" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" rx="2" />
        <text x="511" y="240" textAnchor="middle" fill="#7dd3fc" fontSize="7">IN</text>
        <text x="689" y="240" textAnchor="middle" fill="#7dd3fc" fontSize="7">OUT</text>
        
        {/* Magnetic field lines */}
        <path d="M 540 160 Q 540 210 540 260" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 580 160 Q 580 210 580 260" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 620 160 Q 620 210 620 260" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 660 160 Q 660 210 660 260" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" />
        <text x="735" y="215" fill="#fbbf24" fontSize="9">B-field</text>
        
        {/* Side dimensions */}
        <line x1="460" y1="120" x2="460" y2="300" stroke="#60a5fa" strokeWidth="1" />
        <line x1="455" y1="120" x2="475" y2="120" stroke="#60a5fa" strokeWidth="1" />
        <line x1="455" y1="300" x2="475" y2="300" stroke="#60a5fa" strokeWidth="1" />
        <text x="450" y="215" textAnchor="middle" fill="#60a5fa" fontSize="10" transform="rotate(-90, 450, 215)">180mm</text>
        
        <line x1="500" y1="310" x2="700" y2="310" stroke="#60a5fa" strokeWidth="1" />
        <line x1="500" y1="305" x2="500" y2="315" stroke="#60a5fa" strokeWidth="1" />
        <line x1="700" y1="305" x2="700" y2="315" stroke="#60a5fa" strokeWidth="1" />
        <text x="600" y="325" textAnchor="middle" fill="#60a5fa" fontSize="10">200mm</text>
        
        {/* Gap dimension */}
        <line x1="720" y1="165" x2="750" y2="165" stroke="#60a5fa" strokeWidth="1" />
        <line x1="720" y1="255" x2="750" y2="255" stroke="#60a5fa" strokeWidth="1" />
        <line x1="745" y1="165" x2="745" y2="255" stroke="#60a5fa" strokeWidth="1" />
        <text x="760" y="215" fill="#60a5fa" fontSize="9">90mm</text>
        <text x="760" y="225" fill="#60a5fa" fontSize="8">GAP</text>
        
        {/* ============ DETAIL VIEW - Regenerator Bed ============ */}
        <text x="200" y="380" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">
          DETAIL B - MCM REGENERATOR BED
        </text>
        
        {/* Bed housing */}
        <rect x="80" y="400" width="240" height="100" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" rx="4" />
        
        {/* Packed spheres representation */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(row => (
          <g key={row}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(col => {
              const offset = row % 2 === 0 ? 0 : 7;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={95 + col * 14 + offset}
                  cy={415 + row * 10}
                  r="5"
                  fill="url(#mcmGrad)"
                  stroke="#059669"
                  strokeWidth="0.5"
                  opacity="0.9"
                />
              );
            })}
          </g>
        ))}
        
        {/* Flow arrows */}
        <path d="M 60 450 L 80 450" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrowBlue)" />
        <path d="M 320 450 L 340 450" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrowBlue)" />
        <text x="50" y="445" textAnchor="end" fill="#7dd3fc" fontSize="10">HTF</text>
        <text x="350" y="445" fill="#7dd3fc" fontSize="10">HTF</text>
        
        {/* Bed specs */}
        <text x="200" y="520" textAnchor="middle" fill="#94a3b8" fontSize="10">
          Packed sphere bed: 0.2-0.5mm spheres | Porosity: 36-40%
        </text>
        <text x="200" y="535" textAnchor="middle" fill="#94a3b8" fontSize="10">
          Heat Transfer Fluid: Water/Glycol or Helium gas
        </text>
        
        {/* ============ SPECS TABLE ============ */}
        <text x="600" y="380" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SPECIFICATIONS
        </text>
        
        <rect x="450" y="395" width="300" height="180" fill="none" stroke="#60a5fa" strokeWidth="1" />
        
        {/* Table rows */}
        {[
          ['Magnet Material', 'NdFeB N52 (Sintered)'],
          ['Remanence (Br)', '1.42 - 1.47 T'],
          ['Coercivity (Hcj)', '≥ 876 kA/m'],
          ['Max Operating Temp', '80°C (176°F)'],
          ['Array Configuration', '8-segment Halbach'],
          ['Bore Field Strength', '1.5 - 2.0 Tesla'],
          ['Yoke Material', 'Low-carbon Steel 1018'],
          ['Total Weight (est.)', '15 - 25 kg'],
        ].map((row, i) => (
          <g key={i}>
            <line x1="450" y1={415 + i * 20} x2="750" y2={415 + i * 20} stroke="#3a5070" strokeWidth="0.5" />
            <text x="460" y={430 + i * 20} fill="#94a3b8" fontSize="10">{row[0]}</text>
            <text x="740" y={430 + i * 20} textAnchor="end" fill="#e2e8f0" fontSize="10" fontWeight="bold">{row[1]}</text>
          </g>
        ))}
        
        {/* Footer notes */}
        <line x1="10" y1="580" x2="790" y2="580" stroke="#3a5070" strokeWidth="1" />
        <text x="20" y="594" fill="#64748b" fontSize="9">
          NOTES: 1. All dimensions in millimeters unless noted. 2. Magnet handling requires safety protocols. 3. Assembly in magnetically shielded environment.
        </text>
      </svg>
    </div>
  );
};

export default AMRMagnetBlueprint;
