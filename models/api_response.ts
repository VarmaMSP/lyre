import { Category } from './category'
import { Episode } from './episode'
import { Playback } from './playback'
import { Playlist } from './playlist'
import { Podcast } from './podcast'
import { SearchSuggestion } from './search_suggestions'
import { User } from './user'

export class GlobalSearchResults {
  podcasts: Podcast[]
  episodes: Episode[]

  constructor(j: any) {
    this.podcasts = (j['podcasts'] || []).map((o: any) => new Podcast(o))
    this.episodes = (j['episodes'] || []).map((o: any) => new Episode(o))
  }
}

export class ApiResponse {
  users: User[]
  podcasts: Podcast[]
  episodes: Episode[]
  playbacks: Playback[]
  playlists: Playlist[]
  searchSuggestions: SearchSuggestion[]
  categories: Category[]
  raw: any
  globalSearchResults: GlobalSearchResults

  constructor(j: any) {
    const data = (j['data'] || {}) as any

    this.users = (data['users'] || []).map((o: any) => new User(o))
    this.podcasts = (data['podcasts'] || []).map((o: any) => new Podcast(o))
    this.episodes = (data['episodes'] || []).map((o: any) => new Episode(o))
    this.playbacks = (data['playbacks'] || []).map((o: any) => new Playback(o))
    this.playlists = (data['playlists'] || []).map((o: any) => new Playlist(o))
    this.searchSuggestions = (data['search_suggestions'] || []).map(
      (o: any) => new SearchSuggestion(o),
    )
    this.globalSearchResults = new GlobalSearchResults(
      data['global_search_results'] || {},
    )
    this.categories = (data['categories'] || []).map(
      (o: any) => new Category(o),
    )
    this.raw = j['raw'] || {}
  }
}
