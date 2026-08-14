import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from './useBodyScrollLock'

export default function BoxModal({
  title,
  file,
  onClose,
  children,
  wide = false,
  extraWide = false,
}) {
  const closeRef = useRef(null)
  useBodyScrollLock(true)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const frameClass = extraWide
    ? 'box-modal__frame box-modal__frame--xl'
    : wide
      ? 'box-modal__frame box-modal__frame--wide'
      : 'box-modal__frame'

  return createPortal(
    <div className="box-modal" role="presentation" onClick={onClose}>
      <div
        className={frameClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="box-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="box-modal__bar">
          <span className="box-modal__file">{file}</span>
          <button
            ref={closeRef}
            type="button"
            className="box-modal__x"
            onClick={onClose}
            aria-label="Close"
          >
            esc
          </button>
        </header>
        <div className="box-modal__body">
          <h2 id="box-modal-title" className="box-modal__heading">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
