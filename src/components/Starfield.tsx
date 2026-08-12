import { useEffect, useRef } from 'react'
import './Starfield.scss'

type Star = {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
  phase: number
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let width = 0
    let height = 0
    let frame = 0

    // read the star colour from the theme token so the field flips with the theme
    const starColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--star').trim() ||
      'rgba(214,232,245,0.6)'

    let rgb = '214,232,245'
    let baseAlpha = 0.6

    const readToken = () => {
      const parsed = starColor().match(/rgba?\(([^)]+)\)/)
      if (parsed) {
        const parts = parsed[1].split(',').map(s => s.trim())
        rgb = parts.slice(0, 3).join(',')
        baseAlpha = parts[3] ? parseFloat(parts[3]) : 1
      }
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((width * height) / 6500)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.9 + 0.3,
        alpha: Math.random() * 0.6 + 0.25,
        speed: Math.random() * 0.0012 + 0.0004,
        phase: Math.random() * Math.PI * 2,
      }))
      readToken()
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const twinkle = reduced
          ? s.alpha
          : s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${(twinkle * baseAlpha).toFixed(3)})`
        ctx.fill()
      }
      if (!reduced) frame = requestAnimationFrame(draw)
    }

    build()
    frame = requestAnimationFrame(draw)

    const onResize = () => {
      build()
      if (reduced) draw(0)
    }
    window.addEventListener('resize', onResize)

    // repaint when the theme attribute flips
    const observer = new MutationObserver(() => {
      readToken()
      if (reduced) draw(0)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}

export default Starfield
