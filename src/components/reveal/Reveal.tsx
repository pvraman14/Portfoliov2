import { useEffect, useRef, useState } from 'react'
import './Reveal.scss'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  as?: 'div' | 'li' | 'article' | 'section' | 'header'
  className?: string
}

// Scroll reveal that fails open. If the observer never fires — a backgrounded
// tab, a browser without IntersectionObserver, reduced-motion — the content
// still ends up visible rather than stuck at opacity 0.
const Reveal = ({ children, delay = 0, as = 'div', className = '' }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!node || reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    // already on screen at mount — show immediately, no observer round-trip
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(node)

    // safety net: never leave content hidden if no frame ever arrives
    const failOpen = setTimeout(() => setShown(true), 1600)

    return () => {
      observer.disconnect()
      clearTimeout(failOpen)
    }
  }, [])

  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
