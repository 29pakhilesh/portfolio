import { useEffect, useRef, useState } from 'react'

function legacyCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.top = '0'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  ta.setSelectionRange(0, ta.value.length)
  document.execCommand('copy')
  document.body.removeChild(ta)
}

async function writeClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
  } catch {
    /* fall through */
  }

  legacyCopy(text)
}

export function Copyable({ value, href, className = '', children, ...rest }) {
  const [copied, setCopied] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  const handleClick = (e) => {
    e.preventDefault()
    writeClipboard(value)

    clearTimeout(hideTimer.current)
    setCopied(true)

    // Hold, then remove class so CSS reverses the same slide.
    hideTimer.current = setTimeout(() => {
      setCopied(false)
    }, 1600)
  }

  return (
    <a
      href={href}
      className={`copyable is-copyable${copied ? ' is-copied' : ''} ${className}`.trim()}
      onClick={handleClick}
      title="Click to copy"
      {...rest}
    >
      <span className="copyable__value">{children}</span>
      <span className="copyable__aside" aria-live="polite" aria-hidden={!copied}>
        <span className="copyable__comment">
          <span className="copyable__slashes" aria-hidden="true">
            //
          </span>
          <span className="copyable__reveal">
            <span className="copyable__word">copied</span>
            <span className="copyable__tick" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M4.6 8.2 7 10.5 11.5 5.4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </span>
      </span>
      <span className="sr-only">{copied ? 'Copied to clipboard' : ''}</span>
    </a>
  )
}
