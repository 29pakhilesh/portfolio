import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Wide, tall-enough screens with motion allowed get the slide deck.
export const DECK_QUERY =
  '(min-width: 1000px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const all = (root, selector) => root.querySelectorAll(selector)

// Put a slide's animated pieces in their "before" state.
export function prime(slide) {
  gsap.set(all(slide, '.title__word > span, [data-letters] span'), { yPercent: 115 })
  gsap.set(all(slide, '[data-in]'), { y: 48, opacity: 0 })
  gsap.set(all(slide, '[data-wipe]'), { clipPath: 'inset(100% 0% 0% 0%)' })
  gsap.set(all(slide, '[data-wipe] img'), { scale: 1.3 })
  gsap.set(all(slide, '[data-unroll]'), { clipPath: 'inset(0% -5% 100% -5%)' })
  gsap.set(all(slide, '[data-draw]'), { strokeDashoffset: 88 })
  gsap.set(all(slide, '[data-stamp]'), { scale: 2.2, opacity: 0, rotation: -18 })
  gsap.set(all(slide, '[data-zoom]'), { scale: 1.14 })
  gsap.set(all(slide, '.kanji__text'), { opacity: 0, y: -30 })
  gsap.set(all(slide, '.statement span'), { opacity: 0.12 })
}

// Play a slide's entrance: headings rise out of masks, content drifts up,
// images wipe open, scrolls unroll, the brush circle is drawn, seals are
// stamped, background photos settle from a zoom and numbers count up.
export function playEnter(slide, delay = 0) {
  const tl = gsap.timeline({ delay })

  const letters = all(slide, '[data-letters] span')
  if (letters.length) {
    tl.to(letters, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.035 }, 0)
  }
  const words = all(slide, '.title__word > span')
  if (words.length) {
    tl.to(words, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07 }, 0)
  }
  const wipes = all(slide, '[data-wipe]')
  if (wipes.length) {
    tl.to(wipes, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0)
    tl.to(all(slide, '[data-wipe] img'), { scale: 1, duration: 1.6, ease: 'expo.out' }, 0.15)
  }
  const scrolls = all(slide, '[data-unroll]')
  if (scrolls.length) {
    tl.to(
      scrolls,
      { clipPath: 'inset(0% -5% -5% -5%)', duration: 1.3, ease: 'expo.inOut', stagger: 0.12 },
      0.1,
    )
  }
  const strokes = all(slide, '[data-draw]')
  if (strokes.length) {
    tl.to(strokes, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.1)
  }
  const photos = all(slide, '[data-zoom]')
  if (photos.length) {
    tl.to(photos, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
  }
  const statement = all(slide, '.statement span')
  if (statement.length) {
    tl.to(statement, { opacity: 1, duration: 0.5, ease: 'none', stagger: 0.035 }, 0.2)
  }
  const items = all(slide, '[data-in]')
  if (items.length) {
    tl.to(items, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.07 }, 0.2)
  }
  const kanji = all(slide, '.kanji__text')
  if (kanji.length) {
    tl.to(kanji, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.25)
  }
  const stamps = all(slide, '[data-stamp]')
  if (stamps.length) {
    tl.to(
      stamps,
      { scale: 1, opacity: 1, rotation: -5, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.1 },
      0.75,
    )
  }
  all(slide, '[data-count]').forEach((node) => {
    const target = Number(node.dataset.count)
    const state = { value: target > 1900 ? target - 28 : 0 }
    tl.to(
      state,
      {
        value: target,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: () => {
          node.textContent = Math.round(state.value)
        },
      },
      0.4,
    )
  })

  return tl
}

export { gsap, ScrollTrigger, useGSAP }
