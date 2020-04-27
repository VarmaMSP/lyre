import { getPodcastPageData, getPodcastSearchPageData } from 'actions/podcast'
import FeedDetails from 'components/feed_details'
import PageLayout from 'components/page_layout'
import PodcastCategories from 'components/podcast_categories'
import PodcastView from 'components/podcast_view'
import { PodcastPageSeo } from 'components/seo'
import { Podcast } from 'models'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPodcastById } from 'selectors/entities/podcasts'
import { AppState } from 'store'
import { PageContext } from 'types/utilities'
import { getIdFromUrlParam } from 'utils/utils'

interface StateToProps {
  podcast: Podcast
}

interface OwnProps {
  podcastUrlParam: string
  activeTab?: string
  query?: string
  scrollY: number
}

class PodcastPage extends Component<StateToProps & OwnProps> {
  static async getInitialProps({ query, store }: PageContext): Promise<void> {
    if (query['activeTab'] === undefined) {
      await bindActionCreators(
        getPodcastPageData,
        store.dispatch,
      )(query['podcastUrlParam'] as string)
    }

    if (query['activeTab'] === 'search' && query['query'] !== undefined) {
      await bindActionCreators(getPodcastSearchPageData, store.dispatch)(
        query['podcastUrlParam'] as string,
        query['query'] as string,
      )
    }
  }

  componentDidMount() {
    window.window.scrollTo(0, this.props.scrollY)
  }

  render() {
    const { podcast, activeTab, query } = this.props

    return (
      <>
        <PodcastPageSeo podcast={podcast} />
        <PageLayout>
          <PodcastView podcast={podcast} activeTab={activeTab} query={query} />
          <div>
            <FeedDetails podcast={podcast} />
            <PodcastCategories podcast={podcast} />
          </div>
        </PageLayout>
      </>
    )
  }
}

function mapStateToProps(
  state: AppState,
  { podcastUrlParam }: OwnProps,
): StateToProps {
  return {
    podcast: getPodcastById(state, getIdFromUrlParam(podcastUrlParam)),
  }
}

export default connect<StateToProps, {}, OwnProps, AppState>(mapStateToProps)(
  PodcastPage,
)
