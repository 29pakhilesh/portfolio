import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data'

// Top of the page, built like a shop entrance:
// - a stamped hanko seal with the name beside it,
// - a noren (split fabric curtain) whose panels are the section links,
// - an ema (wooden shrine plaque) on a red cord for the resume.
// `theme` is the current slide's colour scheme; the curtain re-dyes to suit it.
export default function Nav({ theme, active }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="nav" data-theme={theme}>
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand__seal" lang="ja" aria-hidden="true">
            <span>アキ</span>
          </span>
          <span className="brand__text">
            <strong>{profile.name}</strong>
            <small>Full-stack developer</small>
          </span>
        </a>

        <nav className="noren" aria-label="Sections">
          <span className="noren__rod" aria-hidden="true" />
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              className="noren__panel"
              href={link.href}
              style={{ '--i': index }}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
            >
              <span className="noren__jp" lang="ja" aria-hidden="true">
                {link.jp}
              </span>
              <span className="noren__en">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <a
            className="ema"
            href={profile.resumeUrl}
            download={profile.resumeDownloadName}
            aria-label="Download resume (PDF)"
          >
            <span className="ema__board">
              <span className="ema__jp" lang="ja" aria-hidden="true">
                履歴書
              </span>
              <span className="ema__en">Resume</span>
            </span>
          </a>
          <button
            type="button"
            className="noren__panel nav__toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="noren__jp" lang="ja" aria-hidden="true">
              目次
            </span>
            <span className="noren__en">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <nav
        className={`nav__sheet${open ? ' is-open' : ''}`}
        id="nav-sheet"
        aria-label="Sections"
        aria-hidden={!open}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <span className="nav__jp" lang="ja" aria-hidden="true">
              {link.jp}
            </span>
          </a>
        ))}
      </nav>
    </>
  )
}
