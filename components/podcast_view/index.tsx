import NavTabs from 'components/nav_tabs'
import { Podcast } from 'models'
import React from 'react'
import PodcastHeader from './components/podcast_header/podcast_header'
import HomeTab from './tabs/home'
import SearchTab from './tabs/search'

interface OwnProps {
  podcast: Podcast
  activeTab?: string
  query?: string
}

const PodcastView: React.FC<OwnProps> = ({ podcast, activeTab, query }) => {
  return (
    <div className="pt-6">
      <PodcastHeader podcast={podcast} />
      <div className="mt-6 mb-4">
        <NavTabs
          tabs={[
            {
              name: 'podcast',
              pathname: '/podcasts',
              query: { podcastUrlParam: podcast.urlParam, skipLoad: true },
              as: `/podcasts/${podcast.urlParam}`,
            },
            {
              name: 'search',
              pathname: '/podcasts',
              query: { podcastUrlParam: podcast.urlParam, activeTab: 'search' },
              as: `/podcasts/${podcast.urlParam}/search`,
            },
          ]}
          active={activeTab}
          defaultTab="podcast"
        />
      </div>
      {activeTab === undefined && <HomeTab podcast={podcast} />}
      {activeTab === 'search' && <SearchTab query={query} />}
    </div>
  )
}

export default PodcastView
