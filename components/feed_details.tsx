import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import { Podcast } from 'models'
import React from 'react'

interface OwnProps {
  podcast: Podcast
}

const FeedDetails: React.FC<OwnProps> = ({ podcast }) => {
  return (
    <div className="mt-56 px-4 py-3 bg-100 border-2 border-gray-300 rounded-lg">
      <div className="text-blue-700 text-xs underline">
        <a href={podcast.link} target="blank" className="mr-4">
          Website
        </a>
        <a href={podcast.feedUrl} target="blank">
          RSS
        </a>
      </div>
      <div className="mt-2 text-gray-800 text-xs">{`Feed refreshed ${formatDistanceToNow(
        parseISO(podcast.feedLastRefreshAt),
      )} ago`}</div>

      <div className="mt-4 text-2xs text-teal-800 font-thin leading-tight">
        The podcast and artwork featured in this page are property of its owners
        and not affiliated to Phenopod.
      </div>
    </div>
  )
}

export default FeedDetails
