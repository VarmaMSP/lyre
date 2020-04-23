import classnames from 'classnames'
import EpisodeActions from 'components/episode_actions'
import EpisodeThumbnail from 'components/episode_thumbnail'
import { iconMap } from 'components/icon'
import { EpisodeLink, PodcastLink } from 'components/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import usePopper from 'hooks/usePopper'
import { Episode, EpisodeSearchResult, Podcast } from 'models'
import React from 'react'
import { Portal } from 'react-portal'
import { stopEventPropagation } from 'utils/dom'

export interface StateToProps {
  episode: Episode
  podcast: Podcast
  activeActionsPopup: string
}

export interface DispatchToProps {
  showActionsPopup: () => void
  closeAllPopups: () => void
}

export interface OwnProps {
  episodeId: string
  searchResult?: EpisodeSearchResult
  small?: boolean
  large?: boolean
  dense?: boolean
  t?: 'NORMAL' | 'HISTORY'
}

type Props = StateToProps & DispatchToProps & OwnProps

const EpisodePreview: React.FC<Props> = ({
  episode,
  podcast,
  activeActionsPopup,
  showActionsPopup,
  closeAllPopups,
  searchResult,
  small = false,
  large = false,
  dense = false,
  t = 'NORMAL',
}) => {
  const [reference, popper] = usePopper(
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
      ],
      strategy: 'absolute',
    },
    () => closeAllPopups(),
  )

  const AddIcon = iconMap['dots-horizontal']

  return (
    <div
      className={classnames('flex md:px-1 pt-5 pb-3 rounded-lg', {
        // 'episode-preview': activeActionsPopup !== episode.id,
        // 'episode-preview-active': activeActionsPopup === episode.id,
      })}
    >
      <div className="flex-none md:mr-4 mr-3">
        <EpisodeThumbnail episodeId={episode.id} small={small} large={large} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex-1">
            <div
              className={classnames(
                'mb-1 md:mb-0 text-black font-semibold tracking-wide leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-1',
              )}
              style={{ fontSize: '17px', marginTop: '-5px' }}
            >
              <EpisodeLink episodeUrlParam={episode.urlParam}>
                <a
                  className="hover:text-blue-800 hover:border"
                  dangerouslySetInnerHTML={{
                    __html: !!searchResult ? searchResult.title : episode.title,
                  }}
                />
              </EpisodeLink>
            </div>

            {!dense && (
              <div className="text-xs text-gray-900 font-medium tracking-wide leading-relaxed line-clamp-1">
                <PodcastLink podcastUrlParam={podcast.urlParam}>
                  <a className="hover:text-blue-800">{podcast.title}</a>
                </PodcastLink>
              </div>
            )}

            <div className="mb-1 text-xs text-gray-900 font-medium tracking-wide leading-relaxed">
              {dense && (
                <>
                  {episode.type === 'FULL' &&
                    episode.episode > 0 &&
                    (episode.season > 0 ? (
                      <span className="bg-gray-700 text-white text-2xs px-2 mr-3 font-medium tracking-wide leading-loose rounded-sm">
                        {`S${episode.season} E${episode.episode}`}
                      </span>
                    ) : (
                      <span className="bg-gray-700 text-white text-2xs px-2 mr-3 font-medium tracking-wide leading-loose rounded-sm">
                        {`E${episode.episode}`}
                      </span>
                    ))}
                  {episode.type === 'BONUS' && (
                    <span className="bg-orange-700 text-white text-2xs px-2 mr-3 font-medium tracking-wide leading-loose rounded-sm">
                      {'BONUS'}
                    </span>
                  )}
                  {episode.type === 'TRAILER' && (
                    <span className="bg-red-700 text-white text-2xs px-2 mr-3 font-medium tracking-wide leading-loose rounded-sm">
                      {'TRAILER'}
                    </span>
                  )}
                </>
              )}
              {t == 'NORMAL' &&
                `Published ${formatDistanceToNow(
                  parseISO(episode.pubDate),
                )} ago`.replace('about ', '')}
              {t == 'HISTORY' &&
                `Listened ${formatDistanceToNow(
                  parseISO(episode.lastPlayedAt),
                )} ago`.replace('about ', '')}
            </div>
          </div>

          <div className="flex-none pl-3 pr-1">
            <div
              ref={reference.ref}
              onClick={() =>
                activeActionsPopup !== episode.id
                  ? showActionsPopup()
                  : closeAllPopups()
              }
              onPointerDown={stopEventPropagation}
              onMouseDown={stopEventPropagation}
              onTouchStart={stopEventPropagation}
              className="text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <AddIcon className="options fill-current w-5 h-5" />
            </div>
          </div>
        </div>

        <div
          className="md:pr-2 text-2xs text-gray-700 font-medium md:break-normal break-all md:line-clamp-2 line-clamp-3 cursor-default"
          style={{ hyphens: 'auto' }}
          dangerouslySetInnerHTML={{
            __html: searchResult?.description || episode.summary,
          }}
        />
      </div>

      {activeActionsPopup === episode.id && (
        <Portal>
          <div ref={popper.ref} style={popper.styles}>
            <EpisodeActions episodeId={episode.id} />
          </div>
        </Portal>
      )}
    </div>
  )
}

export default EpisodePreview
