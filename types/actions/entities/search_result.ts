import { Episode, Podcast } from 'models'
import {
  GlobalSearchParams,
  PodcastSearchParams,
  SearchResultType,
} from 'types/ui/search'

export const SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS =
  'search_result/add_global_search_results'
export const SEARCH_RESULT_ADD_PODCAST_SEARCH_RESULTS =
  'search_result/add_podcast_search_results'

interface AddGlobalSearchResults {
  type: typeof SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS
  params: GlobalSearchParams
  resultType: SearchResultType
  results: (Podcast | Episode)[]
}

interface AddPodcastSearchResults {
  type: typeof SEARCH_RESULT_ADD_PODCAST_SEARCH_RESULTS
  params: PodcastSearchParams
  results: Episode[]
}

export type SearchResultActionTypes =
  | AddGlobalSearchResults
  | AddPodcastSearchResults
