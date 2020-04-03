import { useEffect, useMemo } from 'react'

function useDisableScroll(disableScroll: boolean) {
  const passiveSupported = useMemo(() => {
    let res: boolean = false
    let fn: EventListener = () => {}
    let opts: AddEventListenerOptions = {
      get passive() {
        res = true
        return false
      },
    }

    try {
      window.addEventListener('test', fn, opts)
      window.removeEventListener('test', fn, opts)
    } catch (err) {}

    return res
  }, [])

  useEffect(() => {
    const fn1: EventListener = (e) => {
      e.preventDefault()
    }

    const fn2: EventListener = (e) => {
      const k: number = (e as any).keyCode
      if (k === 37 || k === 38 || k === 39 || k === 40) {
        e.preventDefault()
        return false
      }
    }

    const opts: AddEventListenerOptions | boolean = passiveSupported
      ? { passive: false }
      : false

    const cleanUp = () => {
      window.removeEventListener('DOMMouseScroll', fn1, false)
      window.removeEventListener('wheel', fn1, opts)
      window.removeEventListener('touchmove', fn1, opts)
      window.removeEventListener('keydown', fn2, false)
    }

    cleanUp()
    if (disableScroll) {
      window.addEventListener('DOMMouseScroll', fn1, false)
      window.addEventListener('wheel', fn1, opts)
      window.addEventListener('touchmove', fn1, opts)
      window.addEventListener('keydown', fn2, false)

      return cleanUp
    }
  }, [disableScroll])
}

export default useDisableScroll
