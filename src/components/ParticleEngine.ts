import { lerp } from "~/lib/utils";

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: [number, number, number] // RGB tuple
}

export class ParticleEngine {
  private particles: Particle[] = []
  private poolSize: number
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, poolSize = 100) {
    this.ctx = ctx
    this.poolSize = poolSize
  }

  spawn(x: number, y: number, count = 10) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.poolSize) return

      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.7) * 6,
        life: 0,
        maxLife: 0.8 + Math.random() * 0.5,
        size: 4 + Math.random() * 6,
        color: [
          lerp(170, 230, Math.random()), // Purple
          lerp(80, 180, Math.random()),   // Cyan 
          lerp(180, 255, Math.random())   // Blue
        ]
      })
    }
  }

  update(deltaTime: number) {
    this.particles = this.particles.filter(p => {
      p.x += p.vx * deltaTime
      p.y += p.vy * deltaTime
      p.vy += 9.8 * deltaTime // Gravity
      p.life += deltaTime
      return p.life < p.maxLife
    })
  }

  draw() {
    this.particles.forEach(p => {
      const alpha = 1 - (p.life / p.maxLife)
      this.ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha})`
      
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
      this.ctx.fill()
    })
  }

  resize(width: number, height: number) {
    // Reset particles on resize
    this.particles = []
  }
}
