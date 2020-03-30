import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const byPodcastHashId: Reducer<
  { [hashId: string]: PodcastSearchResult },
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const byEpisodeHashId: Reducer<
  { [hashId: string]: EpisodeSearchResult },
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  byPodcastHashId,
  byEpisodeHashId,
})
