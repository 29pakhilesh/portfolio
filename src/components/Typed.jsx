import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Types each phrase, pauses, deletes it, then moves to the next.
export default function Typed({ phrases, start = true }) {
  const [text, setText] = useState(prefersReducedMotion() ? phrases[0] : '')

  useEffect(() => {
    if (!start || prefersReducedMotion()) return undefined
    let phrase = 0
    let length = 0
    let deleting = false
    let timer

    const tick = () => {
      const current = phrases[phrase]
      length += deleting ? -1 : 1
      setText(current.slice(0, length))

      let delay = deleting ? 28 : 55
      if (!deleting && length === current.length) {
        deleting = true
        delay = 1900
      } else if (deleting && length === 0) {
        deleting = false
        phrase = (phrase + 1) % phrases.length
        delay = 350
      }
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
  }, [phrases, start])

  return (
    <p className="typed">
      <b aria-hidden="true">$</b>
      <span>{text}</span>
      <span className="typed__caret" aria-hidden="true" />
    </p>
  )
}
