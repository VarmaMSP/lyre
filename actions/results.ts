import Router from 'next/router'
import { Dispatch } from 'redux'
import * as T from 'types/actions'
import { GlobalSearchParams } from 'types/ui/search'
import { doFetch } from 'utils/fetch'
import * as gtag from 'utils/gtag'
import * as RequestId from 'utils/request_id'
import { encodeQueryParam, qs } from 'utils/utils'
import { requestAction } from './utils'

export function loadPodcastSearchPage(podcastUrlParam: string, query: string) {
  return (dispatch: Dispatch<T.AppActions>) => {
    dispatch({
      type: T.HISTORY_PUSH_ENTRY,
      entry: {
        urlPath: Router.asPath,
        scrollY: window.scrollY,
      },
    })

    Router.push(
      {
        pathname: '/podcasts',
        query: {
          podcastUrlParam: podcastUrlParam,
          activeTab: 'search',
          query: query,
        },
      },
      `/podcasts/${podcastUrlParam}/search?query=${query}`,
    )
  }
}

export function loadResultsPage(searchParams: GlobalSearchParams) {
  return (dispatch: Dispatch<T.AppActions>) => {
    gtag.search(searchParams.query)

    dispatch({
      type: T.HISTORY_PUSH_ENTRY,
      entry: {
        urlPath: Router.asPath,
        scrollY: window.scrollY,
      },
    })

    Router.push(
      {
        pathname: '/results',
        query: {
          query: searchParams.query,
          type: searchParams.type,
          sortBy: searchParams.sortBy,
        },
      },
      `/results?query=${encodeQueryParam(searchParams.query)}&type=${
        searchParams.type
      }&sort_by=${searchParams.sortBy}`,
    )
  }
}

export function loadPodcastPage(podcastUrlParam: string) {
  return (dispatch: Dispatch<T.AppActions>) => {
    dispatch({
      type: T.HISTORY_PUSH_ENTRY,
      entry: {
        urlPath: Router.asPath,
        scrollY: window.scrollY,
      },
    })

    Router.push(
      {
        pathname: '/podcasts',
        query: { podcastUrlParam: podcastUrlParam },
      },
      `/podcasts/${podcastUrlParam}`,
    )
  }
}

export function getResultsPageData(searchParams: GlobalSearchParams) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/results?${qs({
          query: searchParams.query,
          type: searchParams.type,
          sort_by: searchParams.sortBy,
        })}`,
      }),
    (dispatch, _, { podcasts, episodes, searchResults }) => {
      // entities
      dispatch({
        type: T.PODCAST_ADD,
        podcasts: [...podcasts, ...searchResults.podcasts],
      })
      dispatch({
        type: T.EPISODE_ADD,
        episodes: [...episodes, ...searchResults.episodes],
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params: searchParams,
        resultType: 'podcast',
        results: searchResults.podcasts,
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params: searchParams,
        resultType: 'episode',
        results: searchResults.episodes,
      })

      // UI
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params: searchParams,
        resultType: 'podcast',
        page: 0,
        resultIds: searchResults.podcasts.map((x) => x.id),
      })
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params: searchParams,
        resultType: 'episode',
        page: 0,
        resultIds: searchResults.episodes.map((x) => x.id),
      })

      if (
        searchParams.type === 'podcast' &&
        searchResults.podcasts.length < 25
      ) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }

      if (
        searchParams.type === 'episode' &&
        searchResults.episodes.length < 25
      ) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }
    },
    { requestId: RequestId.getResults() },
  )
}

export function getResults(
  searchParams: GlobalSearchParams,
  offset: number,
  limit: number,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/ajax/browse?${qs({
          endpoint: 'search_results',
          query: searchParams.query,
          type: searchParams.type,
          sort_by: searchParams.sortBy,
          offset: offset,
          limit: limit,
        })}`,
      }),
    (dispatch, _, { podcasts, episodes, searchResults }) => {
      // entities
      dispatch({
        type: T.PODCAST_ADD,
        podcasts: [...podcasts, ...searchResults.podcasts],
      })
      dispatch({
        type: T.EPISODE_ADD,
        episodes: [...episodes, ...searchResults.episodes],
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params: searchParams,
        resultType: 'podcast',
        results: searchResults.podcasts,
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params: searchParams,
        resultType: 'episode',
        results: searchResults.episodes,
      })

      // UI
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params: searchParams,
        resultType: 'podcast',
        page: Math.floor(offset - 25 / limit) + 1,
        resultIds: searchResults.podcasts.map((x) => x.id),
      })
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params: searchParams,
        resultType: 'episode',
        page: Math.floor(offset - 25 / limit) + 1,
        resultIds: searchResults.episodes.map((x) => x.id),
      })

      if (
        searchParams.type === 'podcast' &&
        searchResults.podcasts.length < limit
      ) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }

      if (
        searchParams.type === 'episode' &&
        searchResults.episodes.length < limit
      ) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params: searchParams,
        })
      }
    },
    { requestId: RequestId.getResults() },
  )
}
