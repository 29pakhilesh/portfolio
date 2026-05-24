import { profile } from './data'

export default function AvailabilityStatus({ className = '' }) {
  if (!profile.available) return null

  return (
    <aside className={['availability-note', className].filter(Boolean).join(' ')}>
      <p>
        <span className="availability-note__tag">{profile.availabilityLabel}</span>
        {profile.availabilityMessage}.{' '}
        <a href="#contact">Get in touch</a>
      </p>
    </aside>
  )
}
