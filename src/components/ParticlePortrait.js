import React, { useRef, useEffect, useState } from "react";

const ParticlePortrait = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setSize(Math.min(280, width - 40));
      } else if (width <= 768) {
        setSize(Math.min(350, width - 60));
      } else {
        setSize(500);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const canvasWidth = size;
    const canvasHeight = size;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let animationId;

    // Refined professional color palette
    const getThemeColor = (brightness) => {
      if (brightness < 0.2) {
        const t = brightness / 0.2;
        return {
          r: Math.round(20 + (45 - 20) * t),
          g: Math.round(40 + (75 - 40) * t),
          b: Math.round(65 + (95 - 65) * t),
        };
      } else if (brightness < 0.4) {
        const t = (brightness - 0.2) / 0.2;
        return {
          r: Math.round(45 + (70 - 45) * t),
          g: Math.round(75 + (120 - 75) * t),
          b: Math.round(95 + (140 - 95) * t),
        };
      } else if (brightness < 0.6) {
        const t = (brightness - 0.4) / 0.2;
        return {
          r: Math.round(70 + (90 - 70) * t),
          g: Math.round(120 + (170 - 120) * t),
          b: Math.round(140 + (180 - 140) * t),
        };
      } else if (brightness < 0.8) {
        const t = (brightness - 0.6) / 0.2;
        return {
          r: Math.round(90 + (100 - 90) * t),
          g: Math.round(170 + (220 - 170) * t),
          b: Math.round(180 + (210 - 180) * t),
        };
      } else {
        const t = (brightness - 0.8) / 0.2;
        return {
          r: Math.round(100 + (100 - 100) * t),
          g: Math.round(220 + (255 - 220) * t),
          b: Math.round(210 + (220 - 210) * t),
        };
      }
    };

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = "/anns.png";

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      const scale = 0.9;
      const imgAspect = img.width / img.height;

      let drawHeight = canvasHeight * scale;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > canvasWidth * scale) {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;

      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixels = imageData.data;

      const particles = [];
      // Keep original density for image quality
      const particleGap = size <= 280 ? 2 : size <= 350 ? 2.5 : 3;

      for (let y = 0; y < canvasHeight; y += particleGap) {
        for (let x = 0; x < canvasWidth; x += particleGap) {
          const i = (Math.floor(y) * canvasWidth + Math.floor(x)) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          if (a > 50) {
            const brightness = (r + g + b) / (3 * 255);
            const themeColor = getThemeColor(brightness);

            const particleSize = size <= 280
              ? 0.6 + brightness * 0.8
              : 0.8 + brightness * 1.0;

            // Smaller scatter for faster assembly
            const scatterRadius = 200;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * scatterRadius;
            const scatterX = Math.cos(angle) * distance;
            const scatterY = Math.sin(angle) * distance;

            particles.push({
              x: x + scatterX,
              y: y + scatterY,
              targetX: x,
              targetY: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: particleSize,
              r: themeColor.r,
              g: themeColor.g,
              b: themeColor.b,
              a: a,
              baseAlpha: (a / 255) * (0.9 + brightness * 0.1),
              currentAlpha: 0,
              // Faster start
              delay: Math.random() * 0.2,
              brightness: brightness,
            });
          }
        }
      }

      particlesRef.current = particles;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    img.onerror = () => {
      console.error("Failed to load image.");
      ctx.fillStyle = "#64ffda";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Image not found", canvasWidth / 2, canvasHeight / 2 - 10);
      ctx.fillText("Place 'profile.jpeg' in public folder", canvasWidth / 2, canvasHeight / 2 + 15);
    };

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      // Deep navy background
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (!imageLoadedRef.current) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay;

        if (particleTime < 0) return;

        // Faster fade in
        const fadeProgress = Math.min(particleTime / 1.0, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        p.currentAlpha = p.baseAlpha * easedFade;

        // Faster settle
        const moveProgress = Math.min(particleTime / 1.5, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        // BIGGER + SMOOTHER + FASTER hover effect
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 100; // Bigger radius (was 60)

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4; // Stronger push (was 2.5)
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        // Stronger pull for snappier return
        const pullStrength = 0.025 + easedMove * 0.15;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;

        // Smoother damping
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        // Draw main particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.currentAlpha})`;
        ctx.fill();

        // Subtle glow on bright particles
        if (p.brightness > 0.65) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 255, 218, ${p.currentAlpha * 0.1})`;
          ctx.fill();
        }
      });

      // Refined vignette
      const gradient = ctx.createRadialGradient(
        canvasWidth / 2, canvasHeight / 2, canvasWidth * 0.3,
        canvasWidth / 2, canvasHeight / 2, canvasWidth * 0.65
      );
      gradient.addColorStop(0, "rgba(10, 25, 47, 0)");
      gradient.addColorStop(1, "rgba(10, 25, 47, 0.35)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        className="simulation-container"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: "crosshair",
        }}
      />
    </div>
  );
};

export default ParticlePortrait;