"use client";

import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  connections: number[];
}

export default function GraphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    
    const checkDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = checkDarkMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
        isDark = e.matches;
    };
    mediaQuery.addEventListener('change', handleThemeChange);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNodes = () => {
      nodes = [];
      // Create clusters in corners/sides primarily
      const clusters = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2 },
        { x: canvas.width * 0.8, y: canvas.height * 0.8 },
        { x: canvas.width * 0.8, y: canvas.height * 0.2 },
        { x: canvas.width * 0.2, y: canvas.height * 0.8 },
      ];

      clusters.forEach(cluster => {
        // Create 5-8 nodes per cluster
        const count = 5 + Math.random() * 5;
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: cluster.x + (Math.random() - 0.5) * 300,
                y: cluster.y + (Math.random() - 0.5) * 300,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 2 + Math.random() * 2,
                alpha: 0, // Start invisible
                targetAlpha: 0.2 + Math.random() * 0.5,
                connections: []
            });
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Movement
        node.x += node.vx;
        node.y += node.vy;

        // Fade in/out cycle logic
        if (Math.random() < 0.01) {
            node.targetAlpha = node.targetAlpha > 0 ? 0 : 0.2 + Math.random() * 0.5;
        }
        
        // Smooth alpha transition
        const diff = node.targetAlpha - node.alpha;
        node.alpha += diff * 0.05;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Color Selection
        const r = isDark ? 168 : 0;
        const g = isDark ? 85 : 0;
        const b = isDark ? 247 : 0;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.alpha})`;
        ctx.fill();

        // Connections
        nodes.forEach((otherNode, j) => {
            if (i === j) return;
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                // Line opacity based on nodes opacity and distance
                const lineAlpha = (Math.min(node.alpha, otherNode.alpha)) * (1 - dist / 150);
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createNodes();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleThemeChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}
