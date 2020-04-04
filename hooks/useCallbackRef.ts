import { useCallback, useState } from 'react'

function useCallbackRef<E extends Element>(
  cb?: (elem: E) => void,
): [E | null, (element: E | null) => void] {
  const [element, setElement] = useState<E | null>(null)
  return [
    element,
    useCallback((elem: E | null) => {
      setElement(elem)
      !!elem && !!cb && cb(elem)
    }, []),
  ]
}

export default useCallbackRef
