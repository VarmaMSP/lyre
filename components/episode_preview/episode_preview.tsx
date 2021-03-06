import classnames from 'classnames'
import EpisodeActions from 'components/episode_actions'
import EpisodeThumbnail from 'components/episode_thumbnail'
import { iconMap } from 'components/icon'
import { EpisodeLink, PodcastLink } from 'components/link'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import usePopper from 'hooks/use_popper'
import { Episode, Podcast } from 'models'
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
    <div className="flex md:px-1 pt-5 pb-3 rounded-lg">
      <div className="flex-none md:mr-4 mr-3">
        <EpisodeThumbnail episode={episode} small={small} large={large} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex-1">
            <div
              className={classnames(
                '-mt-1 text-black hover:text-gray-700 md:text-lg font-medium tracking-wide leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-1',
              )}
            >
              <EpisodeLink episodeUrlParam={episode.urlParam}>
                <a
                  dangerouslySetInnerHTML={{
                    __html: episode.titleHighlighed || episode.title,
                  }}
                />
              </EpisodeLink>
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
          className="md:pr-16 text-teal-900 leading-relaxed line-clamp-1"
          style={{ marginBottom: '0.4rem', fontSize: '14px' }}
        >
          {dense && episodeNumber(episode)}
          {episodeTime(episode, t)}
          {!dense && (
            <>
              <span className="font-extrabold" style={{ margin: '0 0.4rem' }}>
                &middot;
              </span>
              <PodcastLink podcastUrlParam={podcast.urlParam}>
                <a className="hover:text-gray-900">{podcast.title}</a>
              </PodcastLink>
            </>
          )}
        </div>

        <div
          className="md:pr-2 text-xs text-teal-700 leading-tight md:leading-snug break-all md:line-clamp-2 line-clamp-3 cursor-default "
          style={{
            hyphens: 'auto',
            letterSpacing: '0.01em',
          }}
          dangerouslySetInnerHTML={{
            __html: episode.descriptionHighlighted || episode.summary,
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

const episodeNumber = (episode: Episode): JSX.Element | null => {
  if (episode.type === 'FULL' && episode.episode === 0) {
    return null
  }

  var text: string
  var color: string
  if (episode.type === 'BONUS') {
    text = `BONUS`
    color = 'text-orange-900'
  } else if (episode.type === 'TRAILER') {
    text = `TRAILER`
    color = 'text-red-900'
  } else if (episode.season > 0) {
    text = `S${episode.season}  E${episode.episode}`
    color = 'text-teal-900'
  } else {
    text = `E${episode.episode}`
    color = 'text-teal-900'
  }

  return (
    <>
      <span className={classnames('text-2xs font-medium', color)}>{text}</span>
      <span className="font-extrabold" style={{ margin: '0 0.4rem' }}>
        &middot;
      </span>
    </>
  )
}

const episodeTime = (episode: Episode, t: string) => {
  return (
    <span>
      {t == 'HISTORY'
        ? `${formatDistanceToNow(parseISO(episode.lastPlayedAt))} ago`.replace(
            'about ',
            '',
          )
        : `${formatDistanceToNow(parseISO(episode.pubDate))} ago`.replace(
            'about ',
            '',
          )}
    </span>
  )
}

export default EpisodePreview
