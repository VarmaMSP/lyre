export interface SearchInput {
  query: SearchQuery
  resultType: SearchResultType
  sortBy: SearchSortBy
}

export type SearchQuery = string

export type SearchResultType = 'episode' | 'podcast'

export type SearchSortBy = 'relevance' | 'publish_date'
