import { ChartLink } from 'components/link'
import PodcastCuration from 'components/podcast_curation'
import { Category, Curation } from 'models'
import React from 'react'
import Intro from './intro'

export interface StateToProps {
  isUserSignedIn: boolean
  curations: Curation[]
  categories: Category[]
}

const HomeView: React.FC<StateToProps> = ({
  isUserSignedIn,
  curations,
  categories,
}) => {
  return (
    <div>
      {!isUserSignedIn && <Intro />}

      {curations.length > 0 && (
        <div className="mb-6">
          <PodcastCuration curation={curations[0]} />
        </div>
      )}

      <div className="flex flex-wrap mb-4">
        {categories.map((c) => (
          <ChartLink key={c.id} chartUrlParam={c.urlParam}>
            <a className="block mx-2 my-2 px-4 py-1 text-gray-900 text-sm font-medium tracking-wide bg-green-100 hover:bg-green-200 border border-green-600 rounded-full">
              {c.name}
            </a>
          </ChartLink>
        ))}
      </div>

      {curations.slice(1).map((c) => (
        <div key={c.id} className="mb-6">
          <PodcastCuration curation={c} />
        </div>
      ))}
    </div>
  )
}

export default HomeView
