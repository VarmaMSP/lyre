import Img from 'components/common/img'
import EpisodePreview from 'components/episode_preview'
import { PodcastLink } from 'components/link'
import PodcastPreview from 'components/podcast_preview'
import useVisible from 'hooks/useVisible'
import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import React, { useEffect } from 'react'
import { GlobalSearchParams } from 'types/ui/search'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  isUserSignedIn: boolean
  podcastSearchResults: PodcastSearchResult[]
  episodeSearchResults: EpisodeSearchResult[]
  receivedAll: boolean
  isLoadingMore: boolean
}

export interface DispatchToProps {
  loadMore: (
    searchParams: GlobalSearchParams,
    offset: number,
    limit: number,
  ) => void
  loadPlaybacks: (episodeIds: string[]) => void
}

export interface OwnProps {
  searchParams: GlobalSearchParams
}

type Props = StateToProps & DispatchToProps & OwnProps

const SearchResultsList: React.FC<Props> = ({
  searchParams,
  isUserSignedIn,
  podcastSearchResults,
  episodeSearchResults,
  receivedAll,
  isLoadingMore,
  loadMore,
  loadPlaybacks,
}) => {
  const [reference, isVisible] = useVisible()

  useEffect(() => {
    if (!isVisible) {
      return
    }

    if (searchParams.type === 'podcast') {
      loadMore(searchParams, podcastSearchResults.length, 20)
      return
    }

    if (searchParams.type === 'episode') {
      loadMore(searchParams, episodeSearchResults.length, 20)
      return
    }
  }, [isVisible])

  useEffect(() => {
    if (searchParams.type === 'episode') {
      loadPlaybacks(episodeSearchResults.map((x) => x.id))
    }
  }, [])

  useEffect(() => {
    if (searchParams.type === 'episode') {
      loadPlaybacks(episodeSearchResults.map((x) => x.id))
    }
  }, [
    isUserSignedIn,
    searchParams.query,
    searchParams.type,
    searchParams.sortBy,
  ])

  if (searchParams.type === 'podcast') {
    if (podcastSearchResults.length === 0) {
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
        {podcastSearchResults.map((p) => (
          <div key={p.id} className="mb-6">
            <PodcastPreview podcastId={p.id} searchResult={p} />
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

  if (searchParams.type === 'episode') {
    if (episodeSearchResults.length === 0) {
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
        {podcastSearchResults.length > 0 && (
          <>
            <div className="text-lg font-semibold my-3">Podcasts</div>
            <div className="flex overflow-x-auto">
              {podcastSearchResults.map((p) => (
                <div
                  key={p.id}
                  className="flex-none md:w-28 w-22 mx-4 mt-3 mb-6"
                >
                  <PodcastLink podcastUrlParam={p.urlParam}>
                    <a className="block mb-2">
                      <Img src={getImageUrl(p.urlParam)} />
                    </a>
                  </PodcastLink>
                  <PodcastLink podcastUrlParam={p.urlParam}>
                    <a className="text-sm tracking-wide font-medium leading-tight line-clamp-2">
                      {p.title}
                    </a>
                  </PodcastLink>
                  <PodcastLink podcastUrlParam={p.urlParam}>
                    <a className="text-2xs text-gray-900 tracking-wide font-medium leading-loose line-clamp-1">
                      {p.author}
                    </a>
                  </PodcastLink>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-lg font-semibold my-3">Episodes</div>
        {episodeSearchResults.map((e) => (
          <div key={e.id} className="mb-6">
            <EpisodePreview episodeId={e.id} searchResult={e} small />
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

  return <></>
}

export default SearchResultsList
