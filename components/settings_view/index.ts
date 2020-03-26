import { signOutUser } from 'actions/user'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getUserById } from 'selectors/entities/users'
import { getSignedInUserId } from 'selectors/session'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import SettingsView, { DispatchToProps, StateToProps } from './settings_view'

function mapStateToProps(state: AppState): StateToProps {
  return {
    user: getUserById(state, getSignedInUserId(state)),
  }
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    signOutUser: bindActionCreators(signOutUser, dispatch),
  }
}

export default connect<StateToProps, DispatchToProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsView)
