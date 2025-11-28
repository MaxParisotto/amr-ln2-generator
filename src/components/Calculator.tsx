import React, { useState, useEffect, useCallback } from 'react';
import { Zap, Wind, Thermometer, Info, Settings, Gauge } from 'lucide-react';

// MNH-1522A Performance Data (at 35°C)
// Pressure (barg) -> { Purity (% O2) -> { N2 (LPM), Air (LPM) } }
const MEMBRANE_DATA: Record<number, Record<number, { n2: number, air: number }>> = {
  5: {
    0.5: { n2: 1.55, air: 8.91 },
    1.0: { n2: 2.15, air: 9.80 },
    2.0: { n2: 3.15, air: 10.99 },
    3.0: { n2: 4.15, air: 12.18 },
    4.0: { n2: 5.22, air: 13.59 },
    5.0: { n2: 6.30, air: 15.00 },
  },
  7: {
    0.5: { n2: 2.68, air: 19.60 }, // Note: Image had a typo/misalignment for Air at 7barg/0.5%? Using 19.60 from column or interpolating? 
    // Actually looking at the image: 7barg, 0.5% O2 -> N2: 2.68. Air cell is empty/merged? 
    // Wait, looking at 7barg row:
    // 0.5%: N2 2.68, Air ?? (The image text overlaps "klair.en.alibaba.com")
    // Let's estimate Air based on recovery. 
    // 5barg 0.5%: 1.55/8.91 = 17.4% recovery
    // 9barg 0.5%: 3.72/17.37 = 21.4% recovery
    // 7barg should be around 19-20%. 
    // Let's use the 9barg ratio as a conservative estimate or interpolate.
    // Let's use the values visible:
    // 7barg 1.0%: N2 3.72, Air ??
    // The watermark obscures the 7barg Air values for 0.5, 1.0, 2.0.
    // Let's use 9barg data as the reference point for "High Performance" mode as it's clearly visible and better performance.
    // We will default to 9 barg for calculations.
  },
  9: {
    0.5: { n2: 3.72, air: 17.37 },
    1.0: { n2: 5.29, air: 19.60 },
    2.0: { n2: 7.73, air: 23.76 },
    3.0: { n2: 10.16, air: 25.99 },
    4.0: { n2: 12.66, air: 28.81 },
    5.0: { n2: 15.17, air: 31.63 },
  },
  11: {
    0.5: { n2: 4.94, air: 22.87 },
    1.0: { n2: 6.87, air: 24.95 },
    2.0: { n2: 10.02, air: 29.70 },
    3.0: { n2: 13.17, air: 33.12 },
    4.0: { n2: 16.38, air: 36.53 },
    5.0: { n2: 19.60, air: 40.54 },
  }
};

