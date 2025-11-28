import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './FlowDiagram.css';
import { Wind, Zap, Thermometer, Gauge } from 'lucide-react';

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

// Custom Node Components
interface StageNodeData {
  label: string;
  icon: React.ElementType;
  color: string;
  items?: string[];
  hasControls?: boolean;
  metrics?: Array<{ label: string; value: string | number; unit?: string }>;
  specs?: Array<{ param: string; value: string; note: string }>;
  onProduction?: (value: number) => void;
  onPurity?: (value: number) => void;
  onPressure?: (value: number) => void;
  production?: number;
  purity?: number;
  pressure?: number;
}

const StageNode: React.FC<{ data: StageNodeData }> = ({ data }) => {
  const Icon = data.icon;
  
  const colorClasses: Record<string, { bg: string; border: string; icon: string; text: string }> = {
    blue: { bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', border: 'border-blue-200', icon: 'text-blue-600', text: 'text-blue-900' },
    orange: { bg: 'bg-gradient-to-br from-orange-50 to-amber-50', border: 'border-orange-200', icon: 'text-orange-600', text: 'text-orange-900' },
    cyan: { bg: 'bg-gradient-to-br from-cyan-50 to-teal-50', border: 'border-cyan-200', icon: 'text-cyan-600', text: 'text-cyan-900' },
    purple: { bg: 'bg-gradient-to-br from-purple-50 to-pink-50', border: 'border-purple-200', icon: 'text-purple-600', text: 'text-purple-900' },
  };

  const colors = colorClasses[data.color] || colorClasses.blue;

  return (
    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 shadow-xl min-w-[500px] max-w-[600px] backdrop-blur-sm`}>
      {/* Connection handles */}
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${colors.icon} bg-white rounded-lg shadow-sm`}>
          <Icon size={24} />
        </div>
        <h3 className={`font-bold text-lg ${colors.text}`}>{data.label}</h3>
      </div>

      {/* Interactive Controls */}
      {data.hasControls && (
        <div className="space-y-3 mb-4">
          <div className="bg-white/80 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">Production</label>
              <span className="text-xs font-bold text-blue-600">{data.production} L/day</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={data.production || 10}
              onChange={(e) => data.onProduction?.(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="bg-white/80 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700">N₂ Purity</label>
              <span className="text-xs font-bold text-emerald-600">{100 - (data.purity || 0.5)}%</span>
            </div>
            <div className="flex gap-1">
              {[0.5, 1.0, 2.0, 3.0].map((val) => (
                <button
                  key={val}
                  onClick={() => data.onPurity?.(val)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${
                    data.purity === val 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  {100 - val}%
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/80 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700">Pressure</label>
              <span className="text-xs font-bold text-indigo-600">{data.pressure} bar</span>
            </div>
            <div className="flex gap-1">
              {[5, 9, 11].map((val) => (
                <button
                  key={val}
                  onClick={() => data.onPressure?.(val)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${
                    data.pressure === val 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calculated Metrics */}
      {data.metrics && data.metrics.length > 0 && (
        <div className="space-y-2 mb-4">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-white/80 rounded-lg px-3 py-2 flex justify-between items-center">
              <span className={`text-xs font-medium ${colors.text}`}>{metric.label}</span>
              <span className="text-xs font-bold text-slate-900">
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Static Items */}
      {data.items && (
        <div className="space-y-2">
          {data.items.map((item, idx) => (
            <div key={idx} className={`text-xs ${colors.text} bg-white/60 px-3 py-2 rounded-lg font-medium`}>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Technical Specifications */}
      {data.specs && data.specs.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-bold mb-3 px-3 py-2 rounded-lg bg-white/80 ${colors.text}">
            Technical Specifications
          </div>
          <div className="space-y-1">
            {data.specs.map((spec, idx) => (
              <div key={idx} className="bg-white rounded-lg px-3 py-2 text-[10px]">
                <div className="flex justify-between items-start gap-2">
                  <span className={`font-semibold ${colors.text}`}>{spec.param}</span>
                  <span className="font-mono text-slate-900">{spec.value}</span>
                </div>
                <div className="text-slate-500 mt-0.5">{spec.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  stageNode: StageNode,
};

const FlowDiagram: React.FC = () => {
  const [targetProduction, setTargetProduction] = useState<number>(10);
  const [purityMode, setPurityMode] = useState<number>(0.5);
  const [pressureMode, setPressureMode] = useState<number>(9);
  const efficiency = 15;

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    calculateSpecs();
  }, [calculateSpecs]);

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'stageNode',
      position: { x: 200, y: 30 },
      data: {
        label: 'Design Parameters',
        icon: Gauge,
        color: 'blue',
        hasControls: true,
        production: targetProduction,
        purity: purityMode,
        pressure: pressureMode,
        onProduction: setTargetProduction,
        onPurity: setPurityMode,
        onPressure: setPressureMode,
      },
    },
    {
      id: '2',
      type: 'stageNode',
      position: { x: 50, y: 300 },
      data: {
        label: 'Front-End Air Handling',
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
          { param: 'CO₂ Removal', value: '< 5 ppm', note: 'Via TSA or Molecular Sieve' },
        ],
      },
    },
    {
      id: '3',
      type: 'stageNode',
      position: { x: 550, y: 300 },
      data: {
        label: 'Membrane Separation',
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
          { param: 'Connections', value: 'Rc1/2" (In/Out)', note: 'Rc1/4" Permeate' },
          { param: 'Feed Pressure', value: '5 - 13 bar(g)', note: 'See Performance Table' },
          { param: 'Operating Temp', value: '35°C Rated', note: 'Max 50°C' },
        ],
      },
    },
    {
      id: '4',
      type: 'stageNode',
      position: { x: 300, y: 570 },
      data: {
        label: 'Stage 1: 300K → 200K',
        icon: Zap,
        color: 'orange',
        specs: [
          { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
          { param: 'Operating Frequency', value: '1 - 4 Hz', note: 'Rotary or Reciprocating' },
          { param: 'MCM Material', value: 'Gd-based Alloy', note: 'Curie temperature ~290K' },
          { param: 'Heat Transfer Fluid', value: 'Helium / Nitrogen', note: 'Pressurized 10-20 bar' },
        ],
      },
    },
    {
      id: '5',
      type: 'stageNode',
      position: { x: 300, y: 720 },
      data: {
        label: 'Stage 2: 200K → 120K',
        icon: Zap,
        color: 'orange',
        specs: [
          { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
          { param: 'Operating Frequency', value: '1 - 4 Hz', note: 'Rotary or Reciprocating' },
          { param: 'MCM Material', value: 'LaFeSi-based', note: 'Curie temperature ~200K' },
          { param: 'Heat Transfer Fluid', value: 'Helium / Nitrogen', note: 'Pressurized 10-20 bar' },
        ],
      },
    },
    {
      id: '6',
      type: 'stageNode',
      position: { x: 300, y: 870 },
      data: {
        label: 'Stage 3: 120K → 80K',
        icon: Zap,
        color: 'orange',
        metrics: [
          { label: 'Cooling Power', value: coolingCapacity, unit: 'W' },
          { label: 'Cryo Power', value: power > 0 ? (power * 0.4).toFixed(1) : 0, unit: 'kW' },
          { label: 'Efficiency', value: efficiency, unit: '% Carnot' },
        ],
        specs: [
          { param: 'Magnetic Field', value: '1.5 - 2.0 Tesla', note: 'Halbach Array Permanent Magnets' },
          { param: 'Operating Frequency', value: '1 - 4 Hz', note: 'Rotary or Reciprocating' },
          { param: 'MCM Material', value: 'MnFeP-based', note: 'Curie temperature ~120K' },
          { param: 'Heat Transfer Fluid', value: 'Helium / Nitrogen', note: 'Pressurized 10-20 bar' },
          { param: 'Cold Tip Temp', value: '77 K (-196°C)', note: 'Liquefaction point' },
        ],
      },
    },
    {
      id: '7',
      type: 'stageNode',
      position: { x: 300, y: 1020 },
      data: {
        label: 'Liquefaction Output',
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
          { param: 'Ventilation', value: 'Forced Exhaust', note: 'For O₂-rich waste stream' },
        ],
      },
    },
  ];

  const initialEdges: Edge[] = [
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      label: 'Air Feed',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
    { 
      id: 'e1-3', 
      source: '1', 
      target: '3', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#9333ea', strokeWidth: 3 }, 
      label: 'Control',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
    },
    { 
      id: 'e2-3', 
      source: '2', 
      target: '3', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      label: 'Compressed Air',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
    { 
      id: 'e3-4', 
      source: '3', 
      target: '4', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      label: 'N₂ Rich Gas',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
    { 
      id: 'e4-5', 
      source: '4', 
      target: '5', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
    { 
      id: 'e5-6', 
      source: '5', 
      target: '6', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
    { 
      id: 'e6-7', 
      source: '6', 
      target: '7', 
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#0284c7', strokeWidth: 3 }, 
      label: 'Cold N₂',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#0284c7' }
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when calculations change
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          return {
            ...node,
            data: {
              ...node.data,
              production: targetProduction,
              purity: purityMode,
              pressure: pressureMode,
            },
          };
        }
        if (node.id === '2') {
          return {
            ...node,
            data: {
              ...node.data,
              metrics: [
                { label: 'Feed Air Flow', value: airFlow, unit: 'LPM' },
                { label: 'Compressor Power', value: power > 0 ? (power * 0.6).toFixed(1) : 0, unit: 'kW' },
                { label: 'Operating Pressure', value: pressureMode, unit: 'bar' },
              ],
            },
          };
        }
        if (node.id === '3') {
          return {
            ...node,
            data: {
              ...node.data,
              metrics: [
                { label: 'Modules Required', value: moduleCount, unit: 'units' },
                { label: 'Model', value: 'MNH-1522A', unit: '' },
                { label: 'N₂ Purity', value: 100 - purityMode, unit: '%' },
              ],
            },
          };
        }
        if (node.id === '4') {
          return {
            ...node,
            data: {
              ...node.data,
            },
          };
        }
        if (node.id === '5') {
          return {
            ...node,
            data: {
              ...node.data,
            },
          };
        }
        if (node.id === '6') {
          return {
            ...node,
            data: {
              ...node.data,
              metrics: [
                { label: 'Cooling Power', value: coolingCapacity, unit: 'W' },
                { label: 'Cryo Power', value: power > 0 ? (power * 0.4).toFixed(1) : 0, unit: 'kW' },
                { label: 'Efficiency', value: efficiency, unit: '% Carnot' },
              ],
            },
          };
        }
        if (node.id === '7') {
          return {
            ...node,
            data: {
              ...node.data,
              metrics: [
                { label: 'LN₂ Production', value: targetProduction, unit: 'L/day' },
                { label: 'Total Power', value: power, unit: 'kW' },
                { label: 'Operating Temp', value: '77', unit: 'K' },
              ],
            },
          };
        }
        return node;
      })
    );
  }, [targetProduction, purityMode, pressureMode, airFlow, moduleCount, power, coolingCapacity, setNodes]);

  return (
    <div className="w-full h-[1500px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.4}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
        elementsSelectable={true}
        nodesConnectable={false}
        nodesDraggable={true}
        zoomOnScroll={true}
        panOnScroll={false}
        defaultEdgeOptions={{
          animated: true,
          style: { strokeWidth: 3, stroke: '#0284c7' },
        }}
      >
        <Background color="#e2e8f0" gap={16} />
        <Controls className="bg-white border border-slate-200 rounded-lg shadow-lg" />
        <MiniMap 
          className="bg-white border border-slate-200 rounded-lg shadow-lg"
          nodeColor={(node) => {
            const colorMap: Record<string, string> = {
              blue: '#3b82f6',
              orange: '#f97316',
              cyan: '#06b6d4',
              purple: '#a855f7',
            };
            return colorMap[(node.data as { color: string }).color] || '#3b82f6';
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;

