import EpisodePreview from 'components/episode_preview'
import useVisible from 'hooks/useVisible'
import { Episode } from 'models'
import React, { useEffect } from 'react'

export interface StateToProps {
  feed: Episode[]
  receivedAll: boolean
  isLoadingMore: boolean
}

export interface DispatchToProps {
  loadMore: (offset: number) => void
}

const SubscriptionsFeed: React.SFC<StateToProps & DispatchToProps> = ({
  feed,
  receivedAll,
  isLoadingMore,
  loadMore,
}) => {
  const [reference, isVisible] = useVisible()

  useEffect(() => {
    isVisible && loadMore(feed.length)
  }, [isVisible])

  if (feed.length === 0) {
    return (
      <div className="mt-8">
        <div className="text-2xl text-gray-900 tracking-wide">
          {'Latest episodes from your subscriptions show up here.'}
        </div>
        <div className="mt-2 text-default text-gray-800 tracking-wide">
          {'Subscribe to your favourite podcasts to get started.'}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="pt-3 pb-1 text-xl tracking-wide font-semibold">
        {'Feed'}
      </h1>
      <hr className="mb-3" />

      {/* Feed */}
      {feed.map((episode) => (
        <div key={episode.id} className="mb-6">
          <EpisodePreview episodeId={episode.id} small />
        </div>
      ))}

      {/* Auto Load */}
      {!receivedAll && !isLoadingMore && (
        <div className="w-full h-10" ref={reference} />
      )}

      {/* Loader */}
      {!receivedAll && isLoadingMore && (
        <div className="spinner mx-auto my-8" />
      )}

      {/* finished Loading */}
      {receivedAll && (
        <div className="w-full h-10 my-6 text-center">{'Thats all, Folks'}</div>
      )}
    </div>
  )
}

export default SubscriptionsFeed
