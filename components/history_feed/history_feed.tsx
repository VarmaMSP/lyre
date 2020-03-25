import EpisodePreview from 'components/episode_preview'
import parseISO from 'date-fns/parseISO'
import useVisible from 'hooks/useVisible'
import { Episode } from 'models'
import React, { useEffect } from 'react'

export interface StateToProps {
  history: Episode[]
  receivedAll: boolean
  isLoadingMore: boolean
}

export interface DispatchToProps {
  loadMore: (offset: number) => void
}

const HistoryFeed: React.FC<StateToProps & DispatchToProps> = ({
  history,
  receivedAll,
  isLoadingMore,
  loadMore,
}) => {
  const [reference, isVisible] = useVisible()

  useEffect(() => {
    isVisible && loadMore(history.length)
  }, [isVisible])

  if (history.length === 0) {
    return (
      <div className="mt-8">
        <div className="text-2xl text-gray-900 tracking-wide">
          {'Your listen history seems empty.'}
        </div>
        <div className="mt-2 text-default text-gray-800 tracking-wide">
          {'Try playing an episode.'}
        </div>
      </div>
    )
  }

  history.sort(
    (a, b) =>
      +parseISO(`${b.lastPlayedAt} +0000`) -
      +parseISO(`${a.lastPlayedAt} +0000`),
  )

  return (
    <div>
      <h1 className="pt-3 pb-1 text-xl tracking-wide font-semibold">
        {'History'}
      </h1>
      <hr className="mb-3" />
      {/* Feed */}
      {history.map((episode) => (
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
        <div className="w-full h-10 my-6 text-center text-sm text-gray-800 tracking-wider">
          {'------- END -------'}
        </div>
      )}
    </div>
  )
}

export default HistoryFeed
