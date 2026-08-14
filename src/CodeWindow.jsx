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

const FULL = LINES.join('\n')

export default function CodeWindow() {
  const [shown, setShown] = useState(0)
  const [blink, setBlink] = useState(true)
  const [loop, setLoop] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(FULL.length)
      return
    }

    let i = 0
    const t = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= FULL.length) {
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

  const text = FULL.slice(0, shown)

  return (
    <div className="code-window" aria-hidden="true">
      <div className="code-window__bar">
        <span>now.ts</span>
        <img src={assetUrl('gifs/eq.gif')} alt="" className="code-window__gif" width={88} height={28} />
      </div>
      <pre className="code-window__body">
        {/* Invisible full snippet locks height so typing never reflows the page */}
        <code className="code-window__sizer">{FULL}█</code>
        <code className="code-window__live">
          {text}
          <span className={`code-window__cursor${blink ? ' is-on' : ''}`}>█</span>
        </code>
      </pre>
    </div>
  )
}
