import { AppState } from 'store'

export function getActiveEpisodeActions(state: AppState) {
  return state.ui.popupManager.activeEpisodeActions
}
