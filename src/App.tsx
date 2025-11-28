import React from 'react'
import Layout from './components/Layout';
import FlowDiagram from './components/FlowDiagram';
import './App.css'

const App: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-24 pb-20">
        <section id="design" className="scroll-mt-24">
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AMR LN₂ Generator</h2>
                <p className="text-slate-500 text-lg">Interactive system design and sizing tool</p>
              </div>
            </div>
            <FlowDiagram />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default App
