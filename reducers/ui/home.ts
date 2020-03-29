import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const curationIds: Reducer<string[], T.AppActions> = (state = [], action) => {
  switch (action.type) {
    case T.HOME_LOAD_PAGE:
      return action.curationIds

    default:
      return state
  }
}

export default combineReducers({
  curationIds,
})
