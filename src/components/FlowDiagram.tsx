import React, { useState, useEffect, useCallback } from 'react';
import { Wind, Zap, Thermometer, Gauge, ArrowDown, Settings2 } from 'lucide-react';
import CryocoolerDiagram from './CryocoolerDiagram';
import AMRMagnetBlueprint from './AMRMagnetBlueprint';

// MNH-1522A Performance Data (at 35°C)
const MEMBRANE_DATA: Record<number, Record<number, { n2: number, air: number }>> = {
  5: {
    0.5: { n2: 1.55, air: 8.91 },
    1.0: { n2: 2.15, air: 9.80 },
    2.0: { n2: 3.15, air: 10.99 },
    3.0: { n2: 4.15, air: 12.18 },
  },
  9: {
    0.5: { n2: 3.72, air: 17.37 },
    1.0: { n2: 5.29, air: 19.60 },
    2.0: { n2: 7.73, air: 23.76 },
    3.0: { n2: 10.16, air: 25.99 },
  },
  11: {
    0.5: { n2: 4.94, air: 22.87 },
    1.0: { n2: 6.87, air: 24.95 },
    2.0: { n2: 10.02, air: 29.70 },
    3.0: { n2: 13.17, air: 33.12 },
  }
};

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
  color: 'blue' | 'purple' | 'orange' | 'cyan';
  description: string;
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
  specs: Array<{ param: string; value: string; note: string }>;
}

