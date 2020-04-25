import React from 'react'
import SearchBar from '../search_bar'

interface OwnProps {
  podcastUrlParam: string
}

const EpisodeListHeader: React.FC<OwnProps> = ({ podcastUrlParam }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-medium tracking-wide">{'Episodes'}</h2>
      <SearchBar podcastUrlParam={podcastUrlParam} />
    </div>
  )
}

export default EpisodeListHeader
