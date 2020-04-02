import { loadAndShowAddToPlaylistModal } from 'actions/playlist'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'store'
import * as T from 'types/actions'
import EpisodeHeader, { DispatchToProps, OwnProps } from './episode_actions'

function mapDispatchToProps(
  dispatch: Dispatch<T.AppActions>,
  { episodeId }: OwnProps,
): DispatchToProps {
  return {
    showAddToPlaylistModal: () =>
      bindActionCreators(loadAndShowAddToPlaylistModal, dispatch)(episodeId),
    closeAllPopups: () =>
      dispatch({
        type: T.POPUP_MANAGER_CLOSE_ALL,
      }),
  }
}

export default connect<{}, DispatchToProps, OwnProps, AppState>(
  null,
  mapDispatchToProps,
)(EpisodeHeader)
