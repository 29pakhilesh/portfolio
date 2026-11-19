import { useEffect, useState } from 'react'
import { profile } from '../data'
import SocialIcon from '../SocialIcon'
import Title from '../components/Title'
import Scene from '../components/Scene'
import { assetUrl } from '../assetUrl'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const socialLinks = [
  { name: 'github', label: 'GitHub', href: profile.social.github },
  { name: 'linkedin', label: 'LinkedIn', href: profile.social.linkedin },
  { name: 'leetcode', label: 'LeetCode', href: profile.social.leetcode },
]

const indiaTime = () =>
  new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button type="button" className="btn" onClick={copy} aria-live="polite">
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [time, setTime] = useState(indiaTime)

  useEffect(() => {
    const timer = setInterval(() => setTime(indiaTime()), 20000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!ACCESS_KEY) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: `Portfolio message from ${form.name.trim()}`,
          from_name: 'Portfolio — Akhilesh Panigrahi',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('failed')
      }
    } catch {
      setStatus('failed')
    }
  }

  return (
    <section className="slide theme-night contact-slide" data-theme="night" data-nav="contact" id="contact">
      {/* Night: the same view of Fuji under the moon */}
      <Scene src={assetUrl('scenes/fuji-night.webp')} />
      <div className="mist mist--night" aria-hidden="true" />

      <div className="slide__inner">
        <div className="contact-card" data-in data-scrollable>
          <p className="label">Contact</p>
          <Title className="contact__title">Let&rsquo;s build something</Title>
          <p className="soft">
            {profile.availabilityMessage}. I usually reply within a day.
          </p>
          <p className="contact__email">
            <a className="textlink" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <CopyEmail />
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <label className="field field--half">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </label>
            <label className="field field--half">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="An internship, a project, or a question"
                required
                data-scrollable
              />
            </label>
            <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="form__note" role="status">
                Message sent. I will reply to your email soon.
              </p>
            )}
            {status === 'failed' && (
              <p className="form__note form__note--bad" role="alert">
                The message did not send. Check your connection and try again, or email{' '}
                {profile.email}.
              </p>
            )}
            {status === 'unconfigured' && (
              <p className="form__note form__note--bad" role="alert">
                The form is not connected yet. Email {profile.email} instead.
              </p>
            )}
          </form>

          <ul className="socials">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a className="textlink" href={social.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={social.name} />
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a className="textlink" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                {profile.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          {profile.location}, {time} IST
        </span>
      </footer>
    </section>
  )
}
