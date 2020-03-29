import { Category } from 'models'
import { combineReducers, Reducer } from 'redux'
import * as T from 'types/actions'

const merge = (c1: Category, c2: Category): Category => ({
  id: c2.id,
  urlParam: c2.urlParam,
  name: c2.name,
  parentId: c2.parentId || c1.parentId,
  podcastIds: c2.podcastIds.length > 0 ? c2.podcastIds : c1.podcastIds || [],
})

const byId: Reducer<{ [categoryId: string]: Category }, T.AppActions> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case T.CATEGORY_ADD:
      return action.categories.reduce<{ [categoryId: string]: Category }>(
        (acc, c) => ({ ...acc, [c.id]: merge(acc[c.id] || {}, c) }),
        state,
      )

    case T.CATEGORY_ADD_PODCASTS:
      return {
        ...state,
        [action.categoryId]: {
          ...(state[action.categoryId] || {}),
          podcastIds: action.podcastIds,
        },
      }

    default:
      return state
  }
}

const byParentId: Reducer<{ [categoryId: string]: string[] }, T.AppActions> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case T.CATEGORY_ADD:
      return action.categories
        .filter((c) => !!c.parentId)
        .reduce<{ [categoryId: string]: string[] }>(
          (acc, c) => ({
            ...acc,
            [c.parentId!]: [...(acc[c.parentId!] || []), c.id],
          }),
          state,
        )

    default:
      return state
  }
}

export default combineReducers({
  byId,
  byParentId,
})
