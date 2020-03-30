import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'
import { SearchQuery, SearchResultType, SearchSortBy } from 'types/ui/search'
import { $HashId, Hash1, Hash2, Hash3, Obj } from 'types/utilities'

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

const episodes: Reducer<
  Obj<
    Hash2<SearchQuery, SearchSortBy>,
    { [page: number]: $HashId<EpisodeSearchResult>[] }
  >,
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const podcasts: Reducer<
  Obj<
    Hash2<SearchQuery, SearchSortBy>,
    { [page: number]: $HashId<PodcastSearchResult>[] }
  >,
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const podcastsBestMatch: Reducer<
  Obj<Hash1<SearchQuery>, $HashId<PodcastSearchResult>[]>,
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const receivedAll: Reducer<
  Hash3<SearchQuery, SearchSortBy, SearchResultType>[],
  T.AppActions
> = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  query,
  resultType,
  sortBy,
  podcasts,
  podcastsBestMatch,
  episodes,
  receivedAll,
})
