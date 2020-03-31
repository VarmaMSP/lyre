import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { GlobalSearchParams, SearchResultType } from 'types/ui/search'

export const SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS =
  'search_result/add_global_search_results'

interface AddGlobalSearchResult {
  type: typeof SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS
  params: GlobalSearchParams
  resultType: SearchResultType
  results: (PodcastSearchResult | EpisodeSearchResult)[]
}

export type SearchResultActionTypes = AddGlobalSearchResult
