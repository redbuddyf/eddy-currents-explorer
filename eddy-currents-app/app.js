/**
 * EDDY CURRENT EXPLORER - DEBUGGED & FIXED VERSION
 * All demos now working correctly
 */

'use strict';

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== GLOBAL STATE =====
const state = {
    currentSection: 'intro',
    demos: {},
    isAnimating: false
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Eddy Current Explorer...');
    
    initNavigation();
    initHeroAnimation();
    createParticles();
    
    // Register Service Worker for PWA support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered:', registration.scope);
                })
                .catch((error) => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });
    }
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
        initAllDemos();
    }, 100);
    
    window.addEventListener('resize', debounce(() => {
        resizeAllDemos();
    }, 250));
    
    // Remove loading screen
    setTimeout(() => {
        const loader = $('#loadingScreen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 600);
    
    console.log('✅ All systems initialized');
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== NAVIGATION =====
function initNavigation() {
    $$('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            navigateTo(section);
        });
    });
    
    $('#mobileMenuBtn')?.addEventListener('click', () => {
        $('#mobileMenu')?.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.mobile-menu')) {
            $('#mobileMenu')?.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        const sections = ['intro', 'science', 'coaster', 'train', 'applications', 'lab'];
        const currentIndex = sections.indexOf(state.currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            navigateTo(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navigateTo(sections[currentIndex - 1]);
        }
    });
}

function navigateTo(sectionId) {
    if (state.isAnimating || sectionId === state.currentSection) return;
    
    state.isAnimating = true;
    
    $$('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    
    $('#mobileMenu')?.classList.remove('active');
    
    const currentSection = $(`#${state.currentSection}`);
    const nextSection = $(`#${sectionId}`);
    
    if (currentSection) {
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateY(-20px)';
    }
    
    setTimeout(() => {
        if (currentSection) currentSection.classList.remove('active');
        if (nextSection) {
            nextSection.classList.add('active');
            nextSection.style.opacity = '0';
            nextSection.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
                nextSection.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                nextSection.style.opacity = '1';
                nextSection.style.transform = 'translateY(0)';
            });
        }
        
        state.currentSection = sectionId;
        state.isAnimating = false;
        
        // Resize demos when section becomes visible
        setTimeout(() => resizeDemosForSection(sectionId), 100);
    }, 300);
}

window.showSection = navigateTo;

function resizeDemosForSection(sectionId) {
    console.log(`Resizing demos for ${sectionId}`);
    switch(sectionId) {
        case 'science':
            state.demos.science?.resize();
            break;
        case 'lab':
            state.demos.pendulum?.resize();
            state.demos.tube?.resize();
            state.demos.heating?.resize();
            state.demos.conductivity?.resize();
            state.demos.damping?.resize();
            break;
    }
}

function resizeAllDemos() {
    Object.values(state.demos).forEach(demo => {
        if (demo && typeof demo.resize === 'function') {
            demo.resize();
        }
    });
}

function initAllDemos() {
    console.log('Initializing demos...');
    
    try {
        state.demos.science = new MagnetDropDemo();
        console.log('✅ Science demo initialized');
    } catch (e) {
        console.error('❌ Science demo failed:', e);
    }
    
    try {
        state.demos.coaster = new CoasterDemo();
        console.log('✅ Coaster demo initialized');
    } catch (e) {
        console.error('❌ Coaster demo failed:', e);
    }
    
    try {
        state.demos.train = new MaglevDemo();
        console.log('✅ Train demo initialized');
    } catch (e) {
        console.error('❌ Train demo failed:', e);
    }
    
    try {
        state.demos.pendulum = new PendulumExperiment();
        state.demos.tube = new TubeDropExperiment();
        state.demos.heating = new HeatingExperiment();
        state.demos.conductivity = new ConductivityExperiment();
        state.demos.damping = new DampingExperiment();
        state.demos.quiz = new Quiz();
        console.log('✅ Lab demos initialized');
    } catch (e) {
        console.error('❌ Lab demos failed:', e);
    }
}

// ===== MAGNET DROP DEMO =====
class MagnetDropDemo {
    constructor() {
        this.canvas = document.getElementById('scienceCanvas');
        if (!this.canvas) {
            console.warn('Science canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.magnetY = 60;
        this.velocity = 0;
        this.isRunning = false;
        this.material = 'copper';
        this.eddyStrength = 0;
        
        this.materials = {
            copper: { cond: 1.0, color: '#b87333' },      // 100% conductivity (IACS standard)
            aluminum: { cond: 0.61, color: '#a8a8a8' },   // 61% of copper's conductivity
            pvc: { cond: 0, color: '#e2e8f0' }            // Insulator - no eddy currents
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const dropBtn = document.getElementById('dropMagnet');
        const resetBtn = document.getElementById('resetScience');
        
        if (dropBtn) dropBtn.addEventListener('click', () => this.drop());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        
        document.querySelectorAll('.material-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.material = btn.dataset.material;
                this.draw();
            });
        });
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        // Set canvas size to match parent
        const rect = parent.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = 500;
        this.draw();
    }
    
