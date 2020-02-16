import { SearchSuggestion } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const text: Reducer<string, T.AppActions> = (state = '', action) => {
  switch (action.type) {
    case T.SEARCH_BAR_UPDATE_TEXT:
      return action.text

    default:
      return state
  }
}

const suggestions: Reducer<SearchSuggestion[], T.AppActions> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case T.SEARCH_BAR_UPDATE_SEARCH_SUGGESTIONS:
      return action.suggestions

    default:
      return state
  }
}

const cursor: Reducer<number, T.AppActions> = (state = 0, action) => {
  switch (action.type) {
    case T.SEARCH_BAR_SET_CURSOR:
      return action.cursor

    default:
      return state
  }
}

const showSuggestions: Reducer<boolean, T.AppActions> = (
  state = false,
  action,
) => {
  switch (action.type) {
    case T.SEARCH_BAR_SET_SHOW_SUGGESTIONS:
      return action.value

    default:
      return state
  }
}

const collapse: Reducer<boolean, T.AppActions> = (state = true, action) => {
  switch (action.type) {
    case T.SEARCH_BAR_EXPAND:
      return false

    case T.SEARCH_BAR_COLLAPSE:
      return true

    default:
      return state
  }
}

export default combineReducers({
  text,
  suggestions,
  cursor,
  showSuggestions,
  collapse,
})
