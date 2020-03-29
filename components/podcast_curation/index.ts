import { connect } from 'react-redux'
import { getPodcastsByIds } from 'selectors/entities/podcasts'
import { AppState } from 'store'
import PodcastCuration, { OwnProps, StateToProps } from './podcast_curation'

function mapStateToProps(
  state: AppState,
  { curation }: OwnProps,
): StateToProps {
  return {
    title: curation.title,
    podcasts: getPodcastsByIds(state, curation.podcastIds),
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  PodcastCuration,
)
