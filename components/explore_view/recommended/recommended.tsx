import Img from 'components/common/img'
import Grid from 'components/grid'
import { PodcastLink } from 'components/link'
import { Podcast } from 'models'
import React from 'react'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  podcasts: Podcast[]
}

const Recommended: React.FC<StateToProps> = ({ podcasts }) => {
  return (
    <div className="mb-6">
      <h1 className="pt-3 pb-1 text-xl tracking-wide font-semibold">
        {'Recommended'}
      </h1>
      <hr className="mb-3" />
      <Grid cols={{ SM: 4, MD: 6, LG: 10 }}>
        {podcasts.map((p) => (
          <div key={p.id} className="flex-none px-1 mb-4">
            <PodcastLink podcastUrlParam={p.urlParam}>
              <a className="block flex-none mb-2">
                <Img src={getImageUrl(p.urlParam)} />
              </a>
            </PodcastLink>
            <PodcastLink podcastUrlParam={p.urlParam}>
              <a className="text-2xs text-gray-900 tracking-wide font-medium leading-snug line-clamp-2">
                {p.title}
              </a>
            </PodcastLink>
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default Recommended
