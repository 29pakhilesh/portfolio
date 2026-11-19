import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// A dot that trails the pointer and opens into a ring over anything clickable.
// It takes the colours of the current slide.
// The native cursor stays visible.
export default function Cursor({ theme }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) {
      return undefined
    }
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (event) => {
      el.classList.add('is-on')
      xTo(event.clientX)
      yTo(event.clientY)
      const interactive = event.target.closest?.('a, button, summary, input, textarea')
      el.classList.toggle('is-hover', Boolean(interactive))
    }
    const leave = () => el.classList.remove('is-on')

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return <div className="cursor" data-theme={theme} ref={ref} aria-hidden="true" />
}
