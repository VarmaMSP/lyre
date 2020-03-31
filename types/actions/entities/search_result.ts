import { EpisodeSearchResult, PodcastSearchResult } from 'models'
import { GlobalSearchParams } from 'types/ui/search'

export const SEARCH_RESULT_ADD_PODCAST = 'search_result/add_podcast'
export const SEARCH_RESULT_ADD_EPISODE = 'search_result/add_epiosde'

export const SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS =
  'search_result/add_global_search_results'

interface AddPodcastAction {
  type: typeof SEARCH_RESULT_ADD_PODCAST
  searchQuery: string
  podcastSearchResults: PodcastSearchResult[]
}

interface AddEpisodeAction {
  type: typeof SEARCH_RESULT_ADD_EPISODE
  searchQuery: string
  episodeSearchResults: EpisodeSearchResult[]
}

interface AddGlobalSearchResult {
  type: typeof SEARCH_RESULT_ADD_GLOBAL_SEARCH_RESULTS
  params: GlobalSearchParams
  results: (PodcastSearchResult | EpisodeSearchResult)[]
}

export type SearchResultActionTypes =
  | AddPodcastAction
  | AddEpisodeAction
  | AddGlobalSearchResult
