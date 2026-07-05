import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const typeLabels = {
  education: 'Education',
  internship: 'Internship',
  job: 'Job',
}

export default function ExperienceDetailModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!item) return null

  const typeLabel = typeLabels[item.kind] ?? item.kind
  const accent =
    item.kind === 'education' ? 'rgb(var(--education-rgb))' : 'var(--accent)'

  return createPortal(
    <div className="skill-modal" role="presentation" onClick={onClose}>
      <div
        className="skill-modal__panel experience-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        style={{ '--experience-accent': accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="experience-modal__accent-bar" aria-hidden="true" />

        <button type="button" className="skill-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <header className="experience-modal__header">
          <div className="experience-modal__logo-wrap">
            <img src={item.logo} alt="" className="experience-modal__logo" />
          </div>
          <div className="experience-modal__intro">
            <span className={`experience-modal__type experience-modal__type--${item.kind}`}>
              {typeLabel}
            </span>
            {item.period ? <p className="experience-modal__period">{item.period}</p> : null}
            <h3 id="experience-modal-title" className="skill-modal__title">
              {item.organization}
            </h3>
            <p className="experience-modal__role">{item.role}</p>
            <p className="experience-modal__location">{item.location}</p>
            {item.detail ? <p className="experience-modal__detail">{item.detail}</p> : null}
          </div>
        </header>

        {item.summary ? <p className="skill-modal__summary">{item.summary}</p> : null}

        {item.highlights?.length > 0 && (
          <div className="skill-modal__section">
            <h4>{item.kind === 'education' ? 'Key highlights' : 'What I do'}</h4>
            <ul className="project-modal__highlights">
              {item.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {item.website && (
          <a
            href={item.website}
            className="btn btn--primary experience-modal__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>,
    document.body,
  )
}
