import './LiveBackground.css'

/** Static grid only — no scan/wave/node motion */
export default function LiveBackground() {
  return (
    <div className="live-bg live-bg--studio" aria-hidden="true">
      <div className="live-bg__grid" />
    </div>
  )
}
