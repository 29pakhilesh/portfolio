// Slide counter (in kanji numerals), progress bar and previous/next buttons.
// Deck mode only.
const pad = (number) => String(number).padStart(2, '0')

const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
function kanjiNumber(number) {
  if (number <= 0 || number > 99) return String(number)
  const tens = Math.floor(number / 10)
  const ones = number % 10
  return `${tens > 1 ? digits[tens] : ''}${tens ? '十' : ''}${digits[ones]}`
}

function Arrow({ up = false }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={up ? 'M8 13V3M3.5 7.5 8 3l4.5 4.5' : 'M8 3v10M3.5 8.5 8 13l4.5-4.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hud({ index, count, theme, onPrev, onNext }) {
  return (
    <div className="hud" data-theme={theme}>
      <span className="hud__kanji" lang="ja" aria-hidden="true">
        {kanjiNumber(index + 1)}
      </span>
      <span aria-live="polite">
        {pad(index + 1)} / {pad(count)}
      </span>
      <div className="hud__bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${(index + 1) / count})` }} />
      </div>
      <button type="button" onClick={onPrev} disabled={index === 0} aria-label="Previous slide">
        <Arrow up />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={index === count - 1}
        aria-label="Next slide"
      >
        <Arrow />
      </button>
    </div>
  )
}
