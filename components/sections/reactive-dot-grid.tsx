"use client";

import { useEffect, useRef } from "react";

type Dot = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  depth: number;
  radius: number;
  alpha: number;
};

const layers = [
  { step: 118, depth: 0.18, radius: 0.7, alpha: 0.16 },
  { step: 92, depth: 0.3, radius: 0.8, alpha: 0.22 },
  { step: 68, depth: 0.48, radius: 0.95, alpha: 0.34 },
  { step: 48, depth: 0.72, radius: 1.12, alpha: 0.5 },
  { step: 32, depth: 1, radius: 1.45, alpha: 0.82 }
];

export function ReactiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: -9999,
      y: -9999,
      active: false
    };
    let animationFrame = 0;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const createDots = () => {
      const nextDots: Dot[] = [];
      const offsetX = width * 0.08;
      const offsetY = height * 0.08;

      for (const layer of layers) {
        for (let y = -offsetY; y <= height + offsetY; y += layer.step) {
          for (let x = -offsetX; x <= width + offsetX; x += layer.step) {
            const perspectiveX = (x - width / 2) * layer.depth + width / 2;
            const perspectiveY = (y - height / 2) * layer.depth + height / 2;

            nextDots.push({
              baseX: perspectiveX,
              baseY: perspectiveY,
              x: perspectiveX,
              y: perspectiveY,
              depth: layer.depth,
              radius: layer.radius,
              alpha: layer.alpha
            });
          }
        }
      }

      dots = nextDots;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createDots();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.42,
        0,
        width * 0.5,
        height * 0.42,
        Math.max(width, height) * 0.72
      );
      gradient.addColorStop(0, "rgba(234, 242, 255, 0.1)");
      gradient.addColorStop(0.32, "rgba(34, 211, 238, 0.1)");
      gradient.addColorStop(0.58, "rgba(124, 58, 237, 0.06)");
      gradient.addColorStop(1, "rgba(2, 6, 23, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      if (!reducedMotion.matches && pointer.active) {
        const cursorGlow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          170
        );
        cursorGlow.addColorStop(0, "rgba(255, 255, 255, 0.24)");
        cursorGlow.addColorStop(0.22, "rgba(234, 242, 255, 0.16)");
        cursorGlow.addColorStop(0.46, "rgba(34, 211, 238, 0.1)");
        cursorGlow.addColorStop(0.7, "rgba(124, 58, 237, 0.06)");
        cursorGlow.addColorStop(1, "rgba(2, 6, 23, 0)");
        context.fillStyle = cursorGlow;
        context.fillRect(pointer.x - 170, pointer.y - 170, 340, 340);

        context.beginPath();
        context.strokeStyle = "rgba(255, 255, 255, 0.34)";
        context.lineWidth = 1;
        context.arc(pointer.x, pointer.y, 58, 0, Math.PI * 2);
        context.stroke();
      }

      for (const dot of dots) {
        if (!reducedMotion.matches && pointer.active) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = Math.max(0, 1 - distance / 220) * dot.depth;
          const push = force * 86;

          dot.x += (dot.baseX + (dx / distance) * push - dot.x) * 0.24;
          dot.y += (dot.baseY + (dy / distance) * push - dot.y) * 0.24;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.14;
          dot.y += (dot.baseY - dot.y) * 0.14;
        }

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      pointer.x = x;
      pointer.y = y;
      pointer.active = isInside;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
