import { useState } from 'react'
import { profile } from './data'
import { SectionReveal } from './useScrollReveal'
import SocialIcon from './SocialIcon'
import { Copyable } from './CopyToast'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return

    if (!ACCESS_KEY) {
      setStatus('error')
      return
    }

    setStatus('loading')

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
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="message-section">
      <div className="container">
        <SectionReveal>
          <div className="section__header">
            <p className="section__number">05 / contact</p>
            <h2 className="section__title">Let&apos;s talk</h2>
          </div>

          <div className="message-section__grid">
            <div className="message-section__intro">
              <p className="message-section__desc">
                Send a message — it goes straight to{' '}
                <Copyable
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                  label="Copied email"
                >
                  {profile.email}
                </Copyable>
                .
              </p>
              <p className="message-section__desc message-section__desc--muted">
                Prefer email or socials? Use the channels below the form.
              </p>
              <ul className="message-section__meta">
                <li>
                  <span>reply</span>
                  <span>usually within 24h</span>
                </li>
                <li>
                  <span>status</span>
                  <span>{profile.availabilityLabel}</span>
                </li>
                <li>
                  <span>base</span>
                  <span>{profile.location}</span>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-form__field">
                <span className="contact-form__label">your name *</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  autoComplete="name"
                />
              </label>

              <label className="contact-form__field">
                <span className="contact-form__label">your email *</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="so I can reply to you"
                  required
                  autoComplete="email"
                />
              </label>

              <label className="contact-form__field">
                <span className="contact-form__label">message *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Project, internship, or just say hi..."
                  rows={5}
                  required
                />
              </label>

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="btn__spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="contact-form__feedback contact-form__feedback--success" role="status">
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="contact-form__feedback contact-form__feedback--error" role="alert">
                  {!ACCESS_KEY
                    ? 'Email not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to .env.'
                    : 'Something went wrong. Email me directly instead.'}
                </p>
              )}
            </form>
          </div>

          <div className="contact-reach">
            <p className="contact-reach__label">or reach me directly</p>
            <Copyable
              value={profile.email}
              href={`mailto:${profile.email}`}
              className="contact-reach__email"
              label="Copied email"
            >
              {profile.email}
            </Copyable>
            <div className="contact-reach__links">
              <a
                href={profile.social.github}
                className="contact-reach__link contact-reach__link--icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <SocialIcon name="github" />
              </a>
              <a
                href={profile.social.linkedin}
                className="contact-reach__link contact-reach__link--icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <SocialIcon name="linkedin" />
              </a>
              <a
                href={profile.social.leetcode}
                className="contact-reach__link contact-reach__link--icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
              >
                <SocialIcon name="leetcode" />
              </a>
              <Copyable
                value={profile.phone}
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="contact-reach__link"
                label="Copied phone"
              >
                {profile.phone}
              </Copyable>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
