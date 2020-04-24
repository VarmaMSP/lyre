import { Episode, Podcast } from 'models'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getPodcastById } from 'selectors/entities/podcasts'
import { getActiveEpisodeActions } from 'selectors/ui/popup_manger'
import { AppState } from 'store'
import * as T from 'types/actions'
import EpisodePreview from './episode_preview'

interface OwnProps {
  episode: Episode
  small?: boolean
  large?: boolean
  dense?: boolean
  t?: 'NORMAL' | 'HISTORY'
}

interface StateToProps {
  episodeId: string
  podcast: Podcast
  activeActionsPopup: string
}

interface DispatchToProps {
  showActionsPopup: () => void
  closeAllPopups: () => void
}

type Props = OwnProps & StateToProps & DispatchToProps

const EpisodePreviewHighlighted: React.FC<Props> = (props) => (
  <EpisodePreview {...props} />
)

function mapStateToProps(state: AppState, { episode }: OwnProps): StateToProps {
  const podcast = getPodcastById(state, episode.podcastId)

  return {
    episodeId: episode.id,
    podcast,
    activeActionsPopup: getActiveEpisodeActions(state),
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<T.AppActions>,
  { episode }: OwnProps,
): DispatchToProps {
  return {
    showActionsPopup: () =>
      dispatch({
        type: T.POPUP_MANAGER_SHOW_EPISODE_ACTIONS,
        episodeId: episode.id,
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
)(EpisodePreviewHighlighted)
