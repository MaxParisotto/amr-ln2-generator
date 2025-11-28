import React, { useState, useEffect, useCallback } from 'react';
import { Wind, Zap, Thermometer, Gauge, ArrowDown, Settings2 } from 'lucide-react';

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
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', title: 'text-blue-900' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', title: 'text-purple-900' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', title: 'text-orange-900' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600', title: 'text-cyan-900' },
  };

  const colors = colorClasses[data.color];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Icon Bubble */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg z-10 ${colors.bg} border-2 ${colors.border} mb-6 transform transition-transform hover:scale-110`}>
        <data.icon className={`w-8 h-8 ${colors.icon}`} />
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden relative z-10">
        {/* Header */}
        <div className={`px-8 py-6 border-b ${colors.border} ${colors.bg} text-center`}>
          <h3 className={`text-xl font-bold ${colors.title}`}>{data.title}</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">{data.description}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Metrics */}
          {data.metrics.length > 0 && (
            <div className="text-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Metrics</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {data.metrics.map((m, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 min-w-[140px] flex-1">
                    <div className="text-xs text-slate-500 mb-1">{m.label}</div>
                    <div className="text-lg font-bold text-slate-900">
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
              {data.metrics.length > 0 && <div className="w-16 h-1 bg-slate-100 mx-auto mb-8 rounded-full" />}
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Technical Specs</h4>
              <div className="space-y-4">
                {data.specs.map((s, i) => (
                  <div key={i} className="flex flex-col items-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <span className="font-semibold text-slate-700">{s.param}</span>
                    <span className="font-mono text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-md my-1.5 border border-slate-200">{s.value}</span>
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
        <div className="h-16 w-0.5 bg-slate-200 my-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm">
            <ArrowDown className="w-3 h-3 text-slate-400" />
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
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sticky top-20 z-30 mb-12">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Settings2 className="w-5 h-5 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">System Parameters</h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700">Production Target</label>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{targetProduction} L/day</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={targetProduction}
              onChange={(e) => setTargetProduction(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">Feed Pressure</label>
            <div className="flex gap-2">
              {[5, 9, 11].map((val) => (
                <button
                  key={val}
                  onClick={() => setPressureMode(val)}
                  className={`flex-1 py-2 px-3 text-sm font-bold rounded-lg border transition-all ${
                    pressureMode === val 
                      ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
          <SectionCard 
            key={section.id} 
            data={section} 
            isLast={idx === sections.length - 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default FlowDiagram;
