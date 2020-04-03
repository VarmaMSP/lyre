import { createPopper } from '@popperjs/core'
import * as PopperJS from '@popperjs/core/lib/types'
import { useEffect, useRef, useState } from 'react'
import useCallbackRef from './useCallbackRef'
import useClickOutside from './useClickOutside'
import useDisableScroll from './useDisableScroll'

function usePopper(
  options: PopperJS.Options,
  onPopperClickOutside?: () => void,
) {
  const popperInstance = useRef<PopperJS.Instance>()
  const [reference, referenceRef] = useCallbackRef<HTMLElement>()
  const [popper, popperRef] = useCallbackRef<HTMLElement>()
  const [styles, setStyles] = useState<{
    [key: string]: Partial<CSSStyleDeclaration>
  }>({})

  // Disable scroll
  useDisableScroll(!!popper)

  // Click Outside
  useClickOutside(popper, () => onPopperClickOutside && onPopperClickOutside())

  // Init Popper
  useEffect(() => {
    const cleanUp = () => {
      setStyles({})
      if (!!popperInstance.current) {
        popperInstance.current.destroy()
        popperInstance.current = undefined
      }
    }

    cleanUp()
    if (!!reference && !!popper) {
      popperInstance.current = createPopper(reference, popper, {
        ...options,
        modifiers: [
          ...(options.modifiers || []),
          {
            name: 'applyStyles',
            fn: ({ state }) => setStyles(state.styles),
          },
        ],
      })

      return cleanUp
    }
  }, [reference, popper, options.placement])

  return [
    {
      ref: referenceRef,
      styles: {} as React.CSSProperties,
    },
    {
      ref: popperRef,
      styles: (styles['popper'] || {}) as React.CSSProperties,
    },
  ]
}

export default usePopper
