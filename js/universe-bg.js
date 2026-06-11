/**
 * Science Unpacked — Dramatic Animated Universe Background
 * Highly visible nebulae, bright glowing stars, cosmic dust,
 * frequent shooting stars, and vivid aurora effects.
 */
(function() {
    'use strict';

    const canvas = document.getElementById('universe-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let animationId;
    let time = 0;

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
    }, { passive: true });

    // ===== CONFIG — MUCH MORE VISIBLE =====
    const STAR_LAYERS = {
        distant: { count: 400, speed: 0.015, size: [0.5, 1.2], opacity: [0.25, 0.55], color: [180, 200, 230] },
        mid:     { count: 200, speed: 0.06,  size: [1.0, 2.2], opacity: [0.4, 0.75],  color: [160, 210, 255] },
        near:    { count: 100, speed: 0.14,  size: [1.5, 3.0], opacity: [0.55, 0.9],  color: [140, 220, 255] },
        bright:  { count: 40,  speed: 0.25,  size: [2.0, 4.5], opacity: [0.7, 1.0],   color: [255, 255, 255] }
    };

    const stars = [];
    const nebulae = [];
    const dust = [];
    const shootingStars = [];
    const auroraWaves = [];

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
                    twinkleSpeed: rand(0.3, 2.0),
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
            // Large cyan nebula — upper left
            { x: 0.08, y: 0.15, rx: 0.5, ry: 0.4,  color: [34, 211, 238],  opacity: 0.12, speed: 0.06 },
            // Large purple nebula — upper right
            { x: 0.9,  y: 0.1,  rx: 0.45, ry: 0.35, color: [168, 85, 247], opacity: 0.10, speed: 0.05 },
            // Pink nebula — lower right
            { x: 0.78, y: 0.72, rx: 0.35, ry: 0.28, color: [244, 114, 182], opacity: 0.08, speed: 0.08 },
            // Blue center wash
            { x: 0.5,  y: 0.45, rx: 0.55, ry: 0.45, color: [80, 140, 240],  opacity: 0.05, speed: 0.04 },
            // Purple lower left
            { x: 0.15, y: 0.82, rx: 0.28, ry: 0.22, color: [139, 92, 246],  opacity: 0.09, speed: 0.06 },
            // Cyan right mid
            { x: 0.95, y: 0.5,  rx: 0.22, ry: 0.3,  color: [34, 211, 238],  opacity: 0.07, speed: 0.07 }
        ];
        configs.forEach(cfg => {
            nebulae.push({
                x: cfg.x * width, y: cfg.y * height,
                rx: cfg.rx * width, ry: cfg.ry * height,
                color: cfg.color, baseOpacity: cfg.opacity,
                pulseSpeed: rand(0.06, 0.15), pulsePhase: rand(0, Math.PI * 2),
                driftSpeed: rand(0.012, 0.03), driftPhase: rand(0, Math.PI * 2)
            });
        });
    }

    function initDust() {
        dust.length = 0;
        for (let i = 0; i < 120; i++) {
            dust.push({
                x: rand(0, width), y: rand(0, height),
                size: rand(0.6, 2.0),
                opacity: rand(0.03, 0.1),
                vx: rand(-0.1, 0.1), vy: rand(-0.05, -0.18),
                color: rand(0,1) > 0.55 ? [244,114,182] : (rand(0,1) > 0.4 ? [34,211,238] : [200,210,255])
            });
        }
    }

    function initAurora() {
        auroraWaves.length = 0;
        for (let i = 0; i < 3; i++) {
            auroraWaves.push({
                yOffset: rand(0.72, 0.9),
                amplitude: rand(40, 80),
                frequency: rand(0.0015, 0.004),
                speed: rand(0.25, 0.6),
                phase: rand(0, Math.PI * 2),
                color: i === 0 ? [34, 211, 238] : (i === 1 ? [168, 85, 247] : [244, 114, 182]),
                opacity: rand(0.06, 0.12)
            });
        }
    }

    function spawnShootingStar() {
        const side = Math.random() > 0.5 ? 'left' : 'top';
        let x, y, vx, vy;
        if (side === 'left') {
            x = rand(-80, width * 0.35); y = rand(0, height * 0.45);
            vx = rand(6, 12); vy = rand(2, 5);
        } else {
            x = rand(0, width * 0.7); y = rand(-40, height * 0.25);
            vx = rand(5, 10); vy = rand(2.5, 6);
        }
        shootingStars.push({ x, y, vx, vy, length: rand(60, 200), life: 1, decay: rand(0.005, 0.012), width: rand(1.2, 3) });
    }

    function drawStar(s) {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
        const alpha = s.baseOpacity * twinkle;
        const px = s.x + mouseX * s.speed * 50;
        const py = s.y + mouseY * s.speed * 30;

        // Core
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${alpha})`;
        ctx.fill();

        // Glow for bright stars
        if (s.layer === 'bright' || s.size > 2) {
            ctx.beginPath();
            ctx.arc(px, py, s.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${alpha * 0.1})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px, py, s.size * 10, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${alpha * 0.03})`;
            ctx.fill();
        }

        // Very subtle drift
        s.x += s.speed * 0.08;
        if (s.x > width + 15) s.x = -15;
    }

    function drawNebula(n) {
        const pulse = Math.sin(time * n.pulseSpeed + n.pulsePhase) * 0.2 + 1;
        const dx = Math.sin(time * n.driftSpeed + n.driftPhase) * 30;
        const dy = Math.cos(time * n.driftSpeed * 0.6 + n.driftPhase) * 20;

        const grad = ctx.createRadialGradient(n.x + dx, n.y + dy, 0, n.x + dx, n.y + dy, Math.max(n.rx, n.ry) * pulse);
        const op = n.baseOpacity * pulse;
        grad.addColorStop(0,   `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${op})`);
        grad.addColorStop(0.3, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${op * 0.55})`);
        grad.addColorStop(0.7, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${op * 0.2})`);
        grad.addColorStop(1,   `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
    }

    function drawDust(d) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color[0]}, ${d.color[1]}, ${d.color[2]}, ${d.opacity})`;
        ctx.fill();
        d.x += d.vx + mouseX * 0.15;
        d.y += d.vy;
        if (d.x < -15) d.x = width + 15;
        if (d.x > width + 15) d.x = -15;
        if (d.y < -15) d.y = height + 15;
        if (d.y > height + 15) d.y = -15;
    }

    function drawShootingStar(ss) {
        const tx = ss.x - ss.vx * (ss.length / 6);
        const ty = ss.y - ss.vy * (ss.length / 6);
        const grad = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
        grad.addColorStop(0,   `rgba(255,255,255,${ss.life})`);
        grad.addColorStop(0.2, `rgba(200,230,255,${ss.life * 0.7})`);
        grad.addColorStop(0.6, `rgba(180,210,255,${ss.life * 0.25})`);
        grad.addColorStop(1,   `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.life * 0.5})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${ss.life * 0.2})`;
        ctx.fill();
    }

    function drawAurora(w) {
        const baseY = w.yOffset * height;
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 2) {
            const y = baseY
                + Math.sin(x * w.frequency + time * w.speed + w.phase) * w.amplitude
                + Math.sin(x * w.frequency * 2.2 + time * w.speed * 0.7 + w.phase * 1.3) * w.amplitude * 0.35;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, baseY - w.amplitude, 0, height);
        grad.addColorStop(0,   `rgba(${w.color[0]},${w.color[1]},${w.color[2]},0)`);
        grad.addColorStop(0.25,`rgba(${w.color[0]},${w.color[1]},${w.color[2]},${w.opacity * 0.4})`);
        grad.addColorStop(0.6, `rgba(${w.color[0]},${w.color[1]},${w.color[2]},${w.opacity})`);
        grad.addColorStop(1,   `rgba(${w.color[0]},${w.color[1]},${w.color[2]},${w.opacity * 0.25})`);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    // ===== MAIN LOOP =====
    function render() {
        time += 0.016;
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        // Deep space base
        ctx.fillStyle = '#020205';
        ctx.fillRect(0, 0, width, height);

        // Dark vignette (corners darker)
        const vig = ctx.createRadialGradient(width * 0.5, height * 0.35, height * 0.25, width * 0.5, height * 0.35, height * 0.95);
        vig.addColorStop(0, 'rgba(10,10,30,0)');
        vig.addColorStop(1, 'rgba(0,0,5,0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, width, height);

        // Nebulae
        nebulae.forEach(drawNebula);

        // Stars
        stars.forEach(drawStar);

        // Dust
        dust.forEach(drawDust);

        // Shooting stars
        if (Math.random() < 0.005) spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += ss.vx; ss.y += ss.vy; ss.life -= ss.decay;
            if (ss.life <= 0 || ss.x > width + 200 || ss.y > height + 200) shootingStars.splice(i, 1);
            else drawShootingStar(ss);
        }

        // Aurora
        auroraWaves.forEach(drawAurora);

        animationId = requestAnimationFrame(render);
    }

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
