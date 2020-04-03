import { useEffect } from 'react'

function useDisableScroll(disableScroll: boolean) {
  useEffect(() => {
    const fn: EventListener = (() => {
      const winX = window.scrollX
      const winY = window.scrollY

      return () => window.scrollTo(winX, winY)
    })()

    const cleanUp = () => {
      window.removeEventListener('scroll', fn)
    }

    cleanUp()
    if (disableScroll) {
      window.addEventListener('scroll', fn)
      return cleanUp
    }
  }, [disableScroll])
}

export default useDisableScroll