    drop() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.velocity = 0;
        this.animate();
    }
    
    reset() {
        this.isRunning = false;
        this.magnetY = 60;
        this.velocity = 0;
        this.eddyStrength = 0;
        this.draw();
        this.updateReadouts();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        const mat = this.materials[this.material];
        
        // Gravity acceleration: 0.5 px/frame² ≈ 9.8 m/s² at demo scale
        const g = 0.5;
        this.velocity += g;
        
        // Eddy current braking in tube (150-400)
        // Drag force: F_drag = k·σ·v (proportional to velocity and conductivity)
        // Terminal velocity: v_term = g / (k·σ)
        if (this.magnetY > 150 && this.magnetY < 400 && mat.cond > 0) {
            const dragCoeff = mat.cond * 0.25;
            const braking = this.velocity * dragCoeff;
            this.velocity -= braking;
            // Eddy current display: I ∝ σ·v (proportional to conductivity and velocity)
            this.eddyStrength = mat.cond * 12;  /* Copper=12A, Aluminum~7A at typical speeds */
        } else {
            this.eddyStrength = 0;
        }
        
        this.magnetY += this.velocity;
        
        if (this.magnetY > 480) {
            this.magnetY = 480;
            this.velocity = 0;
            this.isRunning = false;
        }
        
        this.draw();
        this.updateReadouts();
        
        if (this.isRunning) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        ctx.clearRect(0, 0, w, h);
        
        // Background sections
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, w, 150);
        ctx.fillStyle = '#64748b';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('AIR', w/2, 80);
        
        // Tube
        const mat = this.materials[this.material];
        const grad = ctx.createLinearGradient(0, 150, 0, 400);
        grad.addColorStop(0, mat.color);
        grad.addColorStop(0.5, '#ffffff');
        grad.addColorStop(1, mat.color);
        
        ctx.fillStyle = grad;
        ctx.fillRect(w/2 - 100, 150, 200, 250);
        
        // Hollow center
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(w/2 - 40, 150, 80, 250);
        
        // Eddy currents
        if (this.eddyStrength > 0.5) {
            ctx.strokeStyle = `rgba(255, 215, 0, ${Math.min(0.8, this.eddyStrength/10)})`;
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 4]);
            
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                const offset = i * Math.PI / 2;
                for (let a = 0; a < Math.PI * 4; a += 0.3) {
                    const r = 30 + a * 8;
                    const x = w/2 + Math.cos(a + offset) * r * 0.8;
                    const y = this.magnetY + 40 + Math.sin(a + offset) * r * 0.3;
                    if (a === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            ctx.setLineDash([]);
        }
        
        // Magnet
        this.drawMagnet(w/2 - 30, this.magnetY);
        
        // Label
        ctx.fillStyle = '#64748b';
        const label = mat.color === '#e2e8f0' ? 'PVC' : mat.color === '#b87333' ? 'COPPER' : 'ALUMINUM';
        ctx.fillText(label, w/2, 430);
    }
    
    drawMagnet(x, y) {
        const ctx = this.ctx;
        
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x, y, 60, 40);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('N', x + 30, y + 26);
        
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, y + 40, 60, 40);
        ctx.fillStyle = 'white';
        ctx.fillText('S', x + 30, y + 66);
        
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(x + 30, y + 40, 50 + i * 20, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    updateReadouts() {
        const vel = document.getElementById('velValue');
        const cur = document.getElementById('currentValue');
        const force = document.getElementById('forceValue');
        
        if (vel) vel.textContent = this.velocity.toFixed(1);
        if (cur) cur.textContent = this.eddyStrength.toFixed(1);
        if (force) force.textContent = (this.eddyStrength * 0.5).toFixed(1);
    }
}

// ===== ROLLER COASTER DEMO - COMPLETE REWRITE =====
class CoasterDemo {
    constructor() {
        this.car = document.getElementById('coasterCar');
        this.track = document.querySelector('.track-path');
        this.svg = document.querySelector('.track-svg');
        this.progress = 0; // 0 to 1
        this.velocity = 0; // Pixels per frame
        this.isRunning = false;
        this.brakesEnabled = true;
        this.trackLength = 0;
        this.lastTime = 0;
        
        // Physics constants - ADJUSTED FOR STRONGER BRAKES
        this.GRAVITY = 0.6;
        this.FRICTION = 0.995;
        this.BRAKE_STRENGTH = 0.88; // STRONGER BRAKES (was 0.96, now 0.88 = 12% reduction per frame)
        this.MIN_VELOCITY = 2; // Minimum speed to keep moving
        this.LAUNCH_VELOCITY = 18;
        this.MAX_VELOCITY = 45;
        
        // Track key points for REALISTIC track:
        // Station → Lift → Drop → Valley → Airtime Hill → Turn → Brakes
        this.LIFT_HILL_END = 0.18;
        this.FIRST_DROP_END = 0.35;
        this.VALLEY_POINT = 0.50;
        this.AIRTIME_HILL = 0.62;
        this.BRAKE_ZONE_START = 0.75; // 75% of track (brake run)
        this.BRAKE_ZONE_END = 0.95;   // 95% of track
        
        this.init();
    }
    
    init() {
        // Wait for SVG to be ready
        if (this.track) {
            try {
                this.trackLength = this.track.getTotalLength();
                console.log('Coaster track loaded, length:', this.trackLength);
            } catch (e) {
                console.error('Failed to get track length:', e);
                // Fallback: estimate based on new track
                this.trackLength = 1300;
            }
        } else {
            console.warn('Track element not found');
            this.trackLength = 1300;
        }
        
        const launchBtn = document.getElementById('launchCoaster');
        const resetBtn = document.getElementById('resetCoaster');
        const brakeToggle = document.getElementById('brakesEnabled');
        
        if (launchBtn) launchBtn.addEventListener('click', () => this.launch());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        if (brakeToggle) {
            brakeToggle.addEventListener('change', (e) => {
                this.brakesEnabled = e.target.checked;
                console.log('Brakes toggled:', this.brakesEnabled);
            });
        }
        
        this.reset();
    }
    
