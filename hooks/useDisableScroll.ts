import { useEffect } from 'react'

function useDisableScroll(reference: HTMLElement | null) {
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
    if (!!reference) {
      window.addEventListener('scroll', fn)
      return cleanUp
    }
  }, [reference])
}

export default useDisableScroll
