import React from 'react'

export interface DispatchToProps {
  showSignInModal: () => void
}

const Intro: React.FC<DispatchToProps> = ({ showSignInModal }) => {
  return (
    <div className="md:mx-4 my-6 px-3 md:px-5 pt-3 pb-5 bg-gray-100 border-2 border-yellow-400 rounded-lg">
      <h2 className="mb-2 tracking-wide">
        <span className="text-gray-900 text-xl font-medium">
          {'Welcome to Phenopod Podcast Player'}
        </span>
      </h2>
      <ul className="ml-8 list-disc text-gray-800 tracking-wide">
        <li className="mb-2">
          {
            'Search and listen to any podcast from a directory of 650K podcasts / 20M episodes.'
          }
        </li>
        <li>
          <span
            className="mr-2 px-2 py-1 text-sm text-blue-900 bg-blue-200 border border-blue-300 rounded cursor-pointer"
            onClick={showSignInModal}
          >
            {'SIGN IN'}
          </span>
          {
            'to subscribe to podcasts, sync / browse your playback history and curate playlists.'
          }
        </li>
      </ul>
    </div>
  )
}

export default Intro
