import { useEffect, useState } from 'react'
import { assetUrl } from './assetUrl'

const LINES = [
  'const engineer = {',
  '  name: "Akhilesh",',
  '  role: "B.Tech CSE",',
  '  stack: ["React", "Node", "Python"],',
  '  focus: "full-stack + AI",',
  '  status: "available"',
  '}',
]

export default function CodeWindow() {
  const [shown, setShown] = useState(0)
  const [blink, setBlink] = useState(true)
  const [loop, setLoop] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(LINES.join('\n').length)
      return
    }

    const full = LINES.join('\n')
    let i = 0
    const t = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= full.length) {
        clearInterval(t)
        setTimeout(() => {
          setShown(0)
          setLoop((n) => n + 1)
        }, 2800)
      }
    }, 20)
    return () => clearInterval(t)
  }, [loop])

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530)
    return () => clearInterval(t)
  }, [])

  const full = LINES.join('\n')
  const text = full.slice(0, shown)

  return (
    <div className="code-window" aria-hidden="true">
      <div className="code-window__bar">
        <span>now.ts</span>
        <img src={assetUrl('gifs/eq.gif')} alt="" className="code-window__gif" width={88} height={28} />
      </div>
      <pre className="code-window__body">
        <code>
          {text}
          <span className={`code-window__cursor${blink ? ' is-on' : ''}`}>█</span>
        </code>
      </pre>
    </div>
  )
}