    launch() {
        if (this.isRunning) return;
        console.log('Launching coaster...');
        this.isRunning = true;
        this.velocity = this.LAUNCH_VELOCITY;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.animate(t));
    }
    
    reset() {
        console.log('Resetting coaster...');
        this.isRunning = false;
        this.progress = 0;
        this.velocity = 0;
        this.updatePosition();
        this.updateHUD();
        
        // Reset brake effect
        const brakeEffect = document.getElementById('brakeEffect');
        if (brakeEffect) brakeEffect.setAttribute('opacity', '0');
        
        // Reset brake zone highlight
        this.updateBrakeZoneVisual(false);
    }
    
    animate(currentTime) {
        if (!this.isRunning) return;
        
        // Calculate delta time for smooth animation
        const deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to ~60fps
        this.lastTime = currentTime;
        
        // Get current position on track for slope calculation
        if (this.track && this.trackLength > 0) {
            const currentDist = this.progress * this.trackLength;
            const currentPoint = this.track.getPointAtLength(currentDist);
            
            // Look ahead to calculate slope
            const lookAheadDist = Math.min(currentDist + 20, this.trackLength);
            const nextPoint = this.track.getPointAtLength(lookAheadDist);
            
            // Calculate track geometry for proper physics
            const dx = nextPoint.x - currentPoint.x;
            const dy = nextPoint.y - currentPoint.y;
            const slope = dy / Math.max(Math.abs(dx), 1);
            const trackAngle = Math.atan(slope);
            
            // Gravity component along track: a_tangential = g·sin(θ)
            // In SVG, y increases downward, so positive dy means going down
            const gravityForce = Math.sin(trackAngle) * this.GRAVITY * deltaTime;
            this.velocity += gravityForce;
        }
        
        // Check if in brake zone
        const inBrakeZone = this.progress >= this.BRAKE_ZONE_START && this.progress <= this.BRAKE_ZONE_END;
        
        // Apply magnetic brakes if enabled and in brake zone
        if (inBrakeZone && this.brakesEnabled) {
            this.velocity *= this.BRAKE_STRENGTH;
            this.updateBrakeZoneVisual(true);
        } else {
            this.updateBrakeZoneVisual(false);
            // Normal friction
            this.velocity *= this.FRICTION;
        }
        
        // Ensure minimum velocity outside brake zone (keep it moving)
        if (!inBrakeZone && this.velocity < this.MIN_VELOCITY) {
            this.velocity = this.MIN_VELOCITY;
        }
        
        // Cap maximum velocity
        if (this.velocity > this.MAX_VELOCITY) this.velocity = this.MAX_VELOCITY;
        
        // Update progress
        const moveAmount = (this.velocity * deltaTime) / this.trackLength;
        this.progress += moveAmount;
        
        // Check if finished (allow going slightly past 1 for smooth ending)
        if (this.progress >= 0.98) {
            this.progress = 0.98;
            this.isRunning = false;
            this.velocity = 0;
            this.updateBrakeZoneVisual(false);
            console.log('Coaster finished!');
        }
        
        // Update visuals
        this.updatePosition();
        this.updateHUD();
        this.updateSpeedLines();
        
        // Continue animation
        if (this.isRunning) {
            requestAnimationFrame((t) => this.animate(t));
        }
    }
    
    updateSpeedLines() {
        // Show speed lines when going fast
        const speedLines = document.getElementById('speedLines');
        if (speedLines) {
            const showLines = this.velocity > 25;
            speedLines.setAttribute('opacity', showLines ? '1' : '0');
        }
    }
    
    updatePosition() {
        if (!this.car) return;
        
        let point, angle;
        
        if (this.track && this.trackLength > 0) {
            const currentDist = this.progress * this.trackLength;
            point = this.track.getPointAtLength(currentDist);
            
            // Calculate rotation
            const nextDist = Math.min(currentDist + 10, this.trackLength);
            const nextPoint = this.track.getPointAtLength(nextDist);
            
            angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;
        } else {
            // Fallback: approximate position
            point = { x: this.progress * 1000 - 50, y: 300 };
            angle = 0;
        }
        
        // Center the car on the track (car is 70x50, center is at 35, 25)
        const x = point.x - 35;
        const y = point.y - 25;
        
        this.car.setAttribute('transform', `translate(${x}, ${y}) rotate(${angle}, 35, 25)`);
    }
    
    updateBrakeZoneVisual(isActive) {
        // Car brake effect
        const brakeEffect = document.getElementById('brakeEffect');
        if (brakeEffect) {
            brakeEffect.setAttribute('opacity', isActive ? '0.9' : '0');
        }
        
        // Zone-wide effect
        const zoneEffect = document.getElementById('brakeZoneEffect');
        if (zoneEffect) {
            zoneEffect.setAttribute('opacity', isActive ? '1' : '0');
        }
    }
    
    updateHUD() {
        const vel = document.getElementById('coasterVel');
        const g = document.getElementById('coasterG');
        const brake = document.getElementById('coasterBrake');
        
        if (vel) vel.textContent = Math.round(this.velocity);
        
        // Calculate G-force using proper physics: cos(θ) + v²/(g·r)
        // cos(θ) = gravity component perpendicular to track
        // v²/r = centripetal acceleration from track curvature
        let gForce = 1;
        if (this.track && this.trackLength > 0) {
            const currentDist = this.progress * this.trackLength;
            const p0 = this.track.getPointAtLength(Math.max(0, currentDist - 15));
            const p1 = this.track.getPointAtLength(currentDist);
            const p2 = this.track.getPointAtLength(Math.min(this.trackLength, currentDist + 15));
            
            // Find circle center through 3 points (Menger curvature)
            const d = 2 * ((p0.x - p1.x) * (p0.y - p2.y) - (p0.y - p1.y) * (p0.x - p2.x));
            if (Math.abs(d) > 0.001) {
                const ux = ((p0.x*p0.x + p0.y*p0.y) - (p1.x*p1.x + p1.y*p1.y)) * (p0.y - p2.y)
                         - ((p0.x*p0.x + p0.y*p0.y) - (p2.x*p2.x + p2.y*p2.y)) * (p0.y - p1.y);
                const uy = ((p0.x*p0.x + p0.y*p0.y) - (p2.x*p2.x + p2.y*p2.y)) * (p0.x - p1.x)
                         - ((p0.x*p0.x + p0.y*p0.y) - (p1.x*p1.x + p1.y*p1.y)) * (p0.x - p2.x);
                const cx = ux / d;
                const cy = uy / d;
                const r = Math.hypot(p1.x - cx, p1.y - cy);
                
                // Valley: center below track (cy > p1.y in SVG) → g-force increases
                // Crest: center above track (cy < p1.y) → g-force decreases
                const isValley = cy > p1.y;
                const sign = isValley ? 1 : -1;
                
                const trackAngle = Math.atan2(p2.y - p0.y, p2.x - p0.x);
                const cosAngle = Math.cos(trackAngle);
                const centripetalG = (this.velocity * this.velocity) / (this.GRAVITY * r) * sign;
                
                gForce = cosAngle + centripetalG;
            }
        }
        // Clamp to realistic coaster range (-1g to +6g)
        gForce = Math.max(-1, Math.min(6, gForce));
        if (g) g.textContent = gForce.toFixed(1);
        
        if (brake) {
            const inBrakeZone = this.progress >= this.BRAKE_ZONE_START && this.progress <= this.BRAKE_ZONE_END;
            if (inBrakeZone && this.brakesEnabled) {
                // Eddy current braking force: F_drag ∝ v·B²·σ·A
                // Simplified: F = k·v where k depends on brake strength
                const brakingForce = Math.round(this.velocity * (1 - this.BRAKE_STRENGTH) * 10);
                brake.textContent = brakingForce;
            } else {
                brake.textContent = '0';
            }
        }
    }
}

