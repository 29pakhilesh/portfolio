import BoxModal from './BoxModal'

export default function PdfPreviewModal({ pdfUrl, title, meta, downloadName, onClose }) {
  if (!pdfUrl) return null

  return (
    <BoxModal title={title} file={downloadName || 'document.pdf'} onClose={onClose} extraWide>
      {meta ? <p className="box-modal__kicker">{meta}</p> : null}
      <div className="box-modal__viewer">
        <iframe src={`${pdfUrl}#view=FitH`} title={`${title} preview`} />
      </div>
      <div className="box-modal__actions">
        <a
          href={pdfUrl}
          className="btn btn--primary"
          download={downloadName ?? true}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </BoxModal>
  )
}
