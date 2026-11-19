import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Wraps a link or button so it leans toward the pointer.
export default function Magnetic({ as: Tag = 'a', strength = 0.35, children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) {
      return undefined
    }
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })

    const move = (event) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - rect.left - rect.width / 2) * strength)
      yTo((event.clientY - rect.top - rect.height / 2) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength])

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  )
}
