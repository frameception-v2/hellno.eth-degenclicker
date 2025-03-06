"use client";

export function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --neon-purple: #bc13fe;
        --neon-cyan: #00f3ff;
        --cyber-gradient: linear-gradient(
          135deg,
          var(--neon-purple) 0%,
          var(--neon-cyan) 100%
        );
        --bg-pulse: linear-gradient(
          45deg,
          #0a0a0a 0%,
          #1a1a1a 50%,
          #0a0a0a 100%
        );
      }

      .cyberpunk-theme {
        background: var(--bg-pulse),
          radial-gradient(circle at center, var(--neon-purple) 0%, #000 70%);
        background-blend-mode: screen;
        color: var(--neon-purple);
        animation: bg-pulse 5s infinite;
      }

      @keyframes bg-pulse {
        0% { background-size: 100% 100%, auto; }
        50% { background-size: 150% 150%, auto; }
        100% { background-size: 100% 100%, auto; }
      }

      .cyberpunk-theme h1, .cyberpunk-theme h2, .cyberpunk-theme h3 {
        text-shadow: 0 0 10px var(--neon-purple),
                     0 0 20px var(--neon-purple),
                     0 0 30px var(--neon-cyan);
      }

      .cyberpunk-theme::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          0deg,
          rgba(188, 19, 254, 0.1) 0px,
          rgba(188, 19, 254, 0.1) 2px,
          transparent 2px,
          transparent 4px
        );
        pointer-events: none;
        z-index: 1;
      }
    `}</style>
  );
}