// ===== MAGLEV TRAIN DEMO =====
class MaglevDemo {
    constructor() {
        this.isLevitating = false;
        this.speed = 0;
        this.targetSpeed = 0;
        this.propulsionInterval = null;
        this.phaseIndex = 0;
        
        this.init();
    }
    
    init() {
        const levBtn = document.getElementById('levitateBtn');
        const propBtn = document.getElementById('propelBtn');
        const stopBtn = document.getElementById('emergencyBtn');
        
        if (levBtn) levBtn.addEventListener('click', () => this.toggleLevitation());
        if (propBtn) propBtn.addEventListener('click', () => this.togglePropulsion());
        if (stopBtn) stopBtn.addEventListener('click', () => this.emergencyStop());
    }
    
    toggleLevitation() {
        // If currently levitating and landing, emergency stop first (which also lands)
        if (this.isLevitating && this.speed > 0) {
            this.emergencyStop();
            return; // emergencyStop already handles landing, so we're done
        }
        
        this.isLevitating = !this.isLevitating;
        
        const train = document.getElementById('maglevTrain');
        const glow = document.getElementById('levitationGlow');
        const fields = document.getElementById('fieldLines');
        const gap = document.getElementById('gapIndicator');
        const indicator = document.querySelector('.status-indicator');
        const text = document.querySelector('.status-text');
        const btn = document.getElementById('levitateBtn');
        
        if (train) train.classList.toggle('levitating', this.isLevitating);
        if (glow) glow.classList.toggle('active', this.isLevitating);
        if (fields) fields.classList.toggle('active', this.isLevitating);
        if (gap) gap.classList.toggle('active', this.isLevitating);
        
        if (indicator) indicator.classList.toggle('on', this.isLevitating);
        if (text) {
            text.textContent = this.isLevitating ? 'ACTIVE' : 'OFF';
            text.style.color = this.isLevitating ? '#22c55e' : '';
        }
        
        if (btn) {
            btn.innerHTML = this.isLevitating 
                ? '<span class="btn-icon">🛬</span><span class="btn-label">Land</span>'
                : '<span class="btn-icon">🛫</span><span class="btn-label">Levitate</span>';
        }
    }
    
    togglePropulsion() {
        // Can't propel if not levitating
        if (!this.isLevitating) {
            alert('Train must be levitating before propulsion can engage!');
            return;
        }
        
        if (this.speed > 0) {
            this.targetSpeed = 0;
        } else {
            this.targetSpeed = 603;
            this.startPropulsionAnim();
        }
        this.animateSpeed();
        
        const btn = document.getElementById('propelBtn');
        if (btn) {
            btn.innerHTML = this.speed > 0
                ? '<span class="btn-icon">⏸</span><span class="btn-label">Stop</span>'
                : '<span class="btn-icon">⚡</span><span class="btn-label">Propel</span>';
        }
    }
    
    animateSpeed() {
        const diff = this.targetSpeed - this.speed;
        if (Math.abs(diff) < 0.5) {
            this.speed = this.targetSpeed;
            this.updateDisplay();
            if (this.speed === 0) this.stopPropulsionAnim();
            return;
        }
        
        this.speed += diff * 0.02;
        this.updateDisplay();
        requestAnimationFrame(() => this.animateSpeed());
    }
    
