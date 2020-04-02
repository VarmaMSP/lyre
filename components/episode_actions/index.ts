import { loadAndShowAddToPlaylistModal } from 'actions/playlist'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import EpisodeHeader, { DispatchToProps, OwnProps } from './episode_actions'

function mapDispatchToProps(
  dispatch: Dispatch<AppActions>,
  { episodeId }: OwnProps,
): DispatchToProps {
  return {
    showAddToPlaylistModal: () =>
      bindActionCreators(loadAndShowAddToPlaylistModal, dispatch)(episodeId),
  }
}

export default connect<{}, DispatchToProps, OwnProps, AppState>(
  null,
  mapDispatchToProps,
)(EpisodeHeader)
