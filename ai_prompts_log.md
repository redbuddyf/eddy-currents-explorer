# AI Prompt Log — Science Unpacked Website & Nuclear Decay Module

This document contains a complete record of all prompts used during the development of the Science Unpacked educational platform and its Nuclear Decay interactive module. Prompts have been rewritten to reflect the technical decision-making process behind each feature.

---

## Phase 1: Science Unpacked Platform Architecture

### Project Scope & Initial Planning

**Technical Prompt:**
> "I need to develop a multi-modal educational platform called 'Science Unpacked' for my physics assessment. The architecture should integrate a vodcast hosting layer with interactive simulation content. I'd like a single-page application (SPA) structure where video content and interactive labs coexist within the same domain, preferably using vanilla HTML/CSS/JS to minimize dependencies. Can you scaffold the project structure?"

---

### Local Development Environment

**Technical Prompt:**
> "Please set up a local development server so I can preview the site before deployment. I'm thinking `python3 -m http.server` or a simple Node-based server — whatever integrates best with the current build pipeline."

---

### Cross-Disciplinary Expansion (Chemistry + Physics)

**Technical Prompt:**
> "The site needs to support cross-disciplinary content — both physics and chemistry modules. I'll need the navigation structure, metadata, and homepage copy updated to reflect a broader 'Science Unpacked' scope rather than just physics."

---

### Homepage Content & Metrics

**Technical Prompt:**
> "The hero section stats on the homepage need to dynamically reflect the actual number of interactive simulations we have. Could you implement a stat counter system that references the lab index? Also, update the three feature highlights to showcase meaningful metrics — e.g., 'Zero Contact Friction' for magnetic braking, '8 Interactive Demonstrations' — but remove the arbitrary speed metric since it doesn't add pedagogical value."

---

### Cross-Page Audio Continuity (Podcast Integration)

**Technical Prompt:**
> "I need persistent audio playback across page navigations. When a user clicks 'Play & Explore' on the podcast, the audio should continue playing in the background even as they navigate to the interactive lab sections. This will probably require an audio player in a persistent DOM layer or using the Web Audio API with state management across routes. Can you implement cross-page audio continuity?"

---

### Domain & Hosting Configuration

**Technical Prompt:**
> "Can we configure a custom domain for the Science Unpacked site rather than using the default GitHub Pages subdomain? I'd also like to understand hosting options for 24/7 availability — GitHub Pages handles static hosting, but should we consider Netlify or Vercel for additional features?"

---

### Access Control (Password Protection)

**Technical Prompt:**
> "I need basic access control on the Science Unpacked site before assessment submission. Since GitHub Pages only hosts static files, could you implement a client-side password gate using JavaScript localStorage/sessionStorage? The user would enter a passcode to unlock the site content, and then push this version to the repository."

---

### Deployment Workflow

**Technical Prompt:**
> "What's the correct Git workflow for pushing these changes to the remote repository? I need to stage, commit, and push the updated files to GitHub Pages so the live site reflects the changes."

---

**Technical Prompt:**
> "Please deploy the current build to production via GitHub Pages. After committing and pushing to the main branch, confirm that the CI/CD pipeline has completed and verify the live URL is serving the updated assets."

---

## Phase 2: Nuclear Decay Module

### Initial Module Scoping

**Technical Prompt:**
> "I'm working on a depth study about nuclear instability and radioactive decay, specifically examining how different isotopes exhibit varying decay modes and rates. I'd like to build an interactive digital textbook page with embedded WebGL/Three.js visualisations showing alpha, beta, and gamma emission processes in 3D. The content should be structured like an academic chapter with inline interactive elements rather than static images."

---

**Technical Prompt:**
> "I'd like to pivot to building a new module for the Science Unpacked platform focused on nuclear decay and radioactivity. This will be a dedicated page or section covering isotopic stability, decay modes, and half-life concepts with the same interactive, visual-first approach we used for the eddy currents content."

---

### Content Architecture (From Chapter Document)

**Technical Prompt:**
> "Using `CHAPTER_8_FOR_KIMI_CODE.md` as the content specification, can you build out the nuclear decay module for Science Unpacked? For the interactive elements — specifically the PhET-style simulations referenced in the document — I'd prefer we build our own implementations rather than embedding iframes. This gives us full control over styling and ensures everything matches the site's design system. Please implement custom Canvas/SVG versions of the key PhET interactions."

---

### WIP / Coming Soon State

**Technical Prompt:**
> "Add a 'Work in Progress' or 'Coming Soon' state to the Nuclear Decay navigation tab so visitors understand that section isn't fully complete yet."

---

## Phase 3: Chart of Nuclides

### Custom Interactive Chart

**Technical Prompt:**
> "I need a custom-built interactive Chart of Nuclides for the nuclear decay module. Rather than embedding an external tool, I'd like a Canvas or SVG-based grid showing N vs Z for known isotopes, with colour-coding for stability and decay modes. Users should be able to hover/click for detailed nuclear data."

---

### IAEA Colour Scheme Standardisation

