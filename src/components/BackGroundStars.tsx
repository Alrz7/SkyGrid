
import { useEffect, useRef, useState } from "react";
export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      angle: number;
    }> = [];

    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.1 + 0.1,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        angle: Math.random() * 0.3 - 0.15,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) star.twinkleSpeed *= -1;

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle - Math.PI / 3);

        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.003) {
        meteors.push({
          x: Math.random() * canvas.width * 0.3,
          y: 0,
          length: Math.random() * 200 + 50,
          speed: Math.random() * 8 + 8,
        });
      }

      meteors.forEach((m, i) => {
        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x + m.length,
          m.y + m.length
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(1, "rgba(100,200,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + m.length, m.y + m.length);
        ctx.stroke();

        m.x += m.speed * 1.5;
        m.y += m.speed * 1.5;

        if (m.x > canvas.width || m.y > canvas.height) meteors.splice(i, 1);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" />;
}
