/**
 * Cross-page persistent audio player for Science Unpacked
 * Saves playback state to localStorage so audio continues across page navigations
 */
(function() {
    'use strict';
    
    const AUDIO_KEY = 'science-unpacked-audio';
    const UPDATE_INTERVAL = 500; // ms
    
    // Detect base path (for pages in subdirectories like app/ or eddy-currents-app/)
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/app/') || path.includes('/eddy-currents-app/')) {
            return '../';
        }
        return '';
    }
    
    // Create mini player bar if it doesn't exist
    function createMiniPlayer() {
        if (document.getElementById('mini-audio-player')) return;
        
        const bar = document.createElement('div');
        bar.id = 'mini-audio-player';
        bar.innerHTML = `
            <div class="mini-player-inner">
                <button id="mini-play-btn" class="mini-btn"><i class="fas fa-pause"></i></button>
                <div class="mini-info">
                    <span class="mini-title">Eddy Currents Explained</span>
                    <span class="mini-ep">Episode 1</span>
                </div>
                <audio id="mini-audio" preload="none"></audio>
                <a href="${getBasePath()}podcast.html" class="mini-link"><i class="fas fa-expand"></i></a>
                <button id="mini-close-btn" class="mini-btn close"><i class="fas fa-times"></i></button>
            </div>
        `;
        document.body.appendChild(bar);
        
        // Inject styles
        if (!document.getElementById('mini-player-styles')) {
            const style = document.createElement('style');
            style.id = 'mini-player-styles';
            style.textContent = `
                #mini-audio-player {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(15,23,42,0.95);
                    backdrop-filter: blur(12px);
                    border-top: 1px solid #1e293b;
                    padding: 12px 24px;
                    z-index: 9999;
                    transform: translateY(100%);
                    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
                }
                #mini-audio-player.active { transform: translateY(0); }
                .mini-player-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .mini-btn {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: linear-gradient(135deg,#6366f1,#8b5cf6);
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s, opacity 0.2s;
                }
                .mini-btn:hover { transform: scale(1.08); }
                .mini-btn.close { background: #334155; }
                .mini-info { display: flex; flex-direction: column; flex: 1; min-width: 0; }
                .mini-title { color: #f1f5f9; font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .mini-ep { color: #94a3b8; font-size: 0.75rem; }
                .mini-link { color: #94a3b8; text-decoration: none; padding: 8px; transition: color 0.2s; }
                .mini-link:hover { color: #f1f5f9; }
                @media (max-width: 640px) {
                    #mini-audio-player { padding: 10px 16px; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function init() {
        createMiniPlayer();
        
        const bar = document.getElementById('mini-audio-player');
        const audio = document.getElementById('mini-audio');
        const playBtn = document.getElementById('mini-play-btn');
        const closeBtn = document.getElementById('mini-close-btn');
        if (!audio || !playBtn) return;
        
        const basePath = getBasePath();
        const audioSrc = basePath + 'assets/audio/episode1.mp3';
        audio.src = audioSrc;
        
        // Restore state
        const state = JSON.parse(localStorage.getItem(AUDIO_KEY) || '{}');
        if (state.src) {
            // Normalize stored src to current base path
            audio.src = audioSrc;
        }
        if (state.currentTime) {
            audio.currentTime = state.currentTime;
        }
        
        if (state.isPlaying) {
            audio.play().catch(() => {});
            bar.classList.add('active');
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        // Save state periodically
        setInterval(() => {
            localStorage.setItem(AUDIO_KEY, JSON.stringify({
                src: audioSrc,
                currentTime: audio.currentTime,
                isPlaying: !audio.paused && audio.currentTime > 0
            }));
        }, UPDATE_INTERVAL);
        
        // Play/pause toggle
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(() => {});
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                bar.classList.add('active');
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // Close
        closeBtn.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
            bar.classList.remove('active');
            localStorage.removeItem(AUDIO_KEY);
        });
        
        // When audio ends
        audio.addEventListener('ended', () => {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
