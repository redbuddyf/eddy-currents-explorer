/**
 * Science Unpacked — Immersive Animated Universe Background
 * Multi-layer parallax starfield, drifting nebulae, cosmic dust,
 * shooting stars, and aurora horizon effects.
 */
(function() {
    'use strict';

    const canvas = document.getElementById('universe-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let animationId;
    let time = 0;
    let frameCount = 0;

    // Mouse parallax (smooth follow)
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
    }, { passive: true });

    // ===== CONFIG =====
    const STAR_LAYERS = {
        distant: { count: 350, speed: 0.02, size: [0.3, 0.9],   opacity: [0.12, 0.3],  color: [180, 200, 230] },
        mid:     { count: 180, speed: 0.08, size: [0.7, 1.5],   opacity: [0.2, 0.45],  color: [160, 210, 255] },
        near:    { count: 80,  speed: 0.18, size: [1.1, 2.4],   opacity: [0.35, 0.65], color: [140, 220, 255] },
        bright:  { count: 30,  speed: 0.3,  size: [1.6, 3.2],   opacity: [0.5, 0.9],   color: [255, 255, 255] }
    };

    // ===== STATE =====
    const stars = [];
    const nebulae = [];
    const dust = [];
    const shootingStars = [];
    const auroraWaves = [];

    // ===== INIT =====
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function initStars() {
        stars.length = 0;
        Object.keys(STAR_LAYERS).forEach(key => {
            const layer = STAR_LAYERS[key];
            for (let i = 0; i < layer.count; i++) {
                stars.push({
                    x: rand(0, width),
                    y: rand(0, height),
                    size: rand(layer.size[0], layer.size[1]),
                    baseOpacity: rand(layer.opacity[0], layer.opacity[1]),
                    speed: layer.speed,
                    twinkleSpeed: rand(0.4, 2.8),
                    twinklePhase: rand(0, Math.PI * 2),
                    layer: key,
                    color: layer.color
                });
            }
        });
    }

    function initNebulae() {
        nebulae.length = 0;
        const configs = [
            { x: 0.12, y: 0.18, rx: 0.4, ry: 0.32, color: [34, 211, 238],  opacity: 0.05,  speed: 0.08 },
            { x: 0.88, y: 0.12, rx: 0.32, ry: 0.28, color: [168, 85, 247], opacity: 0.04,  speed: 0.06 },
            { x: 0.75, y: 0.7,  rx: 0.28, ry: 0.22, color: [244, 114, 182],opacity: 0.03,  speed: 0.1 },
            { x: 0.5,  y: 0.45, rx: 0.45, ry: 0.38, color: [80, 140, 240], opacity: 0.015, speed: 0.05 },
            { x: 0.22, y: 0.78, rx: 0.22, ry: 0.18, color: [139, 92, 246], opacity: 0.035, speed: 0.07 },
            { x: 0.92, y: 0.5,  rx: 0.18, ry: 0.25, color: [34, 211, 238],  opacity: 0.025, speed: 0.09 }
        ];
        configs.forEach(cfg => {
            nebulae.push({
                x: cfg.x * width,
                y: cfg.y * height,
                rx: cfg.rx * width,
                ry: cfg.ry * height,
                color: cfg.color,
                baseOpacity: cfg.opacity,
                pulseSpeed: rand(0.08, 0.2),
                pulsePhase: rand(0, Math.PI * 2),
                driftSpeed: rand(0.015, 0.04),
                driftPhase: rand(0, Math.PI * 2)
            });
        });
    }

    function initDust() {
        dust.length = 0;
        for (let i = 0; i < 100; i++) {
            dust.push({
                x: rand(0, width),
                y: rand(0, height),
                size: rand(0.4, 1.8),
                opacity: rand(0.015, 0.06),
                vx: rand(-0.12, 0.12),
                vy: rand(-0.06, -0.2),
                color: rand(0, 1) > 0.6 ? [244, 114, 182] : (rand(0, 1) > 0.4 ? [34, 211, 238] : [200, 210, 255])
            });
        }
    }

    function initAurora() {
        auroraWaves.length = 0;
        for (let i = 0; i < 3; i++) {
            auroraWaves.push({
                yOffset: rand(0.75, 0.92),
                amplitude: rand(30, 60),
                frequency: rand(0.002, 0.005),
                speed: rand(0.3, 0.7),
                phase: rand(0, Math.PI * 2),
                color: i === 0 ? [34, 211, 238] : (i === 1 ? [168, 85, 247] : [244, 114, 182]),
                opacity: rand(0.03, 0.06)
            });
        }
    }

    function spawnShootingStar() {
        const side = Math.random() > 0.5 ? 'left' : 'top';
        let x, y, vx, vy;
        if (side === 'left') {
            x = rand(-50, width * 0.3);
            y = rand(0, height * 0.4);
            vx = rand(5, 10);
            vy = rand(1.5, 4);
        } else {
            x = rand(0, width * 0.7);
            y = rand(-30, height * 0.2);
            vx = rand(4, 8);
            vy = rand(2, 5);
        }
        shootingStars.push({
            x, y, vx, vy,
            length: rand(50, 180),
            life: 1,
            decay: rand(0.006, 0.015),
            width: rand(1, 2.5)
        });
    }

    // ===== DRAW HELPERS =====
    function drawStar(star) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
        const alpha = star.baseOpacity * twinkle;
        const parallaxX = mouseX * star.speed * 40;
        const parallaxY = mouseY * star.speed * 25;
        const sx = star.x + parallaxX;
        const sy = star.y + parallaxY;

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`;
        ctx.fill();

        // Glow halo for bright stars
        if (star.layer === 'bright') {
            ctx.beginPath();
            ctx.arc(sx, sy, star.size * 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha * 0.06})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(sx, sy, star.size * 12, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha * 0.02})`;
            ctx.fill();
        }

        // Subtle drift for distant stars
        star.x += star.speed * 0.1;
        if (star.x > width + 10) star.x = -10;
    }

    function drawNebula(neb) {
        const pulse = Math.sin(time * neb.pulseSpeed + neb.pulsePhase) * 0.2 + 1;
        const driftX = Math.sin(time * neb.driftSpeed + neb.driftPhase) * 25;
        const driftY = Math.cos(time * neb.driftSpeed * 0.6 + neb.driftPhase) * 18;

        const grad = ctx.createRadialGradient(
            neb.x + driftX, neb.y + driftY, 0,
            neb.x + driftX, neb.y + driftY, Math.max(neb.rx, neb.ry) * pulse
        );
        const op = neb.baseOpacity * pulse;
        grad.addColorStop(0,   `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, ${op})`);
        grad.addColorStop(0.3, `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, ${op * 0.5})`);
        grad.addColorStop(0.7, `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, ${op * 0.15})`);
        grad.addColorStop(1,   `rgba(${neb.color[0]}, ${neb.color[1]}, ${neb.color[2]}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
    }

    function drawDust(d) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color[0]}, ${d.color[1]}, ${d.color[2]}, ${d.opacity})`;
        ctx.fill();

        d.x += d.vx + mouseX * 0.2;
        d.y += d.vy;

        if (d.x < -15) d.x = width + 15;
        if (d.x > width + 15) d.x = -15;
        if (d.y < -15) d.y = height + 15;
        if (d.y > height + 15) d.y = -15;
    }

    function drawShootingStar(ss) {
        const tailX = ss.x - ss.vx * (ss.length / 6);
        const tailY = ss.y - ss.vy * (ss.length / 6);

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0,   `rgba(255, 255, 255, ${ss.life})`);
        grad.addColorStop(0.2, `rgba(200, 230, 255, ${ss.life * 0.7})`);
        grad.addColorStop(0.6, `rgba(180, 210, 255, ${ss.life * 0.3})`);
        grad.addColorStop(1,   `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life * 0.5})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${ss.life * 0.15})`;
        ctx.fill();
    }

    function drawAurora(wave) {
        const baseY = wave.yOffset * height;
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 3) {
            const y = baseY + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude
                           + Math.sin(x * wave.frequency * 2.3 + time * wave.speed * 0.7 + wave.phase * 1.3) * wave.amplitude * 0.4;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height);
        grad.addColorStop(0, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, 0)`);
        grad.addColorStop(0.3, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.opacity * 0.5})`);
        grad.addColorStop(0.7, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.opacity})`);
        grad.addColorStop(1, `rgba(${wave.color[0]}, ${wave.color[1]}, ${wave.color[2]}, ${wave.opacity * 0.3})`);

        ctx.fillStyle = grad;
        ctx.fill();
    }

    // ===== MAIN LOOP =====
    function render() {
        time += 0.016;
        frameCount++;

        // Smooth mouse
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        // Clear
        ctx.fillStyle = '#020205';
        ctx.fillRect(0, 0, width, height);

        // Deep space vignette
        const vignette = ctx.createRadialGradient(width * 0.5, height * 0.4, height * 0.2, width * 0.5, height * 0.4, height * 0.9);
        vignette.addColorStop(0, 'rgba(10, 10, 30, 0)');
        vignette.addColorStop(1, 'rgba(0, 0, 5, 0.6)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        // Nebulae
        nebulae.forEach(drawNebula);

        // Stars
        stars.forEach(drawStar);

        // Cosmic dust
        dust.forEach(drawDust);

        // Shooting stars (random spawn)
        if (Math.random() < 0.003) spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += ss.vx;
            ss.y += ss.vy;
            ss.life -= ss.decay;
            if (ss.life <= 0 || ss.x > width + 200 || ss.y > height + 200) {
                shootingStars.splice(i, 1);
            } else {
                drawShootingStar(ss);
            }
        }

        // Aurora waves at bottom
        auroraWaves.forEach(drawAurora);

        animationId = requestAnimationFrame(render);
    }

    // ===== START =====
    resize();
    initStars();
    initNebulae();
    initDust();
    initAurora();
    render();

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resize();
        initStars();
        initNebulae();
        initDust();
        initAurora();
        render();
    });
})();
