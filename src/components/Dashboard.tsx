import React from 'react';
import { Activity, CheckCircle, AlertTriangle, Wind, Thermometer, FileText, Gauge } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return null; // Dashboard content is now integrated into the flow diagram
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

const StatCard = ({ title, value, icon: Icon, color, bg, border }: StatCardProps) => (
  <div className={`bg-white p-6 rounded-lg border ${border} shadow-sm hover:shadow-md transition-all duration-300 group h-full`}>
    <div className="flex items-center gap-4">
      <div className={`p-3.5 rounded-lg ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

interface ModuleCardProps {
  name: string;
  status: 'READY' | 'IN DESIGN' | 'PENDING';
  icon: React.ElementType;
  desc: string;
  isActive?: boolean; // Added isActive prop to match usage
}

const ModuleCard = ({ name, status, icon: Icon, desc, isActive }: ModuleCardProps) => (
  <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group cursor-pointer
    ${isActive 
      ? 'border-blue-200 bg-blue-50/50 shadow-sm' 
      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
    }
  `}>
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-600'} transition-colors`}>
        <Icon size={18} />
      </div>
      <div>
        <h4 className={`font-semibold ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>{name}</h4>
        <p className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide
        ${status === 'READY' ? 'bg-emerald-100 text-emerald-700' 
          : status === 'IN DESIGN' ? 'bg-blue-100 text-blue-700' 
          : 'bg-slate-100 text-slate-600'}
      `}>
        {status}
      </span>
    </div>
  </div>
);

export default Dashboard;
