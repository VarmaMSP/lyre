import { PodcastLink } from 'components/link'
import { Podcast } from 'models'
import React from 'react'
import Img from 'react-image'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  subscriptions: Podcast[]
}

const SubscriptionsList: React.FC<StateToProps> = ({ subscriptions }) => {
  if (subscriptions.length === 0) {
    return <></>
  }

  return (
    <div className="px-3 pt-3 pb-2 rounded-xl bg-gray-200">
      <h2 className="mb-3 text text-gray-800 tracking-wide">
        {"You're subscribed to"}
      </h2>
      <div className="flex flex-wrap">
        {subscriptions.map((podcast) => (
          <PodcastLink podcastUrlParam={podcast.urlParam} key={podcast.id}>
            <a
              className="block mb-4 xl:w-1/5 md:w-1/4 w-1/5"
              style={{ paddingLeft: '2px', paddingRight: '2px' }}
            >
              <Img
                className="w-full h-auto flex-none object-contain rounded-lg border cursor-pointer"
                src={getImageUrl(podcast.urlParam)}
                loader={
                  <div
                    className="flex-none bg-gray-300 rounded-lg"
                    style={{ width: '100%', paddingTop: '100%' }}
                  />
                }
              />
            </a>
          </PodcastLink>
        ))}
      </div>
    </div>
  )
}

export default SubscriptionsList
