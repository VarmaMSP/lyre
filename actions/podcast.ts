import * as T from 'types/actions'
import { PodcastEpisodeListOrder } from 'types/ui'
import { PodcastSearchParams } from 'types/ui/search'
import { doFetch } from 'utils/fetch'
import * as RequestId from 'utils/request_id'
import { qs } from 'utils/utils'
import { requestAction } from './utils'

export function getPodcastPageData(podcastUrlParam: string) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/podcasts/${podcastUrlParam}`,
      }),
    (dispatch, _, { podcasts, episodes, categories }) => {
      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.EPISODE_ADD, episodes })
      dispatch({ type: T.CATEGORY_ADD, categories })

      dispatch({
        type: T.PODCAST_EPISODES_LIST_LOAD_PAGE,
        podcastId: podcasts[0].id,
        episodeIds: episodes.map((x) => x.id),
        order: 'pub_date_desc',
        page: 0,
      })

      if (episodes.length < 15) {
        dispatch({
          type: T.PODCAST_EPISODES_LIST_RECEIVED_ALL,
          podcastId: podcasts[0].id,
          order: 'pub_date_desc',
        })
      }
    },
  )
}

export function getPodcastSearchPageData(
  podcastUrlParam: string,
  query: string,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/podcasts/${podcastUrlParam}/search?query=${query}`,
      }),
    (dispatch, _, { podcasts, searchResults }) => {
      if (podcasts.length == 0) {
        return
      }

      const searchParams = <PodcastSearchParams>{
        query: query,
        podcastId: podcasts[0].id,
      }

      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.EPISODE_ADD, episodes: searchResults.episodes })
      dispatch({
        type: T.SEARCH_RESULT_ADD_PODCAST_SEARCH_RESULTS,
        params: searchParams,
        results: searchResults.episodes,
      })

      dispatch({
        type: T.PODCAST_SEARCH_RESULTS_LOAD_PAGE,
        params: searchParams,
        page: 0,
        resultIds: searchResults.episodes.map((x) => x.id),
      })

      if (searchResults.episodes.length < 25) {
        dispatch({
          type: T.PODCAST_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }
    },
  )
}

export function getPodcastEpisodes(
  podcastId: string,
  limit: number,
  offset: number,
  order: PodcastEpisodeListOrder,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/ajax/browse?${qs({
          endpoint: 'podcast_episodes',
          podcast_id: podcastId,
          order: order,
          offset: offset,
          limit: limit,
        })}`,
      }),
    (dispatch, _, { episodes }) => {
      dispatch({
        type: T.EPISODE_ADD,
        episodes,
      })

      dispatch({
        type: T.PODCAST_EPISODES_LIST_LOAD_PAGE,
        podcastId: podcastId,
        episodeIds: episodes.map((x) => x.id),
        order: order,
        page: Math.floor((offset - 15) / limit) + 1,
      })

      if (episodes.length < limit) {
        dispatch({
          type: T.PODCAST_EPISODES_LIST_RECEIVED_ALL,
          podcastId,
          order,
        })
      }
    },
    { requestId: RequestId.getPodcastEpisodes(podcastId) },
  )
}

export function getPodcastSearchResults(
  searchParams: PodcastSearchParams,
  offset: number,
  limit: number,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/ajax/browse?${qs({
          endpoint: 'podcast_search_results',
          podcast_id: searchParams.podcastId,
          query: searchParams.query,
          offset: offset,
          limit: limit,
        })}`,
      }),
    (dispatch, _, { searchResults }) => {
      dispatch({ type: T.EPISODE_ADD, episodes: searchResults.episodes })
      dispatch({
        type: T.SEARCH_RESULT_ADD_PODCAST_SEARCH_RESULTS,
        params: searchParams,
        results: searchResults.episodes,
      })
      dispatch({
        type: T.PODCAST_SEARCH_RESULTS_LOAD_PAGE,
        params: searchParams,
        page: Math.floor((offset - 25) / limit) + 1,
        resultIds: searchResults.episodes.map((x) => x.id),
      })

      if (searchResults.episodes.length < limit) {
        dispatch({
          type: T.PODCAST_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }
    },
    { requestId: RequestId.getPodcastSearchResults(searchParams.podcastId) },
  )
}
