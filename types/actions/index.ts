import { CategoryActionTypes } from './entities/category'
import { CurationActionTypes } from './entities/curation'
import { EpisodeActionTypes } from './entities/episode'
import { PlaylistActionTypes } from './entities/playlist'
import { PodcastActionTypes } from './entities/podcast'
import { SearchResultActionTypes } from './entities/search_result'
import { UserActionTypes } from './entities/user'
import { HistoryActionTypes } from './history'
import { RequestActionTypes } from './request'
import { SessionActionTypes } from './session'
import { AudioPlayerActionTypes } from './ui/audio_player'
import { GlobalSearchResultsActionTypes } from './ui/global_search_results'
import { HistoryFeedActionTypes } from './ui/history_feed'
import { HomeActionTypes } from './ui/home'
import { ModalManagerActionTypes } from './ui/modal_manager'
import { PodcastEpisodesListActionTypes } from './ui/podcast_episodes_list'
import { PopupManagerActionTypes } from './ui/popup_manager'
import { SearchBarActionTypes } from './ui/search_bar'
import { SubscriptionsFeedActionTypes } from './ui/subscriptions_feed'
import { WindowActionTypes } from './window'

interface ContinueAction {
  type: 'CONTINUE'
}

export type AppActions =
  | UserActionTypes
  | PodcastActionTypes
  | EpisodeActionTypes
  | PlaylistActionTypes
  | SessionActionTypes
  | CurationActionTypes
  | AudioPlayerActionTypes
  | GlobalSearchResultsActionTypes
  | HistoryFeedActionTypes
  | SubscriptionsFeedActionTypes
  | ModalManagerActionTypes
  | PodcastEpisodesListActionTypes
  | SearchResultActionTypes
  | SearchBarActionTypes
  | HistoryActionTypes
  | WindowActionTypes
  | RequestActionTypes
  | CategoryActionTypes
  | ContinueAction
  | HomeActionTypes
  | PopupManagerActionTypes

export * from './entities/category'
export * from './entities/curation'
export * from './entities/episode'
export * from './entities/feed'
export * from './entities/playlist'
export * from './entities/podcast'
export * from './entities/search_result'
export * from './entities/user'
export * from './history'
export * from './request'
export * from './session'
export * from './ui/audio_player'
export * from './ui/global_search_results'
export * from './ui/history_feed'
export * from './ui/home'
export * from './ui/modal_manager'
export * from './ui/podcast_episodes_list'
export * from './ui/popup_manager'
export * from './ui/search_bar'
export * from './ui/subscriptions_feed'
export * from './window'
