import React, { useRef, useEffect, useState } from "react";

const ParticlePortrait = ({ theme = "light" }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width <= 480) setSize(Math.min(260, width - 40));
      else if (width <= 768) setSize(Math.min(320, width - 60));
      else setSize(460);
    };
    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = size;
    const H = size;
    canvas.width = W;
    canvas.height = H;

    let animationId;
    imageLoadedRef.current = false;

    /* ── Background colour per theme ── */
    const BG = theme === "dark" ? "#030711" : "#f8fafc";

    /* ── Particle colour palette per theme ── */
    const getThemeColor = (brightness) => {
      if (theme === "dark") {
        /* Indigo → cyan for dark mode */
        if (brightness < 0.2) {
          const t = brightness / 0.2;
          return { r: Math.round(30 + 30 * t), g: Math.round(30 + 25 * t), b: Math.round(80 + 40 * t) };
        } else if (brightness < 0.4) {
          const t = (brightness - 0.2) / 0.2;
          return { r: Math.round(60 + 30 * t), g: Math.round(55 + 35 * t), b: Math.round(120 + 60 * t) };
        } else if (brightness < 0.6) {
          const t = (brightness - 0.4) / 0.2;
          return { r: Math.round(90 - 10 * t), g: Math.round(90 + 70 * t), b: Math.round(180 + 40 * t) };
        } else if (brightness < 0.8) {
          const t = (brightness - 0.6) / 0.2;
          return { r: Math.round(80 - 20 * t), g: Math.round(160 + 50 * t), b: Math.round(220 + 18 * t) };
        } else {
          const t = (brightness - 0.8) / 0.2;
          return { r: Math.round(60 + 69 * t), g: Math.round(210 - 70 * t), b: Math.round(238 + 10 * t) };
        }
      } else {
        /* Dark emerald → teal for light mode (visible on white bg) */
        if (brightness < 0.2) {
          const t = brightness / 0.2;
          return { r: Math.round(2 + 3 * t), g: Math.round(44 + 26 * t), b: Math.round(34 + 21 * t) };
        } else if (brightness < 0.4) {
          const t = (brightness - 0.2) / 0.2;
          return { r: Math.round(5 + 0 * t), g: Math.round(70 + 30 * t), b: Math.round(55 + 23 * t) };
        } else if (brightness < 0.6) {
          const t = (brightness - 0.4) / 0.2;
          return { r: Math.round(5 + 2 * t), g: Math.round(100 + 48 * t), b: Math.round(78 + 60 * t) };
        } else if (brightness < 0.8) {
          const t = (brightness - 0.6) / 0.2;
          return { r: Math.round(7 + 6 * t), g: Math.round(148 - 10 * t), b: Math.round(138 + 10 * t) };
        } else {
          const t = (brightness - 0.8) / 0.2;
          return { r: Math.round(13 + 6 * t), g: Math.round(138 + 10 * t), b: Math.round(148 + 8 * t) };
        }
      }
    };

    /* ── Glow colour per theme ── */
    const glowColor = (alpha) =>
      theme === "dark"
        ? `rgba(129, 140, 248, ${alpha})`
        : `rgba(5, 150, 105, ${alpha})`;

    /* ── Load image & build particles ── */
    const img = new Image();
    img.crossOrigin = "Anonymous";
    // img.src = "/anns7.png";
    img.src = "/anns7.png";

    img.onload = () => {
      const off = document.createElement("canvas");
      const offCtx = off.getContext("2d");
      off.width = W;
      off.height = H;

      const scale = 0.9;
      const aspect = img.width / img.height;
      let dH = H * scale;
      let dW = dH * aspect;
      if (dW > W * scale) { dW = W * scale; dH = dW / aspect; }

      offCtx.drawImage(img, (W - dW) / 2, (H - dH) / 2, dW, dH);
      const { data: px } = offCtx.getImageData(0, 0, W, H);

      const gap = size <= 260 ? 2 : size <= 320 ? 2.5 : 3;
      const particles = [];

      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const i = (Math.floor(y) * W + Math.floor(x)) * 4;
          const a = px[i + 3];
          if (a < 50) continue;

          const brightness = (px[i] + px[i + 1] + px[i + 2]) / (3 * 255);
          const col = getThemeColor(brightness);
          const pSize = size <= 260 ? 0.6 + brightness * 0.8 : 0.8 + brightness;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 200;

          particles.push({
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            targetX: x,
            targetY: y,
            vx: 0, vy: 0,
            size: pSize,
            r: col.r, g: col.g, b: col.b,
            baseAlpha: (a / 255) * (0.9 + brightness * 0.1),
            currentAlpha: 0,
            delay: Math.random() * 0.2,
            brightness,
          });
        }
      }

      particlesRef.current = particles;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    img.onerror = () => {
      ctx.fillStyle = theme === "dark" ? "#818cf8" : "#059669";
      ctx.font = "13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Portrait not found", W / 2, H / 2);
    };

    /* ── Draw loop ── */
    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      if (!imageLoadedRef.current) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      for (const p of particles) {
        const pt = elapsed - p.delay;
        if (pt < 0) continue;

        p.currentAlpha = p.baseAlpha * Math.min(1 - Math.pow(1 - Math.min(pt / 1.0, 1), 2), 1);

        const ease = 1 - Math.pow(1 - Math.min(pt / 1.5, 1), 3);

        /* Mouse repulsion */
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const f = (1 - dist / 100) * 4;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        const pull = 0.025 + ease * 0.15;
        p.vx += (p.targetX - p.x) * pull;
        p.vy += (p.targetY - p.y) * pull;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;

        /* Main particle */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.currentAlpha})`;
        ctx.fill();

        /* Glow on bright particles */
        if (p.brightness > 0.65) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = glowColor(p.currentAlpha * 0.12);
          ctx.fill();
        }
      }

      /* Vignette */
      const vg = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.65);
      if (theme === "dark") {
        vg.addColorStop(0, "rgba(3, 7, 17, 0)");
        vg.addColorStop(1, "rgba(3, 7, 17, 0.4)");
      } else {
        vg.addColorStop(0, "rgba(248, 250, 252, 0)");
        vg.addColorStop(1, "rgba(248, 250, 252, 0.25)");
      }
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    };

    /* ── Event listeners ── */
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
      mouseRef.current.active = true;
    };
    const onTouch = (e) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current.x = t.clientX - r.left;
      mouseRef.current.y = t.clientY - r.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchend", onLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [size, theme]); // re-runs on theme change

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px`, cursor: "crosshair", display: "block" }}
      />
    </div>
  );
};

export default ParticlePortrait;
