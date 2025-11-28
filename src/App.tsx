import React from 'react'
import Layout from './components/Layout';
import FlowDiagram from './components/FlowDiagram';
import './App.css'

const App: React.FC = () => {
  return (
    <Layout>
      <div className="w-full">
        {/* Title Block */}
        <div className="border-2 border-[#60a5fa] rounded-lg p-6 mb-10 bg-[#1a2744]/50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#60a5fa] tracking-wider font-mono">AMR LN₂ GENERATOR</h2>
            <div className="w-32 h-0.5 bg-[#60a5fa] mx-auto my-3" />
            <p className="text-slate-400 text-sm font-mono tracking-wide">INTERACTIVE SYSTEM DESIGN & SIZING TOOL</p>
          </div>
        </div>
        <FlowDiagram />
      </div>
    </Layout>
  )
}

export default App
