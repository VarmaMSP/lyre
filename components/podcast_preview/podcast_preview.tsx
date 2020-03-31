import Img from 'components/common/img'
import { PodcastLink } from 'components/link'
import { Podcast, PodcastSearchResult } from 'models'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  podcast: Podcast
}

export interface OwnProps {
  podcastId: string
  searchResult: PodcastSearchResult
}

const PodcastPreview: React.FC<StateToProps & OwnProps> = ({
  podcast,
  searchResult,
}) => {
  return (
    <div className="flex md:px-1 py-4 md:hover:bg-gray-100 rounded-lg">
      <div className="flex-none md:w-28 md:h-28 w-22 w-22 md:mr-4 mr-3">
        <Img src={getImageUrl(podcast.urlParam)} />
      </div>

      <div>
        <div className="md:text-base text-sm text-black font-semibold tracking-wide line-clamp-2">
          <PodcastLink podcastUrlParam={podcast.urlParam}>
            <a
              className="hover:text-blue-700"
              dangerouslySetInnerHTML={{
                __html: !!searchResult ? searchResult.title : podcast.title,
              }}
            />
          </PodcastLink>
        </div>
        <div
          className="md:text-sm text-xs text-gray-900 font-medium mb-2 tracking-wide md:leading-normal leading-relaxed line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: !!searchResult ? searchResult.author : podcast.author,
          }}
        />
        s
        <div
          className="text-xs text-gray-900 md:break-normal break-all leading-normal tracking-normal md:line-clamp-2 line-clamp-3 cursor-default"
          style={{ hyphens: 'auto' }}
          dangerouslySetInnerHTML={{
            __html: !!searchResult ? searchResult.description : podcast.summary,
          }}
        />
      </div>
    </div>
  )
}

export default PodcastPreview