    emergencyStop() {
        // Stop the train
        this.targetSpeed = 0;
        this.speed = 0;
        this.updateDisplay();
        this.stopPropulsionAnim();
        
        // Also land the train
        if (this.isLevitating) {
            this.isLevitating = false;
            
            const train = document.getElementById('maglevTrain');
            const glow = document.getElementById('levitationGlow');
            const fields = document.getElementById('fieldLines');
            const gap = document.getElementById('gapIndicator');
            const indicator = document.querySelector('.status-indicator');
            const text = document.querySelector('.status-text');
            const levBtn = document.getElementById('levitateBtn');
            
            if (train) train.classList.remove('levitating');
            if (glow) glow.classList.remove('active');
            if (fields) fields.classList.remove('active');
            if (gap) gap.classList.remove('active');
            if (indicator) indicator.classList.remove('on');
            if (text) {
                text.textContent = 'OFF';
                text.style.color = '';
            }
            if (levBtn) {
                levBtn.innerHTML = '<span class="btn-icon">🛫</span><span class="btn-label">Levitate</span>';
            }
        }
        
        const btn = document.getElementById('propelBtn');
        if (btn) btn.innerHTML = '<span class="btn-icon">⚡</span><span class="btn-label">Propel</span>';
    }
    
    updateDisplay() {
        const speedEl = document.getElementById('trainSpeed');
        const bar = document.getElementById('speedBarFill');
        const lines = document.getElementById('speedLines');
        const train = document.getElementById('maglevTrain');
        const coils = document.querySelector('.guideway-coils');
        const sceneBg = document.querySelector('.scene-bg');
        
        if (speedEl) speedEl.textContent = Math.round(this.speed);
        if (bar) bar.style.width = `${(this.speed / 603) * 100}%`;
        if (lines) lines.classList.toggle('active', this.speed > 100);
        
        // Movement animations based on speed
        const isMoving = this.speed > 10;
        const isFast = this.speed > 300;
        if (train) {
            train.classList.toggle('moving', isMoving);
            train.classList.toggle('fast', isFast);
        }
        if (coils) {
            coils.classList.toggle('moving', isMoving);
            coils.classList.toggle('fast', isFast);
        }
        if (sceneBg) {
            sceneBg.classList.toggle('moving', isMoving);
            sceneBg.classList.toggle('fast', isFast);
        }
        if (lines) lines.classList.toggle('fast', isFast);
        const track = document.querySelector('.guideway-track');
        if (track) track.classList.toggle('moving', isMoving);
    }
    
    startPropulsionAnim() {
        if (this.propulsionInterval) return;
        
        this.propulsionInterval = setInterval(() => {
            document.querySelectorAll('.phase').forEach((p, i) => {
                p.classList.toggle('active', i === this.phaseIndex);
            });
            this.phaseIndex = (this.phaseIndex + 1) % 3;
        }, 150);
    }
    
    stopPropulsionAnim() {
        if (this.propulsionInterval) {
            clearInterval(this.propulsionInterval);
            this.propulsionInterval = null;
        }
        document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    }
}

