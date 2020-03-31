import hashSum from 'hash-sum'
import { createSelector } from 'reselect'
import { AppState } from 'store'
import { GlobalSearchParams } from 'types/ui/search'

export function makeGetPodcastHashIds() {
  return createSelector<
    AppState,
    GlobalSearchParams,
    { [page: string]: string[] },
    string[]
  >(
    (state, params) =>
      state.ui.globalSearchResults.results[hashSum([params, 'podcast'])] || {},
    (all) =>
      Object.keys(all).reduce<string[]>(
        (acc, k) => [...acc, ...(all[k] || [])],
        [],
      ),
  )
}

export function makeGetEpisodeHashIds() {
  return createSelector<
    AppState,
    GlobalSearchParams,
    { [page: string]: string[] },
    string[]
  >(
    (state, params) =>
      state.ui.globalSearchResults.results[hashSum([params, 'episode'])] || {},
    (all) =>
      Object.keys(all).reduce<string[]>(
        (acc, k) => [...acc, ...(all[k] || [])],
        [],
      ),
  )
}

export function getReceivedAll(state: AppState, params: GlobalSearchParams) {
  const k = hashSum(params)
  return state.ui.globalSearchResults.receivedAll.some((x) => x === k)
}
