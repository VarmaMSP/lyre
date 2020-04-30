import EpisodePreview from 'components/episode_preview/highlighted'
import useVisible from 'hooks/use_visible'
import { Episode } from 'models'
import React, { useEffect } from 'react'
import { PodcastSearchParams } from 'types/ui/search'

export interface StateToProps {
  isUserSignedIn: boolean
  episodes: Episode[]
  receivedAll: boolean
  isLoadingMore: boolean
}

export interface DispatchToProps {
  loadPlaybacks: (episodeIds: string[]) => void
  loadMore: (
    searchParams: PodcastSearchParams,
    offset: number,
    limit: number,
  ) => void
}

export interface OwnProps {
  searchParams: PodcastSearchParams
}

type Props = StateToProps & DispatchToProps & OwnProps

const SearchResultsList: React.FC<Props> = ({
  isUserSignedIn,
  episodes,
  receivedAll,
  isLoadingMore,
  loadPlaybacks,
  loadMore,
  searchParams,
}) => {
  const [reference, isVisible] = useVisible()

  useEffect(() => {
    isVisible && loadMore(searchParams, episodes.length, 20)
  }, [isVisible])

  useEffect(() => {
    isUserSignedIn && loadPlaybacks(episodes.map((e) => e.id))
  }, [isUserSignedIn])

  if (episodes.length === 0) {
    return isLoadingMore ? (
      <></>
    ) : (
      <div className="mt-6 text-center text-gray-800 tracking-wider">
        {'No results found'}
      </div>
    )
  }

  return (
    <div>
      {episodes.map((e) => (
        <div key={e.id} className="mb-5">
          <EpisodePreview episode={e} small />
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

export default SearchResultsList
