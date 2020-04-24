import hashSum from 'hash-sum'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const results: Reducer<
  {
    [hash: string]: {
      [page: string]: string[]
    }
  },
  T.AppActions
> = (state = {}, action) => {
  switch (action.type) {
    case T.GLOBAL_SEARCH_RESULTS_LOAD: {
      const k = hashSum([action.params, action.resultType]) // TODO: Move resultType into params

      return {
        ...state,
        [k]: {
          ...(state[k] || {}),
          [action.page]: action.resultIds.map((id) => hashSum(['g', k, id])),
        },
      }
    }

    case T.PODCAST_SEARCH_RESULTS_LOAD_PAGE: {
      const k = hashSum(action.params)
      return {
        ...state,
        [k]: {
          ...(state[k] || {}),
          [action.page]: action.resultIds.map((id) => hashSum([k, id])),
        },
      }
    }

    default:
      return state
  }
}

const receivedAll: Reducer<string[], T.AppActions> = (state = [], action) => {
  switch (action.type) {
    case T.GLOBAL_SEARCH_RESULTS_RECEIVED_ALL:
      return [...state, hashSum(action.params)]

    case T.PODCAST_SEARCH_RESULTS_RECEIVED_ALL:
      return [...state, hashSum(action.params)]

    default:
      return state
  }
}

export default combineReducers({
  results,
  receivedAll,
})
