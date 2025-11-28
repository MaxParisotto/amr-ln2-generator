flowchart LR

%% ========================= FRONT-END AIR HANDLING =========================
subgraph FE[Front-End Air Handling]
    A1[Intake Filter\n+ Dust Filter]
    A2[Oil-Free Compressor\n8–10 bar]
    A3[Aftercooler\n+ Water Separator]
    A4[Desiccant Dryer]
    A5[CO₂ + Trace Removal Bed]
    A6[High-Pressure Buffer Vessel\n8–10 bar]

    A1 --> A2 --> A3 --> A4 --> A5 --> A6
end

%% ========================= MEMBRANE SEPARATION (7 bar) =========================
subgraph MS["Membrane Separation (N₂ Enrichment)"]
    PR1[PR-101\nPressure Regulator\nSet: 7 bar]
    V1{{V-101\nFeed Isolation Valve}}
    M1[Hollow-Fiber N₂ Membrane\nFeed: ~7 bar]
    N2P["N₂-Rich Stream (90–99% N₂)"]
    O2R[O₂-Rich Retentate\nVent/Re-use]

    A6 --> PR1 --> V1 --> M1
    M1 -->|N₂ Rich| N2P
    M1 -->|O₂ Rich| O2R
end

%% ========================= PRECOOLING EXCHANGERS =========================
subgraph PC[Pre-Cooling HX Chain]
    HX1[HX-101\nWarm N₂ ↔ Cold Vapor]
    HX2["HX-102 Interstage Pre-Cooler - Magno Stage A Return"]
    HX3["HX-103 Deep Pre-Cooler - Magno Stage C Return"]
    N2C[N₂ @ ~80–100 K]

    N2P --> HX1 --> HX2 --> HX3 --> N2C
end

%% ========================= MAGNETOCALORIC COLD BOX =========================
subgraph MC["Magnetocaloric Cryocooler (Rotary AMR)"]
    direction TB

    MCmag[Halbach Rotor\n2–3 Tesla Gap Field]:::magnet
    MCshaft[Shaft + Bearings]:::mech

    MC1[Stage A AMR\nCurie 250–280 K\nΔT: 300→200 K]:::cold
    MC2[Stage B AMR\nCurie 180–200 K\nΔT: 200→120 K]:::cold
    MC3[Stage C AMR\nCurie 100–120 K\nΔT: 120→80 K]:::cold

    MCmag --- MC1
    MCmag --- MC2
    MCmag --- MC3
    MC1 --- MCshaft
    MC2 --- MCshaft
    MC3 --- MCshaft

    %% Closed-loop working fluid (N₂ or He/N₂ mix)
    subgraph MCL[Closed Working-Fluid Loop]
        W1[Pump/Blower P-301]
        W2[AMR Bed Stage A]
        W3[AMR Bed Stage B]
        W4[AMR Bed Stage C]

        W1 --> W2 --> W3 --> W4 --> W1
    end
end

%% ========================= EXPANSION & LIQUEFACTION =========================
subgraph LX[JT Expansion & Liquefaction]
    JT1[JT-101\nJoule-Thomson Valve\n7 → 1–2 bar]
    N2mix[N₂ Liquid + Vapor]
    SEP1[Phase Separator V-401]
    LN2[Liquid N₂ Storage Dewar\nV-402]
    RV1[Cold Vapor Return]

    N2C --> JT1 --> N2mix --> SEP1
    SEP1 -->|Liquid| LN2
    SEP1 -->|Cold Vapor| RV1 --> HX1
end

%% ========================= STORAGE & SAFETY =========================
subgraph ST[Storage & Safety]
    D1[Dewar Pressure Relief\n+ O₂-Safe Vent Stack]
    LT[LN₂ Level Sensor LT-402]
    PT[LN₂ Pressure PT-402]

    LN2 --> D1
    LN2 --- LT
    LN2 --- PT
end

%% ========================= CONTROLS & MONITORING =========================
subgraph CTRL[Control System]
    C1[PLC / Controller]
    C2[Temperature Sensors TT-*]
    C3[Pressure Sensors PT-*]
    C4[Flow Sensors FT-*]
    C5[Magnet Motor Control\n+ Pump Control\n+ JT PID]

    C1 --- C2
    C1 --- C3
    C1 --- C4
    C1 --- C5
    C5 --- MCmag
    C5 --- W1
    C5 --- JT1
end

%% ========================= CLASS DEFINITIONS =========================
classDef magnet fill:#ffd9b3,stroke:#b36b00,stroke-width:1px
classDef cold fill:#ccf2ff,stroke:#007399,stroke-width:1px
classDef mech fill:#e6e6e6,stroke:#808080,stroke-width:1px