import { useState } from 'react'
import { experience } from '../data'
import Title from '../components/Title'
import Kanji from '../components/Kanji'
import { ArrowUpRight } from '../components/Icons'

const kindLabel = {
  freelance: 'Freelance',
  internship: 'Internship',
  education: 'Education',
}

// data.js lists these oldest first; show the most recent first.
const stops = [...experience].reverse()

export default function Experience() {
  const [selected, setSelected] = useState(0)
  const stop = stops[selected]

  return (
    <section className="slide theme-indigo" data-theme="indigo" data-nav="experience" id="experience">
      <Kanji text="経歴" seal="経歴" />
      <div className="slide__inner">
        <header className="slide__head">
          <p className="label" data-in>
            Experience and education
          </p>
          <Title>Where I have worked</Title>
        </header>

        <div className="xp">
          <div className="xp__tabs" role="tablist" aria-label="Roles" data-in>
            {stops.map((item, index) => (
              <button
                key={item.organization}
                type="button"
                role="tab"
                id={`xp-tab-${index}`}
                aria-selected={selected === index}
                aria-controls="xp-panel"
                className="xp__tab"
                onClick={() => setSelected(index)}
              >
                <span>
                  {item.period || kindLabel[item.kind]}
                  {item.period ? ` / ${kindLabel[item.kind]}` : ''}
                </span>
                <strong>{item.role}</strong>
                <span>{item.organization}</span>
              </button>
            ))}
          </div>

          <div
            className="xp__panel"
            role="tabpanel"
            id="xp-panel"
            aria-labelledby={`xp-tab-${selected}`}
            data-scrollable
            data-in
          >
            {/* key restarts the swap animation whenever the role changes */}
            <div className="xp__body" key={stop.organization}>
              <div className="xp__head">
                {stop.logo && <img className="xp__logo" src={stop.logo} alt="" />}
                <div>
                  <h3>{stop.role}</h3>
                  <p className="soft">
                    {stop.organization}, {stop.location}
                  </p>
                </div>
              </div>
              <p>{stop.summary}</p>
              <ul className="points">
                {stop.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {stop.website && (
                <p>
                  <a
                    className="textlink"
                    href={stop.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {new URL(stop.website).host.replace(/^www\./, '')} <ArrowUpRight />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
