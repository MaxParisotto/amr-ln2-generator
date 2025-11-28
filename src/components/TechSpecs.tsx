import React from 'react';
import { Wind, Snowflake, Gauge, ShieldCheck, Check } from 'lucide-react';

const TechSpecs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Technical Specifications</h2>
        <p className="text-slate-500 mt-2 text-lg">Detailed engineering parameters for the AMR LN2 Generator</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Stage 1: Air Handling */}
        <SpecSection 
          title="Front-End Air Handling"
          subtitle="Process Air Preparation"
          icon={Wind}
          color="blue"
          description="Preparation of process air to remove moisture, CO2, and particulates before cryogenic processing."
        >
          <SpecTable 
            rows={[
              { param: "Compressor Type", value: "Oil-Free Scroll / Screw", note: "Class 0 Air Quality" },
              { param: "Operating Pressure", value: "8 - 10 bar(g)", note: "Optimized for membrane efficiency" },
              { param: "Dew Point Requirement", value: "-40°C to -70°C", note: "Prevents ice formation" },
              { param: "Filtration", value: "0.01 micron", note: "Coalescing + Activated Carbon" },
              { param: "CO2 Removal", value: "< 5 ppm", note: "Via TSA or Molecular Sieve" },
            ]} 
          />
        </SpecSection>

        {/* Stage 2: Membrane Separation */}
        <SpecSection 
          title="Membrane Separation"
          subtitle="Nitrogen Enrichment"
          icon={Gauge}
          color="indigo"
          description="Nitrogen enrichment using hollow-fiber membranes to achieve high purity N2 feed gas."
        >
          <SpecTable 
            rows={[
              { param: "Membrane Model", value: "MNH-1522A", note: "Hollow Fiber Polyimide" },
              { param: "Dimensions", value: "Ø55mm x 588mm", note: "Weight: 1.3 kg" },
              { param: "Housing Material", value: "AL-6063 Aluminum", note: "Epoxy Potting" },
              { param: "Connections", value: "Rc1/2\" (In/Out)", note: "Rc1/4\" Permeate" },
              { param: "Feed Pressure", value: "5 - 13 bar(g)", note: "See Performance Table" },
              { param: "Operating Temp", value: "35°C Rated", note: "Max 50°C" },
            ]} 
          />
        </SpecSection>

        {/* Stage 3: Magnetocaloric Cooling */}
        <SpecSection 
          title="Magnetocaloric Cryocooler"
          subtitle="AMR Core Technology"
          icon={Snowflake}
          color="cyan"
          description="Active Magnetic Regenerator cycle using magnetocaloric effect for efficient cooling."
        >
          <SpecTable 
            rows={[
              { param: "Magnetic Field", value: "1.5 - 2.0 Tesla", note: "Halbach Array Permanent Magnets" },
              { param: "Operating Frequency", value: "1 - 4 Hz", note: "Rotary or Reciprocating" },
              { param: "MCM Material", value: "Gd / LaFeSi / MnFeP", note: "Cascaded Curie temperatures" },
              { param: "Heat Transfer Fluid", value: "Helium / Nitrogen", note: "Pressurized 10-20 bar" },
              { param: "Cold Tip Temp", value: "77 K (-196°C)", note: "Liquefaction point" },
            ]} 
          />
        </SpecSection>

        {/* Stage 4: Safety */}
        <SpecSection 
          title="Safety & Storage"
          subtitle="Critical Systems"
          icon={ShieldCheck}
          color="emerald"
          description="Critical safety systems for handling cryogenic liquids and high-pressure gases."
        >
          <SpecTable 
            rows={[
              { param: "O2 Monitoring", value: "Required", note: "Room oxygen depletion alarm" },
              { param: "Relief Valves", value: "Set @ 1.1x MAWP", note: "Thermal expansion protection" },
              { param: "Dewar Insulation", value: "Vacuum Super-Insulation", note: "Static evaporation < 1%/day" },
              { param: "Ventilation", value: "Forced Exhaust", note: "For O2-rich waste stream" },
            ]} 
          />
        </SpecSection>
      </div>
    </div>
  );
};

interface SpecSectionProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: 'blue' | 'indigo' | 'cyan' | 'emerald';
  description: string;
  children: React.ReactNode;
}

const SpecSection: React.FC<SpecSectionProps> = ({ title, subtitle, icon: Icon, color, description, children }) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-600 group-hover:text-white",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300 group">
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-start gap-5">
          <div className={`p-3.5 rounded-lg border transition-colors duration-300 ${colorClasses[color]}`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
            <p className="text-slate-500 mt-3 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-0 bg-slate-50/30">
        {children}
      </div>
    </div>
  );
};

const SpecTable = ({ rows }: { rows: { param: string, value: string, note: string }[] }) => (
  <div className="overflow-hidden">
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="bg-slate-50/50">
        <tr>
          <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Parameter</th>
          <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Specification</th>
          <th className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Notes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row, idx) => (
          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
            <td className="px-8 py-4 whitespace-nowrap text-sm font-semibold text-slate-700">{row.param}</td>
            <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-900 font-mono bg-slate-50/50">{row.value}</td>
            <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center gap-2">
              <Check size={14} className="text-slate-300" />
              {row.note}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TechSpecs;
