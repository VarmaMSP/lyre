import hashSum from 'hash-sum'
import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const byHashId: Reducer<
  { [hashId: string]: PodcastSearchResult | EpisodeSearchResult },
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    case T.SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS: {
      const k = hashSum([action.params, action.resultType])

      return action.results.reduce<{
        [hashId: string]: PodcastSearchResult | EpisodeSearchResult
      }>((acc, r) => ({ ...acc, [hashSum(['g', k, r.id])]: r }), state)
    }

    default:
      return state
  }
}

export default combineReducers({
  byHashId,
})
