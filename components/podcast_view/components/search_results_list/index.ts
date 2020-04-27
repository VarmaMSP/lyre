import { getEpisodePlaybacks } from 'actions/playback'
import { getPodcastSearchResults } from 'actions/podcast'
import { Episode } from 'models'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getByHashIds } from 'selectors/entities/search_results'
import { getPodcastSearchResultsStatus } from 'selectors/request'
import { getIsUserSignedIn } from 'selectors/session'
import {
  getReceivedAll_,
  makeGetEpisodeHashIds_,
} from 'selectors/ui/global_search_results'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import SearchResultsList, {
  DispatchToProps,
  OwnProps,
  StateToProps,
} from './search_results_list'

function makeMapStateToProps() {
  const getEpisodeHashIds = makeGetEpisodeHashIds_()

  return (state: AppState, { searchParams }: OwnProps): StateToProps => {
    return {
      isUserSignedIn: getIsUserSignedIn(state),
      episodes: getByHashIds(
        state,
        getEpisodeHashIds(state, searchParams),
      ) as Episode[],
      receivedAll: getReceivedAll_(state, searchParams),
      isLoadingMore:
        getPodcastSearchResultsStatus(state, searchParams.podcastId) ===
        'IN_PROGRESS',
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    loadPlaybacks: bindActionCreators(getEpisodePlaybacks, dispatch),
    loadMore: bindActionCreators(getPodcastSearchResults, dispatch),
  }
}

export default connect<StateToProps, DispatchToProps, OwnProps, AppState>(
  makeMapStateToProps(),
  mapDispatchToProps,
)(SearchResultsList)
