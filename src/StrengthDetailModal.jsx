import { getStrengthDetail } from './data'
import StrengthIcon from './StrengthIcon'
import BoxModal from './BoxModal'

export default function StrengthDetailModal({ strengthLabel, onClose }) {
  const detail = getStrengthDetail(strengthLabel)
  if (!detail) return null

  const file = `strengths/${detail.label.toLowerCase().replace(/\s+/g, '-')}.md`

  return (
    <BoxModal
      title={detail.label}
      file={file}
      onClose={onClose}
      heading={
        <h2 id="box-modal-title" className="box-modal__heading strength-modal__heading">
          <span className="strength-modal__mark" aria-hidden="true">
            <StrengthIcon type={detail.icon} />
          </span>
          {detail.label}
        </h2>
      }
    >
      <p className="box-modal__kicker">Core strength</p>
      <p className="box-modal__copy">{detail.summary}</p>

      <section className="box-modal__block">
        <h3>Where I&apos;ve used it</h3>
        {detail.usages.length > 0 ? (
          <ul className="box-modal__rows">
            {detail.usages.map((usage) => (
              <li key={usage.project}>
                <p className="box-modal__row-title">{usage.project}</p>
                <p className="box-modal__copy">{usage.context}</p>
                {usage.github && (
                  <a href={usage.github} className="box-modal__link" target="_blank" rel="noopener noreferrer">
                    View repository ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="box-modal__copy">Shown across coursework, internships, and shipped projects.</p>
        )}
      </section>
    </BoxModal>
  )
}
