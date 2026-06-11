/**
 * Science Unpacked - Dynamic Notes Viewer
 */

'use strict';

let currentNotesTopic = null;

function initNotesViewer() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    
    if (topic && NOTES_TOPICS[topic]) {
        loadNotesTopic(topic);
    } else {
        showTopicSelector();
    }
}

function showTopicSelector() {
    document.getElementById('topicScreen').style.display = 'block';
    document.getElementById('notesViewer').style.display = 'none';
}

function loadNotesTopic(topicKey) {
    const data = NOTES_TOPICS[topicKey];
    if (!data) return;
    
    currentNotesTopic = topicKey;
    
    // Update hero
    document.getElementById('notesHeroTag').textContent = data.subtitle;
    document.getElementById('notesHeroTitle').textContent = data.title + ' - Study Notes';
    
    // Build TOC
    const tocList = document.getElementById('notesToc');
    tocList.innerHTML = data.sections.map((s, i) => 
        `<li><a href="#${s.id}" class="${i === 0 ? 'active' : ''}" onclick="highlightToc('${s.id}')">${s.title}</a></li>`
    ).join('');
    
    // Build content
    const mainContent = document.getElementById('notesMain');
    mainContent.innerHTML = data.sections.map(s => `
        <article class="note-section" id="${s.id}">
            <h2><i class="fas fa-book-open"></i> ${s.title}</h2>
            ${s.content}
        </article>
    `).join('');
    
    // Show viewer
    document.getElementById('topicScreen').style.display = 'none';
    document.getElementById('notesViewer').style.display = 'block';
    document.getElementById('notesContent').style.display = 'block';
    
    // Scroll to hash if present
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
    
    // Setup scroll spy
    setupScrollSpy(data.sections);
}

function highlightToc(id) {
    document.querySelectorAll('.toc-list a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.toc-list a[href="#${id}"]`);
    if (link) link.classList.add('active');
}

function setupScrollSpy(sections) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                highlightToc(entry.target.id);
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    
    sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
    });
}

function backToNotesTopics() {
    window.location.href = 'notes.html';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initNotesViewer);
