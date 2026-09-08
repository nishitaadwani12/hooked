import { useEffect, useRef } from 'react'

// A soft "yarn" trail that follows the cursor on desktop — a small, on-trend
// flourish. Disabled for touch devices and when reduced motion is requested.
export default function CursorTrail({ enabled = true }) {
  const canvasRef = useRef()

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!enabled || !fine) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const points = []
    const colors = ['#FFD1DC', '#B5D8CC', '#A6C1EE', '#FCE38A']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (points.length > 40) points.shift()
    }
    window.addEventListener('pointermove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 1; i < points.length; i++) {
        const p = points[i]
        const prev = points[i - 1]
        p.life -= 0.018
        ctx.strokeStyle = colors[i % colors.length]
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.lineWidth = 4 * p.life
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      while (points.length && points[0].life <= 0) points.shift()
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  )
}
