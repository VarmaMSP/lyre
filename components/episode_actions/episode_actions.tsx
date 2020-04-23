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
    <div
      className="w-56 py-1 bg-white rounded"
      style={{
        boxShadow: '0px 0px 5px -2px rgba(26,32,44,0.85)',
      }}
    >
      <div
        className="flex items-center px-4 py-1 hover:bg-gray-100 cursor-pointer"
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
