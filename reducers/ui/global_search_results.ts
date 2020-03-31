import hashSum from 'hash-sum'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'
import { GlobalSearchParams } from 'types/ui/search'

const params: Reducer<GlobalSearchParams, T.AppActions> = (
  state = {
    query: '',
    type: 'episode',
    sortBy: 'relevance',
  },
  action,
) => {
  switch (action.type) {
    case T.GLOBAL_SEARCH_RESULTS_PARAMS:
      return action.params

    default:
      return state
  }
}

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
      const k = hashSum([action.params, action.resultType])

      return {
        ...state,
        [k]: {
          ...(state[k] || {}),
          [action.page]: action.resultIds.map((id) => hashSum(['g', k, id])),
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

    default:
      return state
  }
}

export default combineReducers({
  params,
  results,
  receivedAll,
})