**Technical Prompt:**
> "Please adopt the IAEA Live Chart of Nuclides colour scheme for the chart — specifically their conventions for stable isotopes (black), beta-minus emitters (blue), beta-plus/EC emitters (red), alpha emitters (yellow), and fission products (green). This ensures consistency with professional nuclear data visualisation standards."

---

### Tile Grid Layout (vs Dots)

**Technical Prompt:**
> "Replace the circular dot markers in the Chart of Nuclides with a tiled grid system — each isotope should be a rectangular cell similar to the IAEA Live Chart or periodic table layout. This makes the chart feel more like a map and improves click target sizes."

---

**Technical Prompt:**
> "The isotope tiles in the Chart of Nuclides are too small for comfortable interaction. Can you increase the default cell size and adjust the zoom levels so that the text labels and colour coding remain legible at the initial viewport scale?"

---

### IAEA Visual Parity

**Technical Prompt:**
> "The Chart of Nuclides needs to closely match the IAEA Live Chart's visual design — grid-based isotope cells, their specific colour palette for decay modes, zoomable canvas with mousewheel support, and the same general information density. Can you study their interface and replicate the key UX patterns?"

---

### Valley of Stability Overlay

**Technical Prompt:**
> "The Chart of Nuclides needs a 'Valley of Stability' overlay that visualises the binding energy per nucleon curve across the N-Z plane. Users should be able to see where stable isotopes cluster along the band of stability. Please also add pan/zoom controls and an element/isotope search function so users can quickly navigate to specific nuclides."

---

### Search & Navigation

**Technical Prompt:**
> "The Chart of Nuclides needs a search input that allows users to find isotopes by element symbol, atomic number Z, or mass number A. The view should zoom and pan to centre on the matched isotope when selected."

---

### Valley of Stability Bug Fixes

**Technical Prompt:**
> "The Valley of Stability interactive chart is failing to render — the canvas appears blank with no isotope tiles loading. There are likely multiple issues: missing data binding, incorrect D3.js/Canvas scaling, or the isotope dataset not being initialised properly. Can you debug the chart rendering pipeline, check the nuclear data fetch, and ensure click handlers are attached for decay mode/half-life tooltips? I'd also like zoom and search functionality added, similar to the IAEA Live Chart interface."

---

**Technical Prompt:**
> "One of the interactive elements in the website isn't working — specifically the Valley of Stability section that says 'Explore the valley of stability interactively. Click any isotope to see its decay mode and half-life.' The canvas is showing nothing. This component needs a full debug pass as there are multiple rendering and data-binding bugs."

---

## Phase 4: Interactive Simulations

### Build an Atom (Restoration)

**Technical Prompt:**
> "The 'Build an Atom' interactive element needs to be restored to the Nuclear Decay module. Users should be able to add/remove protons, neutrons, and electrons to construct atoms and see the resulting element name, atomic symbol, and stability status update in real time."

---

### PhET Parity for Build an Atom

**Technical Prompt:**
> "For the Build an Atom simulation, I want parity with the PhET 'Build an Atom' lab in terms of interaction patterns — draggable protons/neutrons/electrons, real-time atomic symbol updates, and stability validation. Can you match their UX patterns while keeping our visual design system?"

---

### Correct Electron Shell Filling

**Technical Prompt:**
> "The Build an Atom electron shell model must follow the correct quantum mechanical filling order. Please implement the Aufbau principle so electrons populate 1s, 2s, 2p, 3s, 3p, 4s, 3d, etc. in the proper sequence, with each shell displaying its correct maximum capacity."

---

**Technical Prompt:**
> "Please verify that the electron shell model in the Build an Atom simulation uses the correct quantum mechanical shell capacities (n=1: 2e⁻, n=2: 8e⁻, n=3: 18e⁻, etc.) and that the visual shell rings expand proportionally. The electron distribution should also respect the periodic table's block structure where possible."

---

### Atomic Validation Logic

**Technical Prompt:**
> "The Build an Atom simulation needs proper validation logic. Users shouldn't be able to construct physically impossible atoms — e.g., adding protons without corresponding electrons in a neutral atom configuration, or exceeding known isotopic stability limits. Please implement validation rules based on actual nuclear data (e.g., from NuDat or the IAEA chart of nuclides) and add real-time feedback. Can you also do a full QA pass on the module to ensure it meets assessment criteria?"

---

**Technical Prompt:**
> "Build an Atom needs validation constraints based on real nuclear data. Users shouldn't be able to create isotopes outside the known valley of stability, add electrons without corresponding protons in neutral mode, or exceed physical shell capacities. Please add real-time validation with clear feedback messages."

---

**Technical Prompt:**
> "The validation logic isn't catching invalid proton-only configurations. If a user adds protons without neutrons or electrons, the atom should be flagged as unstable or impossible, not left in an undefined state. Can you tighten the validation constraints?"

---

**Technical Prompt:**
> "The Build an Atom validation isn't constraining proton-only configurations. A hydrogen ion (H⁺) with no electron is valid, but adding multiple protons with zero neutrons creates physically impossible nuclei like diprotium. Can you enforce minimum neutron counts based on the valley of stability data?"

