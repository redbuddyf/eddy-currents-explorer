/**
 * Science Unpacked - Quiz Data for All Topics
 */

const QUIZ_TOPICS = {
    'eddy-currents': {
        title: 'Eddy Currents',
        subtitle: 'How well do you understand electromagnetic induction?',
        icon: 'fa-magnet',
        color: '#6366f1',
        questionCount: 10,
        timeEstimate: '~5 Minutes',
        questions: [
            {
                question: "What causes eddy currents to form in a conductor?",
                options: ["Static magnetic fields", "Changing magnetic fields", "High temperatures only", "Direct current electricity"],
                correct: 1,
                explanation: "Eddy currents are induced by changing magnetic fields, according to Faraday's Law of Electromagnetic Induction."
            },
            {
                question: "According to Lenz's Law, the direction of induced eddy currents will:",
                options: ["Reinforce the change that caused them", "Oppose the change that caused them", "Flow in random directions", "Always flow clockwise"],
                correct: 1,
                explanation: "Lenz's Law states that the induced current flows in a direction that opposes the change that produced it - a consequence of conservation of energy."
            },
            {
                question: "What happens to the kinetic energy of a magnet falling through a copper tube due to eddy currents?",
                options: ["It is completely lost", "It is converted to electrical energy", "It is converted to heat", "It remains unchanged"],
                correct: 2,
                explanation: "The kinetic energy is converted to thermal energy (heat) due to the electrical resistance of the conductor as eddy currents flow through it."
            },
            {
                question: "Which application uses eddy currents for braking without friction?",
                options: ["Disc brakes in cars", "Magnetic brakes on roller coasters", "Air brakes on trucks", "Drum brakes on bicycles"],
                correct: 1,
                explanation: "Magnetic brakes on roller coasters use powerful magnets and conductive tracks. Eddy currents create an opposing magnetic field that slows the train smoothly without physical contact."
            },
            {
                question: "How do maglev trains use eddy currents?",
                options: ["Only for propulsion", "Only for levitation", "For both levitation and propulsion", "For air conditioning"],
                correct: 2,
                explanation: "Maglev trains use eddy currents for both levitation (floating above the track) and propulsion (moving forward), eliminating friction entirely."
            },
            {
                question: "What material property affects the strength of eddy currents?",
                options: ["Color", "Electrical conductivity", "Density", "Transparency"],
                correct: 1,
                explanation: "Electrical conductivity determines how easily eddy currents can flow. Higher conductivity means stronger eddy currents and more significant effects."
            },
            {
                question: "How can unwanted eddy currents be reduced in transformer cores?",
                options: ["By using solid iron cores", "By using laminated (layered) cores", "By increasing the temperature", "By using plastic cores"],
                correct: 1,
                explanation: "Laminated cores are made of thin sheets insulated from each other. This breaks up the large eddy current loops into smaller, less efficient ones, reducing energy loss."
            },
            {
                question: "In induction heating, what determines the depth of heating in the material?",
                options: ["The color of the metal", "The frequency of the alternating current", "The room temperature", "The shape of the coil only"],
                correct: 1,
                explanation: "Higher frequency alternating currents produce eddy currents that concentrate near the surface (skin effect), while lower frequencies penetrate deeper into the material."
            },
            {
                question: "What happens when a strong magnet is dropped through a vertical copper pipe?",
                options: ["It falls at normal speed", "It falls faster than normal", "It falls much slower than normal", "It gets stuck completely"],
                correct: 2,
                explanation: "The eddy currents induced in the copper pipe create an opposing magnetic field that significantly slows the magnet's fall, often making it appear to 'float' down."
            },
            {
                question: "Which physical law explains why eddy currents create an opposing magnetic field?",
                options: ["Newton's First Law", "Ohm's Law", "Faraday's Law and Lenz's Law", "Archimedes' Principle"],
                correct: 2,
                explanation: "Faraday's Law explains that changing magnetic fields induce currents, while Lenz's Law explains that these currents flow in a direction to oppose the change."
            }
        ]
    },
    'nuclear-decay': {
        title: 'Nuclear Instability & Decay',
        subtitle: 'Test your understanding of radioactive decay, half-life, and nuclear stability.',
        icon: 'fa-atom',
        color: '#a855f7',
        questionCount: 10,
        timeEstimate: '~6 Minutes',
        questions: [
            {
                question: "What is the primary force that holds protons and neutrons together in the nucleus?",
                options: ["Electromagnetic force", "Gravitational force", "Strong nuclear force", "Weak nuclear force"],
                correct: 2,
                explanation: "The strong nuclear force binds protons and neutrons together. It is approximately 100 times stronger than electromagnetic repulsion at distances of 1-3 femtometres."
            },
            {
                question: "In alpha decay, what particle is emitted from the nucleus?",
                options: ["An electron", "A helium-4 nucleus (2 protons + 2 neutrons)", "A high-energy photon", "A neutron"],
                correct: 1,
                explanation: "Alpha decay emits a helium-4 nucleus consisting of 2 protons and 2 neutrons. This reduces the parent nucleus's mass number by 4 and atomic number by 2."
            },
            {
                question: "What happens to the atomic number Z during beta-minus (β⁻) decay?",
                options: ["It decreases by 1", "It stays the same", "It increases by 1", "It decreases by 2"],
                correct: 2,
                explanation: "In β⁻ decay, a neutron converts into a proton, emitting an electron and antineutrino. Since Z counts protons, the atomic number increases by 1 while mass number A stays the same."
            },
            {
                question: "The valley of stability refers to the region where:",
                options: ["Nuclei have the highest binding energy per nucleon", "Nuclei are most likely to be stable", "Nuclear fission is most efficient", "Fusion reactions release the most energy"],
                correct: 1,
                explanation: "The valley of stability is the region on the chart of nuclides where stable isotopes cluster. Isotopes away from this valley tend to decay toward it."
            },
            {
                question: "What is the half-life of a radioactive isotope?",
                options: ["The time for all nuclei to decay", "The time for half the nuclei in a sample to decay", "The average lifetime of a single nucleus", "The time for activity to reach zero"],
                correct: 1,
                explanation: "Half-life is the time required for half of the radioactive nuclei in a sample to decay. It is constant for each isotope and independent of external conditions."
            },
            {
                question: "Which of the following is a 'magic number' of protons or neutrons that confers exceptional stability?",
                options: ["10", "28", "35", "100"],
                correct: 1,
                explanation: "28 is one of the magic numbers (2, 8, 20, 28, 50, 82, 126). Nuclei with magic numbers of protons or neutrons have complete nuclear shells and exceptional stability."
            },
            {
                question: "Gamma (γ) emission changes which of the following?",
                options: ["Proton number Z", "Neutron number N", "Mass number A", "None of the above"],
                correct: 3,
                explanation: "Gamma emission releases only a high-energy photon. It changes neither Z, N, nor A — it simply allows an excited nucleus to shed excess energy and transition to a lower energy state."
            },
            {
                question: "What is the approximate binding energy per nucleon of iron-56 (⁵⁶Fe), the most stable nucleus?",
                options: ["~4.5 MeV", "~6.2 MeV", "~8.8 MeV", "~12.5 MeV"],
                correct: 2,
                explanation: "Iron-56 has a binding energy per nucleon of approximately 8.79 MeV, the highest of any nuclide. This makes it the most stable nucleus and the turning point between fusion and fission."
            },
            {
                question: "Electron capture is an alternative decay mode to which process?",
                options: ["Alpha decay", "Beta-minus decay", "Beta-plus decay", "Gamma emission"],
                correct: 2,
                explanation: "Electron capture provides an alternative pathway to β⁺ decay. Both processes convert a proton to a neutron, but electron capture absorbs an orbital electron instead of emitting a positron."
            },
            {
                question: "The Geiger-Nuttall law relates which two quantities in alpha decay?",
                options: ["Mass number and atomic number", "Decay energy (Q-value) and half-life", "Temperature and decay rate", "Neutron number and proton number"],
                correct: 1,
                explanation: "The Geiger-Nuttall law states that higher alpha decay energy corresponds to much shorter half-life. A factor of 2 in Q-value can produce a difference of 20 orders of magnitude in half-life."
            }
        ]
    }
};

// Helper to get topic by key
function getQuizTopic(key) {
    return QUIZ_TOPICS[key] || null;
}
