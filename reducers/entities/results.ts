import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const byHashId: Reducer<
  { [hashId: string]: PodcastSearchResult | EpisodeSearchResult },
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  byHashId,
})
