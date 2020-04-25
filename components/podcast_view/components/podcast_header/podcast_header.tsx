import ButtonSubscribe from 'components/button_subscribe'
import Img from 'components/common/img'
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
      <div className="lg:h-36 lg:w-36 h-24 w-24 flex-none">
        <Img src={getImageUrl(podcast.urlParam)} />
      </div>

      <div
        className="flex flex-col flex-auto w-1/2 justify-between lg:px-5 px-3"
        style={{ marginTop: '-3px' }}
      >
        <div className="w-full mb-3">
          <h2 className="text-lg text-gray-900 font-medium md:font-semibold leading-tight tracking-wide line-clamp-2">
            {podcast.title}
          </h2>
          <h3 className="text-sm text-gray-700 font-medium leading-loose tracking-wide line-clamp-1">
            {podcast.author}
          </h3>
          <h4 className="text-xs font-medium text-gray-700 leading-relaxed tracking-wide">
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
