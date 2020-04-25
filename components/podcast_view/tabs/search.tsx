import { Podcast } from 'models'
import React from 'react'
import SearchBar from '../components/search_bar'
import SearchResultsList from '../components/search_results_list'

interface OwnProps {
  query?: string
  podcast: Podcast
}

const SearchTab: React.FC<OwnProps> = ({ query, podcast }) => {
  return (
    <div className="pt-4 md:pt-1">
      <h4 className="hidden md:line-clamp-1 text-xl text-gray-800 text-center tracking-wide leading-loose mb-2">
        {podcast.title}
      </h4>
      <div className="w-full md:w-3/5 mb-6 mx-auto">
        <SearchBar podcastUrlParam={podcast.urlParam} initVal={query} />
      </div>
      {!!query && (
        <SearchResultsList
          searchParams={{ query: query, podcastId: podcast.id }}
        />
      )}
    </div>
  )
}

export default SearchTab
