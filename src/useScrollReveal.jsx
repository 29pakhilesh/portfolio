/** Section wrappers — content is always visible (no scroll-hide animations). */

export function SectionReveal({ children, className = '' }) {
  return <div className={`section-reveal ${className}`.trim()}>{children}</div>
}

export function RevealGroup({ children, className = '' }) {
  return <div className={`reveal-group ${className}`.trim()}>{children}</div>
}

export function RevealItem({ children, className = '' }) {
  return <div className={className.trim() || undefined}>{children}</div>
}
