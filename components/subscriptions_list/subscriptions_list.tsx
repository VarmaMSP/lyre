import Img from 'components/common/img'
import { PodcastLink } from 'components/link'
import { Podcast } from 'models'
import React, { useState } from 'react'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  subscriptions: Podcast[]
}

const SubscriptionsList: React.FC<StateToProps> = ({ subscriptions }) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const count = subscriptions.length
  const defaultListSize = 8

  if (subscriptions.length === 0) {
    return <></>
  }

  return (
    <div className="rounded-xl bg-gray-100 border border-gray-300">
      <h2 className="px-4 py-3 text-gray-800 tracking-wide">{'Podcasts'}</h2>
      <div>
        {(showAll
          ? subscriptions
          : subscriptions.slice(0, defaultListSize)
        ).map((p) => (
          <div id={p.id}>
            <PodcastLink podcastUrlParam={p.urlParam}>
              <a
                className="block flex hover:bg-gray-200 items-center text-gray-700 hover:text-gray-900"
                style={{ padding: '0.3rem 1rem' }}
              >
                <div className="flex-none w-9 h-9">
                  <Img src={getImageUrl(p.urlParam)} className="rounded" />
                </div>
                <span className="w-7/10 truncate pl-3 text-sm">{p.title}</span>
              </a>
            </PodcastLink>
          </div>
        ))}
      </div>
      {count > defaultListSize && !showAll ? (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-2 py-2 text-center text-sm text-gray-700 hover:text-gray-900 font-semibold hover:bg-gray-200"
        >
          {`Show ${count - defaultListSize} more`}
        </button>
      ) : (
        <div className="mb-3" />
      )}
    </div>
  )
}

export default SubscriptionsList
