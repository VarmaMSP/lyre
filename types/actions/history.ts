import { HistoryEntry } from 'types/browser'

export const HISTORY_PUSH_ENTRY = 'history/push_entry'
export const HISTORY_POP_ENTRY = 'history/pop_entry'
export const HISTORY_CLEAR_POPPED_ENTRY = 'history/clear_popped'

export interface PushAction {
  type: typeof HISTORY_PUSH_ENTRY
  entry: HistoryEntry
}

export interface PopAction {
  type: typeof HISTORY_POP_ENTRY
  entry: HistoryEntry
}

export interface ClearPoppedAction {
  type: typeof HISTORY_CLEAR_POPPED_ENTRY
}

export type HistoryActionTypes = PushAction | PopAction | ClearPoppedAction
