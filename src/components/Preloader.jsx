import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'

// Shown once per browser session: a sheet of paper with a counter, which
// lifts away to reveal the first slide.
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useGSAP(
    () => {
      const state = { value: 0 }
      gsap
        .timeline({ onComplete: onDone })
        .from('.preloader__center > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' })
        .to(
          state,
          {
            value: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = Math.round(state.value)
            },
          },
          0.2,
        )
        .to('.preloader__bar i', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.2)
        .to('.preloader__center', { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in' }, '+=0.1')
        .to(root.current, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
    },
    { scope: root },
  )

  return (
    <div className="preloader" ref={root} role="status" aria-label="Loading portfolio">
      <div className="preloader__center" aria-hidden="true">
        <span className="preloader__jp" lang="ja">
          序
        </span>
        <span className="preloader__count" ref={count}>
          0
        </span>
        <span className="preloader__bar">
          <i />
        </span>
      </div>
    </div>
  )
}
