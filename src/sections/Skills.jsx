import { useRef, useState } from 'react'
import { getTechDetail, skills } from '../data'
import { getTechIconUrl } from '../techIcons'
import Title from '../components/Title'
import Kanji from '../components/Kanji'
import { ArrowUpRight } from '../components/Icons'

export default function Skills() {
  const [selected, setSelected] = useState('React')
  const detail = getTechDetail(selected)
  const panel = useRef(null)

  const select = (item) => {
    setSelected(item)
    if (panel.current) panel.current.scrollTop = 0
    // On narrow screens the panel sits below the chips, so bring it into view.
    if (window.matchMedia('(max-width: 899px)').matches) {
      requestAnimationFrame(() =>
        panel.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }),
      )
    }
  }

  return (
    <section className="slide theme-paper" data-theme="paper" data-nav="skills" id="skills">
      <Kanji text="技術" seal="技術" />
      <div className="slide__inner">
        <header className="slide__head">
          <p className="label" data-in>
            Skills: pick one to see where I used it
          </p>
          <Title>What I work with</Title>
        </header>

        <div className="skills">
          <div className="skills__groups">
            {skills.map((group) => (
              <div className="skills__group" key={group.category} data-in>
                <h3>{group.category}</h3>
                <div className="chips">
                  {group.items.map((item) => {
                    const icon = getTechIconUrl(item)
                    return (
                      <button
                        key={item}
                        type="button"
                        className="chip"
                        aria-pressed={selected === item}
                        onClick={() => select(item)}
                      >
                        {icon && <img src={icon} alt="" />}
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {detail && (
            <div className="skill-panel" aria-live="polite" ref={panel} data-scrollable data-in>
              {/* key restarts the swap animation whenever the skill changes */}
              <div className="skill-panel__body" key={selected}>
                <h3>{selected}</h3>
                <p className="soft">{detail.summary}</p>
                <ul className="skill-panel__uses">
                  {detail.usages.map((use) => (
                    <li key={use.project}>
                      <strong>
                        {use.github || use.url ? (
                          <a
                            className="textlink"
                            href={use.url || use.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {use.project} <ArrowUpRight />
                          </a>
                        ) : (
                          use.project
                        )}
                      </strong>
                      <span>{use.context}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
