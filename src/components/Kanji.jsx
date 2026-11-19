// Japanese section heading set vertically along the edge of a slide, with a
// red hanko-style seal underneath. Decorative: the English heading carries
// the meaning, so this is hidden from screen readers.
export default function Kanji({ text, seal }) {
  return (
    <div className="kanji" aria-hidden="true">
      <span className="kanji__text" lang="ja">
        {text}
      </span>
      {seal && (
        <span className="seal" lang="ja" data-stamp>
          {seal}
        </span>
      )}
    </div>
  )
}
