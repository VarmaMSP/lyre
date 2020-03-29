import Img from 'components/common/img'
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
      <div>
        {podcasts.map((p, i) => (
          <PodcastLink key={p.id} podcastUrlParam={p.urlParam}>
            <a className="block py-4 md:px-2 my-4 md:hover:bg-gray-100 rounded-lg">
              <div className="flex">
                <div className="relative md:w-28 md:h-28 w-20 h-20 md:mr-4 mr-3 flex-none">
                  <Img src={getImageUrl(p.urlParam)} />
                  <div
                    className="absolute w-8 bottom-0 left-0 text-xs font-bold text-center text-gray-100 tracking-wide leading-relaxed rounded-bl-lg border-b border-l "
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  >
                    {i + 1}
                  </div>
                </div>

                <div>
                  <div className="md:mb-0 mb-1 md:text-base text-sm font-medium tracking-wide line-clamp-1">
                    {p.title}
                  </div>
                  <div className="hidden md:text-sm text-xs text-grey-800 mb-2 tracking-wide md:leading-normal leading-relaxed md:line-clamp-1">
                    {p.author}
                  </div>
                  <div
                    className="md:break-normal break-all md:text-xs text-2xs md:text-gray-700 text-gray-800 tracking-wide leading-snug md:line-clamp-2 line-clamp-3"
                    style={{ hyphens: 'auto' }}
                  >
                    {p.summary}
                  </div>
                </div>
              </div>
            </a>
          </PodcastLink>
        ))}
      </div>
    </div>
  )
}

export default ChartView
