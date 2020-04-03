import ModalContainer from 'components/modal/modal_container'
import Overlay from 'components/modal/overlay'
import useDisableScroll from 'hooks/useDisableScroll'
import { Playlist } from 'models'
import React, { useEffect } from 'react'
import { stopEventPropagation } from 'utils/dom'
import PlaylistsListItem from './playlists_list_item'

export interface StateToProps {
  playlists: Playlist[]
}

export interface DispatchToProps {
  showCreatePlaylistModal: () => void
  closeAllPopups: () => void
}

export interface OwnProps {
  skipLoad?: boolean
  episodeId: string
}

type Props = StateToProps & DispatchToProps & OwnProps

const AddToPlaylistModal: React.FC<Props> = ({
  playlists,
  episodeId,
  closeAllPopups,
  showCreatePlaylistModal,
}) => {
  useEffect(() => {
    closeAllPopups()
  }, [])

  useDisableScroll(true)

  return (
    <Overlay background="rgba(0, 0, 0, 0.65)">
      <ModalContainer className="modal-slim" header="Add to Playlist">
        <div
          className="h-full flex flex-col justify-between"
          onWheel={stopEventPropagation}
          onTouchMove={stopEventPropagation}
          onKeyDown={stopEventPropagation}
        >
          {playlists.length === 0 ? (
            <div className="mt-5 text-center tracking-wider text-gray-800">
              {'No playlists found, create one.'}
            </div>
          ) : (
            <div className="overflow-auto" style={{ height: '26rem' }}>
              {playlists.map((playlist) => (
                <PlaylistsListItem
                  key={playlist.id}
                  playlist={playlist}
                  episodeId={episodeId}
                />
              ))}
            </div>
          )}

          <button
            className="block flex-none w-full text-sm font-medium text-center text-purple-700 py-1 mr-6 border-2 border-purple-600 rounded-lg"
            onClick={() => showCreatePlaylistModal()}
          >
            NEW PLAYLIST
          </button>
        </div>
      </ModalContainer>
    </Overlay>
  )
}

export default AddToPlaylistModal
