import { connect } from 'react-redux'
import { getPodcastById } from 'selectors/entities/podcasts'
import { AppState } from 'store'
import PodcastPreview, { OwnProps, StateToProps } from './podcast_preview'

function mapStateToProps(
  state: AppState,
  { podcastId }: OwnProps,
): StateToProps {
  return { podcast: getPodcastById(state, podcastId) }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  PodcastPreview,
)
