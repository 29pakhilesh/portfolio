import { useEffect, useState } from 'react'
import { githubStatsFallback, profile } from './data'

const GITHUB_USER = profile.githubUsername ?? profile.social.github.split('/').filter(Boolean).pop()

function formatDate(iso) {
  if (!iso) return githubStatsFallback.joined
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function GitHubStats({ variant = 'full', className = '' }) {
  const [stats, setStats] = useState(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setStats({
          repos: data.public_repos ?? githubStatsFallback.repos,
          followers: data.followers ?? githubStatsFallback.followers,
          following: data.following ?? githubStatsFallback.following,
          joined: formatDate(data.created_at),
        })
        setLive(true)
      })
      .catch(() => {
        if (!cancelled) {
          setStats({ ...githubStatsFallback })
          setLive(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const data = stats ?? githubStatsFallback
  const items = [
    { label: 'repos', value: String(data.repos) },
    { label: 'followers', value: String(data.followers) },
    { label: 'following', value: String(data.following) },
    { label: 'joined', value: data.joined },
  ]

  const rootClass = ['github-stats', `github-stats--${variant}`, className].filter(Boolean).join(' ')

  return (
    <div className={rootClass} aria-busy={!stats}>
      <div className="github-stats__bar">
        <span className="github-stats__title">
          github / {GITHUB_USER}
          {!live && stats ? <span className="github-stats__offline"> · cached</span> : null}
        </span>
        <a
          href={profile.social.github}
          className="github-stats__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          profile ↗
        </a>
      </div>
      <div className="github-stats__grid">
        {items.map((item) => (
          <div key={item.label} className="github-stats__cell">
            <span className="github-stats__value">{item.value}</span>
            <span className="github-stats__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