// ===== PENDULUM EXPERIMENT =====
class PendulumExperiment {
    constructor() {
        this.canvas = document.getElementById('pendulumCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.angle = Math.PI / 4;
        this.velocity = 0;
        this.isRunning = false;
        this.material = 'copper';
        this.hasSlits = false;
        
        this.materials = {
            copper: { damping: 0.92, color: '#b87333' },    // Strongest braking - 8% loss per frame
            aluminum: { damping: 0.97, color: '#a8a8a8' },  // Medium braking - 3% loss per frame  
            plastic: { damping: 0.999, color: '#ff6b9d' }   // No braking - 0.1% loss per frame
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const releaseBtn = document.getElementById('releasePendulum');
        const resetBtn = document.getElementById('resetPendulum');
        const matSelect = document.getElementById('sheetMaterial');
        const slitCheck = document.getElementById('addSlits');
        
        if (releaseBtn) releaseBtn.addEventListener('click', () => this.release());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        if (matSelect) matSelect.addEventListener('change', (e) => {
            this.material = e.target.value;
            this.draw();
        });
        if (slitCheck) slitCheck.addEventListener('change', (e) => {
            this.hasSlits = e.target.checked;
            this.draw();
        });
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        this.canvas.width = parent.clientWidth || 400;
        this.canvas.height = 350;
        this.draw();
    }
    
    release() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.angle = Math.PI / 4;
        this.velocity = 0;
        this.animate();
    }
    
    reset() {
        this.isRunning = false;
        this.angle = Math.PI / 4;
        this.velocity = 0;
        this.draw();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Pendulum equation of motion: α'' = -(g/L)·sin(α)
        // g = 0.355 px/frame², L = 120 px (~1m scale)
        // Small-angle period: T = 2π√(L/g) ≈ 2.0s
        const gravity = 0.355;
        const length = 120;
        
        this.acceleration = (-gravity / length) * Math.sin(this.angle);
        this.velocity += this.acceleration;
        
        let damping = this.materials[this.material].damping;
        if (this.hasSlits && this.material !== 'plastic') {
            damping = 0.99;
        }
        
        this.velocity *= damping;
        this.angle += this.velocity;
        
        if (Math.abs(this.angle) < 0.01 && Math.abs(this.velocity) < 0.001) {
            this.isRunning = false;
        }
        
        this.draw();
        this.updateOverlay();
        
        if (this.isRunning) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        
        ctx.clearRect(0, 0, w, 350);
        
        const originX = w / 2;
        const originY = 40;
        const length = 120;
        
        // Material sheet
        const mat = this.materials[this.material];
        ctx.fillStyle = mat.color;
        ctx.fillRect(originX - 100, originY + length + 30, 200, 15);
        
        // Slits
        if (this.hasSlits) {
            ctx.fillStyle = '#0a0a0f';
            for (let i = -70; i < 90; i += 35) {
                ctx.fillRect(originX + i, originY + length + 30, 15, 15);
            }
        }
        
        // Pivot
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(originX, originY, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Pendulum position
        const bobX = originX + length * Math.sin(this.angle);
        const bobY = originY + length * Math.cos(this.angle);
        
        // String
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();
        
        // Magnet bob
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(bobX - 12, bobY, 24, 12);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(bobX - 12, bobY + 12, 24, 12);
        
        // Eddy currents - stronger for copper, weaker for aluminum
        if (this.material !== 'plastic' && Math.abs(this.angle) < 0.5 && bobY > originY + length) {
            const intensity = this.material === 'copper' ? 0.9 : 0.5;  // Copper = 100%, Aluminum = ~50%
            const lineWidth = this.material === 'copper' ? 3 : 2;
            ctx.strokeStyle = `rgba(255, 215, 0, ${intensity})`;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash([5, 3]);
            ctx.beginPath();
            ctx.ellipse(bobX, originY + length + 37, 30, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
    
    updateOverlay() {
        const ampEl = document.getElementById('pendulumAmp');
        const dampEl = document.getElementById('pendulumDamping');
        
        if (ampEl) ampEl.textContent = `${Math.round(Math.abs(this.angle) * 180 / Math.PI)}°`;
        if (dampEl) dampEl.textContent = this.material === 'plastic' ? 'None' : 
            (this.hasSlits ? 'Medium' : 'High');
    }
}

// ===== TUBE DROP EXPERIMENT =====
class TubeDropExperiment {
    constructor() {
        this.canvas = document.getElementById('tubeCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.magnets = { copper: null, pvc: null };
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const copperBtn = document.getElementById('dropCopper');
        const pvcBtn = document.getElementById('dropPVC');
        const raceBtn = document.getElementById('raceMode');
        const resetBtn = document.getElementById('resetTube');
        
        if (copperBtn) copperBtn.addEventListener('click', () => this.drop('copper'));
        if (pvcBtn) pvcBtn.addEventListener('click', () => this.drop('pvc'));
        if (raceBtn) raceBtn.addEventListener('click', () => this.race());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        this.canvas.width = parent.clientWidth || 400;
        this.canvas.height = 350;
        this.draw();
    }
    
    drop(type) {
        this.magnets[type] = { y: 30, velocity: 0 };
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    race() {
        this.reset();
        setTimeout(() => {
            this.drop('copper');
            this.drop('pvc');
        }, 100);
    }
    
    reset() {
        this.isRunning = false;
        this.magnets = { copper: null, pvc: null };
        this.draw();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        let moving = false;
        
        ['copper', 'pvc'].forEach(type => {
            const mag = this.magnets[type];
            if (!mag || mag.y >= 320) return;
            
            // Gravity acceleration
            const g = 0.5;
            mag.velocity += g;
            
            // Eddy current drag: F_drag = k·v (linear drag model)
            // Copper has higher conductivity → stronger drag → lower terminal velocity
            if (type === 'copper') {
                const dragCoeff = 0.18;
                mag.velocity -= mag.velocity * dragCoeff;
            }
            
            // Terminal velocity limits based on conductivity
            // v_term = g / (k·σ)  →  copper slower, PVC free-fall
            const maxVel = type === 'copper' ? 2.8 : 12;
            if (mag.velocity > maxVel) mag.velocity = maxVel;
            
            mag.y += mag.velocity;
            if (mag.y < 320) moving = true;
        });
        
        this.draw();
        
        if (moving) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isRunning = false;
        }
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        
        ctx.clearRect(0, 0, w, 350);
        
        this.drawTube(w * 0.25, 'copper');
        this.drawTube(w * 0.75, 'pvc');
        
        if (this.magnets.copper) {
            this.drawMagnet(w * 0.25, this.magnets.copper.y);
        }
        if (this.magnets.pvc) {
            this.drawMagnet(w * 0.75, this.magnets.pvc.y);
        }
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('COPPER', w * 0.25, 25);
        ctx.fillText('PVC', w * 0.75, 25);
    }
    
    drawTube(x, type) {
        const ctx = this.ctx;
        const w = 70;
        
        if (type === 'copper') {
            const grad = ctx.createLinearGradient(0, 0, 0, 350);
            grad.addColorStop(0, '#b87333');
            grad.addColorStop(0.5, '#d4914d');
            grad.addColorStop(1, '#b87333');
            ctx.fillStyle = grad;
        } else {
            ctx.fillStyle = '#e2e8f0';
        }
        
        ctx.fillRect(x - w/2, 40, w, 280);
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(x - 20, 40, 40, 280);
        
        if (type === 'copper' && this.magnets.copper) {
            const mag = this.magnets.copper;
            if (mag.y > 40 && mag.y < 280) {
                ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.ellipse(x, mag.y + 20, 50, 20, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }
    
    drawMagnet(x, y) {
        const ctx = this.ctx;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x - 12, y, 24, 12);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x - 12, y + 12, 24, 12);
    }
}

// ===== HEATING EXPERIMENT =====
class HeatingExperiment {
    constructor() {
        this.canvas = document.getElementById('heatCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.isOn = false;
        this.temperature = 20;
        this.frequency = 60;
        this.phase = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const toggleBtn = document.getElementById('togglePower');
        const freqSlider = document.getElementById('frequency');
        
        if (toggleBtn) toggleBtn.addEventListener('click', () => this.toggle());
        if (freqSlider) freqSlider.addEventListener('input', (e) => {
            this.frequency = parseInt(e.target.value);
            const disp = document.getElementById('freqDisplay');
            if (disp) disp.textContent = `${this.frequency} Hz`;
        });
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        this.canvas.width = parent.clientWidth || 800;
        this.canvas.height = 300;
        this.draw();
    }
    
    toggle() {
        this.isOn = !this.isOn;
        
        const btn = document.getElementById('togglePower');
        const text = document.getElementById('powerText');
        
        if (btn) btn.classList.toggle('active', this.isOn);
        if (text) text.textContent = this.isOn ? 'Turn Off' : 'Turn On';
        
        if (this.isOn) this.animate();
    }
    
    animate() {
        if (!this.isOn) return;
        
        const heatingRate = this.frequency / 300;
        this.temperature = Math.min(800, this.temperature + heatingRate);
        
        const tempVal = document.getElementById('tempValue');
        const gauge = document.getElementById('tempGaugeFill');
        
        if (tempVal) tempVal.textContent = `${Math.round(this.temperature)}°C`;
        if (gauge) gauge.style.width = `${(this.temperature / 800) * 100}%`;
        
        this.phase += this.frequency / 500;
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        ctx.clearRect(0, 0, w, h);
        
        const coilX = w / 2;
        const coilRadius = Math.min(150, w/3);
        
        // Draw coil
        for (let i = 0; i < 6; i++) {
            const y = 80 + i * 25;
            ctx.strokeStyle = this.isOn 
                ? `hsl(${10 + Math.sin(this.phase + i) * 20}, 80%, 60%)` 
                : '#b87333';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.ellipse(coilX, y, coilRadius, 20, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Heated metal
        const tempRatio = this.temperature / 800;
        let color;
        if (tempRatio < 0.2) color = '#64748b';
        else if (tempRatio < 0.4) color = '#a0522d';
        else if (tempRatio < 0.6) color = '#cd5c5c';
        else if (tempRatio < 0.8) color = '#ff6347';
        else color = '#ff4500';
        
        if (tempRatio > 0.3) {
            ctx.shadowBlur = 30 * tempRatio;
            ctx.shadowColor = color;
        }
        
        const barWidth = Math.min(200, w/2);
        ctx.fillStyle = color;
        ctx.fillRect(coilX - barWidth/2, 180, barWidth, 60);
        ctx.shadowBlur = 0;
        
        // Eddy currents
        if (this.isOn && this.temperature > 100) {
            ctx.strokeStyle = `rgba(255, 215, 0, ${Math.min(1, this.temperature / 400)})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.ellipse(coilX, 210, 40 + i * 25, 20, this.phase * 0.1, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.setLineDash([]);
        }
    }
}

// ===== CONDUCTIVITY EXPERIMENT =====
class ConductivityExperiment {
    constructor() {
        this.canvas = document.getElementById('conductivityCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.materials = [
            { name: 'Copper', cond: 1.0, color: '#b87333', y: 0 },      // 100% conductivity (IACS standard)
            { name: 'Aluminum', cond: 0.61, color: '#a8a8a8', y: 0 },   // 61% of copper
            { name: 'Steel', cond: 0.025, color: '#64748b', y: 0 }      // 2.5% of copper (was 0.15 - too high!)
        ];
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const compareBtn = document.getElementById('compareMaterials');
        if (compareBtn) compareBtn.addEventListener('click', () => this.compare());
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        this.canvas.width = parent.clientWidth || 400;
        this.canvas.height = 350;
        this.draw();
    }
    
    compare() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.materials.forEach(m => m.y = 0);
        
        const animate = () => {
            let stillMoving = false;
            
            this.materials.forEach(m => {
                // Higher conductivity = taller bar (copper should be tallest)
                const targetY = m.cond * 220;
                const diff = targetY - m.y;
                
                if (Math.abs(diff) > 0.5) {
                    m.y += diff * 0.05;
                    stillMoving = true;
                }
            });
            
            this.draw();
            
            if (stillMoving) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
            }
        };
        
        animate();
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        
        ctx.clearRect(0, 0, w, 350);
        
        const barWidth = w * 0.18;
        const spacing = w * 0.28;
        
        this.materials.forEach((m, i) => {
            const x = spacing * (i + 0.8);
            const barHeight = Math.max(0, m.y);
            
            ctx.fillStyle = m.color;
            ctx.fillRect(x - barWidth/2, 300 - barHeight, barWidth, barHeight);
            
            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(m.name, x, 330);
            
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(`${Math.round(m.cond * 100)}%`, x, 290 - barHeight);
        });
        
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, 300);
        ctx.lineTo(w - 20, 300);
        ctx.stroke();
    }
}

// ===== DAMPING EXPERIMENT =====
class DampingExperiment {
    constructor() {
        this.canvas = document.getElementById('dampingCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.weightY = 50;
        this.velocity = 0;
        this.isRunning = false;
        this.magnetActive = true;
        
        this.init();
    }
    
    init() {
        this.resize();
        
        const dropBtn = document.getElementById('dropWeight');
        const resetBtn = document.getElementById('resetDamping');
        const magCheck = document.getElementById('magnetActive');
        
        if (dropBtn) dropBtn.addEventListener('click', () => this.drop());
        if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
        if (magCheck) magCheck.addEventListener('change', (e) => {
            this.magnetActive = e.target.checked;
        });
        
        this.draw();
    }
    
    resize() {
        if (!this.canvas) return;
        const parent = this.canvas.parentElement;
        if (!parent) return;
        
        this.canvas.width = parent.clientWidth || 400;
        this.canvas.height = 350;
        this.draw();
    }
    
    drop() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.weightY = 50;
        this.velocity = 0;
        this.animate();
    }
    
    reset() {
        this.isRunning = false;
        this.weightY = 50;
        this.velocity = 0;
        this.draw();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Gravity acceleration
        const g = 0.8;
        this.velocity += g;
        
        // Eddy current braking zone (copper plate)
        // Drag force opposes motion: F_drag = k·v
        if (this.magnetActive && this.weightY > 100 && this.weightY < 280) {
            const dragCoeff = 0.07;
            this.velocity -= this.velocity * dragCoeff;
        }
        
        this.weightY += this.velocity;
        
        if (this.weightY >= 300) {
            this.weightY = 300;
            this.velocity = 0;
            this.isRunning = false;
        }
        
        this.draw();
        
        if (this.isRunning) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    draw() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const centerX = w / 2;
        
        ctx.clearRect(0, 0, w, 350);
        
        ctx.fillStyle = '#b87333';
        ctx.fillRect(centerX - 40, 100, 80, 200);
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(centerX - 25, 100, 50, 200);
        
        ctx.fillStyle = '#64748b';
        ctx.fillRect(centerX - 15, this.weightY, 30, 30);
        
        if (this.magnetActive) {
            ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            ctx.fillRect(centerX - 50, 280, 100, 20);
        }
    }
}

// ===== QUIZ =====
const QUIZ_DATA = [
    {
        question: "According to Lenz's Law, the magnetic field created by eddy currents will:",
        options: [
            { text: "Oppose the change that produced them", correct: true },
            { text: "Reinforce the original magnetic field", correct: false },
            { text: "Flow in a random direction", correct: false },
            { text: "Always create heat", correct: false }
        ]
    },
    {
        question: "Why does a magnet fall slower through a copper tube than a plastic tube?",
        options: [
            { text: "Copper is heavier than plastic", correct: false },
            { text: "Eddy currents in copper create opposing magnetic fields", correct: true },
            { text: "Copper tubes have more friction", correct: false },
            { text: "The magnet is attracted to copper", correct: false }
        ]
    },
    {
        question: "What happens to eddy currents when slits are cut in a conductive plate?",
        options: [
            { text: "They become stronger", correct: false },
            { text: "They are reduced because current paths are interrupted", correct: true },
            { text: "They change frequency", correct: false },
            { text: "Nothing changes", correct: false }
        ]
    },
    {
        question: "Which material would produce the strongest eddy current braking effect?",
        options: [
            { text: "Copper", correct: true },
            { text: "Plastic", correct: false },
            { text: "Wood", correct: false },
            { text: "Glass", correct: false }
        ]
    },
    {
        question: "In a maglev train, what creates the levitation force?",
        options: [
            { text: "Compressed air", correct: false },
            { text: "Eddy currents inducing opposing magnetic fields", correct: true },
            { text: "Electrostatic repulsion", correct: false },
            { text: "Mechanical wheels", correct: false }
        ]
    }
];

class Quiz {
    constructor() {
        this.current = 0;
        this.score = 0;
        this.init();
    }
    
    init() {
        const restartBtn = document.getElementById('restartQuiz');
        if (restartBtn) restartBtn.addEventListener('click', () => this.restart());
        this.showQuestion();
    }
    
    showQuestion() {
        if (this.current >= QUIZ_DATA.length) {
            this.showResults();
            return;
        }
        
        const q = QUIZ_DATA[this.current];
        
        const numEl = document.getElementById('questionNum');
        const qEl = document.getElementById('quizQuestion');
        const optsEl = document.getElementById('quizOptions');
        
        if (numEl) numEl.textContent = this.current + 1;
        if (qEl) qEl.textContent = q.question;
        
        if (optsEl) {
            optsEl.innerHTML = '';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt.text;
                btn.addEventListener('click', () => this.answer(i));
                optsEl.appendChild(btn);
            });
        }
    }
    
    answer(index) {
        const q = QUIZ_DATA[this.current];
        const isCorrect = q.options[index].correct;
        
        const options = document.querySelectorAll('.quiz-option');
        
        if (isCorrect) {
            this.score++;
            if (options[index]) options[index].classList.add('correct');
        } else {
            if (options[index]) options[index].classList.add('wrong');
            options.forEach((btn, i) => {
                if (q.options[i].correct) btn.classList.add('correct');
            });
        }
        
        options.forEach(btn => btn.disabled = true);
        
        setTimeout(() => {
            this.current++;
            this.showQuestion();
        }, 1500);
    }
    
    showResults() {
        const card = document.getElementById('quizCard');
        const results = document.getElementById('quizResults');
        
        if (card) card.style.display = 'none';
        if (results) results.classList.remove('hidden');
        
        const scoreEl = document.getElementById('resultScore');
        const msgEl = document.getElementById('resultMessage');
        
        const percentage = Math.round((this.score / QUIZ_DATA.length) * 100);
        
        if (scoreEl) scoreEl.textContent = `${this.score}/${QUIZ_DATA.length}`;
        
        let message;
        if (percentage >= 90) message = '🎉 Excellent! You\'re an Eddy Current Expert!';
        else if (percentage >= 70) message = '👍 Good job! You understand the basics.';
        else if (percentage >= 50) message = '📚 Good effort! Review the notes to improve!';
        else message = '💪 Keep learning! Check out the interactive lab!';
        
        if (msgEl) msgEl.textContent = message;
    }
    
    restart() {
        this.current = 0;
        this.score = 0;
        
        const card = document.getElementById('quizCard');
        const results = document.getElementById('quizResults');
        
        if (card) card.style.display = 'block';
        if (results) results.classList.add('hidden');
        
        this.showQuestion();
    }
}

// ===== HERO ANIMATION =====
function initHeroAnimation() {
    const magnet = document.getElementById('heroMagnet');
    const eddy = document.getElementById('eddyCurrents');
    
    if (!magnet) return;
    
    let y = 0;
    let dir = 1;
    
    function animate() {
        y += 0.5 * dir;
        
        if (y > 60) {
            dir = -1;
            if (eddy) eddy.style.opacity = '1';
        } else if (y < 0) {
            dir = 1;
            if (eddy) eddy.style.opacity = '0.3';
        }
        
        magnet.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ===== BACKGROUND PARTICLES =====
function createParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(p);
    }
}
