import { profile } from '../data'
import Scene from '../components/Scene'
import Typed from '../components/Typed'
import Magnetic from '../components/Magnetic'
import { ArrowDown } from '../components/Icons'
import { assetUrl } from '../assetUrl'

const roles = [
  'full-stack developer',
  'React + Node.js + PostgreSQL',
  'FastAPI and PyTorch when it needs ML',
  'AWS Certified Cloud Practitioner',
  'built an OS that runs in a browser tab',
]

function Letters({ text }) {
  return [...text].map((char, index) => <span key={index}>{char}</span>)
}

export default function Hero({ start }) {
  const [first, ...rest] = profile.name.split(' ')

  return (
    <section className="slide theme-paper hero" data-theme="paper" id="top">
      {/* Day: Mount Fuji and cherry blossoms, with paper mist on the left for the text */}
      <Scene src={assetUrl('scenes/fuji-day.webp')} />
      <div className="mist mist--day" aria-hidden="true" />

      <div className="slide__inner">
        <div className="hero__intro">
          <p className="hero__jp" lang="ja" data-in>
            アキレシュ・パニグラヒ
          </p>
          <h1 className="hero__name" aria-label={profile.name} data-letters>
            <span className="hero__line" aria-hidden="true">
              <Letters text={first} />
            </span>
            <span className="hero__line" aria-hidden="true">
              <Letters text={rest.join(' ')} />
            </span>
          </h1>
          <div data-in>
            <Typed phrases={roles} start={start} />
          </div>
          <p className="hero__lede" data-in>
            {profile.tagline}
          </p>
          <div className="hero__actions" data-in>
            <Magnetic className="btn btn--solid" href="#work">
              See my work <ArrowDown />
            </Magnetic>
            <Magnetic className="btn" href="#contact">
              Get in touch
            </Magnetic>
          </div>
          {profile.available && (
            <p className="status" data-in>
              <span className="status__dot" aria-hidden="true" />
              {profile.availabilityMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
