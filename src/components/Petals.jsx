import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Cherry petals drifting across the whole page on a fixed canvas.
// Purely decorative: it ignores the pointer and is skipped for reduced motion.
export default function Petals() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || prefersReducedMotion()) return undefined

    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    const count = window.innerWidth < 900 ? 10 : 18
    const random = (min, max) => min + Math.random() * (max - min)

    const spawn = (anywhere) => ({
      x: random(-0.1, 1.1) * width,
      y: anywhere ? random(0, 1) * height : -20,
      size: random(5, 11),
      fall: random(18, 46),
      drift: random(-22, 10),
      sway: random(0.6, 1.6),
      phase: random(0, Math.PI * 2),
      spin: random(-1.2, 1.2),
      angle: random(0, Math.PI * 2),
      alpha: random(0.45, 0.85),
      tint: Math.random() > 0.5 ? '246, 190, 198' : '238, 160, 176',
    })
    let petals = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!petals.length) petals = Array.from({ length: count }, () => spawn(true))
    }

    const draw = (petal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.angle)
      // Squash the petal as it tumbles so it looks like it is turning in the air.
      ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.cos(petal.phase * 0.7)))
      ctx.fillStyle = `rgba(${petal.tint}, ${petal.alpha})`
      const s = petal.size
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.8, s * 0.6, 0, s)
      ctx.bezierCurveTo(-s * 0.8, s * 0.6, -s * 0.9, -s * 0.7, 0, -s)
      ctx.fill()
      ctx.restore()
    }

    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)
      petals.forEach((petal, index) => {
        petal.phase += dt * petal.sway
        petal.y += petal.fall * dt
        petal.x += (petal.drift + Math.sin(petal.phase) * 26) * dt
        petal.angle += petal.spin * dt
        if (petal.y > height + 24 || petal.x < -60) petals[index] = spawn(false)
        draw(petal)
      })
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="petals" aria-hidden="true" />
}
