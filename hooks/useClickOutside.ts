import { useEffect } from 'react'

function useClickOutside(
  reference: HTMLElement | null,
  handleOnClick: () => void,
) {
  useEffect(() => {
    const fn: EventListener = (e) => {
      if (!!reference && !reference.contains(e.target as any)) {
        handleOnClick()
      }
    }

    const cleanUp = () => {
      if (window.PointerEvent) {
        document.removeEventListener('pointerdown', fn)
      } else {
        document.removeEventListener('mousedown', fn)
        document.removeEventListener('touchstart', fn)
      }
    }

    cleanUp()
    if (!!reference) {
      if (window.PointerEvent) {
        document.addEventListener('pointerdown', fn)
      } else {
        document.addEventListener('mousedown', fn)
        document.addEventListener('touchstart', fn)
      }

      return cleanUp
    }
  }, [reference])
}

export default useClickOutside
