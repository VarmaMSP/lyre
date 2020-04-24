import { getEpisodePlaybacks } from 'actions/playback'
import { getResults } from 'actions/results'
import { Episode, Podcast } from 'models'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getByHashIds } from 'selectors/entities/search_results'
import { getResultsStatus } from 'selectors/request'
import { getIsUserSignedIn } from 'selectors/session'
import {
  getReceivedAll,
  makeGetEpisodeHashIds,
  makeGetPodcastHashIds,
} from 'selectors/ui/global_search_results'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import SearchResultsList, {
  DispatchToProps,
  OwnProps,
  StateToProps,
} from './search_results_list'

function makeMapStateToProps() {
  const getPodcastHashIds = makeGetPodcastHashIds()
  const getEpisodeHashIds = makeGetEpisodeHashIds()

  return (state: AppState, { searchParams }: OwnProps): StateToProps => {
    return {
      isUserSignedIn: getIsUserSignedIn(state),
      podcastSearchResults: getByHashIds(
        state,
        getPodcastHashIds(state, searchParams),
      ) as Podcast[],
      episodeSearchResults: getByHashIds(
        state,
        getEpisodeHashIds(state, searchParams),
      ) as Episode[],
      receivedAll: getReceivedAll(state, searchParams),
      isLoadingMore: getResultsStatus(state) === 'IN_PROGRESS',
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    loadMore: bindActionCreators(getResults, dispatch),
    loadPlaybacks: bindActionCreators(getEpisodePlaybacks, dispatch),
  }
}

export default connect<StateToProps, DispatchToProps, OwnProps, AppState>(
  makeMapStateToProps(),
  mapDispatchToProps,
)(SearchResultsList)
