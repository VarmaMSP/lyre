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

      <Grid cols={{ SM: 4, MD: 6, LG: 8 }}>
        {podcasts.map((p) => (
          <div
            key={p.id}
            className="flex-none px-2 py-2 mb-4 hover:bg-gray-100 rounded-lg"
          >
            <PodcastLink podcastUrlParam={p.urlParam}>
              <a className="block w-full h-full text-gray-900 hover:text-blue-700">
                <div className="mb-2">
                  <Img src={getImageUrl(p.urlParam)} />
                </div>
                <div className="text-2xs tracking-wide font-medium leading-snug line-clamp-2">
                  {p.title}
                </div>
              </a>
            </PodcastLink>
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default Recommended
