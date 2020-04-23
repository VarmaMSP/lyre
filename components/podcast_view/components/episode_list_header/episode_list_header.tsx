import classnames from 'classnames'
import ButtonWithIcon from 'components/button_with_icon'
import React from 'react'

const EpisodeListHeader: React.FC<{}> = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="font-medium tracking-wide">{'Episodes'}</h2>
      <form
        className="relative flex items-center"
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault()
        }}
      >
        <ButtonWithIcon
          className="absolute inset-y-0 right-0 w-3 h-auto mx-2 text-gray-800"
          icon="search"
          onClick={() => {}}
        />
        <input
          className={classnames(
            'w-full h-7 pl-2 pr-6 text-xs text-gray-900 tracking-wide placeholder-gray-800 border border-gray-500 rounded-lg',
            'appearance-none focus:outline-none focus:border-2 focus:border-blue-500',
          )}
          type="text"
          placeholder="Search Episodes"
        />
      </form>
    </div>
  )
}

export default EpisodeListHeader
