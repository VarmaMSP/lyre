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
    <div className="w-56 py-1 bg-white border border-teal-400 rounded shadow">
      <div
        className="flex items-center px-4 py-1 hover:bg-gray-150 cursor-pointer"
        onClick={() => showAddToPlaylistModal()}
      >
        <div className="pr-3">
          <AddToPlaylistIcon className="text-gray-800 fill-current w-4 h-4" />
        </div>

        <div className="text-sm text-gray-800 tracking-wide">
          {'Add to playlist'}
        </div>
      </div>
    </div>
  )
}

export default EpisodeActions
