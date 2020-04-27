import { connect } from 'react-redux'
import { getCategoriesByIds } from 'selectors/entities/categories'
import { AppState } from 'store'
import PodcastCategories, { OwnProps, StateToProps } from './podcast_categories'

function mapStateToProps(state: AppState, { podcast }: OwnProps): StateToProps {
  return {
    categories: getCategoriesByIds(
      state,
      podcast.categories.map((x) => x.categoryId),
    ),
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  PodcastCategories,
)
