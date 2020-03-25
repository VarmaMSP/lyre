import EpisodePreview from 'components/episode_preview'
import useVisible from 'hooks/useVisible'
import { Episode, Podcast } from 'models'
import React, { useEffect } from 'react'

export interface StateToProps {
  isUserSignedIn: boolean
  podcast: Podcast
  episodes: Episode[]
  receivedAll: boolean
  isLoadingMore: boolean
}

export interface DispatchToProps {
  loadPlaybacks: (episodeIds: string[]) => void
  loadEpisodes: (offset: number) => void
}

export interface OwnProps {
  podcastId: string
}

interface Props extends StateToProps, DispatchToProps, OwnProps {}

const ListEpisodes: React.SFC<Props> = ({
  isUserSignedIn,
  podcast,
  episodes,
  loadPlaybacks,
  loadEpisodes,
  receivedAll,
  isLoadingMore,
}) => {
  const [reference, isVisible] = useVisible()

  useEffect(() => {
    isVisible && loadEpisodes(episodes.length)
  }, [isVisible])

  useEffect(() => {
    loadPlaybacks(episodes.map((e) => e.id))
  }, [])

  useEffect(() => {
    loadPlaybacks(episodes.map((e) => e.id))
  }, [isUserSignedIn])

  receivedAll = receivedAll && episodes.length == podcast.totalEpisodes

  return (
    <>
      {episodes.map((episode) => (
        <div key={episode.id} className="mb-4">
          <EpisodePreview episodeId={episode.id} small dense />
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
    </>
  )
}

export default ListEpisodes
