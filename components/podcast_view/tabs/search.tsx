import React from 'react'

interface OwnProps {
  query?: string
}

const SearchTab: React.FC<OwnProps> = ({ query }) => {
  if (!!query) {
    return <div>{'Search '}</div>
  }

  return <div>{'sam harris'}</div>
}

export default SearchTab
