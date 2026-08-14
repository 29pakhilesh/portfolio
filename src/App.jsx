import { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import LiveBackground from './LiveBackground'
import { SectionReveal, RevealGroup, RevealItem } from './useScrollReveal'
import { useActiveSection } from './useActiveSection'
import SkillIcon from './SkillIcon'
import { preloadTechIcons, resolveTechIconName } from './techIcons'
import CertCard from './CertCard'
import ResumePreviewButton from './ResumePreviewButton'
import AvailabilityStatus from './AvailabilityStatus'
import SkillDetailModal from './SkillDetailModal'
import ExperienceDetailModal from './ExperienceDetailModal'
import ProjectDetailModal from './ProjectDetailModal'
import StrengthDetailModal from './StrengthDetailModal'
import StrengthIcon from './StrengthIcon'
import {
  profile,
  stats,
  about,
  experience,
  skills,
  skillPills,
  projects,
  certifications,
  strengths,
  navLinks,
} from './data'
import CodeWindow from './CodeWindow'
import SocialLinks from './SocialLinks'
import GitHubStats from './GitHubStats'
import { useUiMotion, ScrollProgress, StatCounter, TypeLine } from './UiMotion'
import { useBodyScrollLock } from './useBodyScrollLock'
import { CopyToastProvider, Copyable } from './CopyToast'
import './App.css'
import './Coder.css'

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useBodyScrollLock(menuOpen)

  const scrollHome = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a
            href="#"
            className="nav__logo"
            aria-label={`${profile.name} — home`}
            onClick={scrollHome}
          >
            <span className="nav__logo-prompt">~/</span>
            akhilesh
          </a>
          <ul className="nav__links">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="nav__actions">
            <button
              type="button"
              className="nav__menu-btn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : ''}
      >
        <div className="mobile-nav__top">
          <span className="nav__logo">
            <span className="nav__logo-prompt">~/</span>
            akhilesh
          </span>
          <button type="button" className="mobile-nav__close" aria-label="Close" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        {navLinks.map((link) => {
          const id = link.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__main">
          <p className="hero__boot">
            <span className="hero__boot-ok">ok</span> portfolio.boot — modules loaded
          </p>
          <TypeLine text={profile.name} as="h1" className="hero__title" delay={200} />
          <p className="hero__role">{profile.title}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">
              View projects
            </a>
            <ResumePreviewButton className="btn btn--ghost">
              <span className="btn__label">Resume.pdf</span>
            </ResumePreviewButton>
            <a href="#contact" className="btn btn--ghost">
              <span className="btn__label">Contact</span>
            </a>
          </div>
        </div>
        <div className="hero__side">
          <CodeWindow />
          <div className="hero__side-bottom">
            <GitHubStats variant="compact" />
            <div className="hero__stats">
              {stats.map((s) => (
                <a key={s.label} href={s.href} className="stat">
                  <StatCounter value={s.value} />
                  <span className="stat__label">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section__header">
            <p className="section__number">01 / about</p>
            <h2 className="section__title">Who I am</h2>
          </div>
          <div className="about__grid">
            <div className="about__card">
              <div className="about__identity">
                <div className="about__photo-wrap">
                  <img
                    src={profile.photoAbout}
                    alt={profile.name}
                    className="about__photo"
                    width={1024}
                    height={768}
                  />
                </div>
                <div className="about__identity-meta">
                  <h3>{profile.name}</h3>
                  <p className="about__card-role">{profile.title}</p>
                </div>
              </div>
              <ul className="about__contact-list">
                <li>
                  <span>email</span>
                  <Copyable
                    value={profile.email}
                    href={`mailto:${profile.email}`}
                    label="Copied email"
                  >
                    {profile.email}
                  </Copyable>
                </li>
                <li>
                  <span>phone</span>
                  <Copyable
                    value={profile.phone}
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    label="Copied phone"
                  >
                    {profile.phone}
                  </Copyable>
                </li>
                <li>
                  <span>base</span>
                  <span>{profile.location}</span>
                </li>
                <li>
                  <span>links</span>
                  <SocialLinks />
                </li>
              </ul>
              <ResumePreviewButton className="about__resume-btn">
                View Resume (PDF)
              </ResumePreviewButton>
            </div>
            <div className="about__text">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <GitHubStats className="hide-on-phone" />
              <AvailabilityStatus />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

const experienceGroups = [
  {
    id: 'education',
    label: 'Education',
    items: experience.filter((item) => item.kind === 'education'),
  },
  {
    id: 'work',
    label: 'Work & Internships',
    items: experience.filter((item) => item.kind !== 'education'),
  },
]

const experienceTypeLabels = {
  education: 'Education',
  internship: 'Internship',
  job: 'Job',
  freelance: 'Freelance',
}

function ExperienceCard({ item, onSelect }) {
  const typeLabel = experienceTypeLabels[item.kind] ?? item.kind

  return (
    <button
      type="button"
      className={`experience-card experience-card--${item.kind}`}
      onClick={() => onSelect(item)}
      aria-label={`View details for ${item.organization}`}
    >
      <div className="experience-card__body">
        <div className="experience-card__header">
          <div className="experience-card__logo-wrap">
            <img
              src={item.logo}
              alt=""
              className="experience-card__logo"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="experience-card__content">
            <div className="experience-card__meta">
              <span className={`experience-card__type experience-card__type--${item.kind}`}>
                {typeLabel}
              </span>
              {item.period ? <span className="experience-card__period">{item.period}</span> : null}
            </div>
            <h3 className="experience-card__org">
              {item.organization}
              <span className="experience-card__arrow" aria-hidden="true">
                {' '}
                +
              </span>
            </h3>
            <p className="experience-card__role">{item.role}</p>
            <p className="experience-card__location">{item.location}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null)

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section__header">
            <p className="section__number">02 / experience</p>
            <h2 className="section__title">Where I&apos;ve studied &amp; worked</h2>
          </div>
          <div className="experience-groups">
            {experienceGroups.map((group) =>
              group.items.length > 0 ? (
                <div key={group.id} className={`experience-group experience-group--${group.id}`}>
                  <h3 className="experience-group__title">{group.label}</h3>
                  <div className="experience-timeline">
                    {group.items.map((item) => (
                      <ExperienceCard
                        key={item.organization}
                        item={item}
                        onSelect={setSelectedExperience}
                      />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </SectionReveal>
      </div>
      {selectedExperience && (
        <ExperienceDetailModal
          item={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  )
}

function ProjectCard({ project, onSelect }) {
  const openDetails = () => onSelect(project)

  const stopNav = (e) => {
    e.stopPropagation()
  }

  return (
    <article
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      style={{ '--project-accent': project.accent }}
    >
      <span className="project-card__period">{project.period}</span>

      <div className="project-card__head">
        <button
          type="button"
          className="project-card__title-btn"
          onClick={openDetails}
          aria-label={`View details for ${project.title}`}
        >
          <span className="project-card__title">{project.title}</span>
          <span className="project-card__arrow" aria-hidden="true">
            +
          </span>
        </button>

        {(project.url || project.github) && (
          <div className="project-card__links">
            {project.url && (
              <a
                href={project.url}
                className="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopNav}
              >
                Live ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                className="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopNav}
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        className="project-card__main"
        onClick={openDetails}
        aria-label={`View details for ${project.title}`}
      >
        <p>{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </button>
    </article>
  )
}

function DeployedProjects() {
  const deployed = projects.filter((p) => p.url && p.image)
  if (deployed.length === 0) return null

  return (
    <div className="deployed">
      <div className="deployed__header">
        <h3 className="deployed__title">Deployed projects</h3>
        <p className="deployed__subtitle">Live builds you can open and use right now</p>
      </div>
      <div className="deployed__list">
        {deployed.map((project) => {
          const highlights = project.highlights ?? []
          return (
            <article key={project.title} className="deployed__item">
              <div className="deployed__media">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="deployed__img"
                  loading="lazy"
                  width={1024}
                  height={640}
                />
                <div className="deployed__slide">
                  <p className="deployed__period">
                    {project.period}
                    {project.featured ? ' · featured' : ''}
                  </p>
                  <p className="deployed__desc">{project.description}</p>
                  {highlights.length > 0 && (
                    <div className="deployed__built">
                      <p className="deployed__label">what i built</p>
                      <ul className="deployed__highlights">
                        {highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="deployed__stack">
                    <p className="deployed__label">tech stack</p>
                    <ul className="deployed__icons">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <SkillIcon name={resolveTechIconName(tag)} label={tag} size="sm" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="deployed__body">
                <div className="deployed__copy">
                  <h4 className="deployed__name">{project.title}</h4>
                  <p className="deployed__period-inline phone-only">
                    {project.period}
                    {project.featured ? ' · featured' : ''}
                  </p>
                  <p className="deployed__desc-inline phone-only">{project.description}</p>
                </div>
                <ul className="deployed__icons deployed__icons--phone phone-only" aria-label={`${project.title} tech stack`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <SkillIcon name={resolveTechIconName(tag)} label={tag} size="sm" />
                    </li>
                  ))}
                </ul>
                <div className="deployed__links">
                  <a
                    href={project.url}
                    className="deployed__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live ↗
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      className="deployed__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Work() {
  const [selectedProject, setSelectedProject] = useState(null)
  const listedProjects = projects.filter((p) => !(p.url && p.image))

  return (
    <section id="work" className="section">
      <div className="container">
        <RevealGroup className="work-reveal">
          <RevealItem className="section__header">
            <p className="section__number">03 / projects</p>
            <h2 className="section__title">Things I&apos;ve built</h2>
          </RevealItem>
          <RevealItem>
            <DeployedProjects />
          </RevealItem>
          <div className="projects-bento">
            {listedProjects.map((project) => (
              <RevealItem key={project.title}>
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}

function Skills() {
  const [selectedTech, setSelectedTech] = useState(null)
  const [selectedStrength, setSelectedStrength] = useState(null)

  useEffect(() => {
    const allTech = [...skillPills, ...skills.flatMap((g) => g.items)]
    preloadTechIcons(allTech)
  }, [])

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section__header">
            <p className="section__number">04 / skills</p>
            <h2 className="section__title">Tech stack &amp; certs</h2>
          </div>

          <div className="skills__grid">
            {skills.map((group) => (
              <article key={group.category} className="skill-card">
                <h3>{group.category}</h3>
                <ul className="skill-card__icons">
                  {group.items.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="skill-icon-btn"
                        onClick={() => setSelectedTech(item)}
                        aria-label={`Learn more about ${item}`}
                      >
                        <SkillIcon name={item} />
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {selectedTech && (
            <SkillDetailModal techName={selectedTech} onClose={() => setSelectedTech(null)} />
          )}

          <div className="certs-block">
            <div className="certs-block__header">
              <h3 className="certs-block__title">Certifications</h3>
              <p className="certs-block__subtitle">Verified credentials &amp; professional coursework</p>
            </div>
            <div className="certs">
              {certifications.map((cert) => (
                <CertCard key={cert.name} cert={cert} />
              ))}
            </div>
            <div className="strengths">
              <h3 className="strengths__title">Core strengths</h3>
              <div className="strengths__grid">
                {strengths.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="strength-card"
                    onClick={() => setSelectedStrength(s.label)}
                    aria-label={`Learn more about ${s.label}`}
                  >
                    <StrengthIcon type={s.icon} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedStrength && (
            <StrengthDetailModal
              strengthLabel={selectedStrength}
              onClose={() => setSelectedStrength(null)}
            />
          )}
        </SectionReveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer container">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span className="hide-on-phone">B.Tech CSE · JUIT · React + Vite</span>
    </footer>
  )
}

export default function App() {
  useUiMotion()

  return (
    <CopyToastProvider>
      <div className="app">
        <ScrollProgress />
        <LiveBackground />
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Work />
          <Skills />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </CopyToastProvider>
  )
}
