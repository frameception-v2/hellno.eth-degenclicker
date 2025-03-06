"use client";

import { useEffect, useRef } from 'react';
import { useViewport } from '~/lib/hooks/useViewport';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useViewport();
  const handleClick = useStore(state => state.handleClick);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup click handler with floating numbers
    const floatingNumbers: Array<{x: number, y: number, value: number, opacity: number}> = [];
    const lastTime = 0;
    
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
    return () => canvas.removeEventListener('click', onClick);

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
      width={width}
      height={height}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}
