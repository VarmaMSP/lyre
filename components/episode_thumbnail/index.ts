import { startPlayback } from 'actions/playback'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getPodcastById } from 'selectors/entities/podcasts'
import { AppState } from 'store'
import * as T from 'types/actions'
import EpisodeThumbnail, {
  DispatchToProps,
  OwnProps,
  StateToProps,
} from './episode_thumbnail'

function mapStateToProps(state: AppState, { episode }: OwnProps): StateToProps {
  return { podcast: getPodcastById(state, episode.podcastId) }
}

function mapDispatchToProps(
  dispatch: Dispatch<T.AppActions>,
  { episode }: OwnProps,
): DispatchToProps {
  return {
    playEpisode: (beginAt: number) =>
      bindActionCreators(startPlayback, dispatch)(episode.id, beginAt),
  }
}

export default connect<StateToProps, DispatchToProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(EpisodeThumbnail)
