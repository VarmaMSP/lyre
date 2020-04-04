import React from 'react'

interface Props {
  children: JSX.Element
  background: string
}

const Overlay: React.FC<Props> = ({ children, background }) => {
  return (
    <>
      <div className="fixed inset-0 bg-white z-10" style={{ background }} />
      {children}
    </>
  )
}

export default Overlay
