import { gsap, prime, playEnter } from './motion'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * Full-screen slide deck. One wheel flick, swipe or arrow key moves exactly
 * one slide. Between sections the next slide dissolves in with a gentle
 * zoom; project previews zoom open into their own slide; and slides that
 * share a data-group (the projects) glide sideways.
 */
export function createDeck({ root, onChange }) {
  const slides = gsap.utils.toArray('.slide', root)

  let current = 0
  let animating = false
  let timeline = null

  const activate = (index) => {
    slides.forEach((slide, i) => {
      slide.inert = i !== index
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true')
    })
    current = index
    const slide = slides[index]
    if (slide.id) history.replaceState(null, '', `#${slide.id}`)
    onChange(index, slide)
  }

  // Start on the slide named in the URL, if any.
  const hashed = slides.findIndex((slide) => slide.id && `#${slide.id}` === location.hash)
  gsap.set(slides, { autoAlpha: 0 })
  gsap.set(slides[Math.max(0, hashed)], { autoAlpha: 1 })
  activate(Math.max(0, hashed))

  function goTo(target) {
    const index = clamp(target, 0, slides.length - 1)
    if (animating || index === current) return
    animating = true

    const from = slides[current]
    const to = slides[index]
    const dir = index > current ? 1 : -1
    const neighbours = Math.abs(index - current) === 1
    const sideways = neighbours && from.dataset.group && from.dataset.group === to.dataset.group

    // The top bar and counter step aside while slides are moving.
    const html = document.documentElement
    html.classList.add('is-moving')

    timeline = gsap.timeline({
      onComplete: () => {
        animating = false
      },
    })
    timeline.add(() => html.classList.remove('is-moving'), 0.85)

    const EASE = 'power3.inOut'
    const TIME = 1.1
    const inner = to.querySelector('.slide__inner')
    const rest = { scale: 1, xPercent: 0, yPercent: 0, opacity: 1 }
    const finish = () => {
      gsap.set(from, { autoAlpha: 0 })
      gsap.set(from, { ...rest, zIndex: 'auto' })
      gsap.set(to, { ...rest, zIndex: 'auto' })
    }

    // Projects overview <-> a project: the preview tile itself grows into
    // the project slide (and shrinks back into its tile on the way out).
    const opening = from.hasAttribute('data-overview') && to.dataset.group === 'projects'
    const closing = to.hasAttribute('data-overview') && from.dataset.group === 'projects'
    if (opening || closing) {
      const overview = opening ? from : to
      const project = opening ? to : from
      const thumb = overview.querySelector(`[data-tile="${project.id}"] .tile__thumb`)
      const media = project.querySelector('.project__media')
      const text = project.querySelector('.project__text')

      if (opening) {
        prime(project)
        gsap.set(project.querySelectorAll('[data-wipe]'), { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(project.querySelectorAll('[data-wipe] img'), { scale: 1 })
      }
      gsap.set(project, { autoAlpha: 1, zIndex: 2 })
      gsap.set(overview, { autoAlpha: 1, zIndex: 1 })

      const a = thumb.getBoundingClientRect()
      const b = media.getBoundingClientRect()
      const tileClip = `inset(${a.top}px ${window.innerWidth - a.right}px ${
        window.innerHeight - a.bottom
      }px ${a.left}px round 8px)`
      const fullClip = 'inset(0px 0px 0px 0px round 0px)'
      const atTile = { x: a.left - b.left, y: a.top - b.top, scale: a.width / b.width }
      const atRest = { x: 0, y: 0, scale: 1 }
      const zoomed = { scale: 1.22, opacity: 0.2 }
      const origin = `${a.left + a.width / 2}px ${a.top + a.height / 2}px`
      const tidy = () => {
        finish()
        gsap.set(project, { clearProps: 'clipPath' })
        gsap.set(media, { clearProps: 'transform' })
        gsap.set(text, { clearProps: 'opacity' })
        gsap.set(overview, { transformOrigin: '50% 50%' })
      }

      gsap.set(media, { transformOrigin: '0 0' })
      gsap.set(overview, { transformOrigin: origin })

      if (opening) {
        timeline
          .fromTo(project, { clipPath: tileClip }, { clipPath: fullClip, duration: TIME, ease: EASE }, 0)
          .fromTo(media, atTile, { ...atRest, duration: TIME, ease: EASE }, 0)
          .to(overview, { ...zoomed, duration: TIME, ease: EASE }, 0)
          .add(() => activate(index), 0.5)
          .add(() => playEnter(project), 0.55)
          .add(tidy, TIME)
      } else {
        timeline
          .to(text, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
          .fromTo(project, { clipPath: fullClip }, { clipPath: tileClip, duration: TIME, ease: EASE }, 0)
          .fromTo(media, atRest, { ...atTile, duration: TIME, ease: EASE }, 0)
          .fromTo(overview, zoomed, { scale: 1, opacity: 1, duration: TIME, ease: EASE }, 0)
          .add(() => activate(index), 0.5)
          .add(tidy, TIME)
      }
      return
    }

    prime(to)

    if (sideways) {
      // Projects: the old slide shrinks back and drifts off while the new one
      // glides in from the side and its content zooms into place.
      gsap.set(from, { zIndex: 1 })
      gsap.set(to, { autoAlpha: 1, xPercent: 100 * dir, zIndex: 2 })
      activate(index)
      timeline
        .to(from, { xPercent: -28 * dir, scale: 0.93, opacity: 0.5, duration: TIME, ease: EASE }, 0)
        .to(to, { xPercent: 0, duration: TIME, ease: EASE }, 0)
        .fromTo(inner, { scale: 1.08 }, { scale: 1, duration: 1.3, ease: 'power3.out' }, 0.25)
        .add(() => playEnter(to), 0.4)
        .add(finish, TIME)
      return
    }

    // Everything else: the current slide's content drifts up and fades,
    // then the next slide dissolves in over it and its content rises into
    // place. Backgrounds cross-fade cleanly because the outgoing slide
    // itself stays still and opaque underneath.
    // everything on the slide except its background layers
    const fromInner = from.querySelectorAll(':scope > .slide__inner, :scope > .kanji, :scope > .footer')
    gsap.set(from, { zIndex: 1 })
    gsap.set(to, { autoAlpha: 0, zIndex: 2 })
    timeline
      .to(fromInner, { opacity: 0, yPercent: -3 * dir, scale: 0.97, duration: 0.45, ease: 'power2.in' }, 0)
      .to(to, { autoAlpha: 1, duration: 0.75, ease: 'power1.inOut' }, 0.25)
      .fromTo(inner, { scale: 1.04 }, { scale: 1, duration: 1.2, ease: 'power3.out' }, 0.25)
      .add(() => activate(index), 0.4)
      .add(() => playEnter(to), 0.45)
      .add(() => gsap.set(fromInner, { clearProps: 'opacity,transform' }), 1.0)
      .add(finish, 1.0)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  // Lets an inner scrolling box (data-scrollable) use the wheel until it hits its end.
  const scrollsInside = (target, deltaY) => {
    const box = target.closest?.('[data-scrollable]')
    if (!box) return false
    const max = box.scrollHeight - box.clientHeight
    if (max <= 1) return false
    return deltaY > 0 ? box.scrollTop < max - 1 : box.scrollTop > 0
  }

  // Trackpads keep sending wheel events while they coast. After moving one
  // slide we ignore the wheel until that stream pauses or a clearly new push arrives.
  let coasting = false
  let lastTime = 0
  let lastSize = 0

  const onWheel = (event) => {
    if (scrollsInside(event.target, event.deltaY)) return
    event.preventDefault()

    const now = performance.now()
    const size = Math.abs(event.deltaY)
    const fresh = now - lastTime > 180 || (size > lastSize * 2 && size > 30)
    lastTime = now
    lastSize = size

    if (coasting) {
      if (!fresh || animating) return
      coasting = false
    }
    if (animating || size < 4) return
    coasting = true
    goTo(current + (event.deltaY > 0 ? 1 : -1))
  }

  const onKey = (event) => {
    const typing = event.target.closest?.('input, textarea, select')
    if (typing || event.metaKey || event.ctrlKey || event.altKey) return
    const onControl = event.target.closest?.('button, a')
    const key = event.key
    if (key === 'ArrowDown' || key === 'PageDown' || (key === ' ' && !onControl)) {
      event.preventDefault()
      next()
    } else if (key === 'ArrowUp' || key === 'PageUp') {
      event.preventDefault()
      prev()
    } else if (key === 'Home') {
      goTo(0)
    } else if (key === 'End') {
      goTo(slides.length - 1)
    }
  }

  let touchY = null
  const onTouchStart = (event) => {
    touchY = event.target.closest?.('[data-scrollable]') ? null : event.touches[0].clientY
  }
  const onTouchEnd = (event) => {
    if (touchY === null) return
    const delta = touchY - event.changedTouches[0].clientY
    touchY = null
    if (Math.abs(delta) > 50) goTo(current + (delta > 0 ? 1 : -1))
  }

  // In-page links (#about, #work, …) jump to that slide.
  const onClick = (event) => {
    const link = event.target.closest?.('a[href^="#"]')
    if (!link) return
    const target = document.getElementById(link.getAttribute('href').slice(1))
    const slide = target?.closest('.slide')
    if (!slide) return
    event.preventDefault()
    goTo(slides.indexOf(slide))
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  document.addEventListener('click', onClick)

  return {
    next,
    prev,
    goTo,
    count: slides.length,
    current: () => slides[current],
    destroy() {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('click', onClick)
      timeline?.kill()
      document.documentElement.classList.remove('is-moving')
      slides.forEach((slide) => {
        slide.inert = false
        slide.removeAttribute('aria-hidden')
      })
      gsap.set(slides, { clearProps: 'all' })
    },
  }
}
