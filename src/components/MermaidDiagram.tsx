import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import './MermaidDiagram.css'

interface MermaidDiagramProps {
  mermaidCode: string
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ mermaidCode }) => {
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!diagramRef.current || !mermaidCode) return

    // Clear previous content
    diagramRef.current.innerHTML = ''

    // Create a new div for the diagram
    const diagramContainer = document.createElement('div')
    diagramContainer.className = 'mermaid-diagram'
    diagramRef.current.appendChild(diagramContainer)

    // Initialize mermaid with proper configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'strict',
      logLevel: 'error'
    })

    // Render the diagram using the correct Mermaid API
    const renderDiagram = async () => {
      try {
        const { svg, bindFunctions } = await mermaid.render(
          `amr-diagram-${Date.now()}`,
          mermaidCode
        )
        
        if (svg) {
          diagramContainer.innerHTML = svg
          
          // Bind interactive functions if available
          if (bindFunctions) {
            bindFunctions(diagramContainer)
          }
        }
      } catch (error) {
        console.error('Error rendering mermaid diagram:', error)
        diagramContainer.innerHTML = `
          <div style="padding: 2rem; text-align: center; color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
            <h3>Error rendering diagram</h3>
            <p>Please check the mermaid syntax in your flowchart definition.</p>
            <p>Error details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        `
      }
    }

    renderDiagram()
  }, [mermaidCode])

  return (
    <div className="mermaid-diagram-container">
      <div ref={diagramRef} className="mermaid-diagram-content" />
    </div>
  )
}

export default MermaidDiagram
