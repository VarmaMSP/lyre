import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getEpisodeById } from 'selectors/entities/episodes'
import { getPodcastById } from 'selectors/entities/podcasts'
import { getActiveEpisodeActions } from 'selectors/ui/popup_manger'
import { AppState } from 'store'
import * as T from 'types/actions'
import EpisodePreview, {
  DispatchToProps,
  OwnProps,
  StateToProps,
} from './episode_preview'

function mapStateToProps(
  state: AppState,
  { episodeId }: OwnProps,
): StateToProps {
  const episode = getEpisodeById(state, episodeId)
  const podcast = getPodcastById(state, episode.podcastId)

  return {
    episode,
    podcast,
    activeActionsPopup: getActiveEpisodeActions(state),
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<T.AppActions>,
  { episodeId }: OwnProps,
): DispatchToProps {
  return {
    showActionsPopup: () =>
      dispatch({
        type: T.POPUP_MANAGER_SHOW_EPISODE_ACTIONS,
        episodeId,
      }),
    closeAllPopups: () =>
      dispatch({
        type: T.POPUP_MANAGER_CLOSE_ALL,
      }),
  }
}

export default connect<StateToProps, DispatchToProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(EpisodePreview)
