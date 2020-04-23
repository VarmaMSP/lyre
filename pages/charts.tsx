import { getChartPageData } from 'actions/chart'
import { getHomePageData } from 'actions/home'
import CategoryList from 'components/category_list'
import ChartView from 'components/chart_view'
import PageLayout from 'components/page_layout'
import { ChartPageSeo } from 'components/seo'
import { Category } from 'models'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCategoryById } from 'selectors/entities/categories'
import { AppState } from 'store'
import { PageContext } from 'types/utilities'
import { getIdFromUrlParam } from 'utils/format'

interface StateToProps {
  category: Category
}

interface OwnProps {
  chartUrlParam: string
  scrollY: number
}

class ChartPage extends Component<StateToProps & OwnProps> {
  static async getInitialProps({ query, store }: PageContext): Promise<void> {
    await bindActionCreators(getHomePageData, store.dispatch)()
    await bindActionCreators(
      getChartPageData,
      store.dispatch,
    )(query['chartUrlParam'] as string)
  }

  componentDidMount() {
    window.window.scrollTo(0, this.props.scrollY)
  }

  render() {
    const { category, chartUrlParam } = this.props

    return (
      <>
        <ChartPageSeo category={category} />
        <PageLayout>
          <ChartView category={category} />
          <div className="pt-8">
            <CategoryList activeCategoryId={getIdFromUrlParam(chartUrlParam)} />
          </div>
        </PageLayout>
      </>
    )
  }
}

function mapStateToProps(
  state: AppState,
  { chartUrlParam }: OwnProps,
): StateToProps {
  return { category: getCategoryById(state, getIdFromUrlParam(chartUrlParam)) }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  ChartPage,
)
