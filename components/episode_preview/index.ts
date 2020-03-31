import { connect } from 'react-redux'
import { getEpisodeById } from 'selectors/entities/episodes'
import { getPodcastById } from 'selectors/entities/podcasts'
import { AppState } from 'store'
import EpisodePreview, { OwnProps, StateToProps } from './episode_preview'

function mapStateToProps(
  state: AppState,
  { episodeId }: OwnProps,
): StateToProps {
  const episode = getEpisodeById(state, episodeId)
  const podcast = getPodcastById(state, episode.podcastId)

  return {
    episode,
    podcast,
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  EpisodePreview,
)
