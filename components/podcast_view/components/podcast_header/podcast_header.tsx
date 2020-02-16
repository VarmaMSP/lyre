import ButtonSubscribe from 'components/button_subscribe'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { Podcast } from 'models'
import React from 'react'
import { getImageUrl } from 'utils/dom'

export interface OwnProps {
  podcast: Podcast
}

const PodcastHeader: React.SFC<OwnProps> = ({ podcast }) => {
  return (
    <div className="flex">
      <img
        className="lg:h-36 h-24 lg:w-36 w-24 flex-none object-contain object-center rounded-lg border"
        src={getImageUrl(podcast.urlParam)}
      />
      <div className="flex flex-col flex-auto w-1/2 justify-between lg:px-5 px-3">
        <div className="w-full mb-3">
          <h2 className="md:text-xl text-lg text-black font-medium leading-snug line-clamp-2">
            {podcast.title}
          </h2>
          <h3 className="mb-2 md:text-base text-sm text-gray-800 font-medium leading-relaxed line-clamp-1">
            {podcast.author}
          </h3>
          <h4 className="text-2xs font-medium text-gray-700 tracking-wide">
            {`Since ${format(
              parseISO(`${podcast.earliestEpisodePubDate} +0000`),
              'MMM yyyy',
            )}`}
            <span className="mx-2 font-extrabold">&middot;</span>
            {`${podcast.totalEpisodes} episodes`}
          </h4>
        </div>
        <ButtonSubscribe className="w-42 py-1 text-xs" podcastId={podcast.id} />
      </div>
    </div>
  )
}

export default PodcastHeader
