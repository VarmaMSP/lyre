export type AudioState = 'PLAYING' | 'PAUSED' | 'LOADING' | 'ENDED'

export type ViewportSize = 'SM' | 'MD' | 'LG'

export type Modal =
  | { type: 'NONE' }
  | { type: 'SIGNIN_MODAL' }
  | { type: 'ADD_TO_PLAYLIST_MODAL'; episodeId: string }
  | { type: 'CREATE_PLAYLIST_MODAL'; episodeId: string }
