import PageLayout from 'components/page_layout'
import { SettingsPageSeo } from 'components/seo'
import SettingsView from 'components/settings_view'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getIsUserSignedIn } from 'selectors/session'
import { AppState } from 'store'

interface StateToProps {
  isUserSignedIn: boolean
}

class SettingsPage extends Component<StateToProps> {
  render() {
    const { isUserSignedIn } = this.props

    if (!isUserSignedIn) {
      return (
        <PageLayout>
          <div>{'Please Sign In'}</div>
        </PageLayout>
      )
    }

    return (
      <>
        <SettingsPageSeo />
        <PageLayout>
          <SettingsView />
          <div />
        </PageLayout>
      </>
    )
  }
}

function mapStateToProps(state: AppState): StateToProps {
  return {
    isUserSignedIn: getIsUserSignedIn(state),
  }
}

export default connect<StateToProps, {}, {}, AppState>(mapStateToProps)(
  SettingsPage,
)
