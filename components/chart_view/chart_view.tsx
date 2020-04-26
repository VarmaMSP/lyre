import Img from 'components/common/img'
import Grid from 'components/grid'
import { PodcastLink } from 'components/link'
import { Category, Podcast } from 'models'
import React from 'react'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  podcasts: Podcast[]
}

export interface OwnProps {
  category: Category
}

const ChartView: React.FC<StateToProps & OwnProps> = ({
  category,
  podcasts,
}) => {
  return (
    <div>
      <h1 className="pt-3 pb-1 text-xl tracking-wide text-gray-800 font-medium">
        {category.name}
      </h1>
      <hr className="mb-3" />
      <Grid cols={{ LG: 5, MD: 4, SM: 3 }}>
        {podcasts.map((p) => (
          <div
            key={p.id}
            className="p-2 mb-4 md:hover:bg-gray-150 text-gray-900 hover:text-gray-700"
          >
            <PodcastLink key={p.id} podcastUrlParam={p.urlParam}>
              <a>
                <Img src={getImageUrl(p.urlParam)} />
              </a>
            </PodcastLink>
            <PodcastLink key={p.id} podcastUrlParam={p.urlParam}>
              <a className="line-clamp-2 mt-2 text-xs">{p.title}</a>
            </PodcastLink>
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default ChartView
