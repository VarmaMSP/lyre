import { iconMap } from 'components/icon'
import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import React from 'react'
import { Playlist } from 'models'
import { getImageUrl } from 'utils/dom'

export interface StateToProps {
  signedInUserId: string
}

export interface DispatchToProps {
  removePlaylist: () => void
}

export interface OwnProps {
  playlist: Playlist
}

type Props = StateToProps & DispatchToProps & OwnProps

const PlaylistHeader: React.SFC<Props> = ({
  signedInUserId,
  playlist,
  removePlaylist,
}) => {
  const DeleteIcon = iconMap['trash']

  return (
    <div className="flex">
      <div className="flex flex-none items-center mx-auto cursor-pointer">
        <img
          className="w-36 h-36 object-contain rounded-lg border"
          src={getImageUrl(playlist.previewImage)}
        />
        <div className="w-2 h-32 bg-gray-400 rounded-r border-l border-white" />
        <div className="w-2 h-24 bg-gray-300 rounded-r border-l border-white" />
      </div>

      <div className="flex flex-col flex-auto w-1/2 justify-between lg:px-5 px-3">
        <div className="w-full">
          <h2 className="text-lg text-gray-900 leading-relaxed line-clamp-2">
            {playlist.title}
          </h2>
          <h4 className="text-xs text-gray-700 leading-relaxed">
            {`updated on ${formatUpdateDate(playlist.updatedAt)}`}
            <span className="mx-2 font-extrabold">&middot;</span>
            {`${playlist.episodeCount} episodes`}
          </h4>
        </div>

        <div className="flex">
          {signedInUserId === playlist.userId && (
            <button
              className="flex items-center mr-4 px-3 py-1 text-2xs text-center text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => removePlaylist()}
            >
              <DeleteIcon className="fill-current w-4 h-auto" />
              <span className="ml-2 font-medium tracking-wider">DELETE</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function formatUpdateDate(updateDate: string) {
  let pubDate: string | undefined
  try {
    pubDate = format(parseISO(`${updateDate} +0000`), 'PP')
  } catch (err) {}

  return pubDate
}

export default PlaylistHeader
