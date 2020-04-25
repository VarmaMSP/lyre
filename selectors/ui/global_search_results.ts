import hashSum from 'hash-sum'
import { createSelector } from 'reselect'
import { AppState } from 'store'
import { GlobalSearchParams, PodcastSearchParams } from 'types/ui/search'

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

export function makeGetEpisodeHashIds_() {
  return createSelector<
    AppState,
    PodcastSearchParams,
    { [page: string]: string[] },
    string[]
  >(
    (state, params) =>
      state.ui.globalSearchResults.results[hashSum(params)] || {},
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

export function getReceivedAll_(state: AppState, params: PodcastSearchParams) {
  const k = hashSum(params)
  return state.ui.globalSearchResults.receivedAll.some((x) => x === k)
}
