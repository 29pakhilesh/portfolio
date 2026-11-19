import { projects } from '../data'
import Title from '../components/Title'
import Kanji from '../components/Kanji'
import { ArrowUpRight } from '../components/Icons'

// One preview tile and one full-screen slide each: projects that have a
// screenshot, featured ones first. Everything else (DLR Info, which is client
// work with no public screenshot, and the smaller projects) is listed as a
// card on the "More projects" slide.
const showcase = [
  ...projects.filter((project) => project.featured && project.image),
  ...projects.filter((project) => !project.featured && project.image),
]
const others = projects.filter((project) => !showcase.includes(project))

const pad = (number) => String(number).padStart(2, '0')
const numerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

function host(url) {
  try {
    return new URL(url).host
  } catch {
    return ''
  }
}

function Links({ project }) {
  if (!project.url && !project.github) return null
  return (
    <p className="link-row">
      {project.url && (
        <a className="textlink" href={project.url} target="_blank" rel="noopener noreferrer">
          Open live site <ArrowUpRight />
        </a>
      )}
      {project.github && (
        <a className="textlink" href={project.github} target="_blank" rel="noopener noreferrer">
          View code <ArrowUpRight />
        </a>
      )}
    </p>
  )
}

function Shot({ project }) {
  return (
    <a
      className="shot"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} live site`}
      data-wipe
    >
      <div className="shot__bar">
        <span>{host(project.url)}</span>
        <span>live</span>
      </div>
      <div className="shot__view">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width="1440"
          height="900"
        />
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <>
      {/* Overview: every showcase project as a framed print. In the deck, the
          next scroll (or a click) zooms the chosen print open into its own slide. */}
      <section className="slide theme-paper" data-theme="paper" data-nav="work" data-overview id="work">
        <Kanji text="作品" seal="作品" />
        <div className="slide__inner">
          <header className="slide__head">
            <p className="label" data-in>
              Projects
            </p>
            <Title>Things I have built</Title>
          </header>
          <ul className="tiles">
            {showcase.map((project, index) => (
              <li key={project.title} data-in>
                <a className="tile" href={`#project-${index + 1}`} data-tile={`project-${index + 1}`}>
                  <span className="tile__frame">
                    <span className="tile__thumb">
                      <img src={project.image} alt="" width="1440" height="900" />
                    </span>
                  </span>
                  <span className="tile__number" lang="ja" aria-hidden="true">
                    {numerals[index]}
                  </span>
                  <strong>{project.title}</strong>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showcase.map((project, index) => (
        <section
          className="slide theme-indigo"
          data-theme="indigo"
          data-nav="work"
          data-group="projects"
          id={`project-${index + 1}`}
          key={project.title}
        >
          <span className="project__ghost" lang="ja" aria-hidden="true">
            {numerals[index]}
          </span>
          <div className="slide__inner project">
            <div className="project__text">
              <p className="label" data-in>
                Project {pad(index + 1)} of {pad(showcase.length)} &nbsp;/&nbsp; {project.period}
              </p>
              <h2 className="project__title" data-in>
                {project.title}
              </h2>
              <p className="soft" data-in>
                {project.description}
              </p>
              <ul className="points" data-in>
                {project.highlights.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ul className="tags" aria-label="Built with" data-in>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div data-in>
                <Links project={project} />
              </div>
            </div>
            <div className="project__media">
              <Shot project={project} />
            </div>
          </div>
        </section>
      ))}

      <section className="slide theme-paper" data-theme="paper" data-nav="work" id="more-projects">
        <Kanji text="その他" seal="他" />
        <div className="slide__inner">
          <header className="slide__head">
            <p className="label" data-in>
              Projects, continued
            </p>
            <Title>More projects</Title>
          </header>
          <div className="cards">
            {others.map((project) => (
              <article className="card" key={project.title} data-in>
                <p className="mono soft">{project.period}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tags" aria-label="Built with">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Links project={project} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
