import Img from 'components/common/img'
import Grid from 'components/grid'
import { PodcastLink } from 'components/link'
import { Curation, Podcast } from 'models'
import React from 'react'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  title: string
  podcasts: Podcast[]
}

export interface OwnProps {
  curation: Curation
}

const PodcastGrid: React.FC<StateToProps & OwnProps> = ({
  title,
  podcasts,
}) => {
  return (
    <div>
      <h4 className="pt-3 pb-2 text-xl tracking-wide font-semibold">{title}</h4>
      <hr className="mb-3" />

      <Grid cols={{ SM: 4, MD: 4, LG: 8 }}>
        {podcasts.map((p) => (
          <div
            key={p.id}
            className="flex-none py-2 px-1 mb-4 hover:bg-gray-100 rounded-lg"
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

export default PodcastGrid
