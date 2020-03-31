export interface GlobalSearchParams {
  query: string
  resultType: SearchResultType
  sortBy: SearchSortBy
}

export interface PodcastSearchParams {
  query: string
  podcastId: string
}

export type SearchQuery = string

export type SearchResultType = 'episode' | 'podcast' | 'podcast_best_match'

export type SearchSortBy = 'relevance' | 'publish_date'
