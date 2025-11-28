import React, { useState, useEffect } from 'react'
import MermaidDiagram from './components/MermaidDiagram'
import './App.css'

const App: React.FC = () => {
  const [mermaidContent, setMermaidContent] = useState('')

  useEffect(() => {
    // Read the mermaid content from the markdown file
    fetch('/amr-ln2-flowchart.md')
      .then((response) => response.text())
      .then((text) => {
        // Extract the mermaid diagram content between ```mermaid and ```
        const match = text.match(/```mermaid\n([\s\S]*?)\n```/)
        if (match && match[1]) {
          setMermaidContent(match[1])
        }
      })
      .catch((error) => {
        console.error('Error reading mermaid file:', error)
        // Fallback content
        setMermaidContent(`flowchart LR
    A[Start] --> B[Process]
    B --> C[End]
    classDef default fill=#f9f,stroke=333,stroke-width=2px`)
      })
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AMR LN2 Flowchart Visualizer</h1>
        <p>Interactive Mermaid Diagram Viewer</p>
      </header>
      <main className="app-main">
        {mermaidContent ? (
          <MermaidDiagram mermaidCode={mermaidContent} />
        ) : (
          <div className="loading">Loading diagram...</div>
        )}
      </main>
    </div>
  )
}

export default App