#!/usr/bin/env python3
"""
Parse both Chapter 8 AI reference documents into structured JS knowledge chunks
for the client-side RAG tutor.
"""

import re
import json

def parse_markdown(path, part_name):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    chunks = []
    sections = re.split(r'\n(?=##\s)', text)

    for section in sections:
        section = section.strip()
        if not section:
            continue

        lines = section.split('\n')
        heading_line = lines[0].strip()
        if heading_line.startswith('#'):
            heading = heading_line.lstrip('#').strip()
        else:
            heading = f"{part_name} — Introduction"

        subsections = re.split(r'\n(?=###\s)', section)

        for sub in subsections:
            sub = sub.strip()
            if not sub:
                continue

            sub_lines = sub.split('\n')
            sub_heading = heading
            body_start = 0
            if sub_lines[0].startswith('###'):
                sub_heading = sub_lines[0].lstrip('#').strip()
                body_start = 1

            body = '\n'.join(sub_lines[body_start:]).strip()
            if not body or len(body) < 60:
                continue
            skip_headings = {'table of contents', 'ai reference document', 'chapter 8',
                             'complete supplementary coverage', 'use alongside part 1',
                             'end of chapter 8 ai reference document'}
            if sub_heading.lower() in skip_headings or body.startswith('## TABLE OF CONTENTS'):
                continue
            if body.count('\n') < 1 and len(body) < 100:
                continue

            keywords = []
            clean_heading = re.sub(r'[^\w\s]', ' ', sub_heading.lower())
            for word in clean_heading.split():
                if len(word) > 2 and word not in {'the','and','for','with','from','that','this','are','you','how','what','why','can','has','have','had','was','were','been','being','is','am','are','be','to','of','in','on','at','by','as','it','or','an','a','into','through','during','before','after','above','below','between','under','again','further','then','once','here','there','when','where','why','how','all','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','just','but','does'}:
                    keywords.append(word)

            topic_keywords = {
                'alpha decay': ['alpha decay', 'alpha particle', 'α decay'],
                'beta decay': ['beta decay', 'beta-minus', 'beta-plus', 'β⁻', 'β⁺', 'electron capture'],
                'gamma': ['gamma emission', 'gamma decay', 'gamma ray'],
                'half-life': ['half-life', 'half life', 't½', 't_1/2', 'decay constant'],
                'activity': ['activity', 'becquerel', 'curie', 'bq', 'ci'],
                'binding energy': ['binding energy', 'be/a', 'mass defect'],
                'semf': ['semf', 'semi-empirical', 'weizsäcker', 'liquid drop'],
                'shell model': ['shell model', 'magic number', 'magic numbers', 'goeppert mayer'],
                'valley of stability': ['valley of stability', 'valley', 'band of stability'],
                'strong force': ['strong nuclear force', 'strong force', 'coulomb'],
                'neutrino': ['neutrino', 'antineutrino', 'pauli'],
                'quantum tunnelling': ['quantum tunnelling', 'tunnel', 'gamow', 'geiger-nuttall'],
                'u-238': ['u-238', 'uranium-238', 'uranium series', 'decay chain'],
                'carbon-14': ['carbon-14', 'c-14', 'radiocarbon', 'radiocarbon dating'],
                'tc-99m': ['tc-99m', 'technetium-99m', 'technetium'],
                'pet': ['pet', 'positron emission', 'fdg', 'fluorine-18'],
                'fission': ['fission', 'spontaneous fission', 'induced fission'],
                'fusion': ['fusion', 'nuclear fusion'],
                'reactor': ['reactor', 'nuclear reactor', 'u-235', 'enrichment'],
                'radiation': ['radiation', 'penetration', 'shielding', 'alpha', 'beta', 'gamma'],
                'dose': ['dose', 'gray', 'sievert', 'gy', 'sv', 'absorbed dose'],
                'q-value': ['q-value', 'q value', 'spontaneity'],
                'parity': ['parity', 'parity violation', 'chien-shiung wu', 'wu experiment'],
                'secular equilibrium': ['secular equilibrium', 'transient equilibrium'],
                'isotope': ['isotope', 'isobar', 'isotone', 'isomer'],
                'n/z': ['n/z', 'neutron to proton', 'n/z ratio'],
                'pairing': ['pairing', 'even-even', 'odd-odd', 'even-odd'],
                'nuclear radius': ['nuclear radius', 'nuclear density'],
                'dating': ['dating', 'radiometric dating', 'age equation'],
                'applications': ['application', 'medicine', 'smoke detector', 'americium'],
                'conservation': ['conservation', 'baryon number', 'lepton number'],
                'historical': ['becquerel', 'curie', 'rutherford', 'fermi', 'meitner', 'hahn'],
                'exam': ['exam', 'trap', 'misconception'],
                'radioactive decay': ['radioactive decay', 'radioactivity', 'decay mode', 'decay modes', 'unstable nucleus', 'unstable nuclei'],
                'nuclear instability': ['nuclear instability', 'why nuclei decay', 'why do nuclei decay'],
                'forces': ['strong nuclear force', 'coulomb repulsion', 'electromagnetic force', 'weak nuclear force'],
            }

            body_lower = body.lower()
            extra_keywords = []
            for topic, terms in topic_keywords.items():
                for term in terms:
                    if term in body_lower:
                        extra_keywords.append(topic)
                        break

            all_keywords = list(dict.fromkeys(keywords + extra_keywords))

            chunks.append({
                'heading': sub_heading,
                'body': body,
                'keywords': all_keywords,
                'source': part_name,
            })

    return chunks

