import { useRef } from 'react'
import { gsap, useGSAP, DECK_QUERY } from '../lib/motion'

// Full-bleed background photo for a slide. The outer layer settles from a
// zoom when the slide arrives (data-zoom, see lib/motion.js); the inner
// layer drifts slightly with the pointer on desktop.
export default function Scene({ src, position = '0% 60%', className = '' }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(DECK_QUERY, () => {
        const pan = root.current.querySelector('.photo__pan')
        const x = gsap.quickTo(pan, 'x', { duration: 1.6, ease: 'power3.out' })
        const y = gsap.quickTo(pan, 'y', { duration: 1.6, ease: 'power3.out' })
        const onMove = (event) => {
          // only while this slide is the one on screen
          if (root.current.closest('.slide')?.getAttribute('aria-hidden') === 'true') return
          x((event.clientX / window.innerWidth - 0.5) * -26)
          y((event.clientY / window.innerHeight - 0.5) * -14)
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
      })
    },
    { scope: root },
  )

  return (
    <div className={`photo ${className}`.trim()} ref={root} data-zoom aria-hidden="true">
      <div className="photo__pan">
        <img src={src} alt="" style={{ objectPosition: position }} width="2000" height="800" />
      </div>
    </div>
  )
}
