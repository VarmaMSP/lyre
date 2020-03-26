import classnames from 'classnames'
import React, { cloneElement } from 'react'
import ReactImage from 'react-image'
import { getImageUrl } from 'utils/dom'

interface OwnProps {
  src: string
  className?: string
}

const Img: React.FC<OwnProps> = ({ src, className = 'rounded-lg' }) => {
  return (
    <ReactImage
      src={[src, getImageUrl('placeholder')]}
      loader={
        <div
          className={classnames('bg-gray-300', className)}
          style={{ width: '100%', paddingTop: '100%' }}
        />
      }
      container={(children) => {
        return (
          <div
            className={classnames('relative bg-gray-300', className)}
            style={{ width: '100%', paddingTop: '100%' }}
          >
            {cloneElement(children as JSX.Element, {
              className: classnames(
                'absolute inset-0 w-full h-auto object-contain object-center border',
                className,
              ),
            })}
          </div>
        )
      }}
    />
  )
}

export default Img
