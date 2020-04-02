import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { makeGetPlaylistsByUser } from 'selectors/entities/playlists'
import { getSignedInUserId } from 'selectors/session'
import { AppState } from 'store'
import * as T from 'types/actions'
import AddToPlaylistModal, {
  DispatchToProps,
  OwnProps,
  StateToProps,
} from './add_to_playlist_modal'

function makeMapStateToProps() {
  const getPlaylistsByUser = makeGetPlaylistsByUser()

  return (state: AppState): StateToProps => ({
    playlists: getPlaylistsByUser(state, getSignedInUserId(state)),
  })
}

function mapDispatchToProps(
  dispatch: Dispatch<T.AppActions>,
  { episodeId }: OwnProps,
): DispatchToProps {
  return {
    showCreatePlaylistModal: () =>
      dispatch({
        type: T.MODAL_MANAGER_SHOW_CREATE_PLAYLIST_MODAL,
        episodeId,
      }),
    closeAllPopups: () =>
      dispatch({
        type: T.POPUP_MANAGER_CLOSE_ALL,
      }),
  }
}

export default connect<StateToProps, DispatchToProps, OwnProps, AppState>(
  makeMapStateToProps(),
  mapDispatchToProps,
)(AddToPlaylistModal)
