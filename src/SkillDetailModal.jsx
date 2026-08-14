import SkillIcon from './SkillIcon'
import { getTechDetail } from './data'
import BoxModal from './BoxModal'

export default function SkillDetailModal({ techName, onClose }) {
  const detail = getTechDetail(techName)
  if (!detail) return null

  return (
    <BoxModal title={techName} file={`skills/${techName.toLowerCase().replace(/\s+/g, '-')}.md`} onClose={onClose}>
      <p className="box-modal__kicker">{detail.category}</p>
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
          <p className="box-modal__copy">Used in coursework and ongoing learning.</p>
        )}
      </section>

      <div className="box-modal__icon-row" aria-hidden="true">
        <SkillIcon name={techName} showLabel={false} />
      </div>
    </BoxModal>
  )
}
