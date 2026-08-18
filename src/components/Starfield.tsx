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

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

type Token = { rgb: string; alpha: number }

const LINK_DIST = 130
const CURSOR_DIST = 170
const FALLBACK: Record<string, string> = {
  '--star': 'rgba(214,232,245,0.6)',
  '--constellation': 'rgba(79,209,197,0.55)',
  '--constellation-live': 'rgba(251,191,36,0.6)',
}

const readToken = (name: string): Token => {
  const raw =
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || FALLBACK[name]
  const parsed = raw.match(/rgba?\(([^)]+)\)/)
  if (!parsed) return { rgb: '214,232,245', alpha: 1 }
  const parts = parsed[1].split(',').map(s => s.trim())
  return {
    rgb: parts.slice(0, 3).join(','),
    alpha: parts[3] ? parseFloat(parts[3]) : 1,
  }
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)')
    let reduced = motion.matches

    let stars: Star[] = []
    let nodes: Node[] = []
    let width = 0
    let height = 0
    let frame = 0
    let running = true

    // pointer position in css pixels; parked offscreen until the cursor moves
    let pointerX = -9999
    let pointerY = -9999

    let star = readToken('--star')
    let link = readToken('--constellation')
    let live = readToken('--constellation-live')

    const readTokens = () => {
      star = readToken('--star')
      link = readToken('--constellation')
      live = readToken('--constellation-live')
    }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const starCount = Math.round((width * height) / 6500)
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.9 + 0.3,
        alpha: Math.random() * 0.6 + 0.25,
        speed: Math.random() * 0.0012 + 0.0004,
        phase: Math.random() * Math.PI * 2,
      }))

      // density-based so the link mesh looks the same on any viewport, capped
      // because the neighbour search cost grows with nodes per cell
      const nodeCount = Math.min(72, Math.round((width * height) / 22000))
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.1 + 0.7,
        alpha: Math.random() * 0.45 + 0.35,
      }))

      readTokens()
    }

    // bucket nodes into LINK_DIST cells so each one only tests its 8 neighbours
    // instead of every other node
    const grid = new Map<string, number[]>()
    const bucket = (x: number, y: number) =>
      `${Math.floor(x / LINK_DIST)},${Math.floor(y / LINK_DIST)}`

    const drawLinks = () => {
      grid.clear()
      for (let i = 0; i < nodes.length; i++) {
        const key = bucket(nodes[i].x, nodes[i].y)
        const cell = grid.get(key)
        if (cell) cell.push(i)
        else grid.set(key, [i])
      }

      ctx.lineWidth = 0.7
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const cx = Math.floor(a.x / LINK_DIST)
        const cy = Math.floor(a.y / LINK_DIST)

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const cell = grid.get(`${cx + ox},${cy + oy}`)
            if (!cell) continue
            for (const j of cell) {
              // each pair drawn once
              if (j <= i) continue
              const b = nodes[j]
              const dx = a.x - b.x
              const dy = a.y - b.y
              const d2 = dx * dx + dy * dy
              if (d2 > LINK_DIST * LINK_DIST) continue
              const fade = 1 - Math.sqrt(d2) / LINK_DIST
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(${link.rgb},${(fade * link.alpha * 0.55).toFixed(3)})`
              ctx.stroke()
            }
          }
        }
      }
    }

    const drawCursorLinks = () => {
      if (pointerX < 0) return
      ctx.lineWidth = 0.9
      for (const n of nodes) {
        const dx = n.x - pointerX
        const dy = n.y - pointerY
        const d2 = dx * dx + dy * dy
        if (d2 > CURSOR_DIST * CURSOR_DIST) continue
        const fade = 1 - Math.sqrt(d2) / CURSOR_DIST
        ctx.beginPath()
        ctx.moveTo(n.x, n.y)
        ctx.lineTo(pointerX, pointerY)
        ctx.strokeStyle = `rgba(${live.rgb},${(fade * live.alpha * 0.7).toFixed(3)})`
        ctx.stroke()
      }
    }

    const drawNodes = () => {
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${link.rgb},${(n.alpha * link.alpha).toFixed(3)})`
        ctx.fill()
      }
    }

    const advance = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        // reflect at the edges so the mesh stays inside the viewport
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }
    }

    const drawStars = (t: number) => {
      for (const s of stars) {
        const twinkle = reduced
          ? s.alpha
          : s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.rgb},${(twinkle * star.alpha).toFixed(3)})`
        ctx.fill()
      }
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      drawLinks()
      drawCursorLinks()
      drawNodes()
      drawStars(t)
      if (!reduced) {
        advance()
        frame = requestAnimationFrame(draw)
      }
    }

    build()
    frame = requestAnimationFrame(draw)

    const onResize = () => {
      build()
      if (reduced) draw(0)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
    }

    const onPointerLeave = () => {
      pointerX = -9999
      pointerY = -9999
    }

    // stop burning frames while the tab is hidden
    const onVisibility = () => {
      const visible = !document.hidden
      if (visible === running) return
      running = visible
      if (visible && !reduced) frame = requestAnimationFrame(draw)
      else cancelAnimationFrame(frame)
    }

    const onMotionChange = () => {
      reduced = motion.matches
      cancelAnimationFrame(frame)
      if (reduced) draw(0)
      else frame = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    motion.addEventListener('change', onMotionChange)
    // touch devices have no hovering cursor to trail, so skip the listener
    if (!coarse.matches) {
      window.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerleave', onPointerLeave)
    }

    // repaint when the theme attribute flips
    const observer = new MutationObserver(() => {
      readTokens()
      if (reduced) draw(0)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', onMotionChange)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}

export default Starfield
