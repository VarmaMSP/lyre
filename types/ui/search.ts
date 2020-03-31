export interface GlobalSearchParams {
  query: string
  // publishDate: string
  type: SearchFilterType
  // duration: number
  sortBy: SearchFilterSortBy
}

export interface PodcastSearchParams {
  query: string
  podcastId: string
}

export type SearchQuery = string

export type SearchFilterType = 'episode' | 'podcast' | 'playlist'

export type SearchFilterSortBy = 'relevance' | 'publish_date'

export type SearchResultType =
  | 'episode'
  | 'podcast'
  | 'playlist'
  | 'search_suggestion'
