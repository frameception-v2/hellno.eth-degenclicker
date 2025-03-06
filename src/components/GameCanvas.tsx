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

    // Setup click handler with visual feedback
    const onClick = () => {
      handleClick();
      // Temporary click feedback until particle system is implemented
      canvas.style.transform = 'scale(0.95)';
      setTimeout(() => canvas.style.transform = 'scale(1)', 100);
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
      // Temporary 2D rendering for placeholder
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#c026d3';
        ctx.fillText('🎩', canvas.width/2, canvas.height/2);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}
