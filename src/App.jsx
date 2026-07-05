import { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import LiveBackground from './LiveBackground'
import { SectionReveal, RevealGroup, RevealItem } from './useScrollReveal'
import { useActiveSection } from './useActiveSection'
import SkillIcon from './SkillIcon'
import { preloadTechIcons } from './techIcons'
import CertCard from './CertCard'
import ResumePreviewButton from './ResumePreviewButton'
import AvailabilityStatus from './AvailabilityStatus'
import SkillDetailModal from './SkillDetailModal'
import ExperienceDetailModal from './ExperienceDetailModal'
import ProjectDetailModal from './ProjectDetailModal'
import StrengthIcon from './StrengthIcon'
import ThemeToggle from './ThemeToggle'
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
import './App.css'

function NavLogo({ onNavigate }) {
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')

  return (
    <a
      href="#"
      className="nav__logo"
      aria-label={`${profile.name} — home`}
      onClick={onNavigate}
    >
      <span className="nav__logo-name">{first}</span>
      {last ? <span className="nav__logo-surname">{last}</span> : null}
    </a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <NavLogo onNavigate={() => setMenuOpen(false)} />
          <ul className="nav__links">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="nav__actions">
            <ThemeToggle />
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

      <nav className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav__top">
          <ThemeToggle />
          <button type="button" className="mobile-nav__close" aria-label="Close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        {navLinks.map((link) => {
          const id = link.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
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
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')

  return (
    <section className="hero">
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />
      <div className="container hero__content">
        <div className="hero__main">
          <h1 className="hero__title">
            Hi, I&apos;m <span className="gradient-text">{first}</span>
            <br />
            <em>{last}</em>
          </h1>
          <p className="hero__role">{profile.title}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">
              See my projects <span aria-hidden="true">→</span>
            </a>
            <ResumePreviewButton className="btn btn--ghost">
              <span className="btn__label">View resume</span>
            </ResumePreviewButton>
            <a href="#contact" className="btn btn--ghost">
              <span className="btn__label">Contact me</span>
            </a>
          </div>
        </div>
        <div className="hero__stats">
          {stats.map((s) => (
            <a key={s.label} href={s.href} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </a>
          ))}
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
            <p className="section__number">01 — About</p>
            <h2 className="section__title">Who I am</h2>
          </div>
          <div className="about__grid">
            <div className="about__card">
              <div className="about__photo-frame">
                <img
                  src={profile.photoAbout}
                  alt={profile.name}
                  className="about__photo"
                  width={940}
                  height={629}
                />
              </div>
              <h3>{profile.name}</h3>
              <p className="about__card-role">{profile.title}</p>
              <ul className="about__contact-list">
                <li>✉ <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                <li>📱 <span>{profile.phone}</span></li>
                <li>📍 <span>{profile.location}</span></li>
                <li>
                  🔗{' '}
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  {' · '}
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  {' · '}
                  <a href={profile.social.leetcode} target="_blank" rel="noopener noreferrer">
                    LeetCode
                  </a>
                </li>
              </ul>
              <ResumePreviewButton className="about__resume-btn">
                View Resume (PDF)
              </ResumePreviewButton>
            </div>
            <div className="about__text">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
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
              {item.period ? (
                <span className="experience-card__period">{item.period}</span>
              ) : null}
            </div>
            <h3 className="experience-card__org">
              {item.organization}
              <span className="experience-card__arrow" aria-hidden="true"> +</span>
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
            <p className="section__number">02 — Experience</p>
            <h2 className="section__title">Where I&apos;ve studied & worked</h2>
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openDetails()
    }
  }

  const stopNav = (e) => {
    e.stopPropagation()
  }

  return (
    <article
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      style={{ '--project-accent': project.accent }}
    >
      <div
        className="project-card__main"
        role="button"
        tabIndex={0}
        onClick={openDetails}
        onKeyDown={handleKeyDown}
        aria-label={`View details for ${project.title}`}
      >
        <div className="project-card__accent-bar" />
        <span className="project-card__period">{project.period}</span>
        <h3>
          {project.title}
          <span className="project-card__arrow" aria-hidden="true"> +</span>
        </h3>
        <p>{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>

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
              Live site <span aria-hidden="true">↗</span>
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
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}

function Work() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="work" className="section">
      <div className="container">
        <RevealGroup className="work-reveal">
          <RevealItem className="section__header">
            <p className="section__number">03 — Projects</p>
            <h2 className="section__title">Things I&apos;ve built</h2>
          </RevealItem>
          <div className="projects-bento">
            {projects.map((project) => (
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
  const doubledPills = [...skillPills, ...skillPills]
  const [selectedTech, setSelectedTech] = useState(null)

  useEffect(() => {
    const allTech = [
      ...skillPills,
      ...skills.flatMap((g) => g.items),
    ]
    preloadTechIcons(allTech)
  }, [])

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section__header">
            <p className="section__number">04 — Skills</p>
            <h2 className="section__title">Tech stack & certs</h2>
          </div>

          <div className="skills-marquee" aria-hidden="true">
            <div className="skills-marquee__track">
              {doubledPills.map((pill, i) => (
                <span key={`${pill}-${i}`} className="skill-pill">
                  <SkillIcon name={pill} size="sm" showLabel={false} eager />
                  <span>{pill}</span>
                </span>
              ))}
            </div>
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
              <p className="certs-block__subtitle">Verified credentials & professional coursework</p>
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
                  <div key={s.label} className="strength-card">
                    <StrengthIcon type={s.icon} />
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer container">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>B.Tech CSE · JUIT · Built with React</span>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
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
  )
}
