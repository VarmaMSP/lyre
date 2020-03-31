import { GlobalSearchParams, SearchResultType } from 'types/ui/search'

export const GLOBAL_SEARCH_RESULTS_PARAMS = 'gloabal_search_results/query'
export const GLOBAL_SEARCH_RESULTS_LOAD = 'global_search_results/load'
export const GLOBAL_SEARCH_RESULTS_RECEIVED_ALL =
  'global_search_results/received_all'

interface ParamsAction {
  type: typeof GLOBAL_SEARCH_RESULTS_PARAMS
  params: GlobalSearchParams
}

interface LoadAction {
  type: typeof GLOBAL_SEARCH_RESULTS_LOAD
  params: GlobalSearchParams
  resultType: SearchResultType
  page: number
  resultIds: string[]
}

interface ReceivedAllAction {
  type: typeof GLOBAL_SEARCH_RESULTS_RECEIVED_ALL
  params: GlobalSearchParams
}

export type GlobalSearchResultsActionTypes =
  | ParamsAction
  | LoadAction
  | ReceivedAllAction
