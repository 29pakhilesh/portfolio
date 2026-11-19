// Heading whose words rise out of a mask when scrolled into view
// (animated globally in App.jsx via the .title class).
export default function Title({ as: Tag = 'h2', className = '', children }) {
  const words = String(children).split(' ')
  return (
    <Tag className={`title ${className}`.trim()} aria-label={children}>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true">
          <span className="title__word">
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
