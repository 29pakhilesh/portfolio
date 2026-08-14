import BoxModal from './BoxModal'

const typeLabels = {
  education: 'Education',
  internship: 'Internship',
  job: 'Job',
}

export default function ExperienceDetailModal({ item, onClose }) {
  if (!item) return null

  const typeLabel = typeLabels[item.kind] ?? item.kind
  const file =
    item.kind === 'education' ? 'experience/education.md' : 'experience/work.md'

  return (
    <BoxModal title={item.organization} file={file} onClose={onClose} wide>
      <div className="box-modal__head">
        <div className="box-modal__logo">
          <img src={item.logo} alt="" />
        </div>
        <div>
          <p className="box-modal__kicker">
            {typeLabel}
            {item.period ? ` · ${item.period}` : ''}
          </p>
          <p className="box-modal__role">{item.role}</p>
          <p className="box-modal__copy">
            {item.location}
            {item.detail ? ` · ${item.detail}` : ''}
          </p>
        </div>
      </div>

      {item.summary ? <p className="box-modal__copy">{item.summary}</p> : null}

      {item.highlights?.length > 0 && (
        <section className="box-modal__block">
          <h3>{item.kind === 'education' ? 'Key highlights' : 'What I learned'}</h3>
          <ul className="box-modal__list">
            {item.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {item.website && (
        <a
          href={item.website}
          className="btn btn--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website ↗
        </a>
      )}
    </BoxModal>
  )
}
