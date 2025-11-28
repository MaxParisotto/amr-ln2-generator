import React, { useState, useEffect, useCallback } from 'react';
import { Wind, Zap, Thermometer, Gauge, ArrowDown, Settings2, Repeat, Container } from 'lucide-react';
import CryocoolerDiagram from './CryocoolerDiagram';
import AMRMagnetBlueprint from './AMRMagnetBlueprint';
import HalbachAssemblyGuide from './HalbachAssemblyGuide';
import HeatRecuperatorDiagram from './HeatRecuperatorDiagram';
import DewarBlueprint from './DewarBlueprint';

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
  color: 'blue' | 'purple' | 'orange' | 'cyan' | 'green';
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
    green: { accent: '#4ade80', glow: 'rgba(74,222,128,0.3)' },
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
  const [useRecuperator, setUseRecuperator] = useState<boolean>(true);
  const efficiency = 15;
  const recuperatorEffectiveness = 0.35; // 35% energy savings

  // Calculated State
  const [airFlow, setAirFlow] = useState<number>(0);
  const [moduleCount, setModuleCount] = useState<number>(1);
  const [power, setPower] = useState<number>(0);
  const [compressorPower, setCompressorPower] = useState<number>(0);
  const [cryoPower, setCryoPower] = useState<number>(0);
  const [coolingCapacity, setCoolingCapacity] = useState<number>(0);
  const [powerSavings, setPowerSavings] = useState<number>(0);
  const [precooleTemp, setPrecooleTemp] = useState<number>(300);

  const calculateSpecs = useCallback(() => {
    const LN2_DENSITY = 0.808; // kg/L at 77K
    const L_LIQUID_TO_L_GAS = 696; // 1L liquid → 696L gas at STP
    
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

    // Compressor power: ~0.35 kW per CFM at 9 bar, plus 15% motor losses
    const compressorPowerKW = (totalAirLPM / 28.3) * 0.35 * 1.15;
    
    // Cryocooler power calculation:
    // Theoretical minimum work (ideal Carnot): ~0.28 kWh/L LN2
    // At 15% Carnot efficiency: 0.28 / 0.15 = 1.87 kWh/L
    const theoreticalEnergyPerLiter = 0.28; // kWh/L (Carnot ideal)
    const realEnergyPerLiter = theoreticalEnergyPerLiter / (efficiency / 100);
    
    // With recuperator, we pre-cool from 300K to ~180K using cold boil-off
    // This reduces the cryocooler load by ~35%
    const recuperatorFactor = useRecuperator ? (1 - recuperatorEffectiveness) : 1;
    const cryoPowerKW = (realEnergyPerLiter * targetProduction * recuperatorFactor) / 24;
    
    const totalSystemPower = compressorPowerKW + cryoPowerKW;
    const savingsKW = useRecuperator ? (realEnergyPerLiter * targetProduction * recuperatorEffectiveness) / 24 : 0;

    // Pre-cooled temperature after recuperator
    const inletTemp = 300; // K
    const exhaustTemp = 77; // K
    const precooledTemp = useRecuperator ? 
      inletTemp - (recuperatorEffectiveness * (inletTemp - exhaustTemp)) : inletTemp;

    // Cooling load (thermal power to be removed) - adjusted for recuperator
    const massFlowKgPerSec = (targetProduction * LN2_DENSITY) / (24 * 3600);
    const LATENT_HEAT = 199; // kJ/kg
    const SPECIFIC_HEAT_GAS = 1.04; // kJ/kg·K (average for N2)
    const effectiveStartTemp = useRecuperator ? precooledTemp : 300;
    const coolingLoadKW = massFlowKgPerSec * (LATENT_HEAT + (SPECIFIC_HEAT_GAS * (effectiveStartTemp - 77)));

    setPower(Number(totalSystemPower.toFixed(2)));
    setCompressorPower(Number(compressorPowerKW.toFixed(2)));
    setCryoPower(Number(cryoPowerKW.toFixed(2)));
    setAirFlow(Number(totalAirLPM.toFixed(1)));
    setCoolingCapacity(Number((coolingLoadKW * 1000).toFixed(1)));
    setModuleCount(modulesNeeded);
    setPowerSavings(Number(savingsKW.toFixed(2)));
    setPrecooleTemp(Math.round(precooledTemp));
  }, [targetProduction, purityMode, pressureMode, efficiency, useRecuperator, recuperatorEffectiveness]);

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
        { label: 'Compressor Power', value: compressorPower, unit: 'kW' },
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
      id: 'recuperator',
      title: 'Heat Recuperator',
      description: 'Pre-cools incoming N₂ using cold boil-off gas from the Dewar, reducing cryocooler load.',
      icon: Repeat,
      color: 'green',
      metrics: [
        { label: 'Inlet Temp', value: '300', unit: 'K' },
        { label: 'Outlet Temp', value: useRecuperator ? precooleTemp : 300, unit: 'K' },
        { label: 'Power Saved', value: powerSavings, unit: 'kW' },
      ],
      specs: [
        { param: 'Type', value: 'Counter-Flow Finned Tube', note: 'High effectiveness design' },
        { param: 'Effectiveness', value: useRecuperator ? '80-85%' : 'BYPASSED', note: useRecuperator ? '35% energy savings' : 'Recuperator disabled' },
        { param: 'Cold Source', value: 'LN₂ Boil-off (77K)', note: 'Free cooling from evaporation' },
        { param: 'Material', value: 'SS 304L + Copper Fins', note: 'Vacuum jacketed' },
      ],
    },
    {
      id: 'stage1',
      title: `Cryocooler Stage 1 (${useRecuperator ? precooleTemp : 300}K → 200K)`,
      description: 'Pre-cooling stage using magnetic refrigeration with Gadolinium-based alloys.',
      icon: Zap,
      color: 'orange',
      metrics: [
        { label: 'Inlet Temp', value: useRecuperator ? precooleTemp : 300, unit: 'K' },
        { label: 'Outlet Temp', value: 200, unit: 'K' },
      ],
      specs: [
        { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
        { param: 'Operating Frequency', value: '1 - 4 Hz', note: 'Rotary or Reciprocating' },
        { param: 'MCM Material', value: 'Gd-based Alloy', note: 'Curie temperature ~290K' },
      ],
    },
    {
      id: 'stage2',
      title: 'Cryocooler Stage 2 (200K → 120K)',
      description: 'Intermediate cooling stage using LaFeSi-based magnetocaloric materials.',
      icon: Zap,
      color: 'orange',
      metrics: [
        { label: 'Inlet Temp', value: 200, unit: 'K' },
        { label: 'Outlet Temp', value: 120, unit: 'K' },
      ],
      specs: [
        { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
        { param: 'MCM Material', value: 'LaFeSi-based', note: 'Curie temperature ~200K' },
      ],
    },
    {
      id: 'stage3',
      title: 'Cryocooler Stage 3 (120K → 77K)',
      description: 'Final cooling stage reaching liquefaction temperature using MnFeP materials.',
      icon: Zap,
      color: 'orange',
      metrics: [
        { label: 'Cooling Load', value: coolingCapacity, unit: 'W' },
        { label: 'Cryo Power', value: cryoPower, unit: 'kW' },
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
      description: 'Continuous liquefaction directly into pressurized storage.',
      icon: Thermometer,
      color: 'cyan',
      metrics: [
        { label: 'LN₂ Production', value: targetProduction, unit: 'L/day' },
        { label: 'Total Power', value: power, unit: 'kW' },
        { label: 'Operating Temp', value: '77', unit: 'K' },
      ],
      specs: [
        { param: 'Connection', value: 'Vacuum-Jacketed Line', note: 'Direct to Dewar' },
        { param: 'Flow Control', value: 'JT Valve', note: 'Joule-Thomson expansion' },
      ],
    },
    {
      id: 'dewar',
      title: '50L Pressurized Dewar Storage',
      description: 'Vacuum-insulated cryogenic vessel with self-pressurization for liquid dispensing.',
      icon: Container,
      color: 'cyan',
      metrics: [
        { label: 'Capacity', value: 50, unit: 'L' },
        { label: 'Pressure', value: '2-4', unit: 'bar' },
        { label: 'Hold Time', value: '>30', unit: 'days' },
      ],
      specs: [
        { param: 'Insulation', value: 'Vacuum + 25-layer MLI', note: 'Static loss <1.5%/day' },
        { param: 'Material', value: 'SS 304L', note: '2mm outer, 1.5mm inner' },
        { param: 'Relief Valve', value: '4.5 bar', note: 'With burst disc at 6 bar' },
        { param: 'Self-Pressurizing', value: 'Yes', note: 'Ambient heat vaporizer coil' },
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
          
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-3 text-center font-mono">HEAT RECUPERATOR</label>
            <button
              onClick={() => setUseRecuperator(!useRecuperator)}
              className={`w-full py-2 px-3 text-sm font-bold rounded border-2 transition-all font-mono ${
                useRecuperator 
                  ? 'bg-[#4ade80] text-[#0f172a] border-[#4ade80] shadow-[0_0_15px_rgba(74,222,128,0.4)]' 
                  : 'bg-[#0f172a] text-slate-400 border-[#2a3f5f] hover:border-[#4ade80] hover:text-[#4ade80]'
              }`}
            >
              {useRecuperator ? '✓ ENABLED (-35% Power)' : 'DISABLED'}
            </button>
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
            
            {/* Insert Heat Recuperator Diagram after Recuperator section */}
            {section.id === 'recuperator' && useRecuperator && (
              <div className="flex flex-col items-center w-full">
                <div className="h-16 w-px bg-[#2a3f5f] my-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2744] p-1.5 rounded border border-[#2a3f5f]">
                    <ArrowDown className="w-3 h-3 text-[#4ade80]" />
                  </div>
                </div>
                <div className="w-full bg-[#1a2744] rounded border-2 border-[#4ade80] overflow-hidden mb-4">
                  <div className="px-6 py-4 border-b border-[#4ade80] text-center bg-[#0f172a]/50">
                    <h3 className="text-lg font-bold text-[#4ade80] font-mono tracking-wide">HEAT RECUPERATOR SCHEMATIC</h3>
                    <p className="text-slate-400 mt-1 text-sm">Counter-Flow Heat Exchange Using Cold Boil-Off</p>
                  </div>
                  <div className="p-4">
                    <HeatRecuperatorDiagram />
                  </div>
                </div>
              </div>
            )}
            
            {/* Insert Cryocooler Diagram after Stage 1 */}
            {section.id === 'stage1' && (
              <div className="flex flex-col items-center w-full">
                <div className="h-16 w-px bg-[#2a3f5f] my-4 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a2744] p-1.5 rounded border border-[#2a3f5f]">
                    <ArrowDown className="w-3 h-3 text-[#fb923c]" />
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
            
            {/* Insert Dewar Blueprint after Dewar section */}
            {section.id === 'dewar' && (
              <>
                <div className="flex flex-col items-center w-full mt-8">
                  <div className="w-full bg-[#1a2744] rounded border-2 border-[#22d3ee] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#22d3ee] text-center bg-[#0f172a]/50">
                      <h3 className="text-lg font-bold text-[#22d3ee] font-mono tracking-wide">50L PRESSURIZED DEWAR BLUEPRINT</h3>
                      <p className="text-slate-400 mt-1 text-sm">Vacuum-Insulated Storage with Self-Pressurization</p>
                    </div>
                    <div className="p-4">
                      <DewarBlueprint />
                    </div>
                  </div>
                </div>
                
                {/* AMR Magnet Blueprint */}
                <div className="flex flex-col items-center w-full mt-8">
                  <div className="w-full bg-[#1a2744] rounded border-2 border-[#60a5fa] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#60a5fa] text-center bg-[#0f172a]/50">
                      <h3 className="text-lg font-bold text-[#60a5fa] font-mono tracking-wide">AMR MAGNET ASSEMBLY BLUEPRINT</h3>
                      <p className="text-slate-400 mt-1 text-sm">Halbach Array Construction Details</p>
                    </div>
                    <div className="p-4">
                      <AMRMagnetBlueprint />
                    </div>
                  </div>
                </div>
                
                {/* Halbach Assembly Guide */}
                <div className="flex flex-col items-center w-full mt-8">
                  <div className="w-full bg-[#1a2744] rounded border-2 border-[#22d3ee] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#22d3ee] text-center bg-[#0f172a]/50">
                      <h3 className="text-lg font-bold text-[#22d3ee] font-mono tracking-wide">HALBACH ARRAY ASSEMBLY GUIDE</h3>
                      <p className="text-slate-400 mt-1 text-sm">Step-by-Step Fabrication & Assembly Instructions</p>
                    </div>
                    <div className="p-4">
                      <HalbachAssemblyGuide />
                    </div>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlowDiagram;
