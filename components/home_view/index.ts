import { connect } from 'react-redux'
import { makeGetPrimaryCategories } from 'selectors/entities/categories'
import { getIsUserSignedIn } from 'selectors/session'
import { makeGetHomePageCurations } from 'selectors/ui/home'
import { AppState } from 'store'
import HomeView, { StateToProps } from './home_view'

function makeMapStateToProps() {
  const getHomePageCurations = makeGetHomePageCurations()
  const getPrimaryCategories = makeGetPrimaryCategories()

  return (state: AppState): StateToProps => {
    return {
      isUserSignedIn: getIsUserSignedIn(state),
      curations: getHomePageCurations(state),
      categories: getPrimaryCategories(state),
    }
  }
}

export default connect<StateToProps, {}, {}, AppState>(makeMapStateToProps())(
  HomeView,
)