# Parse both documents
part1 = parse_markdown('/Users/carterdoessel/Downloads/files/chapter8_nuclear_ai_reference.md', 'Part 1')
part2 = parse_markdown('/Users/carterdoessel/Downloads/files/chapter8_nuclear_ai_reference_part2.md', 'Part 2')
all_chunks = part1 + part2

# Add synthetic overview chunks for common questions that the documents don't answer directly
synthetic_overviews = [
    {
        'heading': 'Overview: What is Radioactive Decay?',
        'body': 'Radioactive decay is the process by which an unstable atomic nucleus loses energy by emitting radiation. A nucleus that is unstable because it has too many protons, too many neutrons, or too much energy will spontaneously transform into a more stable configuration by emitting particles or photons.\n\nThe five main types of radioactive decay are:\n1. **Alpha decay (α)** — emission of a helium-4 nucleus (2 protons + 2 neutrons)\n2. **Beta-minus decay (β⁻)** — a neutron converts to a proton, emitting an electron and antineutrino\n3. **Beta-plus decay (β⁺)** — a proton converts to a neutron, emitting a positron and neutrino\n4. **Electron capture (EC)** — a proton captures an inner orbital electron, converting to a neutron\n5. **Gamma emission (γ)** — emission of a high-energy photon from an excited nucleus\n\nRadioactive decay is a random process at the level of individual atoms, but for large samples it follows predictable statistical laws described by the exponential decay equation: N(t) = N₀e^(−λt). The half-life (t½) is the time required for half the radioactive nuclei in a sample to decay.',
        'keywords': ['radioactive decay', 'radioactivity', 'what is radioactive decay', 'unstable nucleus', 'emission', 'radiation', 'alpha decay', 'beta decay', 'gamma emission', 'half-life', 'exponential decay'],
        'source': 'Synthesis'
    },
    {
        'heading': 'Overview: Why Do Nuclei Decay?',
        'body': 'Nuclei decay because they are unstable — the balance between the attractive strong nuclear force and the repulsive electromagnetic (Coulomb) force is disrupted.\n\nOf approximately 3,300 known nuclides, only about 279 are stable. The rest are radioactive and will eventually decay toward more stable configurations.\n\nKey reasons for instability:\n- **Too many protons**: Coulomb repulsion scales as Z(Z−1) and becomes overwhelming in heavy nuclei\n- **Wrong neutron-to-proton ratio**: The optimal N/Z ratio increases from ~1.0 for light elements to ~1.5 for heavy elements near lead\n- **Odd-odd configuration**: Nuclei with odd numbers of both protons and neutrons are less stable (only 4 stable odd-odd nuclei exist: ¹H, ⁶Li, ¹⁰B, ¹⁴N)\n- **Excess energy**: Even stable nuclei can be created in excited states that decay via gamma emission\n\nThe strong nuclear force binds nucleons together but has a very short range (~1–3 fm). Beyond this range, the infinite-range Coulomb repulsion between protons dominates, making heavy nuclei inherently unstable.',
        'keywords': ['why do nuclei decay', 'unstable', 'instability', 'strong force', 'coulomb', 'n/z ratio', 'odd-odd'],
        'source': 'Synthesis'
    },
    {
        'heading': 'Overview: What is the Valley of Stability?',
        'body': 'The valley of stability is a curved band on a plot of neutron number (N) versus proton number (Z) where stable isotopes cluster. It is one of the most important concepts in nuclear physics for predicting decay modes.\n\nKey features:\n- For light elements (Z ≤ 20), stable isotopes lie near the N = Z line\n- For heavier elements, the valley curves toward the neutron-rich side (N > Z) because extra neutrons are needed to offset growing Coulomb repulsion\n- No stable isotopes exist for elements beyond bismuth (Z = 83)\n\nPredicting decay from position:\n- **Above the valley** (too many neutrons): undergo β⁻ decay → converts neutron to proton\n- **Below the valley** (too many protons): undergo β⁺ decay or electron capture → converts proton to neutron\n- **Far below, heavy nucleus**: undergo α decay → reduces both N and Z by 2\n- **On the valley but excited**: undergo γ emission → releases excess energy only\n\nThe valley ends at lead (Z = 82), beyond which all isotopes are radioactive. Some very heavy isotopes like uranium-238 have half-lives comparable to Earth\'s age (~4.5 billion years) and are still found in nature.',
        'keywords': ['valley of stability', 'valley', 'band of stability', 'n-z plot', 'predict decay', 'above valley', 'below valley'],
        'source': 'Synthesis'
    },
    {
        'heading': 'Overview: Nuclear Forces and Stability',
        'body': 'Three fundamental forces govern nuclear behavior:\n\n1. **Strong nuclear force** — binds protons and neutrons together. It is ~100× stronger than electromagnetism at distances of ~1 fm, but has a very short range (~1–3 fm). It acts equally between all nucleon pairs (p-p, n-n, p-n). Below ~0.5 fm it becomes repulsive (the "hard core"), preventing nuclear collapse.\n\n2. **Electromagnetic force** — causes Coulomb repulsion between protons. It is infinite-range and scales as Z(Z−1), meaning the total repulsion grows rapidly as more protons are added. This is why heavy nuclei need extra neutrons.\n\n3. **Weak nuclear force** — mediates beta decay by converting protons to neutrons and vice versa. It is ~10⁶ times weaker than the strong force and has an extremely short range (~0.001 fm). It is the only force that can change quark flavour.\n\n**Root cause of instability**: The strong force is short-range and saturates (each nucleon only interacts with nearest neighbours), while Coulomb repulsion is long-range and grows without limit. When Coulomb repulsion exceeds the binding capacity of the strong force, the nucleus becomes unstable and decays.',
        'keywords': ['strong force', 'coulomb', 'weak force', 'nuclear forces', 'electromagnetic', 'repulsion', 'binding'],
        'source': 'Synthesis'
    },
    {
        'heading': 'Overview: Half-Life and Activity',
        'body': 'Radioactive decay follows **first-order kinetics**: the rate of decay is proportional to the number of radioactive nuclei present.\n\n**Key equations:**\n- N(t) = N₀ e^(−λt)  — number of nuclei remaining after time t\n- t½ = ln(2) / λ ≈ 0.693 / λ  — half-life in terms of decay constant\n- A = λN  — activity (decays per second), measured in becquerels (Bq)\n- 1 curie (Ci) = 3.70 × 10¹⁰ Bq\n\n**Important properties:**\n- Half-life is an intrinsic nuclear property — it does NOT depend on temperature, pressure, chemical environment, or sample age\n- After n half-lives, the fraction remaining is (1/2)ⁿ\n- Mean lifetime τ = 1/λ = t½ / ln(2) ≈ 1.443 × t½\n\n**Example half-lives:**\n- Carbon-14: 5,730 years (radiocarbon dating)\n- Uranium-238: 4.47 × 10⁹ years (geological dating)\n- Technetium-99m: 6.0 hours (nuclear medicine)\n- Polonium-212: 0.3 microseconds (fastest alpha emitter)',
        'keywords': ['half-life', 'activity', 'decay constant', 'lambda', 'exponential decay', 'becquerel', 'curie', 'mean lifetime'],
        'source': 'Synthesis'
    },
    {
        'heading': 'Overview: Applications of Radioactivity',
        'body': 'Radioactivity has numerous important applications across medicine, industry, and science:\n\n**Nuclear Medicine:**\n- **Technetium-99m** (t½ = 6 h, γ emitter): used in ~80% of nuclear medicine scans for imaging bones, heart, and other organs\n- **Fluorine-18** (t½ = 110 min, β⁺ emitter): used in PET scanning to detect cancers by imaging metabolic activity\n- **Iodine-131** (t½ = 8 days, β⁻ + γ): used to diagnose and treat thyroid conditions\n- **Cobalt-60** (t½ = 5.27 years, β⁻ + γ): used in cancer radiotherapy\n\n**Dating:**\n- **Carbon-14 dating**: measures the remaining ¹⁴C in organic materials up to ~50,000 years old\n- **Uranium-lead dating**: measures the Pb-206/U-238 ratio in rocks for geological timescales (millions to billions of years)\n\n**Other Applications:**\n- **Smoke detectors**: Americium-241 (α emitter) ionises air; smoke reduces ionisation and triggers the alarm\n- **Nuclear power**: Induced fission of U-235 in controlled chain reactions provides ~10% of global electricity\n- **Sterilisation**: Gamma radiation from Co-60 is used to sterilise medical equipment and food',
        'keywords': ['applications', 'nuclear medicine', 'pet scan', 'tc-99m', 'carbon-14 dating', 'radiocarbon', 'smoke detector', 'nuclear power', 'reactor'],
        'source': 'Synthesis'
    },
]

