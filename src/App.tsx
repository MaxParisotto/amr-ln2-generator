import React from 'react'
import Layout from './components/Layout';
import FlowDiagram from './components/FlowDiagram';
import './App.css'

const App: React.FC = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AMR LN₂ Generator</h2>
          <p className="text-slate-500 text-lg mt-2">Interactive system design and sizing tool</p>
        </div>
        <FlowDiagram />
      </div>
    </Layout>
  )
}

export default App
