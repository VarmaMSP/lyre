import { loadPodcastSearchPage } from 'actions/results'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import SearchBar, { DispatchToProps, OwnProps } from './search_bar'

function mapDispatchToProps(
  dispatch: Dispatch<AppActions>,
  { podcastUrlParam }: OwnProps,
): DispatchToProps {
  return {
    submitQuery: (q: string) =>
      bindActionCreators(loadPodcastSearchPage, dispatch)(podcastUrlParam, q),
  }
}

export default connect<{}, DispatchToProps, OwnProps, AppState>(
  null,
  mapDispatchToProps,
)(SearchBar)