all_chunks = synthetic_overviews + all_chunks

print(f"Total chunks: {len(all_chunks)}")
print(f"Synthetic chunks: {len(synthetic_overviews)}")
print(f"Part 1 chunks: {len(part1)}")
print(f"Part 2 chunks: {len(part2)}")

js_output = """// Auto-generated tutor knowledge base from Chapter 8 AI Reference Documents
// Part 1 + Part 2 + synthetic overviews — parsed into topical chunks for client-side RAG
const TUTOR_KNOWLEDGE_BASE = """ + json.dumps(all_chunks, ensure_ascii=False) + """;

// Common question words that should not count heavily in heading matches
const QUESTION_WORDS = new Set(['what','how','why','when','where','who','which','does','did','do','can','could','would','should','will','is','are','was','were','am','be','been','being','have','has','had','get','got','explain','describe','tell','give']);

function retrieveRelevantChunks(question, maxChunks = 5) {
    const lowerQ = question.toLowerCase();
    const qWords = lowerQ.split(/\\s+/).filter(w => w.length > 2);
    const qWordsNoQuestions = qWords.filter(w => !QUESTION_WORDS.has(w));
    
    const scores = TUTOR_KNOWLEDGE_BASE.map((chunk, idx) => {
        let score = 0;
        const headingLower = chunk.heading.toLowerCase();
        const bodyLower = chunk.body.toLowerCase();
        
        // Heading match — high weight, but ignore common question words
        for (const w of qWordsNoQuestions) {
            if (headingLower.includes(w)) score += 10;
        }
        // Bonus if heading contains a multi-word phrase from the question
        for (let i = 0; i < qWordsNoQuestions.length - 1; i++) {
            const phrase = qWordsNoQuestions[i] + ' ' + qWordsNoQuestions[i+1];
            if (headingLower.includes(phrase)) score += 15;
        }
        
        // Keyword match
        for (const kw of chunk.keywords) {
            const kwLower = kw.toLowerCase();
            for (const w of qWords) {
                if (kwLower.includes(w) || w.includes(kwLower)) score += 6;
            }
            // Multi-word keyword bonus
            for (let i = 0; i < qWords.length - 1; i++) {
                const phrase = qWords[i] + ' ' + qWords[i+1];
                if (kwLower.includes(phrase)) score += 10;
            }
        }
        
        // Body match — increased weight for definitional content
        for (const w of qWords) {
            if (bodyLower.includes(w)) score += 2;
        }
        
        // Exact phrase bonus in body
        for (let i = 0; i < qWords.length - 1; i++) {
            const phrase = qWords[i] + ' ' + qWords[i+1];
            if (bodyLower.includes(phrase)) score += 5;
        }
        
        // Exact full question bonus
        if (bodyLower.includes(lowerQ)) score += 25;
        
        // Boost synthetic overview chunks slightly for broad questions
        if (chunk.source === 'Synthesis' && chunk.heading.startsWith('Overview:')) {
            score *= 1.2;
        }
        
        return { idx, score };
    });
    scores.sort((a, b) => b.score - a.score);
    const top = scores.slice(0, maxChunks).filter(s => s.score > 0);
    return top.map(s => TUTOR_KNOWLEDGE_BASE[s.idx]);
}

function buildSystemPrompt(chunks) {
    let context = chunks.map((c, i) => `--- REFERENCE SECTION ${i+1}: ${c.heading} (${c.source}) ---\\n${c.body}`).join('\\n\\n');
    return `You are Eddy, a physics tutor for Chapter 8: Nuclear Instability and Radioactive Decay.\\n\\nAnswer the student's question using the reference material provided below as your primary source. If the reference material does not fully cover the answer, you may supplement with general physics knowledge about nuclear decay, but always stay within the scope of Chapter 8 and do not make up specific facts, numbers, or formulas that are not in the material.\\n\\nCRITICAL: Use LaTeX math formatting for ALL equations. Use \\$...\\$ for inline math and \\$\\$...\\$\\$ for display equations. Examples:\\n- Inline: The decay law is \\$N(t) = N_0 e^{{-\\lambda t}}\\$\\n- Display: \\$\\$Q = (m_{{\\text{{parent}}}} - m_{{\\text{{daughter}}}} - m_{{\\alpha}}) \\times 931.5\\ \\text{{MeV/u}}\\$\\$\\n\\nUse proper LaTeX commands: \\times, \\frac{{a}}{{b}}, \\sqrt{{x}}, \\lambda, \\alpha, \\beta, \\gamma, \\nu, \\bar{{\\nu}}, \\pm, \\approx, \\rightarrow, \\propto, subscripts with _, superscripts with ^, text mode with \\text{{}}.\\n\\nBe concise but thorough. Format your response in clean paragraphs. Do not make up facts.\\n\\nREFERENCE MATERIAL:\\n\\n${context}`;
}
"""

output_path = '/Users/carterdoessel/Desktop/timesheet-app/science-unpacked/js/tutor-kb.js'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_output)

print(f"Written to {output_path}")
print(f"File size: {len(js_output)} chars")

# Test retrieval
for q in ['What is radioactive decay?', 'Why do nuclei decay?', 'Explain half-life', 'What is alpha decay?']:
    import subprocess
    result = subprocess.run(['node', '-e', f'''
const fs = require("fs");
eval(fs.readFileSync("{output_path}", "utf8"));
const chunks = retrieveRelevantChunks("{q}", 3);
console.log("Q: {q}");
chunks.forEach((c,i) => console.log("  " + (i+1) + ". " + c.heading + " (score source: " + c.source + ")"));
'''], capture_output=True, text=True)
    print(result.stdout.strip())
    if result.stderr:
        print("ERR:", result.stderr.strip())
