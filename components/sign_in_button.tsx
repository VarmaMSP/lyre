import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'store'
import { AppActions, MODAL_MANAGER_SHOW_SIGN_IN_MODAL } from 'types/actions'

interface DispatchToProps {
  showSignInModal: () => void
}

interface OwnProps {
  small?: boolean
}

const ButtonSignin: React.SFC<DispatchToProps & OwnProps> = ({
  showSignInModal,
  small,
}) => {
  return (
    <button
      className={classnames(
        'w-full h-full text-teal-800 tracking-wider bg-teal-300 leading-sung rounded-lg',
        'tracking-wide focus:outline-none focus:shadow-outline',
      )}
      onClick={showSignInModal}
    >
      {small ? (
        <p className="text-sm font-bold">{'SIGN IN'}</p>
      ) : (
        <div className="text-sm font-bold">
          <span>{'SIGN IN'}</span>
        </div>
      )}
    </button>
  )
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    showSignInModal: () => dispatch({ type: MODAL_MANAGER_SHOW_SIGN_IN_MODAL }),
  }
}

export default connect<{}, DispatchToProps, {}, AppState>(
  null,
  mapDispatchToProps,
)(ButtonSignin)
