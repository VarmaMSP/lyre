import { getResultsPageData } from 'actions/results'
import PageLayout from 'components/page_layout'
import SearchResultsFilter from 'components/search_results_filter'
import SearchResultsList from 'components/search_results_list'
import { ResultsPageSeo } from 'components/seo'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { SearchResultType, SearchSortBy } from 'types/search'
import {
  GlobalSearchParams,
  SearchFilterSortBy,
  SearchFilterType,
} from 'types/ui/search'
import { PageContext } from 'types/utilities'
import * as gtag from 'utils/gtag'

interface OwnProps {
  query: string
  sortBy?: SearchFilterSortBy
  type?: SearchFilterType
  scrollY: number
}

export default class ResultsPage extends Component<OwnProps> {
  static async getInitialProps(ctx: PageContext): Promise<void> {
    const { store, query } = ctx

    await bindActionCreators(getResultsPageData, store.dispatch)(
      query['query'] as string,
      query['type'] as SearchResultType,
      query['sortBy'] as SearchSortBy,
    )
  }

  componentDidUpdate(prevProps: OwnProps) {
    const { scrollY } = this.props
    if (scrollY !== prevProps.scrollY) {
      window.window.scrollTo(0, this.props.scrollY)
    }
  }

  componentDidMount() {
    gtag.search(this.props.query)
    window.window.scrollTo(0, this.props.scrollY)
  }

  render() {
    const searchParams: GlobalSearchParams = {
      query: this.props.query,
      type: this.props.type || 'episode',
      sortBy: this.props.sortBy || 'relevance',
    }

    return (
      <>
        <ResultsPageSeo query={this.props.query} />
        <PageLayout>
          <div className="pt-4">
            <SearchResultsFilter searchParams={searchParams} />
            <SearchResultsList />
          </div>
          <div />
        </PageLayout>
      </>
    )
  }
}
