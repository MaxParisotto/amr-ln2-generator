import React, { useState, useEffect } from 'react'
import MermaidDiagram from './components/MermaidDiagram'
import './App.css'

const App: React.FC = () => {
  const [mermaidContent, setMermaidContent] = useState('')
  const fallbackDiagram = `flowchart LR
    A[Start] --> B[Process]
    B --> C[End]
    classDef default fill=#f9f,stroke=333,stroke-width=2px`

  useEffect(() => {
    // Fetch from public folder - Vite serves public files at root
    const diagramUrl = `${import.meta.env.BASE_URL}amr-ln2-flowchart.md`

    fetch(diagramUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load diagram: ${response.status}`)
        }
        return response.text()
      })
      .then((text) => {
        // Try to extract from ```mermaid code block first
        const match = text.match(/```mermaid\n([\s\S]*?)\n```/)
        if (match && match[1]) {
          setMermaidContent(match[1])
        } else {
          // If no code block found, use the raw content as mermaid code
          setMermaidContent(text.trim())
        }
      })
      .catch((error) => {
        console.error('Error reading mermaid file:', error)
        setMermaidContent(fallbackDiagram)
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
