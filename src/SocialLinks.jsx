import { profile } from './data'
import SocialIcon from './SocialIcon'

const SOCIALS = [
  { id: 'github', href: profile.social.github, label: 'GitHub' },
  { id: 'linkedin', href: profile.social.linkedin, label: 'LinkedIn' },
  { id: 'leetcode', href: profile.social.leetcode, label: 'LeetCode' },
]

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {SOCIALS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="social-links__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
        >
          <SocialIcon name={item.id} />
        </a>
      ))}
    </div>
  )
}
