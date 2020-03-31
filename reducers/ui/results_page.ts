import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'
import { SearchQuery, SearchResultType, SearchSortBy } from 'types/ui/search'
import { Hash3, Obj } from 'types/utilities'
import { makeHash } from 'utils/hash'

const query: Reducer<string, T.AppActions> = (state = '', action) => {
  switch (action.type) {
    case T.SEARCH_RESULTS_QUERY:
      return action.query

    default:
      return state
  }
}

const resultType: Reducer<SearchResultType, T.AppActions> = (
  state = 'episode',
  action,
) => {
  switch (action.type) {
    case T.SEARCH_RESULTS_RESULT_TYPE:
      return action.resultType

    default:
      return state
  }
}

const sortBy: Reducer<SearchSortBy, T.AppActions> = (
  state = 'relevance',
  action,
) => {
  switch (action.type) {
    case T.SEARCH_RESULTS_SORT_BY:
      return action.sortBy

    default:
      return state
  }
}

const resultsList: Reducer<
  Obj<
    Hash3<SearchQuery, SearchResultType, SearchSortBy>,
    { [page: number]: string[] }
  >,
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    case T.SEARCH_RESULTS_LIST_LOAD_EPISODE_PAGE:
      return {
        ...state,
        [makeHash(action.searchQuery, 'episode', action.sortBy)]: {
          ...(state[makeHash(action.searchQuery, 'episode', action.sortBy)] ||
            {}),
          [action.page]: action.episodeIds.map((id) =>
            makeHash(action.searchQuery, 'episode', action.sortBy, id),
          ),
        },
      }

    case T.SEARCH_RESULTS_LIST_LOAD_PODCAST_PAGE:
      return {
        ...state,
        [makeHash(action.searchQuery, 'podcast', action.sortBy)]: {
          ...(state[makeHash(action.searchQuery, 'podcast', action.sortBy)] ||
            {}),
          [action.page]: action.podcastIds.map((id) =>
            makeHash(action.searchQuery, 'podcast', action.sortBy, id),
          ),
        },
      }

    case T.SEARCH_RESULTS_LIST_LOAD_PODCAST_BEST_MATCH:
      return {
        ...state,
        [makeHash(action.searchQuery, 'podcast_best_match')]: {
          ...(state[makeHash(action.searchQuery, 'podcast_best_match')] || {}),
          [0]: action.podcastIds.map((id) =>
            makeHash(action.searchQuery, 'podcast_best_match', id),
          ),
        },
      }

    default:
      return state
  }
}

const receivedAll: Reducer<
  Hash3<SearchQuery, SearchResultType, SearchSortBy>[],
  T.AppActions
> = (state = [], action) => {
  switch (action.type) {
    case T.SEARCH_RESULTS_LIST_RECEIVED_ALL:
      return [
        ...state,
        makeHash(action.searchQuery, action.resultType, action.sortBy),
      ]

    default:
      return state
  }
}

export default combineReducers({
  query,
  resultType,
  sortBy,
  resultsList,
  receivedAll,
})
