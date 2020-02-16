import ButtonWithIcon from 'components/button_with_icon'
import { iconMap } from 'components/icon'
import SearchBar from 'components/search_bar/top_navbar'
import SignInButton from 'components/sign_in_button'
import React from 'react'
import { ViewportSize } from 'types/app'
import UserSettings from './components/user_settings'

export interface StateToProps {
  userSignedIn: boolean
  showSearchBar: boolean
  viewPortSize: ViewportSize
}

export interface DispatchToProps {
  expandSearchBar: () => void
}

const TopNavbar: React.FC<StateToProps & DispatchToProps> = ({
  userSignedIn,
  showSearchBar,
  expandSearchBar,
}) => {
  if (showSearchBar) {
    return (
      <header className="fixed md:hidden top-0 left-0 h-12 w-full bg-white">
        <SearchBar />
      </header>
    )
  }

  const LogoIcon = iconMap['phenopod']

  return (
    <header className="fixed md:hidden top-0 left-0 flex justify-between items-center w-full h-12 px-4 bg-white">
      <div className="w-20">
        <ButtonWithIcon
          className="w-6 h-auto text-gray-600"
          icon="search"
          onClick={expandSearchBar}
        />
      </div>
      <LogoIcon className="mx-auto -mt-1" />
      <div className="w-20 h-8">
        {userSignedIn ? <UserSettings /> : <SignInButton small />}
      </div>
    </header>
  )
}

export default TopNavbar
