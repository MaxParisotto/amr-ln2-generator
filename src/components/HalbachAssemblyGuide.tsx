import React from 'react';

const HalbachAssemblyGuide: React.FC = () => {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 900 1400"
        className="w-full h-auto rounded"
        style={{ fontFamily: 'monospace' }}
      >
        <defs>
          {/* Blueprint grid pattern */}
          <pattern id="guideGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a3f5f" strokeWidth="0.5" />
          </pattern>
          <pattern id="guideGridLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#3a5070" strokeWidth="1" />
          </pattern>
          
          {/* Magnet gradients */}
          <linearGradient id="nPoleGuide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="sPoleGuide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="steelGuide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          
          {/* Arrow markers */}
          <marker id="arrowGuide" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
          </marker>
          <marker id="arrowWhiteGuide" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="white" />
          </marker>
        </defs>
        
        {/* Background */}
        <rect width="900" height="1400" fill="#1a2744" />
        <rect width="900" height="1400" fill="url(#guideGrid)" />
        <rect width="900" height="1400" fill="url(#guideGridLarge)" />
        
        {/* Title Block */}
        <rect x="10" y="10" width="880" height="60" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <text x="450" y="35" textAnchor="middle" fill="#60a5fa" fontSize="18" fontWeight="bold">
          HALBACH ARRAY ASSEMBLY GUIDE
        </text>
        <text x="450" y="55" textAnchor="middle" fill="#94a3b8" fontSize="12">
          8-SEGMENT PERMANENT MAGNET CONFIGURATION FOR AMR CRYOCOOLER
        </text>
        <text x="870" y="55" textAnchor="end" fill="#64748b" fontSize="10">
          SHEET 2 OF 2
        </text>

        {/* ============ SECTION 1: PARTS LIST ============ */}
        <text x="30" y="100" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SECTION 1: PARTS LIST &amp; MATERIALS
        </text>
        <line x1="30" y1="108" x2="400" y2="108" stroke="#60a5fa" strokeWidth="1" />
        
        {/* Parts table */}
        <rect x="30" y="120" width="420" height="200" fill="none" stroke="#2a3f5f" strokeWidth="1" />
        
        {/* Table header */}
        <rect x="30" y="120" width="420" height="25" fill="#0f172a" />
        <text x="50" y="137" fill="#60a5fa" fontSize="10" fontWeight="bold">ITEM</text>
        <text x="120" y="137" fill="#60a5fa" fontSize="10" fontWeight="bold">DESCRIPTION</text>
        <text x="300" y="137" fill="#60a5fa" fontSize="10" fontWeight="bold">QTY</text>
        <text x="350" y="137" fill="#60a5fa" fontSize="10" fontWeight="bold">MATERIAL</text>
        
        {/* Table rows */}
        {[
          ['1', 'Radial Magnet Segment', '4', 'NdFeB N52'],
          ['2', 'Tangential Magnet Segment', '4', 'NdFeB N52'],
          ['3', 'Outer Steel Yoke Ring', '1', 'Steel 1018'],
          ['4', 'Inner Bore Sleeve', '1', 'AL-6061-T6'],
          ['5', 'End Plates', '2', 'AL-6061-T6'],
          ['6', 'Epoxy Adhesive', '1', '3M DP420 or equiv.'],
          ['7', 'Assembly Jig (reusable)', '1', 'HDPE/Delrin'],
        ].map((row, i) => (
          <g key={i}>
            <line x1="30" y1={145 + i * 25} x2="450" y2={145 + i * 25} stroke="#2a3f5f" strokeWidth="0.5" />
            <text x="50" y={160 + i * 25} fill="#e2e8f0" fontSize="10">{row[0]}</text>
            <text x="120" y={160 + i * 25} fill="#94a3b8" fontSize="10">{row[1]}</text>
            <text x="310" y={160 + i * 25} fill="#22d3ee" fontSize="10" fontWeight="bold">{row[2]}</text>
            <text x="350" y={160 + i * 25} fill="#94a3b8" fontSize="10">{row[3]}</text>
          </g>
        ))}
        
        {/* Magnet Segment Details */}
        <g transform="translate(480, 120)">
          <text x="0" y="0" fill="#60a5fa" fontSize="12" fontWeight="bold">MAGNET SEGMENT DIMENSIONS</text>
          <line x1="0" y1="8" x2="200" y2="8" stroke="#60a5fa" strokeWidth="0.5" />
          
          {/* Radial segment drawing */}
          <g transform="translate(20, 30)">
            <path 
              d="M0,0 L60,0 L70,50 L-10,50 Z" 
              fill="url(#nPoleGuide)" 
              stroke="#fca5a5" 
              strokeWidth="1"
            />
            <text x="30" y="30" textAnchor="middle" fill="white" fontSize="8">RADIAL</text>
            
            {/* Dimensions */}
            <line x1="-20" y1="0" x2="-20" y2="50" stroke="#60a5fa" strokeWidth="0.5" />
            <text x="-30" y="28" fill="#60a5fa" fontSize="8" textAnchor="middle" transform="rotate(-90, -30, 28)">40mm</text>
            
            <line x1="0" y1="60" x2="60" y2="60" stroke="#60a5fa" strokeWidth="0.5" />
            <text x="30" y="72" fill="#60a5fa" fontSize="8" textAnchor="middle">45mm</text>
            
            {/* Magnetization arrow */}
            <line x1="30" y1="55" x2="30" y2="0" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhiteGuide)" />
          </g>
          
          {/* Tangential segment drawing */}
          <g transform="translate(130, 30)">
            <path 
              d="M0,0 L60,0 L70,50 L-10,50 Z" 
              fill="url(#sPoleGuide)" 
              stroke="#93c5fd" 
              strokeWidth="1"
            />
            <text x="30" y="30" textAnchor="middle" fill="white" fontSize="8">TANG.</text>
            
            {/* Magnetization arrow - horizontal */}
            <line x1="0" y1="25" x2="60" y2="25" stroke="white" strokeWidth="2" markerEnd="url(#arrowWhiteGuide)" />
          </g>
          
          <text x="0" y="115" fill="#94a3b8" fontSize="9">Arc span: 45° per segment</text>
          <text x="0" y="130" fill="#94a3b8" fontSize="9">Inner radius: 35mm</text>
          <text x="0" y="145" fill="#94a3b8" fontSize="9">Outer radius: 95mm</text>
          <text x="0" y="160" fill="#fbbf24" fontSize="9">⚠ Tolerance: ±0.1mm</text>
        </g>

        {/* ============ SECTION 2: ASSEMBLY JIG ============ */}
        <text x="30" y="350" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SECTION 2: ASSEMBLY JIG DESIGN
        </text>
        <line x1="30" y1="358" x2="400" y2="358" stroke="#60a5fa" strokeWidth="1" />
        
        {/* Jig top view */}
        <g transform="translate(150, 380)">
          <text x="100" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="10">TOP VIEW - ASSEMBLY JIG</text>
          
          {/* Outer circle (jig body) */}
          <circle cx="100" cy="100" r="110" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
          
          {/* Guide slots for magnets */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const innerR = 40;
            const outerR = 100;
            const cx = 100;
            const cy = 100;
            
            const x1 = cx + innerR * Math.cos(rad - 0.3);
            const y1 = cy + innerR * Math.sin(rad - 0.3);
            const x2 = cx + outerR * Math.cos(rad - 0.3);
            const y2 = cy + outerR * Math.sin(rad - 0.3);
            const x3 = cx + outerR * Math.cos(rad + 0.3);
            const y3 = cy + outerR * Math.sin(rad + 0.3);
            const x4 = cx + innerR * Math.cos(rad + 0.3);
            const y4 = cy + innerR * Math.sin(rad + 0.3);
            
            return (
              <g key={angle}>
                <path
                  d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="1"
                  strokeDasharray="3,2"
                />
                <text 
                  x={cx + 75 * Math.cos(rad)} 
                  y={cy + 75 * Math.sin(rad) + 3} 
                  textAnchor="middle" 
                  fill="#4ade80" 
                  fontSize="8"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          
          {/* Center bore */}
          <circle cx="100" cy="100" r="35" fill="#0f172a" stroke="#60a5fa" strokeWidth="1" />
          <text x="100" y="103" textAnchor="middle" fill="#60a5fa" fontSize="8">Ø70mm BORE</text>
          
          {/* Alignment pins */}
          <circle cx="100" cy="15" r="5" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" />
          <circle cx="100" cy="185" r="5" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" />
          <text x="100" y="205" textAnchor="middle" fill="#fbbf24" fontSize="8">ALIGNMENT PINS</text>
        </g>
        
        {/* Jig notes */}
        <g transform="translate(400, 380)">
          <rect x="0" y="0" width="250" height="180" fill="none" stroke="#2a3f5f" strokeWidth="1" />
          <text x="10" y="20" fill="#60a5fa" fontSize="11" fontWeight="bold">JIG NOTES:</text>
          <text x="10" y="40" fill="#94a3b8" fontSize="9">• Material: HDPE or Delrin (non-magnetic)</text>
          <text x="10" y="55" fill="#94a3b8" fontSize="9">• Slot depth: 45mm (full magnet height)</text>
          <text x="10" y="70" fill="#94a3b8" fontSize="9">• Slot clearance: +0.2mm for easy insertion</text>
          <text x="10" y="85" fill="#94a3b8" fontSize="9">• Green dashed lines = magnet slots</text>
          <text x="10" y="100" fill="#94a3b8" fontSize="9">• Numbers indicate insertion sequence</text>
          <text x="10" y="120" fill="#fbbf24" fontSize="9">⚠ CRITICAL: Jig prevents magnets from</text>
          <text x="10" y="135" fill="#fbbf24" fontSize="9">   snapping together during assembly</text>
          <text x="10" y="155" fill="#22d3ee" fontSize="9">TIP: Machine slots 0.5mm deeper than</text>
          <text x="10" y="170" fill="#22d3ee" fontSize="9">     magnet height for epoxy reservoir</text>
        </g>

        {/* ============ SECTION 3: STEP-BY-STEP ASSEMBLY ============ */}
        <text x="30" y="600" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SECTION 3: STEP-BY-STEP ASSEMBLY PROCEDURE
        </text>
        <line x1="30" y1="608" x2="500" y2="608" stroke="#60a5fa" strokeWidth="1" />
        
        {/* Step 1 */}
        <g transform="translate(30, 630)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">1</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">PREPARE STEEL YOKE</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Clean inner surface with isopropyl alcohol</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="10">• Apply thin coat of epoxy primer if required</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Place yoke ring into assembly jig base</text>
          <text x="20" y="90" fill="#94a3b8" fontSize="10">• Verify alignment with locating pins</text>
        </g>
        
        {/* Step 2 */}
        <g transform="translate(450, 630)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">2</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">INSTALL RADIAL MAGNETS (×4)</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Apply epoxy to slot walls in positions 1,3,5,7</text>
          <text x="20" y="60" fill="#dc2626" fontSize="10">• Insert RED (radial) magnets - arrows point OUT</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Press firmly against yoke inner wall</text>
          <text x="20" y="90" fill="#fbbf24" fontSize="10">⚠ Verify N-pole faces outward (use gaussmeter)</text>
        </g>
        
        {/* Step 3 */}
        <g transform="translate(30, 750)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">3</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">INSTALL TANGENTIAL MAGNETS (×4)</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Apply epoxy to slot walls in positions 2,4,6,8</text>
          <text x="20" y="60" fill="#2563eb" fontSize="10">• Insert BLUE (tangential) magnets - arrows CW</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Alternate direction: 2→CW, 4→CCW, 6→CW, 8→CCW</text>
          <text x="20" y="90" fill="#fbbf24" fontSize="10">⚠ Strong attraction to adjacent radial magnets!</text>
        </g>
        
        {/* Step 4 */}
        <g transform="translate(450, 750)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">4</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">CURE EPOXY</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Keep assembly in jig during cure</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="10">• Room temp cure: 24 hours minimum</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Elevated cure (65°C): 2 hours</text>
          <text x="20" y="90" fill="#fbbf24" fontSize="10">⚠ Do not exceed 80°C (magnet derating)</text>
        </g>
        
        {/* Step 5 */}
        <g transform="translate(30, 870)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">5</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">INSTALL BORE SLEEVE</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Apply thin epoxy layer to sleeve OD</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="10">• Slide aluminum bore sleeve into center</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Center using alignment pins</text>
          <text x="20" y="90" fill="#94a3b8" fontSize="10">• Verify Ø70mm bore is concentric</text>
        </g>
        
        {/* Step 6 */}
        <g transform="translate(450, 870)">
          <rect x="0" y="0" width="400" height="100" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <circle cx="25" cy="20" r="15" fill="#60a5fa" />
          <text x="25" y="25" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">6</text>
          <text x="50" y="25" fill="#e2e8f0" fontSize="12" fontWeight="bold">ATTACH END PLATES</text>
          <text x="20" y="45" fill="#94a3b8" fontSize="10">• Apply epoxy to end faces</text>
          <text x="20" y="60" fill="#94a3b8" fontSize="10">• Install aluminum end plates</text>
          <text x="20" y="75" fill="#94a3b8" fontSize="10">• Secure with M4 screws (6× per plate)</text>
          <text x="20" y="90" fill="#94a3b8" fontSize="10">• Final cure: 24 hours before testing</text>
        </g>

        {/* ============ SECTION 4: MAGNETIZATION PATTERN ============ */}
        <text x="30" y="1010" fill="#60a5fa" fontSize="14" fontWeight="bold">
          SECTION 4: MAGNETIZATION VERIFICATION
        </text>
        <line x1="30" y1="1018" x2="400" y2="1018" stroke="#60a5fa" strokeWidth="1" />
        
        {/* Halbach pattern diagram */}
        <g transform="translate(100, 1040)">
          <text x="100" y="-10" textAnchor="middle" fill="#94a3b8" fontSize="10">CORRECT MAGNETIZATION PATTERN</text>
          
          {/* Outer ring */}
          <circle cx="100" cy="100" r="90" fill="url(#steelGuide)" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Magnet segments with correct orientation */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const innerR = 40;
            const outerR = 80;
            const cx = 100;
            const cy = 100;
            
            const x1 = cx + innerR * Math.cos(rad - 0.35);
            const y1 = cy + innerR * Math.sin(rad - 0.35);
            const x2 = cx + outerR * Math.cos(rad - 0.35);
            const y2 = cy + outerR * Math.sin(rad - 0.35);
            const x3 = cx + outerR * Math.cos(rad + 0.35);
            const y3 = cy + outerR * Math.sin(rad + 0.35);
            const x4 = cx + innerR * Math.cos(rad + 0.35);
            const y4 = cy + innerR * Math.sin(rad + 0.35);
            
            const isRadial = i % 2 === 0;
            const arrowAngle = isRadial ? angle : angle + 90 * (i === 1 || i === 5 ? 1 : -1);
            const arrowRad = (arrowAngle * Math.PI) / 180;
            const midR = (innerR + outerR) / 2;
            const arrowCx = cx + midR * Math.cos(rad);
            const arrowCy = cy + midR * Math.sin(rad);
            const arrowLen = 12;
            
            return (
              <g key={angle}>
                <path
                  d={`M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`}
                  fill={isRadial ? 'url(#nPoleGuide)' : 'url(#sPoleGuide)'}
                  stroke="#1a2744"
                  strokeWidth="1"
                />
                <line
                  x1={arrowCx - arrowLen * Math.cos(arrowRad)}
                  y1={arrowCy - arrowLen * Math.sin(arrowRad)}
                  x2={arrowCx + arrowLen * Math.cos(arrowRad)}
                  y2={arrowCy + arrowLen * Math.sin(arrowRad)}
                  stroke="white"
                  strokeWidth="2"
                  markerEnd="url(#arrowWhiteGuide)"
                />
              </g>
            );
          })}
          
          {/* Center - field concentration */}
          <circle cx="100" cy="100" r="35" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          <text x="100" y="95" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">PEAK</text>
          <text x="100" y="108" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">1.5-2T</text>
        </g>
        
        {/* Verification checklist */}
        <g transform="translate(350, 1040)">
          <rect x="0" y="0" width="280" height="180" fill="#0f172a" stroke="#2a3f5f" strokeWidth="1" rx="4" />
          <text x="15" y="25" fill="#60a5fa" fontSize="11" fontWeight="bold">VERIFICATION CHECKLIST:</text>
          
          <text x="15" y="50" fill="#4ade80" fontSize="10">☑ All arrows point same rotational direction</text>
          <text x="15" y="70" fill="#4ade80" fontSize="10">☑ Radial magnets: arrows point to center</text>
          <text x="15" y="90" fill="#4ade80" fontSize="10">☑ Tangential: alternate CW/CCW pattern</text>
          <text x="15" y="110" fill="#4ade80" fontSize="10">☑ Field peaks at bore center (&gt;1.5T)</text>
          <text x="15" y="130" fill="#4ade80" fontSize="10">☑ Field near-zero outside yoke (&lt;50mT)</text>
          
          <line x1="15" y1="145" x2="265" y2="145" stroke="#2a3f5f" strokeWidth="1" />
          <text x="15" y="165" fill="#fbbf24" fontSize="9">⚠ If field is weak/reversed: one or more magnets</text>
          <text x="15" y="178" fill="#fbbf24" fontSize="9">   are installed with incorrect orientation</text>
        </g>

        {/* ============ SECTION 5: SAFETY WARNINGS ============ */}
        <text x="30" y="1260" fill="#dc2626" fontSize="14" fontWeight="bold">
          ⚠ SAFETY WARNINGS
        </text>
        <line x1="30" y1="1268" x2="200" y2="1268" stroke="#dc2626" strokeWidth="1" />
        
        <g transform="translate(30, 1280)">
          <rect x="0" y="0" width="840" height="90" fill="#0f172a" stroke="#dc2626" strokeWidth="2" rx="4" />
          
          <text x="20" y="25" fill="#fca5a5" fontSize="10">• N52 magnets have extreme pull force (~50kg per segment). Use non-magnetic tools only.</text>
          <text x="20" y="42" fill="#fca5a5" fontSize="10">• Keep pacemaker users and magnetic media at least 1 meter away during assembly.</text>
          <text x="20" y="59" fill="#fca5a5" fontSize="10">• Wear safety glasses - magnets can shatter if allowed to collide. Handle with padded gloves.</text>
          <text x="20" y="76" fill="#fca5a5" fontSize="10">• Never attempt assembly without the jig - magnets WILL snap together violently and cause injury.</text>
        </g>

        {/* Footer */}
        <line x1="10" y1="1385" x2="890" y2="1385" stroke="#2a3f5f" strokeWidth="1" />
        <text x="20" y="1397" fill="#64748b" fontSize="9">
          DOCUMENT: AMR-HALBACH-ASM-002 | REV: A | DATE: 2025-11-28 | DRAWN BY: AMR-GEN
        </text>
        <text x="880" y="1397" textAnchor="end" fill="#64748b" fontSize="9">
          FOR REFERENCE ONLY - VERIFY ALL DIMENSIONS BEFORE FABRICATION
        </text>
      </svg>
    </div>
  );
};

export default HalbachAssemblyGuide;
