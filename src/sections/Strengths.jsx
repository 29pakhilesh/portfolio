import { profile, strengths } from '../data'
import Title from '../components/Title'
import Kanji from '../components/Kanji'
import Magnetic from '../components/Magnetic'

// One character for each strength, shown at the top of its scroll.
const characters = {
  Teamwork: '和', // harmony
  Adaptability: '柔', // flexibility
  'Problem Solving': '解', // to solve
  'Quick Learner': '学', // to learn
}

export default function Strengths() {
  return (
    <section className="slide theme-indigo" data-theme="indigo" data-nav="about" id="how-i-work">
      <Kanji text="流儀" seal="流儀" />
      <div className="slide__inner">
        <header className="slide__head">
          <p className="label" data-in>
            Approach
          </p>
          <Title>How I work</Title>
        </header>
        {/* Four hanging scrolls that unroll as the slide arrives */}
        <ul className="scrolls">
          {strengths.map((strength) => (
            <li className="scroll" key={strength.label} data-unroll>
              <span className="scroll__kanji" lang="ja" aria-hidden="true">
                {characters[strength.label] ?? '技'}
              </span>
              <span className="seal" aria-hidden="true" />
              <h3>{strength.label}</h3>
              <p>{strength.summary}</p>
            </li>
          ))}
        </ul>
        <p data-in style={{ marginTop: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
          <Magnetic
            className="btn btn--solid"
            href={profile.resumeUrl}
            download={profile.resumeDownloadName}
          >
            Download resume
          </Magnetic>
        </p>
      </div>
    </section>
  )
}
