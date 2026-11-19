import { useEffect, useRef, useState } from 'react'
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  DECK_QUERY,
  prime,
  playEnter,
  prefersReducedMotion,
} from './lib/motion'
import { createDeck } from './lib/deck'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Petals from './components/Petals'
import Hud from './components/Hud'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Strengths from './sections/Strengths'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'

const BOOT_KEY = 'portfolio-booted'

function shouldBoot() {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem(BOOT_KEY)
  } catch {
    return true
  }
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)
  const isDeck = useMediaQuery(DECK_QUERY)
  const [view, setView] = useState({ index: 0, count: 1, theme: 'paper', nav: '' })
  const root = useRef(null)
  const deck = useRef(null)

  useGSAP(
    () => {
      const slides = gsap.utils.toArray('.slide', root.current)
      const report = (index, slide) =>
        setView({
          index,
          count: slides.length,
          theme: slide.dataset.theme,
          nav: slide.dataset.nav ?? '',
        })

      // Desktop: full-screen slide deck.
      if (isDeck) {
        document.documentElement.classList.add('is-deck')
        window.scrollTo(0, 0)
        const instance = createDeck({ root: root.current, onChange: report })
        deck.current = instance
        prime(instance.current())
        if (!booting) playEnter(instance.current(), 0.1)
        return () => {
          instance.destroy()
          deck.current = null
          document.documentElement.classList.remove('is-deck')
        }
      }

      // Phones / small windows: normal scrolling page, each section animates in once.
      deck.current = null
      slides.forEach((slide, index) => {
        ScrollTrigger.create({
          trigger: slide,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && report(index, slide),
        })
      })
      if (prefersReducedMotion()) return undefined

      slides.forEach((slide) => prime(slide))
      if (!booting) {
        slides.forEach((slide) => {
          ScrollTrigger.create({
            trigger: slide,
            start: 'top 78%',
            once: true,
            onEnter: () => playEnter(slide),
          })
        })
      }
      return undefined
    },
    { scope: root, dependencies: [isDeck, booting], revertOnUpdate: true },
  )

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  const finishBoot = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* private mode: just boot again next time */
    }
    setBooting(false)
  }

  return (
    <div ref={root}>
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      {booting && <Preloader onDone={finishBoot} />}
      {/* Roughens edges so the hanko seal looks stamped in ink (used by .brand__seal). */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="stamp">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="1.8" />
        </filter>
      </svg>
      <Petals />
      <Cursor theme={view.theme} />
      <Nav theme={view.theme} active={view.nav} />
      <main>
        <Hero start={!booting} />
        <About />
        <Strengths />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Hud
        index={view.index}
        count={view.count}
        theme={view.theme}
        onPrev={() => deck.current?.prev()}
        onNext={() => deck.current?.next()}
      />
    </div>
  )
}
