import { useEffect } from 'react'

let lockCount = 0
let savedOverflow = ''

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    lockCount += 1

    return () => {
      lockCount -= 1
      if (lockCount <= 0) {
        lockCount = 0
        document.body.style.overflow = savedOverflow
      }
    }
  }, [locked])
}
