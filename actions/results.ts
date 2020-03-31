import Router from 'next/router'
import { Dispatch } from 'redux'
import * as T from 'types/actions'
import { SearchResultType, SearchSortBy } from 'types/search'
import { GlobalSearchParams } from 'types/ui/search'
import { doFetch } from 'utils/fetch'
import * as gtag from 'utils/gtag'
import * as RequestId from 'utils/request_id'
import { encodeQueryParam, qs } from 'utils/utils'
import { requestAction } from './utils'

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

export function getResultsPageData(
  query: string,
  type_: 'podcast' | 'episode',
  sortBy: 'relevance' | 'publish_date',
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/results?${qs({
          query: query,
          type: type_,
          sort_by: sortBy,
        })}`,
      }),
    (
      dispatch,
      _,
      { podcasts, episodes, podcastSearchResults, episodeSearchResults },
    ) => {
      const params: GlobalSearchParams = {
        query,
        type: type_,
        sortBy,
      }

      // entities
      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.EPISODE_ADD, episodes })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params,
        resultType: 'podcast',
        results: podcastSearchResults,
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params,
        resultType: 'episode',
        results: episodeSearchResults,
      })

      // UI
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params,
        resultType: 'podcast',
        page: 0,
        resultIds: podcastSearchResults.map((x) => x.id),
      })
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params,
        resultType: 'episode',
        page: 0,
        resultIds: episodeSearchResults.map((x) => x.id),
      })

      if (params.type === 'podcast' && podcastSearchResults.length < 25) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params,
        })
      }

      if (params.type === 'episode' && episodeSearchResults.length < 25) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params,
        })
      }
    },
    { requestId: RequestId.getResults() },
  )
}

export function getResults(
  query: string,
  type_: SearchResultType,
  sortBy: SearchSortBy,
  offset: number,
  limit: number,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/ajax/browse?${qs({
          endpoint: 'search_results',
          query: query,
          type: type_,
          sort_by: sortBy,
          offset: offset,
          limit: limit,
        })}`,
      }),
    (
      dispatch,
      _,
      { podcasts, episodes, podcastSearchResults, episodeSearchResults },
    ) => {
      const params: GlobalSearchParams = {
        query,
        type: type_,
        sortBy,
      }

      // entities
      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.EPISODE_ADD, episodes })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params,
        resultType: 'podcast',
        results: podcastSearchResults,
      })
      dispatch({
        type: T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS,
        params,
        resultType: 'episode',
        results: episodeSearchResults,
      })

      // UI
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params,
        resultType: 'podcast',
        page: Math.floor(offset - 25 / limit) + 1,
        resultIds: podcastSearchResults.map((x) => x.id),
      })
      dispatch({
        type: T.GLOBAL_SEARCH_RESULTS_LOAD,
        params,
        resultType: 'episode',
        page: Math.floor(offset - 25 / limit) + 1,
        resultIds: episodeSearchResults.map((x) => x.id),
      })

      if (params.type === 'podcast' && podcastSearchResults.length < 25) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params,
        })
      }

      if (params.type === 'episode' && episodeSearchResults.length < 25) {
        dispatch({
          type: T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL,
          params,
        })
      }
    },
    { requestId: RequestId.getResults() },
  )
}
