import { iconMap } from 'components/icon'
import React from 'react'

export interface DispatchToProps {
  showAddToPlaylistModal: () => void
}

export interface OwnProps {
  episodeId: string
}

const EpisodeActions: React.FC<DispatchToProps & OwnProps> = ({
  showAddToPlaylistModal,
}) => {
  const AddToPlaylistIcon = iconMap['playlist-add']

  return (
    <div className="w-56 py-2 bg-white border border-gray-400 shadow-md rounded">
      <div
        className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => showAddToPlaylistModal()}
      >
        <div className="pr-3">
          <AddToPlaylistIcon className="text-gray-800 fill-current w-4 h-4" />
        </div>

        <div className="text-gray-900 font-medium tracking-wide">
          {'Add to playlist'}
        </div>
      </div>
    </div>
  )
}

export default EpisodeActions
