import { Podcast } from 'models'
import React from 'react'
import SearchBar from '../components/search_bar'

interface OwnProps {
  query?: string
  podcast: Podcast
}

const SearchTab: React.FC<OwnProps> = ({ query, podcast }) => {
  if (!query) {
    return (
      <div className="pt-4 md:pt-2">
        <h4 className="hidden md:line-clamp-1 text-xl text-gray-800 text-center tracking-wide leading-loose mb-3">
          {podcast.title}
        </h4>
        <div className="w-full md:w-3/5 mx-auto">
          <SearchBar podcastUrlParam={podcast.urlParam} />
        </div>
      </div>
    )
  }

  return <div>{'sam harris'}</div>
}

export default SearchTab
