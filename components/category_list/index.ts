import { connect } from 'react-redux'
import {
  makeGetPrimaryCategories,
  makeGetSubCategories,
} from 'selectors/entities/categories'
import { AppState } from 'store'
import CategoryList, { OwnProps, StateToProps } from './category_list'

function mapStateToProps() {
  const getPrimaryCategories = makeGetPrimaryCategories()
  const getSubCategories = makeGetSubCategories()

  return (state: AppState, { activeCategoryId }: OwnProps): StateToProps => {
    return {
      categories: getPrimaryCategories(state),
      subCategories: getSubCategories(state, activeCategoryId),
    }
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  CategoryList,
)
