export const POPUP_MANAGER_SHOW_EPISODE_ACTIONS =
  'popup_manager/show_episode_actions'
export const POPUP_MANAGER_CLOSE_ALL = 'popup_manager/close_all'

interface ShowEpsiodeActionsAction {
  type: typeof POPUP_MANAGER_SHOW_EPISODE_ACTIONS
  episodeId: string
}

interface CloseAllAction {
  type: typeof POPUP_MANAGER_CLOSE_ALL
}

export type PopupManagerActionTypes = ShowEpsiodeActionsAction | CloseAllAction
