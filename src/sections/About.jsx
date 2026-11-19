import { about, profile, stats } from '../data'
import Kanji from '../components/Kanji'

const statement =
  'I build complete systems, from the database up to the screen people use. Third-year computer science at JUIT, ex-intern at Hughes Systique, and freelance developer for a paying client.'

export default function About() {
  return (
    <section className="slide theme-paper" data-theme="paper" data-nav="about" id="about">
      <Kanji text="自己紹介" seal="紹介" />
      <div className="slide__inner about">
        {/* Photo framed by an ensō, the circle drawn in one brush stroke */}
        <figure className="enso">
          <img
            src={profile.photoAbout}
            alt="Akhilesh at the HPCA cricket stadium in Dharamshala, with snow-covered mountains behind"
            width="1024"
            height="721"
          />
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                <feDisplacementMap in="SourceGraphic" scale="1.6" />
              </filter>
            </defs>
            <g filter="url(#brush)">
              <circle cx="50" cy="50" r="46" strokeWidth="4.6" pathLength="100" strokeDasharray="88 100" data-draw />
              <circle
                cx="50.6"
                cy="50.4"
                r="44.2"
                strokeWidth="1.4"
                opacity="0.55"
                pathLength="100"
                strokeDasharray="80 100"
                data-draw
              />
            </g>
          </svg>
          <figcaption data-in>Dharamshala, Himachal Pradesh</figcaption>
        </figure>

        <div>
          <p className="label" data-in>
            About
          </p>
          <p className="statement" aria-label={statement}>
            {statement.split(' ').map((word, index) => (
              <span key={index} aria-hidden="true">
                {word}{' '}
              </span>
            ))}
          </p>
          <div className="about__cols">
            <p data-in>{about[1]}</p>
            <p data-in>
              {about[2]} {about[3]}
            </p>
          </div>
          <dl className="stats" data-in>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd data-count={stat.value}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
