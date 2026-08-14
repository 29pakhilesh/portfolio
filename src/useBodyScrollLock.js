import { useEffect } from 'react'

let lockCount = 0
let savedStyles = null

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    if (lockCount === 0) {
      const scrollY = window.scrollY
      savedStyles = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
        scrollY,
      }
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.documentElement.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount <= 0) {
        lockCount = 0
        if (savedStyles) {
          const y = savedStyles.scrollY
          const root = document.documentElement
          // Global smooth scrolling would animate the restore, showing a jump to top first.
          const savedScrollBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'

          document.body.style.overflow = savedStyles.overflow
          document.body.style.position = savedStyles.position
          document.body.style.top = savedStyles.top
          document.body.style.left = savedStyles.left
          document.body.style.right = savedStyles.right
          document.body.style.width = savedStyles.width
          root.style.overflow = ''
          savedStyles = null

          window.scrollTo(0, y)
          root.style.scrollBehavior = savedScrollBehavior
        }
      }
    }
  }, [locked])
}