const SectionCard: React.FC<{ data: SectionData; isLast: boolean }> = ({ data, isLast }) => {
  const colorClasses = {
    blue: { accent: '#60a5fa', glow: 'rgba(96,165,250,0.3)' },
    purple: { accent: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
    orange: { accent: '#fb923c', glow: 'rgba(251,146,60,0.3)' },
    cyan: { accent: '#22d3ee', glow: 'rgba(34,211,238,0.3)' },
  };

  const colors = colorClasses[data.color];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Icon Bubble */}
      <div 
        className="w-14 h-14 rounded border-2 flex items-center justify-center z-10 mb-6 transform transition-all hover:scale-110 bg-[#1a2744]"
        style={{ 
          borderColor: colors.accent,
          boxShadow: `0 0 20px ${colors.glow}`
        }}
      >
        <data.icon className="w-7 h-7" style={{ color: colors.accent }} />
      </div>

      {/* Main Card */}
      <div 
        className="w-full bg-[#1a2744] rounded border-2 overflow-hidden relative z-10"
        style={{ borderColor: colors.accent }}
      >
        {/* Header */}
        <div 
          className="px-6 py-4 border-b text-center"
          style={{ 
            borderColor: colors.accent,
            background: `linear-gradient(180deg, rgba(15,23,42,0.8) 0%, #1a2744 100%)`
          }}
        >
          <h3 className="text-lg font-bold font-mono tracking-wide" style={{ color: colors.accent }}>
            {data.title.toUpperCase()}
          </h3>
          <p className="text-slate-400 mt-1.5 text-sm leading-relaxed">{data.description}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Metrics */}
          {data.metrics.length > 0 && (
            <div className="text-center">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 font-mono">
                ─── PERFORMANCE METRICS ───
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {data.metrics.map((m, i) => (
                  <div 
                    key={i} 
                    className="bg-[#0f172a] rounded border border-[#2a3f5f] p-3 min-w-[130px] flex-1"
                  >
                    <div className="text-xs text-slate-500 mb-1 font-mono uppercase tracking-wide">{m.label}</div>
                    <div className="text-lg font-bold text-[#22d3ee] font-mono">
                      {m.value} <span className="text-xs font-medium text-slate-500">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {data.specs.length > 0 && (
            <div className="text-center">
              {data.metrics.length > 0 && (
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px bg-[#2a3f5f] flex-1" />
                  <div className="w-2 h-2 rotate-45 border border-[#2a3f5f]" />
                  <div className="h-px bg-[#2a3f5f] flex-1" />
                </div>
              )}
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 font-mono">
                ─── TECHNICAL SPECIFICATIONS ───
              </h4>
              <div className="space-y-3">
                {data.specs.map((s, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center p-2 hover:bg-[#0f172a] rounded transition-colors border border-transparent hover:border-[#2a3f5f]"
                  >
                    <span className="font-semibold text-slate-400 text-sm">{s.param}</span>
                    <span 
                      className="font-mono text-sm px-3 py-1 rounded my-1.5 border"
                      style={{ color: colors.accent, borderColor: colors.accent, background: 'rgba(15,23,42,0.5)' }}
                    >
                      {s.value}
                    </span>
                    <span className="text-xs text-slate-500 max-w-xs leading-relaxed">{s.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connector */}
      {!isLast && (
        <div className="h-16 w-px bg-[#2a3f5f] my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2744] p-1.5 rounded border border-[#2a3f5f]">
            <ArrowDown className="w-3 h-3 text-[#60a5fa]" />
          </div>
        </div>
      )}
    </div>
  );
};

const FlowDiagram: React.FC = () => {
  // State
  const [targetProduction, setTargetProduction] = useState<number>(10);
  const purityMode = 3.0; // Fixed at 97% N2 (3.0% O2)
  const [pressureMode, setPressureMode] = useState<number>(9);
  const efficiency = 15;

  // Calculated State
  const [airFlow, setAirFlow] = useState<number>(0);
  const [moduleCount, setModuleCount] = useState<number>(1);
  const [power, setPower] = useState<number>(0);
  const [coolingCapacity, setCoolingCapacity] = useState<number>(0);

  const calculateSpecs = useCallback(() => {
    const LN2_DENSITY = 0.808;
    const L_LIQUID_TO_L_GAS = 696;
    
    const totalGasLPerDay = targetProduction * L_LIQUID_TO_L_GAS;
    const requiredN2LPM = totalGasLPerDay / (24 * 60);

    const perfData = MEMBRANE_DATA[pressureMode] || MEMBRANE_DATA[9];
    const purityKeys = Object.keys(perfData).map(Number).sort((a, b) => a - b);
    const closestPurity = purityKeys.reduce((prev, curr) => 
      (Math.abs(curr - purityMode) < Math.abs(prev - purityMode) ? curr : prev)
    );
    
    const singleModuleStats = perfData[closestPurity];
    const modulesNeeded = Math.ceil(requiredN2LPM / singleModuleStats.n2);
    const totalAirLPM = modulesNeeded * singleModuleStats.air;

    const compressorPowerKW = (totalAirLPM / 28.3) * 0.35;
    const theoreticalEnergyPerLiter = 0.5;
    const realEnergyPerLiter = theoreticalEnergyPerLiter / (efficiency / 100);
    const cryoPowerKW = (realEnergyPerLiter * targetProduction) / 24;
    const totalSystemPower = compressorPowerKW + cryoPowerKW;

    const massFlowKgPerSec = (targetProduction * LN2_DENSITY) / (24 * 3600);
    const LATENT_HEAT = 199;
    const SPECIFIC_HEAT_GAS = 1.04;
    const coolingLoadKW = massFlowKgPerSec * (LATENT_HEAT + (SPECIFIC_HEAT_GAS * (300 - 77)));

    setPower(Number(totalSystemPower.toFixed(2)));
    setAirFlow(Number(totalAirLPM.toFixed(1)));
    setCoolingCapacity(Number((coolingLoadKW * 1000).toFixed(1)));
    setModuleCount(modulesNeeded);
  }, [targetProduction, purityMode, pressureMode, efficiency]);

  useEffect(() => {
    calculateSpecs();
  }, [calculateSpecs]);

  const sections: SectionData[] = [
    {
      id: 'air-handling',
      title: 'Front-End Air Handling',
      description: 'Compresses and treats ambient air to provide clean, dry, high-pressure feed air.',
      icon: Wind,
      color: 'blue',
      metrics: [
        { label: 'Feed Air Flow', value: airFlow, unit: 'LPM' },
        { label: 'Compressor Power', value: power > 0 ? (power * 0.6).toFixed(1) : 0, unit: 'kW' },
        { label: 'Operating Pressure', value: pressureMode, unit: 'bar' },
      ],
      specs: [
        { param: 'Compressor Type', value: 'Oil-Free Scroll / Screw', note: 'Class 0 Air Quality' },
        { param: 'Operating Pressure', value: '8 - 10 bar(g)', note: 'Optimized for membrane efficiency' },
        { param: 'Dew Point Requirement', value: '-40°C to -70°C', note: 'Prevents ice formation' },
        { param: 'Filtration', value: '0.01 micron', note: 'Coalescing + Activated Carbon' },
      ],
    },
    {
      id: 'membrane',
      title: 'Membrane Separation',
      description: 'Separates Nitrogen from Oxygen using hollow fiber membranes.',
      icon: Gauge,
      color: 'purple',
      metrics: [
        { label: 'Modules Required', value: moduleCount, unit: 'units' },
        { label: 'Model', value: 'MNH-1522A', unit: '' },
        { label: 'N₂ Purity', value: 100 - purityMode, unit: '%' },
      ],
      specs: [
        { param: 'Membrane Model', value: 'MNH-1522A', note: 'Hollow Fiber Polyimide' },
        { param: 'Dimensions', value: 'Ø55mm x 588mm', note: 'Weight: 1.3 kg' },
        { param: 'Housing Material', value: 'AL-6063 Aluminum', note: 'Epoxy Potting' },
        { param: 'Feed Pressure', value: '5 - 13 bar(g)', note: 'See Performance Table' },
      ],
    },
    {
      id: 'stage1',
      title: 'Cryocooler Stage 1 (300K → 200K)',
      description: 'Pre-cooling stage using magnetic refrigeration.',
      icon: Zap,
      color: 'orange',
      metrics: [],
      specs: [
        { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
        { param: 'Operating Frequency', value: '1 - 4 Hz', note: 'Rotary or Reciprocating' },
        { param: 'MCM Material', value: 'Gd-based Alloy', note: 'Curie temperature ~290K' },
      ],
    },
    {
      id: 'stage2',
      title: 'Cryocooler Stage 2 (200K → 120K)',
      description: 'Intermediate cooling stage.',
      icon: Zap,
      color: 'orange',
      metrics: [],
      specs: [
        { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
        { param: 'MCM Material', value: 'LaFeSi-based', note: 'Curie temperature ~200K' },
      ],
    },
    {
      id: 'stage3',
      title: 'Cryocooler Stage 3 (120K → 80K)',
      description: 'Final cooling stage reaching liquefaction temperatures.',
      icon: Zap,
      color: 'orange',
      metrics: [
        { label: 'Cooling Power', value: coolingCapacity, unit: 'W' },
        { label: 'Cryo Power', value: power > 0 ? (power * 0.4).toFixed(1) : 0, unit: 'kW' },
        { label: 'Efficiency', value: efficiency, unit: '% Carnot' },
      ],
      specs: [
        { param: 'MCM Material', value: 'MnFeP-based', note: 'Curie temperature ~120K' },
        { param: 'Cold Tip Temp', value: '77 K (-196°C)', note: 'Liquefaction point' },
      ],
    },
    {
      id: 'liquefaction',
      title: 'Liquefaction Output',
      description: 'Collection and storage of Liquid Nitrogen.',
      icon: Thermometer,
      color: 'cyan',
      metrics: [
        { label: 'LN₂ Production', value: targetProduction, unit: 'L/day' },
        { label: 'Total Power', value: power, unit: 'kW' },
        { label: 'Operating Temp', value: '77', unit: 'K' },
      ],
      specs: [
        { param: 'O₂ Monitoring', value: 'Required', note: 'Room oxygen depletion alarm' },
        { param: 'Relief Valves', value: 'Set @ 1.1x MAWP', note: 'Thermal expansion protection' },
        { param: 'Dewar Insulation', value: 'Vacuum Super-Insulation', note: 'Static evaporation < 1%/day' },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="bg-[#1a2744]/90 backdrop-blur-xl rounded border-2 border-[#60a5fa] p-6 sticky top-20 z-30 mb-10">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Settings2 className="w-5 h-5 text-[#60a5fa]" />
          <h2 className="text-sm font-bold text-[#60a5fa] uppercase tracking-widest font-mono">SYSTEM PARAMETERS</h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-400 font-mono">PRODUCTION TARGET</label>
              <span className="text-sm font-bold text-[#22d3ee] bg-[#0f172a] px-3 py-1 rounded border border-[#22d3ee] font-mono">{targetProduction} L/day</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={targetProduction}
              onChange={(e) => setTargetProduction(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3 text-center font-mono">FEED PRESSURE</label>
            <div className="flex gap-2">
              {[5, 9, 11].map((val) => (
                <button
                  key={val}
                  onClick={() => setPressureMode(val)}
                  className={`flex-1 py-2 px-3 text-sm font-bold rounded border-2 transition-all font-mono ${
                    pressureMode === val 
                      ? 'bg-[#60a5fa] text-[#0f172a] border-[#60a5fa] shadow-[0_0_15px_rgba(96,165,250,0.4)]' 
                      : 'bg-[#0f172a] text-slate-400 border-[#2a3f5f] hover:border-[#60a5fa] hover:text-[#60a5fa]'
                  }`}
                >
                  {val} bar
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Flow */}
      <div className="pb-24">
        {sections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <SectionCard 
              data={section} 
              isLast={idx === sections.length - 1} 
            />
            {/* Insert Cryocooler Diagram after Membrane Separation */}
            {section.id === 'membrane' && (
              <div className="flex flex-col items-center w-full">
                <div className="h-16 w-px bg-[#2a3f5f] my-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2744] p-1.5 rounded border border-[#2a3f5f]">
                    <ArrowDown className="w-3 h-3 text-[#60a5fa]" />
                  </div>
                </div>
                <div className="w-full bg-[#1a2744] rounded border-2 border-[#fb923c] overflow-hidden mb-4">
                  <div className="px-6 py-4 border-b border-[#fb923c] text-center bg-[#0f172a]/50">
                    <h3 className="text-lg font-bold text-[#fb923c] font-mono tracking-wide">AMR CRYOCOOLER SYSTEM OVERVIEW</h3>
                    <p className="text-slate-400 mt-1 text-sm">3-Stage Cascade Magnetic Refrigeration</p>
                  </div>
                  <CryocoolerDiagram />
                </div>
              </div>
            )}
            {/* Insert AMR Magnet Blueprint after Stage 1 */}
            {section.id === 'stage1' && (
              <div className="flex flex-col items-center w-full">
                <div className="h-16 w-px bg-[#2a3f5f] my-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2744] p-1.5 rounded border border-[#2a3f5f]">
                    <ArrowDown className="w-3 h-3 text-[#60a5fa]" />
                  </div>
                </div>
                <div className="w-full bg-[#1a2744] rounded border-2 border-[#fb923c] overflow-hidden mb-4">
                  <div className="px-6 py-4 border-b border-[#fb923c] text-center bg-[#0f172a]/50">
                    <h3 className="text-lg font-bold text-[#fb923c] font-mono tracking-wide">AMR MAGNET ASSEMBLY BLUEPRINT</h3>
                    <p className="text-slate-400 mt-1 text-sm">Halbach Array Construction Details</p>
                  </div>
                  <div className="p-4">
                    <AMRMagnetBlueprint />
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlowDiagram;
