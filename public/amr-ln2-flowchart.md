flowchart TD

%% ========================= THEME & STYLES =========================
%% Professional Color Palette
%% Blue (Cold/Air): #e3f2fd (bg), #1565c0 (stroke)
%% Orange (Magnet/Heat): #fff3e0 (bg), #ef6c00 (stroke)
%% Gray (Mechanical/Structure): #f5f5f5 (bg), #616161 (stroke)
%% Green (Control/Safe): #e8f5e9 (bg), #2e7d32 (stroke)
%% Purple (Special/Membrane): #f3e5f5 (bg), #7b1fa2 (stroke)

classDef default fill:#ffffff,stroke:#37474f,stroke-width:1.5px,rx:5,ry:5,color:#263238;
classDef group fill:#fafafa,stroke:#cfd8dc,stroke-width:2px,stroke-dasharray: 5 5,color:#546e7a;

classDef air fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,rx:5,ry:5;
classDef magnet fill:#fff8e1,stroke:#ff8f00,stroke-width:2px,rx:5,ry:5;
classDef cold fill:#e0f7fa,stroke:#006064,stroke-width:2px,rx:5,ry:5;
classDef mech fill:#eeeeee,stroke:#757575,stroke-width:2px,rx:5,ry:5;
classDef control fill:#f3e5f5,stroke:#8e24aa,stroke-width:1.5px,stroke-dasharray: 3 3;
classDef valve fill:#fff,stroke:#37474f,stroke-width:1.5px,shape:circle;

%% ========================= FRONT-END AIR HANDLING =========================
subgraph FE[Front-End Air Handling]
direction TB
style FE fill:#fcfcfc,stroke:#eceff1,stroke-width:2px,rx:10,ry:10

    A1([Intake Filter<br/>+ Dust Filter]):::air
    A2[Oil-Free Compressor<br/>8–10 bar]:::mech
    A3[Aftercooler<br/>+ Water Separator]:::mech
    A4[Desiccant Dryer]:::air
    A5[CO₂ + Trace Removal]:::air
    A6[(High-Pressure Buffer<br/>8–10 bar)]:::air

    A1 ==> A2 ==> A3 ==> A4 ==> A5 ==> A6

end

%% ========================= MEMBRANE SEPARATION =========================
subgraph MS[Membrane Separation]
direction TB
style MS fill:#fcfcfc,stroke:#eceff1,stroke-width:2px,rx:10,ry:10

    PR1[PR-101<br/>Pressure Regulator]:::mech
    V1{{V-101<br/>Feed Isolation}}:::valve
    M1[[MNH-1522A Membrane]]:::air

    A6 ==> PR1 ==> V1 ==> M1

    M1 == N₂ Rich ==> N2P([N₂-Rich Stream<br/>90–99% N₂]):::air
    M1 -- O₂ Rich --> O2R([O₂-Rich Retentate<br/>Vent]):::mech

end

%% ========================= PRECOOLING =========================
subgraph PC[Pre-Cooling System]
direction TB
style PC fill:#fcfcfc,stroke:#eceff1,stroke-width:2px,rx:10,ry:10

    HX1[HX-101<br/>Warm N₂ ↔ Cold Vapor]:::cold
    HX2[HX-102<br/>Interstage Pre-Cooler]:::cold
    HX3[HX-103<br/>Deep Pre-Cooler]:::cold
    N2C([N₂ @ ~80–100 K]):::cold

    N2P ==> HX1 ==> HX2 ==> HX3 ==> N2C

end

%% ========================= MAGNETOCALORIC COLD BOX =========================
subgraph MC[Magnetocaloric Cryocooler]
direction TB
style MC fill:#fffde7,stroke:#fff59d,stroke-width:2px,rx:10,ry:10

    subgraph MCR[AMR Core Assembly]
        direction LR
        style MCR fill:#fff,stroke:none

        MCmag((Halbach Rotor<br/>2–3 Tesla)):::magnet
        MCshaft[Drive Shaft]:::mech

        MC1[Stage A<br/>300→200 K]:::cold
        MC2[Stage B<br/>200→120 K]:::cold
        MC3[Stage C<br/>120→80 K]:::cold

        MCmag -.- MC1 & MC2 & MC3
        MCshaft === MC1 & MC2 & MC3
    end

    subgraph MCL[Working Fluid Loop]
        direction LR
        style MCL fill:#fff,stroke:none

        W1[Pump P-301]:::mech
        W2[Bed A]:::cold
        W3[Bed B]:::cold
        W4[Bed C]:::cold

        W1 --> W2 --> W3 --> W4 --> W1
    end

    %% Thermal Links
    HX2 -.-> MC1
    HX3 -.-> MC3

end

%% ========================= LIQUEFACTION =========================
subgraph LX[Liquefaction Stage]
direction TB
style LX fill:#e1f5fe,stroke:#b3e5fc,stroke-width:2px,rx:10,ry:10

    JT1{{JT-101<br/>Joule-Thomson}}:::valve
    SEP1[Phase Separator<br/>V-401]:::cold
    LN2[(Liquid N₂ Storage<br/>V-402)]:::cold
    RV1([Cold Vapor Return]):::cold

    N2C ==> JT1 ==> SEP1
    SEP1 == Liquid ==> LN2
    SEP1 -- Vapor --> RV1
    RV1 --> HX1

end

%% ========================= SAFETY & CONTROL =========================
subgraph ST[Safety & Control]
direction LR
style ST fill:#f3e5f5,stroke:#e1bee7,stroke-width:2px,rx:10,ry:10

    C1[PLC Controller]:::control
    SENSORS[Sensors]:::control
    SAFETY[Safety Valves]:::control

    C1 -.-> SENSORS
    C1 -.-> MCmag
    LN2 -.-> SAFETY

end

%% ========================= MAIN FLOW CONNECTIONS =========================
FE ==> MS
MS ==> PC
PC ==> MC
MC ==> LX
LX -.-> ST

%% ========================= LINK STYLING =========================
linkStyle default stroke:#546e7a,stroke-width:1.5px,fill:none;
