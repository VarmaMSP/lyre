import { combineReducers } from 'redux'
import audioPlayer from './audio_player'
import globalSearchResults from './global_search_results'
import historyFeed from './history_feed'
import home from './home'
import modalManager from './modal_manager'
import podcastEpisodeList from './podcast_episode_list'
import searchBar from './search_bar'
import subscriptionsFeed from './subscriptions_feed'

export default combineReducers({
  audioPlayer,
  modalManager,
  historyFeed,
  subscriptionsFeed,
  podcastEpisodeList,
  searchBar,
  home,
  globalSearchResults,
})
