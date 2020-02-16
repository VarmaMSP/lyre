import { getHistoryPageData } from 'actions/history'
import HistoryFeed from 'components/history_feed'
import { iconMap } from 'components/icon'
import PageLayout from 'components/page_layout'
import { HistoryPageSeo } from 'components/seo'
import SignInButton from 'components/sign_in_button'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getHistoryPageStatus } from 'selectors/request'
import { getIsUserSignedIn } from 'selectors/session'
import { AppState } from 'store'
import { AppActions } from 'types/actions'
import { PageContext } from 'types/utilities'

interface StateToProps {
  isUserSignedIn: boolean
  isLoading: boolean
}

interface DispatchToProps {
  loadPageData: () => void
}

interface OwnProps {
  scrollY: number
}

interface Props extends StateToProps, DispatchToProps, OwnProps {}

class FeedPage extends React.Component<Props> {
  static async getInitialProps(ctx: PageContext): Promise<void> {
    const { store } = ctx

    if (getIsUserSignedIn(store.getState())) {
      await bindActionCreators(getHistoryPageData, store.dispatch)()
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { isUserSignedIn } = this.props
    if (isUserSignedIn && !prevProps.isUserSignedIn) {
      this.props.loadPageData()
    }
  }

  componentDidMount() {
    window.window.scrollTo(0, this.props.scrollY)
  }

  render() {
    const { isUserSignedIn, isLoading } = this.props

    if (!isUserSignedIn || isLoading) {
      const HistoryIcon = iconMap['history']
      return (
        <PageLayout>
          <div className="mx-auto mt-32">
            <HistoryIcon className="w-12 h-12 mx-auto fill-current text-gray-700" />
            <h1 className="text-center text-xl text-gray-700 my-6">
              {'Sign in to keep track of what you listen'}
            </h1>
            <div className="h-10 w-48 mx-auto">
              <SignInButton />
            </div>
          </div>
        </PageLayout>
      )
    }

    return (
      <>
        <HistoryPageSeo />
        <PageLayout>
          <HistoryFeed />
          <div />
        </PageLayout>
      </>
    )
  }
}

function mapStateToProps(state: AppState): StateToProps {
  return {
    isUserSignedIn: getIsUserSignedIn(state),
    isLoading: getHistoryPageStatus(state) === 'IN_PROGRESS',
  }
}

function mapDispatchToProps(dispatch: Dispatch<AppActions>): DispatchToProps {
  return {
    loadPageData: bindActionCreators(getHistoryPageData, dispatch),
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(FeedPage)
