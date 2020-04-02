import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const activeEpisodeActions: Reducer<string, T.AppActions> = (
  state = 'NONE',
  action,
) => {
  switch (action.type) {
    case T.POPUP_MANAGER_SHOW_EPISODE_ACTIONS:
      return action.episodeId

    case T.POPUP_MANAGER_CLOSE_ALL:
      return 'NONE'

    default:
      return state
  }
}

export default combineReducers({
  activeEpisodeActions,
})