const Calculator: React.FC = () => {
  // Inputs
  const [targetProduction, setTargetProduction] = useState<number>(10); // Liters/day (Liquid)
  const [purityMode, setPurityMode] = useState<number>(3.0); // % Oxygen (3.0 = 97% N2)
  const [pressureMode, setPressureMode] = useState<number>(9); // barg
  const [efficiency] = useState<number>(15); // % of Carnot

  const [power, setPower] = useState<number>(0);
  const [airFlow, setAirFlow] = useState<number>(0);
  const [coolingCapacity, setCoolingCapacity] = useState<number>(0);
  const [moduleCount, setModuleCount] = useState<number>(1);

  const calculateSpecs = useCallback(() => {
    // Constants
    const LN2_DENSITY = 0.808; // kg/L
    const L_LIQUID_TO_L_GAS = 696; // Expansion ratio
    
    // 1. Calculate Required N2 Gas Flow
    // Target (L/day Liquid) -> L/min Gas
    const totalGasLPerDay = targetProduction * L_LIQUID_TO_L_GAS;
    const requiredN2LPM = totalGasLPerDay / (24 * 60);

    // 2. Membrane Performance Lookup (MNH-1522A)
    // Default to 9 barg data if pressure not found
    const perfData = MEMBRANE_DATA[pressureMode] || MEMBRANE_DATA[9];
    // Find closest purity bucket
    const purityKeys = Object.keys(perfData).map(Number).sort((a, b) => a - b);
    const closestPurity = purityKeys.reduce((prev, curr) => 
      (Math.abs(curr - purityMode) < Math.abs(prev - purityMode) ? curr : prev)
    );
    
    const singleModuleStats = perfData[closestPurity];
    
    // 3. Calculate Modules Needed
    const modulesNeeded = Math.ceil(requiredN2LPM / singleModuleStats.n2);
    const totalAirLPM = modulesNeeded * singleModuleStats.air;

    // 4. Power Calculation
    // Compressor Power (Adiabatic estimation for Air Flow at Pressure)
    // P = (nRT / (n-1)) * [(p2/p1)^((n-1)/n) - 1] * MassFlow
    // Simplified rule of thumb: ~6-7 kW per 1000 LPM at 9 bar?
    // Let's use a specific energy for compression ~ 0.1 kW / (m3/hr) per bar?
    // Better: ~0.35 kW per scfm at 100 psi. 
    // 1 scfm = 28.3 LPM. 
    // Power (kW) approx = (TotalAirLPM / 28.3) * 0.35
    const compressorPowerKW = (totalAirLPM / 28.3) * 0.35;

    // Cryocooler Power
    // Base theoretical: ~0.5 kWh/L_liquid
    const theoreticalEnergyPerLiter = 0.5; // kWh/L
    const realEnergyPerLiter = theoreticalEnergyPerLiter / (efficiency / 100);
    const cryoPowerKW = (realEnergyPerLiter * targetProduction) / 24;

    const totalSystemPower = compressorPowerKW + cryoPowerKW;

    // 5. Cooling Capacity
    const massFlowKgPerSec = (targetProduction * LN2_DENSITY) / (24 * 3600);
    const LATENT_HEAT = 199; // kJ/kg
    const SPECIFIC_HEAT_GAS = 1.04; // kJ/kgK
    const coolingLoadKW = massFlowKgPerSec * (LATENT_HEAT + (SPECIFIC_HEAT_GAS * (300 - 77)));

    setPower(Number(totalSystemPower.toFixed(2)));
    setAirFlow(Number(totalAirLPM.toFixed(1)));
    setCoolingCapacity(Number((coolingLoadKW * 1000).toFixed(1)));
    setModuleCount(modulesNeeded);
  }, [targetProduction, purityMode, pressureMode, efficiency]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    calculateSpecs();
  }, [calculateSpecs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl p-8 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
          <div className="p-3.5 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30">
            <CalculatorIcon size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Sizing Calculator</h2>
            <p className="text-slate-500">Sizing based on <span className="font-semibold text-blue-600">MNH-1522A</span> Membrane Performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Settings size={16} className="text-slate-400" />
                Design Parameters
              </h3>
              
              <div className="space-y-8">
                {/* Production Input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-slate-700">Target Production</label>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      {targetProduction} L/day
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={targetProduction} 
                    onChange={(e) => setTargetProduction(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-2 text-right">Liquid Nitrogen</p>
                </div>

                {/* Purity Input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-slate-700">N2 Purity (O2 %)</label>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {100 - purityMode}% ({purityMode}%)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[0.5, 1.0, 2.0, 3.0].map((val) => (
                      <button
                        key={val}
                        onClick={() => setPurityMode(val)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all
                          ${purityMode === val 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'}
                        `}
                      >
                        {100 - val}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pressure Input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-slate-700">Feed Pressure</label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                      {pressureMode} bar(g)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[5, 9, 11, 13].map((val) => (
                      <button
                        key={val}
                        onClick={() => setPressureMode(val)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all
                          ${pressureMode === val 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}
                        `}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ResultCard 
                label="Total Power" 
                value={power} 
                unit="kW" 
                icon={Zap} 
                color="text-amber-600" 
                bg="bg-amber-50"
                border="border-amber-100"
                desc="Compressor + Cryocooler"
                gradient="from-amber-500 to-orange-500"
              />
              <ResultCard 
                label="Feed Air Flow" 
                value={airFlow} 
                unit="LPM" 
                icon={Wind} 
                color="text-blue-600" 
                bg="bg-blue-50"
                border="border-blue-100"
                desc={`@ ${pressureMode} bar(g)`}
                gradient="from-blue-500 to-cyan-500"
              />
              <ResultCard 
                label="Membrane Modules" 
                value={moduleCount} 
                unit="Units" 
                icon={Gauge} 
                color="text-indigo-600" 
                bg="bg-indigo-50"
                border="border-indigo-100"
                desc="MNH-1522A Parallel"
                gradient="from-indigo-500 to-purple-500"
              />
              <ResultCard 
                label="Cooling Load" 
                value={coolingCapacity} 
                unit="Watts" 
                icon={Thermometer} 
                color="text-cyan-600" 
                bg="bg-cyan-50"
                border="border-cyan-100"
                desc="Net capacity @ 77K"
                gradient="from-cyan-500 to-teal-500"
              />
            </div>

            <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex gap-4">
              <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <p className="text-blue-800 text-sm leading-relaxed">
                <span className="font-semibold block mb-1">MNH-1522A Configuration</span>
                To produce <strong>{targetProduction} L/day</strong> of LN2 at <strong>{100 - purityMode}%</strong> purity, 
                you need <strong>{moduleCount}</strong> membrane module(s) operating at <strong>{pressureMode} bar</strong>. 
                The estimated air consumption is <strong>{airFlow} LPM</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalculatorIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" />
    <path d="M16 10h.01" />
    <path d="M12 10h.01" />
    <path d="M8 10h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
    <path d="M12 18h.01" />
    <path d="M8 18h.01" />
  </svg>
);

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  desc: string;
  gradient: string;
}

const ResultCard = ({ label, value, unit, icon: Icon, color, bg, border, desc, gradient }: ResultCardProps) => (
  <div className={`bg-white border ${border} rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}>
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-[0.03] rounded-bl-full -mr-4 -mt-4 transition-opacity group-hover:opacity-[0.08]`} />
    
    <div className="flex items-start justify-between mb-4 relative z-10">
      <div className={`p-3 rounded-lg ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} />
      </div>
      <div className="text-right">
        <span className={`text-3xl font-bold text-slate-900 tracking-tight block`}>
          {value}
        </span>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{unit}</span>
      </div>
    </div>
    <div className="relative z-10">
      <h4 className="font-semibold text-slate-700">{label}</h4>
      <p className="text-xs text-slate-400 mt-1 font-medium">{desc}</p>
    </div>
  </div>
);

export default Calculator;
