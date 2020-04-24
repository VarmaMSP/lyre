import { PodcastEpisodeListOrder } from 'types/ui'
import { PodcastSearchParams } from 'types/ui/search'

export const PODCAST_EPISODES_LIST_LOAD_PAGE = 'podcast_episodes_list/load_page'
export const PODCAST_EPISODES_LIST_RECEIVED_ALL =
  'podcast_episodes_list/received_all'

export const PODCAST_SEARCH_RESULTS_LOAD_PAGE =
  'podcast_search_results/load_page'
export const PODCAST_SEARCH_RESULTS_RECEIVED_ALL =
  'podcast_search_results/received_all'

interface LoadPageAction {
  type: typeof PODCAST_EPISODES_LIST_LOAD_PAGE
  podcastId: string
  episodeIds: string[]
  page: number
  order: PodcastEpisodeListOrder
}

interface ReceivedAllAction {
  type: typeof PODCAST_EPISODES_LIST_RECEIVED_ALL
  podcastId: string
  order: PodcastEpisodeListOrder
}

interface LoadPageAction_ {
  type: typeof PODCAST_SEARCH_RESULTS_LOAD_PAGE
  params: PodcastSearchParams
  page: number
  resultIds: string[]
}

interface ReceivedAllAction_ {
  type: typeof PODCAST_SEARCH_RESULTS_RECEIVED_ALL
  params: PodcastSearchParams
}

export type PodcastEpisodesListActionTypes =
  | LoadPageAction
  | ReceivedAllAction
  | LoadPageAction_
  | ReceivedAllAction_
