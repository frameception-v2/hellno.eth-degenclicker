"use client";

import { useEffect, useRef } from 'react';
import { useStore } from '~/lib/store';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleClick = useStore(state => state.handleClick);

  // Handle resize and orientation change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasDimensions = () => {
      // Use window's visual viewport to handle mobile zoom
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      
      // Maintain 1:1 aspect ratio for square canvas
      const size = Math.min(vw * 0.9, vh * 0.4);
      
      // Scale for high DPI displays
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx?.scale(dpr, dpr);
    };

    // Initial setup
    setCanvasDimensions();
    
    // Add event listeners
    window.addEventListener('resize', setCanvasDimensions);
    window.addEventListener('orientationchange', setCanvasDimensions);

    // Setup click handler with floating numbers
    const floatingNumbers: Array<{x: number, y: number, value: number, opacity: number}> = [];
    
    const onClick = (e: MouseEvent) => {
      handleClick();
      const rect = canvas.getBoundingClientRect();
      floatingNumbers.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        value: 1,
        opacity: 1
      });
    };
    
    canvas.addEventListener('click', onClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('orientationchange', setCanvasDimensions);
      canvas.removeEventListener('click', onClick);
    };

    // WebGL context setup
    const gl = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Basic render loop
    let animationFrameId: number;
    
    const render = () => {
      // Floating numbers animation system
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw hat emoji
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#c026d3';
        ctx.fillText('🎩', canvas.width/2, canvas.height/2);

        // Update and draw floating numbers
        floatingNumbers.forEach((num, index) => {
          ctx.font = '24px sans-serif';
          ctx.fillStyle = `rgba(139, 92, 246, ${num.opacity})`; // Purple with fading
          ctx.fillText(`+${num.value}`, num.x, num.y);
          
          // Update position and opacity
          num.y -= 2;
          num.opacity -= 0.02;
          
          // Remove faded out numbers
          if (num.opacity <= 0) {
            floatingNumbers.splice(index, 1);
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="bg-background rounded-xl border-2 border-purple-400 shadow-lg touch-none"
    />
  );
}
