import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const CopyToastContext = createContext(null)

export function CopyToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, label: 'Copied' })
  const hideTimer = useRef(null)

  const showCopied = useCallback((label = 'Copied') => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setToast({ visible: true, label })
    hideTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 1700)
  }, [])

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  return (
    <CopyToastContext.Provider value={showCopied}>
      {children}
      {createPortal(
        <div
          className={`copy-toast${toast.visible ? ' is-visible' : ''}`}
          role="status"
          aria-live="polite"
          aria-hidden={!toast.visible}
        >
          <span className="copy-toast__icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5 6.5 11.5 12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </span>
          <span className="copy-toast__text">{toast.label}</span>
        </div>,
        document.body,
      )}
    </CopyToastContext.Provider>
  )
}

export function useCopyToast() {
  return useContext(CopyToastContext)
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

export function Copyable({
  value,
  href,
  className = '',
  children,
  label = 'Copied',
  ...rest
}) {
  const showCopied = useCopyToast()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await writeClipboard(value)
      showCopied?.(label)
    } catch {
      showCopied?.('Copy failed')
    }
  }

  return (
    <a
      href={href}
      className={`is-copyable ${className}`.trim()}
      onClick={handleClick}
      title="Click to copy"
      {...rest}
    >
      {children}
    </a>
  )
}