---

**Technical Prompt:**
> "The electron configuration validation in Build an Atom needs tightening. When users construct ions, the electron count should be checked against the proton count for charge balance, and the shell-filling order must be enforced so users can't place electrons in higher shells while lower ones remain unfilled."

---

### 3D Atom Visualiser

**Technical Prompt:**
> "Can you port the Three.js atom visualiser from the Eddy Currents module into the Nuclear Decay section? It should show the nucleus with protons and neutrons in a liquid-drop model configuration, plus electron shells. This gives users a consistent 3D visual language across both physics modules."

---

### Decay Chain Diagram

**Technical Prompt:**
> "Please add an interactive decay chain diagram — starting with a parent isotope like U-238 and showing the full sequence of alpha and beta decays through to the stable Pb-206 daughter. Each step should display the decay mode, half-life, and Q-value, with animated transitions between nuclides."

---

### Half-Life Simulator

**Technical Prompt:**
> "I need a half-life simulator where users can set an initial number of atoms and a half-life value, then watch the exponential decay unfold over time. The simulation should display the decay curve graph, show the probabilistic nature of individual atom decay, and update the remaining mass/activity in real time."

---

### Binding Energy per Nucleon Graph

**Technical Prompt:**
> "Please add a Binding Energy per Nucleon (BE/A) graph showing the characteristic curve across the periodic table. This should be an interactive line chart where users can hover over elements to see their BE/A value, helping them understand why iron-56 is the fusion/fission turning point."

---

### Nuclear Data Object

**Technical Prompt:**
> "I need to create a JavaScript object mapping atomic number Z (1-36) to the minimum and maximum number of neutrons (N) for known isotopes of each element. This is for a high school physics project about nuclear stability."

---

## Phase 5: AI Study Assistant (Tutor)

### RAG Pipeline with Document Context

**Technical Prompt:**
> "I want to implement a Retrieval-Augmented Generation (RAG) pipeline for the AI tutor. The system should use my two reference documents (`chapter8_nuclear_ai_reference.md` and `chapter8_nuclear_ai_reference_part2.md`) as the exclusive knowledge base. Can you set up a context-injection system where the prompt explicitly instructs the model to only use the provided document content for answering, with no external knowledge fallback?"

---

### OpenAI API Integration

**Technical Prompt:**
> "Switch the tutor backend to use the OpenAI API with my provided key. The interface shouldn't explicitly label itself as 'AI' — present it as a 'Study Assistant' or similar neutral term. Please also ensure the API key is handled securely (client-side only if necessary, though server-side proxy is preferred)."

---

### Equation Rendering in Chat

**Technical Prompt:**
> "The AI tutor's response stream isn't rendering LaTeX/math equations correctly. When the model returns nuclear equations in markdown format, they need to be intercepted and rendered through KaTeX before display. Can you add a post-processing layer to the chat message renderer that detects LaTeX delimiters and converts them?"

---

**Technical Prompt:**
> "All nuclear decay equations throughout the site need to be rendered with proper mathematical notation. Can you implement KaTeX or MathJax for inline and display equations? Specifically, ensure alpha decay, beta decay, and binding energy equations use standard nuclear physics notation with correct subscripts/superscripts (e.g., {}^{A}_{Z}X → {}^{A-4}_{Z-2}Y + {}^{4}_{2}α)."

---

### RAG Debugging (Knowledge Leakage)

**Technical Prompt:**
> "The RAG system isn't working as intended. When I asked about radioactive decay, the model returned a 'no answer found' response instead of synthesising from the reference documents. The system prompt needs adjustment — it should instruct the model to formulate answers *based on* the document content rather than requiring verbatim quotes. Also, there's a leakage issue where the model is answering general knowledge questions (e.g., 'third planet in solar system') despite the domain constraint. Can you tighten the system prompt and add a guardrail that redirects off-topic queries?"

---

**Technical Prompt:**
> "The AI tutor is still pulling information from its general training data rather than being constrained to the two reference documents. It needs to synthesise answers strictly from the provided nuclear physics material. When the knowledge base doesn't contain the answer, it should say so rather than hallucinating from external knowledge."

---

## Phase 6: QA & Polish

### Equation Formatting (Site-Wide)

**Technical Prompt:**
> "All nuclear decay equations across the site need proper mathematical typesetting. Please implement KaTeX rendering for alpha decay, beta-minus, beta-plus, electron capture, and gamma emission equations, ensuring correct superscript/subscript positioning for mass number A and atomic number Z."

---

### General Website QA

**Technical Prompt:**
> "Apply these changes specifically to the Science Unpacked website instance, ensuring file paths and asset references are correct for that project's directory structure."

---

**Technical Prompt:**
> "Please ensure you're editing the files within the integrated app directory inside the Science Unpacked website, not separate standalone files. The changes need to propagate to the sub-page version that's hosted under the main domain."

---

**Technical Prompt:**
> "The local dev server for the nuclear decay module needs a restart. I'm running it on a specific port — can you spin it back up and confirm the endpoint is serving?"

---

---

*End of Prompt Log*
