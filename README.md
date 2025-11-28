# AMR LN2 Flowchart Visualizer

A React web application that visualizes the AMR LN2 flowchart using Mermaid.js.

## Features

- Interactive Mermaid diagram viewer
- Responsive design
- Clean, modern UI with Tailwind CSS
- TypeScript support
- No Docker required

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── MermaidDiagram.tsx
│   │   └── MermaidDiagram.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── amr-ln2-flowchart.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## How It Works

1. The application reads the Mermaid diagram definition from [`amr-ln2-flowchart.md`](amr-ln2-flowchart.md:1)
2. It extracts the diagram code between the ```mermaid markers
3. The diagram is rendered using the `mermaid-js` library
4. The result is displayed as an interactive SVG diagram

## Customization

- Modify the diagram by editing [`amr-ln2-flowchart.md`](amr-ln2-flowchart.md:1)
- Update the UI by modifying the React components in `src/`
- Add new features or styling as needed

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run format` - Format code with Prettier

## Technologies Used

- React 19.2.0 (Latest)
- TypeScript 5.9.3 (Latest)
- Vite 7.2.4 (Latest)
- Tailwind CSS 4.1.17 (Latest)
- Mermaid 11.12.1 (Latest)
- PostCSS 8.5.6 (Latest)