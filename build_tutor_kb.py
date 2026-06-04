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
    # Split on ## headings (main sections)
    sections = re.split(r'\n(?=##\s)', text)

    for section in sections:
        section = section.strip()
        if not section:
            continue

        # Extract the main heading
        lines = section.split('\n')
        heading_line = lines[0].strip()
        if heading_line.startswith('#'):
            heading = heading_line.lstrip('#').strip()
        else:
            heading = f"{part_name} — Introduction"

        # Split subsection chunks by ### headings
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
            # Skip TOC and header-only sections
            skip_headings = {'table of contents', 'ai reference document', 'chapter 8',
                             'complete supplementary coverage', 'use alongside part 1',
                             'end of chapter 8 ai reference document'}
            if sub_heading.lower() in skip_headings or body.startswith('## TABLE OF CONTENTS'):
                continue
            if body.count('\n') < 1 and len(body) < 100:
                continue

            # Build keywords from heading
            keywords = []
            clean_heading = re.sub(r'[^\w\s]', ' ', sub_heading.lower())
            for word in clean_heading.split():
                if len(word) > 2 and word not in {'the','and','for','with','from','that','this','are','you','how','what','why','can','has','have','had','was','were','been','being','is','am','are','be','to','of','in','on','at','by','as','it','or','an','a','into','through','during','before','after','above','below','between','under','again','further','then','once','here','there','when','where','why','how','all','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','just','but'}:
                    keywords.append(word)

            # Also add topic keywords from body for important terms
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

print(f"Total chunks: {len(all_chunks)}")
print(f"Part 1 chunks: {len(part1)}")
print(f"Part 2 chunks: {len(part2)}")

# Generate JS file
js_output = """// Auto-generated tutor knowledge base from Chapter 8 AI Reference Documents
// Part 1 + Part 2 — parsed into topical chunks for client-side RAG
const TUTOR_KNOWLEDGE_BASE = """ + json.dumps(all_chunks, ensure_ascii=False) + """;

function retrieveRelevantChunks(question, maxChunks = 5) {
    const lowerQ = question.toLowerCase();
    const qWords = lowerQ.split(/\\s+/).filter(w => w.length > 2);
    const scores = TUTOR_KNOWLEDGE_BASE.map((chunk, idx) => {
        let score = 0;
        // Heading match (high weight)
        const headingLower = chunk.heading.toLowerCase();
        for (const w of qWords) {
            if (headingLower.includes(w)) score += 10;
        }
        // Keyword match
        for (const kw of chunk.keywords) {
            const kwLower = kw.toLowerCase();
            for (const w of qWords) {
                if (kwLower.includes(w) || w.includes(kwLower)) score += 6;
            }
        }
        // Body match
        const bodyLower = chunk.body.toLowerCase();
        for (const w of qWords) {
            if (bodyLower.includes(w)) score += 1;
        }
        // Exact phrase bonus
        if (bodyLower.includes(lowerQ)) score += 20;
        return { idx, score };
    });
    scores.sort((a, b) => b.score - a.score);
    const top = scores.slice(0, maxChunks).filter(s => s.score > 0);
    return top.map(s => TUTOR_KNOWLEDGE_BASE[s.idx]);
}

function buildSystemPrompt(chunks) {
    let context = chunks.map((c, i) => `--- REFERENCE SECTION ${i+1}: ${c.heading} (${c.source}) ---\\n${c.body}`).join('\\n\\n');
    return `You are Eddy, an expert physics tutor for Chapter 8: Nuclear Instability and Radioactive Decay.\\n\\nYou must answer the student's question using ONLY the reference material provided below. Do not use outside knowledge. If the answer is not in the reference material, say: "I don't have enough information in my reference material to answer that. Try rephrasing, or check Sections 8.1–8.9 in the chapter."\\n\\nBe concise but thorough. Use proper physics terminology. When appropriate, mention formulas with their symbols. Format your response in clean paragraphs. Do not make up facts.\\n\\nREFERENCE MATERIAL:\\n\\n${context}`;
}
"""

output_path = '/Users/carterdoessel/Desktop/timesheet-app/science-unpacked/js/tutor-kb.js'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_output)

print(f"Written to {output_path}")
print(f"File size: {len(js_output)} chars")

# Also show a few sample chunks
for i, c in enumerate(all_chunks[:3]):
    print(f"\n--- Chunk {i+1}: {c['heading']} ---")
    print(f"Keywords: {c['keywords']}")
    print(f"Body preview: {c['body'][:120]}...")
