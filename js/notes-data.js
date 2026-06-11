/**
 * Science Unpacked - Notes Data for All Topics
 */

const NOTES_TOPICS = {
    'eddy-currents': {
        title: 'Eddy Currents',
        subtitle: 'Episode 1 - Physics',
        icon: 'fa-magnet',
        color: '#22d3ee',
        sectionCount: 13,
        sections: [
            { id: 'overview', title: 'Overview', content: `
                <p>Eddy current magnetic braking is an application of <strong>electromagnetic induction</strong>. It allows a moving object to be slowed down without the main braking force relying on direct physical contact.</p>
                <p>The key idea is that when a conductor moves through a magnetic field, or when a magnetic field changes near a conductor, the <strong>magnetic flux</strong> through the conductor changes. This induces circulating currents inside the conductor called <strong>eddy currents</strong>. These currents produce their own magnetic fields, which oppose the motion or change that created them.</p>
                <p>This process is explained using two major laws:</p>
                <ul>
                    <li><strong>Faraday's Law</strong> - a changing magnetic flux induces an EMF</li>
                    <li><strong>Lenz's Law</strong> - the induced current acts in a direction that opposes the change producing it</li>
                </ul>
            `},
            { id: 'what-are', title: 'What are eddy currents?', content: `
                <p>Eddy currents are loops of electrical current induced within conductors by a changing magnetic field in the conductor, according to Faraday's law of induction. They flow in closed loops within conductors, perpendicular to the magnetic field.</p>
                <p>Common examples include:</p>
                <ul>
                    <li>A magnet falling slowly through a copper tube</li>
                    <li>Swirling currents in an aluminium fin near a magnet</li>
                    <li>Currents induced in train rails near magnetic brakes</li>
                    <li>The heating element in an induction cooktop</li>
                </ul>
            `},
            { id: 'flux', title: 'Magnetic Flux', content: `
                <p>Magnetic flux (Φ) is a measurement of the total magnetic field passing through a given area. It is calculated as:</p>
                <div class="formula-box">
                    <div class="formula">Φ = BA cos θ</div>
                    <div class="formula-desc">where B = magnetic field strength, A = area, θ = angle between field and normal to surface</div>
                </div>
                <p>For eddy currents to form, the magnetic flux must <strong>change</strong>. This can happen by:</p>
                <ul>
                    <li>Moving the magnet closer or further away</li>
                    <li>Moving the conductor through the field</li>
                    <li>Changing the strength of the magnetic field</li>
                    <li>Changing the orientation (angle θ)</li>
                </ul>
            `},
            { id: 'faraday', title: "Faraday's Law", content: `
                <p>Faraday's Law of Induction states that the induced electromotive force (EMF) in any closed circuit is equal to the negative of the time rate of change of the magnetic flux through the circuit:</p>
                <div class="formula-box">
                    <div class="formula">ε = −ΔΦ / Δt</div>
                    <div class="formula-desc">The faster the flux changes, the greater the induced EMF and current.</div>
                </div>
                <div class="callout">
                    <i class="fas fa-star"></i>
                    <p><strong>Key Point:</strong> Only a <em>changing</em> magnetic field induces eddy currents. A stationary magnet near a conductor produces no current.</p>
                </div>
            `},
            { id: 'lenz', title: "Lenz's Law", content: `
                <p>Lenz's Law gives the direction of the induced current. It states that the current induced in a circuit due to a change in magnetic field is directed to <strong>oppose</strong> the change in flux that produced it.</p>
                <p>This is a consequence of the <strong>conservation of energy</strong> - if the induced current reinforced the change, it would create a positive feedback loop violating energy conservation.</p>
                <p>The 5-step braking process:</p>
                <ol>
                    <li>Magnet approaches conductor</li>
                    <li>Magnetic flux through conductor increases</li>
                    <li>Eddy currents are induced (Faraday's Law)</li>
                    <li>Currents create opposing magnetic field (Lenz's Law)</li>
                    <li>Opposing field repels magnet, slowing it down</li>
                </ol>
            `},
            { id: 'energy', title: 'Energy Transfer', content: `
                <p>The kinetic energy of the moving magnet is converted to electrical energy in the eddy currents, which is then dissipated as heat due to the electrical resistance of the conductor.</p>
                <div class="formula-box">
                    <div class="formula">P = I²R</div>
                    <div class="formula-desc">Power dissipated as heat is proportional to current squared and resistance.</div>
                </div>
                <div class="callout">
                    <i class="fas fa-fire"></i>
                    <p><strong>Joule Heating:</strong> This is why magnetic brakes can overheat during prolonged use - all the kinetic energy becomes thermal energy in the conductor.</p>
                </div>
            `},
            { id: 'low-speed', title: 'Why brakes weaken at low speed', content: `
                <p>Magnetic braking effectiveness depends on the <strong>rate of change of magnetic flux</strong> (ΔΦ/Δt). At low speeds:</p>
                <ul>
                    <li>The magnet moves slowly past the conductor</li>
                    <li>Flux changes very gradually</li>
                    <li>Induced EMF and current are small</li>
                    <li>Braking force is weak</li>
                </ul>
                <p>At <strong>zero speed</strong>, there is no flux change at all, so there is <strong>zero braking force</strong>. This is why magnetic brakes cannot hold a stationary object - they need to be paired with mechanical brakes for complete stopping.</p>
            `},
            { id: 'rollercoaster', title: 'Rollercoaster braking', content: `
                <p>Modern rollercoasters use magnetic brakes as the primary braking system. The design features:</p>
                <ul>
                    <li><strong>Permanent magnets</strong> mounted on the train or track</li>
                    <li><strong>Copper or aluminium fins</strong> on the opposite component</li>
                    <li>No physical contact = no wear and tear</li>
                    <li>Smooth, vibration-free deceleration</li>
                    <li>Speed-proportional braking force</li>
                </ul>
                <p><strong>Advantages:</strong> Reduced maintenance, quieter operation, smoother rider experience, no brake fade from overheating.</p>
                <p><strong>Limitations:</strong> Cannot provide complete stop, requires mechanical backup brakes, less effective at very low speeds.</p>
            `},
            { id: 'trains', title: 'High-speed trains & maglev', content: `
                <p>Maglev (magnetic levitation) trains use electromagnetic forces for both levitation and propulsion:</p>
                <ul>
                    <li><strong>Levitation:</strong> Electromagnets in the train repel against conducting rails, lifting the train above the track</li>
                    <li><strong>Propulsion:</strong> Linear induction motors create moving magnetic fields that pull the train forward</li>
                    <li><strong>Braking:</strong> Eddy current brakes provide contactless deceleration</li>
                </ul>
                <p>Eliminating wheel-rail contact removes friction entirely, allowing speeds over 600 km/h.</p>
            `},
            { id: 'other-apps', title: 'Other applications', content: `
                <p>Beyond braking and transport, eddy currents are used in:</p>
                <ul>
                    <li><strong>Induction cooking</strong> - alternating current in a coil heats ferrous cookware directly</li>
                    <li><strong>Metal detectors</strong> - changing fields induce currents in metallic objects</li>
                    <li><strong>Eddy current testing</strong> - non-destructive inspection for cracks in metal parts</li>
                    <li><strong>Exercise equipment</strong> - magnetic resistance in stationary bikes and rowing machines</li>
                    <li><strong>Coin sorting machines</strong> - different metals respond differently to magnetic fields</li>
                </ul>
            `},
            { id: 'advantages', title: 'Advantages & limitations', content: `
                <table>
                    <thead>
                        <tr><th>Advantages</th><th>Limitations</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>No contact = no wear</td><td>Cannot hold stationary objects</td></tr>
                        <tr><td>No brake fade</td><td>Requires conductive material</td></tr>
                        <tr><td>Smooth deceleration</td><td>Less effective at low speeds</td></tr>
                        <tr><td>Low maintenance</td><td>Can overheat during prolonged use</td></tr>
                        <tr><td>Quiet operation</td><td>Requires backup mechanical brakes</td></tr>
                    </tbody>
                </table>
            `},
            { id: 'summary', title: 'Key takeaway', content: `
                <p>Eddy currents are induced by changing magnetic fields (Faraday's Law) and flow in a direction that opposes the change (Lenz's Law). The kinetic energy of motion is converted to thermal energy through electrical resistance.</p>
                <p>This contactless braking principle is used in rollercoasters, maglev trains, and many other applications where smooth, wear-free deceleration is required.</p>
                <div class="callout">
                    <i class="fas fa-graduation-cap"></i>
                    <p><strong>For your assessment:</strong> Be able to explain the role of Faraday's and Lenz's laws, describe energy transfers, and discuss real-world applications with their advantages and limitations.</p>
                </div>
            `},
            { id: 'bibliography', title: 'Bibliography', content: `
                <ul>
                    <li>Giancoli, D. C. (2014). <em>Physics: Principles with Applications</em> (7th ed.). Pearson.</li>
                    <li>Young, H. D., & Freedman, R. A. (2019). <em>University Physics with Modern Physics</em> (15th ed.). Pearson.</li>
                    <li>PhET Interactive Simulations. (2024). <em>Faraday's Law</em>. University of Colorado Boulder.</li>
                    <li>Student-created interactive simulations and notes.</li>
                </ul>
            `}
        ]
    },
    'nuclear-decay': {
        title: 'Nuclear Instability & Decay',
        subtitle: 'Chapter 8 - Physics Depth Study',
        icon: 'fa-atom',
        color: '#a855f7',
        sectionCount: 9,
        sections: [
            { id: 'overview', title: 'Overview', content: `
                <p>Radioactive decay is the process by which an unstable atomic nucleus loses energy by emitting radiation. A nucleus that has too many protons, too many neutrons, or too much energy will spontaneously transform into a more stable configuration.</p>
                <p>The five main types of radioactive decay are:</p>
                <ul>
                    <li><strong>Alpha decay (α)</strong> — emission of a helium-4 nucleus</li>
                    <li><strong>Beta-minus decay (β⁻)</strong> — neutron converts to a proton, emitting an electron</li>
                    <li><strong>Beta-plus decay (β⁺)</strong> — proton converts to a neutron, emitting a positron</li>
                    <li><strong>Electron capture (EC)</strong> — proton captures an orbital electron</li>
                    <li><strong>Gamma emission (γ)</strong> — emission of a high-energy photon</li>
                </ul>
                <p>Radioactive decay follows first-order kinetics described by the exponential decay equation: <em>N(t) = N₀e^(−λt)</em>.</p>
            `},
            { id: 'instability', title: 'Why Most Nuclei Are Unstable', content: `
                <p>Of approximately 3,300 known nuclides, only about 279 are truly stable. Every other nucleus is on a journey toward a more stable configuration.</p>
                <p>A nucleus is held together by the <strong>strong nuclear force</strong>, an attractive force that acts between all nucleons at distances of about 1–3 femtometres. However, the <strong>electromagnetic repulsion</strong> between protons scales as Z(Z−1) and becomes overwhelming in heavy nuclei.</p>
                <p>For a nucleus to be stable, the binding provided by the strong force must outweigh the disruptive Coulomb repulsion. The balance depends on three numbers: proton count (Z), neutron count (N), and mass number (A = Z + N).</p>
                <div class="callout">
                    <i class="fas fa-balance-scale"></i>
                    <p><strong>Key tension:</strong> Short-range attraction (strong force) versus long-range repulsion (Coulomb force). This is the root cause of nuclear instability.</p>
                </div>
            `},
            { id: 'valley', title: 'The Valley of Stability', content: `
                <p>Stable isotopes cluster along a diagonal band on the chart of nuclides called the <strong>valley of stability</strong>. For light elements (Z ≤ 20), the valley follows approximately N = Z. As Z increases, the valley curves toward the neutron-rich side.</p>
                <p>Nuclides <strong>above</strong> the valley (excess neutrons) tend toward β⁻ decay, converting neutrons to protons. Nuclides <strong>below</strong> the valley (excess protons) tend toward β⁺ decay or electron capture.</p>
                <p>Beyond bismuth (Z = 83), no stable isotopes exist. Heavy nuclides predominantly undergo <strong>alpha decay</strong> to reduce both Z and A simultaneously.</p>
            `},
            { id: 'stability-factors', title: 'What Makes a Nucleus Stable?', content: `
                <p>Four interconnected factors determine nuclear stability:</p>
                <ol>
                    <li><strong>Neutron-to-proton ratio (N/Z):</strong> Increases from ~1.0 for light elements to ~1.5 for heavy elements</li>
                    <li><strong>Even-odd configuration:</strong> Even-even nuclei are most stable; odd-odd are least stable</li>
                    <li><strong>Magic numbers:</strong> 2, 8, 20, 28, 50, 82, 126 confer exceptional stability through the shell model</li>
                    <li><strong>Binding energy per nucleon:</strong> Peaks at iron-56 (~8.79 MeV/nucleon)</li>
                </ol>
                <p>The semi-empirical mass formula combines volume, surface, Coulomb, asymmetry, and pairing terms to estimate nuclear binding energy.</p>
            `},
            { id: 'decay-modes', title: 'How Unstable Nuclei Decay', content: `
                <p><strong>Alpha decay:</strong> Emits a helium-4 nucleus (2p + 2n). Dominant for heavy nuclei (Z > 83). Reduces A by 4 and Z by 2. Fundamentally a quantum tunnelling process.</p>
                <p><strong>Beta-minus decay:</strong> Neutron → proton + electron + antineutrino. Increases Z by 1, A unchanged. Produces continuous energy spectrum (evidence for neutrino).</p>
                <p><strong>Beta-plus decay:</strong> Proton → neutron + positron + neutrino. Decreases Z by 1. Only possible when Q-value exceeds 1.022 MeV (2 × electron rest mass).</p>
                <p><strong>Electron capture:</strong> Proton + orbital electron → neutron + neutrino. Alternative to β⁺ when Q-value is positive but below 1.022 MeV.</p>
                <p><strong>Gamma emission:</strong> Releases high-energy photon from excited nucleus. Changes neither Z nor N. Usually follows α or β decay.</p>
                <div class="formula-box">
                    <div class="formula">Q = (m_parent − m_products)c²</div>
                    <div class="formula-desc">The Q-value is the energy released, appearing as kinetic energy of the products.</div>
                </div>
            `},
            { id: 'decay-chains', title: 'Decay Chains', content: `
                <p>Many heavy radioactive isotopes cannot reach stability through a single decay. Instead they undergo a <strong>decay chain</strong> — a sequence of successive alpha and beta decays until a stable isotope is reached.</p>
                <p>The <strong>uranium-238 series</strong> is the most extensively studied decay chain. It consists of <strong>14 steps</strong> — eight alpha decays and six beta-minus decays — transforming U-238 into stable Pb-206.</p>
                <p>Half-lives within this single chain vary extraordinarily: from 4.47 billion years for U-238 down to 164 microseconds for polonium-214. This variation demonstrates how sensitive decay rates are to nuclear structure and Q-value.</p>
                <div class="callout">
                    <i class="fas fa-link"></i>
                    <p><strong>Secular equilibrium:</strong> When a parent's half-life is much longer than its daughter's, the daughter decays as fast as it is produced, and their activities become equal.</p>
                </div>
            `},
            { id: 'half-life', title: 'Half-Life and Activity', content: `
                <p><strong>Half-life (t½)</strong> is the time required for half the radioactive nuclei in a sample to decay. It is related to the decay constant λ by:</p>
                <div class="formula-box">
                    <div class="formula">t½ = ln(2) / λ ≈ 0.693 / λ</div>
                </div>
                <p><strong>Activity (A)</strong> is the rate of decay, measured in becquerels (Bq = decays/second) or curies (Ci = 3.7 × 10¹⁰ Bq):</p>
                <div class="formula-box">
                    <div class="formula">A = λN = A₀e^(−λt)</div>
                </div>
                <p>Radioactive decay is <strong>independent of temperature, pressure, chemical environment, and age</strong>. It is a purely nuclear process.</p>
                <p>The <strong>mean lifetime (τ)</strong> is the average time a nucleus exists before decaying: τ = 1/λ = t½ / ln(2).</p>
            `},
            { id: 'applications', title: 'Applications', content: `
                <p><strong>Nuclear medicine:</strong> Technetium-99m is used in ~80% of all nuclear medicine scans. Fluorine-18 enables PET scans through positron emission.</p>
                <p><strong>Radiometric dating:</strong> Carbon-14 dating (t½ = 5730 years) for organic materials up to ~50,000 years old. Uranium-lead dating for geological timescales.</p>
                <p><strong>Smoke detectors:</strong> Americium-241 emits alpha particles to ionise air. Smoke disrupts the ionisation current, triggering the alarm.</p>
                <p><strong>Industrial gauges:</strong> Beta radiation monitors thickness of paper, metal, and plastic during manufacturing.</p>
                <p><strong>Nuclear energy:</strong> Controlled fission of U-235 in reactors provides ~10% of global electricity.</p>
            `},
            { id: 'summary', title: 'Chapter Summary', content: `
                <p>Nuclear stability depends on the balance between the strong nuclear force and electromagnetic repulsion. The valley of stability shows where stable isotopes cluster, with the N/Z ratio increasing from ~1.0 to ~1.5 as atomic number grows.</p>
                <p>Unstable nuclei decay through alpha, beta-minus, beta-plus, electron capture, or gamma emission — each changing the nucleus in characteristic ways. Decay chains allow heavy nuclei to reach stability through multiple steps.</p>
                <p>Half-life is an intrinsic property of each radioisotope, governing exponential decay and enabling applications from medical imaging to geological dating.</p>
                <div class="callout">
                    <i class="fas fa-graduation-cap"></i>
                    <p><strong>For your assessment:</strong> Be able to explain why nuclei decay, describe all five decay modes with equations, calculate Q-values, explain the valley of stability, and discuss real-world applications of radioactivity.</p>
                </div>
            `}
        ]
    }
};
