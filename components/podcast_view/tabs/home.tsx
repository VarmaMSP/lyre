import { Podcast } from 'models'
import React from 'react'
import CategoryList from '../components/category_list'
import EpisodeList from '../components/episode_list'
import EpisodeListHeader from '../components/episode_list_header/episode_list_header'

export interface OwnProps {
  podcast: Podcast
}

const PodcastTab: React.FC<OwnProps> = ({ podcast }) => {
  return (
    <div>
      <div className="mt-6 cursor-default" style={{ hyphens: 'auto' }}>
        <div className="text-gray-900 text-sm leading-relaxed">
          {podcast.description}
        </div>
        <div className="mt-6">
          <CategoryList
            categoryIds={podcast.categories.map((x) => x.categoryId)}
          />
        </div>
      </div>

      <hr className="mt-5 mb-5" />

      <div className="mb-4 px-1">
        <EpisodeListHeader podcastUrlParam={podcast.urlParam} />
      </div>

      <EpisodeList podcastId={podcast.id} />
    </div>
  )
}

export default PodcastTab
