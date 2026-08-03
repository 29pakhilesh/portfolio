import { useState } from 'react'
import PdfPreviewModal from './PdfPreviewModal'
import { getCertLogoUrl } from './certIcons'

export default function CertCard({ cert }) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const logoUrl = cert.logo ?? getCertLogoUrl(cert.name, cert.issuer)
  const tags = Array.isArray(cert.skills) ? cert.skills : cert.skills.split(', ')
  const isExam = cert.kind === 'exam'
  const isCourse = cert.kind === 'course'
  const badgeLabel = cert.badge ?? (isExam ? 'Official' : isCourse ? 'Course' : 'Certified')
  const actionLabel = isCourse ? 'View course certificate' : 'View certificate'
  const useAwsLogoStyle = Boolean(cert.logo?.includes('aws') || cert.name.includes('AWS')) && !isCourse

  return (
    <>
      <article className="cert-card">
        <div className="cert-card__shine" aria-hidden="true" />
        <div className="cert-card__top">
          <div
            className={`cert-card__logo-wrap${useAwsLogoStyle ? ' cert-card__logo-wrap--aws' : ''}`}
          >
            {logoUrl && !logoFailed ? (
              <img
                src={logoUrl}
                alt=""
                className="cert-card__logo"
                width={44}
                height={44}
                loading="lazy"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="cert-card__logo-fallback">{cert.issuer.charAt(0)}</span>
            )}
          </div>
          <span className="cert-card__badge">
            {isExam ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {badgeLabel}
          </span>
        </div>
        <h4 className="cert-card__title">{cert.name}</h4>
        <p className="cert-card__issuer">{cert.issuer}</p>
        <p className="cert-card__period">
          <span className="cert-card__period-dot" aria-hidden="true" />
          {cert.period}
        </p>
        <div className="cert-card__footer">
          <ul className="cert-card__tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {cert.certificateUrl && (
            <button
              type="button"
              className="cert-card__download"
              onClick={() => setPreviewOpen(true)}
              aria-label={`Preview ${cert.name} certificate`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              {actionLabel}
            </button>
          )}
        </div>
      </article>

      {previewOpen && (
        <PdfPreviewModal
          pdfUrl={cert.certificateUrl}
          title={cert.name}
          meta={`${cert.issuer} · ${cert.period}`}
          downloadName={cert.downloadName}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  )
}
