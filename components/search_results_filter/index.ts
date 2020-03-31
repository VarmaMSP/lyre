import { loadResultsPage } from 'actions/results'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from 'store'
import * as T from 'types/actions'
import SearchResultsFilter, {
  DispatchToProps,
  OwnProps,
} from './search_results_filter'

function mapDispatchToProps(dispatch: Dispatch<T.AppActions>): DispatchToProps {
  return {
    loadResultsPage: bindActionCreators(loadResultsPage, dispatch),
  }
}

export default connect<{}, DispatchToProps, OwnProps, AppState>(
  null,
  mapDispatchToProps,
)(SearchResultsFilter)
