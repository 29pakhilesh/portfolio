import SkillIcon from './SkillIcon'
import { resolveTechIconName } from './techIcons'
import BoxModal from './BoxModal'

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null

  const highlights = project.highlights ?? []
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  return (
    <BoxModal title={project.title} file={`projects/${slug}.md`} onClose={onClose} wide>
      <p className="box-modal__kicker">
        {project.period}
        {project.featured ? ' · featured' : ''}
      </p>
      <p className="box-modal__copy">{project.description}</p>

      {project.url && project.image && (
        <a
          href={project.url}
          className="box-modal__preview"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live site for ${project.title}`}
        >
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="box-modal__preview-img"
            width={1440}
            height={900}
          />
          <span className="box-modal__preview-hint">Open live site ↗</span>
        </a>
      )}

      {highlights.length > 0 && (
        <section className="box-modal__block">
          <h3>What I built</h3>
          <ul className="box-modal__list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="box-modal__block">
        <h3>Tech stack</h3>
        <ul className="box-modal__stack">
          {project.tags.map((tag) => (
            <li key={tag}>
              <SkillIcon name={resolveTechIconName(tag)} label={tag} size="sm" />
            </li>
          ))}
        </ul>
      </section>

      {(project.url || project.github) && (
        <div className="box-modal__actions">
          {project.url && (
            <a href={project.url} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Live site ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              className={`btn ${project.url ? 'btn--ghost' : 'btn--primary'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </BoxModal>
  )
}
