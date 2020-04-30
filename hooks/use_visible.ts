import { useEffect, useRef, useState } from 'react'
import useCallbackRef from './use_callback_ref'

function useVisible(): [(elem: HTMLElement | null) => void, boolean] {
  const observerRef = useRef<IntersectionObserver>()
  const [reference, referenceRef] = useCallbackRef<HTMLElement>()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const cleanUp = () => {
      setIsVisible(false)
      if (!!observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = undefined
      }
    }

    cleanUp()
    if (!!reference) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.intersectionRatio > 0)) {
            setIsVisible(true)
          }
        },
        {
          root: null,
          rootMargin: '10px 0px 10px 0px',
          threshold: 0,
        },
      )
      observerRef.current.observe(reference)
    }

    return cleanUp
  }, [reference])

  return [referenceRef, isVisible]
}

export default useVisible
