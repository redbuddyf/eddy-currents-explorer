/* ===== PASSWORD PROTECTION ===== */
(function() {
    'use strict';
    
    // Configuration
    const AUTH_KEY = 'science_unpacked_auth';
    const CORRECT_PASSWORD = '1548';  // Change this to your desired password
    
    // Check if already authenticated
    if (sessionStorage.getItem(AUTH_KEY) === 'true') {
        return;
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = `
        <div class="auth-modal">
            <div class="auth-brand">
                <img src="assets/logo-icon.svg" alt="Science Unpacked" width="40" height="40">
                <span>Science<span class="brand-accent">Unpacked</span></span>
            </div>
            <h2 class="auth-title">Enter Password</h2>
            <p class="auth-subtitle">This site is password protected</p>
            <form class="auth-form" id="auth-form">
                <div class="auth-input-group">
                    <input 
                        type="password" 
                        id="auth-password" 
                        class="auth-input" 
                        placeholder="Enter password..."
                        autocomplete="off"
                        required
                    >
                    <button type="submit" class="auth-btn">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                <p class="auth-error" id="auth-error">Incorrect password. Please try again.</p>
            </form>
        </div>
    `;
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        #auth-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 15, 26, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            animation: authFadeIn 0.4s ease;
        }
        
        @keyframes authFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .auth-modal {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            width: 90%;
            max-width: 420px;
            text-align: center;
            box-shadow: var(--shadow-lg), 0 0 60px rgba(99, 102, 241, 0.15);
            animation: authSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes authSlideIn {
            from { 
                opacity: 0; 
                transform: translateY(-20px) scale(0.96); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }
        
        .auth-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.5rem;
        }
        
        .auth-brand .brand-accent {
            background: var(--gradient-1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .auth-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .auth-subtitle {
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 1.75rem;
        }
        
        .auth-form {
            width: 100%;
        }
        
        .auth-input-group {
            display: flex;
            gap: 0.5rem;
            background: var(--surface-light);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 0.35rem;
            transition: var(--transition);
        }
        
        .auth-input-group:focus-within {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        
        .auth-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            padding: 0.65rem 0.75rem;
            color: var(--text);
            font-size: 1rem;
            font-family: inherit;
        }
        
        .auth-input::placeholder {
            color: var(--text-dim);
        }
        
        .auth-btn {
            background: var(--gradient-1);
            border: none;
            border-radius: var(--radius-sm);
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            transition: var(--transition);
            flex-shrink: 0;
        }
        
        .auth-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }
        
        .auth-btn:active {
            transform: scale(0.95);
        }
        
        .auth-error {
            color: var(--error);
            font-size: 0.875rem;
            margin-top: 0.875rem;
            opacity: 0;
            transform: translateY(-5px);
            transition: all 0.3s ease;
        }
        
        .auth-error.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Handle form submission
    const form = document.getElementById('auth-form');
    const input = document.getElementById('auth-password');
    const error = document.getElementById('auth-error');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (input.value === CORRECT_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.4s ease';
            document.body.style.overflow = '';
            
            setTimeout(() => {
                overlay.remove();
                styles.remove();
            }, 400);
        } else {
            error.classList.add('show');
            input.value = '';
            input.focus();
            
            // Shake animation
            const modal = document.querySelector('.auth-modal');
            modal.style.animation = 'none';
            modal.offsetHeight; // trigger reflow
            modal.style.animation = 'authShake 0.4s ease';
        }
    });
    
    // Add shake keyframes
    const shakeStyles = document.createElement('style');
    shakeStyles.textContent = `
        @keyframes authShake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(shakeStyles);
    
    // Focus input on load
    input.focus();
})();
