import { useEffect, useRef, useState } from 'react'

/** Sets --mx/--my/--scroll CSS vars for spotlight + progress bar */
export function useUiMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      root.style.setProperty('--scroll', String(p))
    }

    const onMove = (e) => {
      if (reduced) return
      root.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`)
      root.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
}

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}

export function StatCounter({ value }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  const isNumeric = /^\d+$/.test(String(value))

  useEffect(() => {
    if (!isNumeric) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el || reduced) {
      setDisplay(value)
      return
    }

    const target = Number(value)
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        const start = performance.now()
        const dur = 900
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur)
          const eased = 1 - (1 - t) ** 3
          setDisplay(String(Math.round(target * eased)))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, isNumeric])

  return (
    <span ref={ref} className="stat__value" aria-hidden="true">
      {display}
    </span>
  )
}

export function TypeLine({ text, className = '', as: Tag = 'span', delay = 0 }) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setOut(text)
      setDone(true)
      return
    }
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, 38)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, delay])

  return (
    <Tag className={`${className}${done ? ' is-typed' : ''}`}>
      {out}
      {!done && <span className="type-caret" aria-hidden="true" />}
    </Tag>
  )
}
