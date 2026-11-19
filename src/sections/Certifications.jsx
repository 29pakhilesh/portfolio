import { certifications } from '../data'
import { getCertLogoUrl } from '../certIcons'
import Title from '../components/Title'
import Kanji from '../components/Kanji'
import { ArrowUpRight } from '../components/Icons'

export default function Certifications() {
  return (
    <section className="slide theme-indigo" data-theme="indigo" data-nav="skills" id="certifications">
      <Kanji text="資格" seal="資格" />
      <div className="slide__inner">
        <header className="slide__head">
          <p className="label" data-in>
            Qualifications
          </p>
          <Title>Certifications</Title>
        </header>
        <ul>
          {certifications.map((cert) => {
            const logo = cert.logo ?? getCertLogoUrl(cert.name, cert.issuer)
            return (
              <li className="cert" key={cert.name} data-in>
                <span className="cert__name">
                  <i>{logo && <img src={logo} alt="" />}</i>
                  {cert.name}
                </span>
                <span className="soft">{cert.issuer}</span>
                <span className="mono soft">{cert.period}</span>
                <a
                  className="textlink"
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certificate: ${cert.name}`}
                >
                  View certificate <ArrowUpRight />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
