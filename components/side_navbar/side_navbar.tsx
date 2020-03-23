import About from 'components/about'
import { iconMap } from 'components/icon'
import SearchBar from 'components/search_bar/side_navbar'
import SignInButton from 'components/sign_in_button'
import { useRouter } from 'next/router'
import React from 'react'
import { ViewportSize } from 'types/app'
import MenuItem from './components/menu_item'

export interface StateToProps {
  userSignedIn: boolean
  viewportSize: ViewportSize
}

const NavbarSide: React.SFC<StateToProps> = ({ userSignedIn }) => {
  const LogoIcon = iconMap['phenopod']
  const currentUrlPath = useRouter().asPath

  return (
    <div className="fixed left-0 top-0 md:flex hidden flex-col justify-between h-screen w-64 bg-gray-100">
      <div>
        <LogoIcon className="w-14 h-14 mx-auto mt-2 mb-3" />
        <div className="mb-6">
          <SearchBar />
        </div>
        <ul className="mb-10">
          <li className="h-10 px-3">
            <MenuItem icon="home" name="home" href="/" />
          </li>
          <li className="h-10 px-3">
            <MenuItem icon="explore" name="explore" href="/explore" />
          </li>
          <li className="h-10 px-3">
            <MenuItem icon="heart" name="subscriptions" href="/subscriptions" />
          </li>
          <li className="h-10 px-3">
            <MenuItem icon="history" name="history" href="/history" />
          </li>
          <li className="h-10 px-3">
            <MenuItem icon="playlist" name="playlists" href="/playlists" />
          </li>
        </ul>

        {currentUrlPath !== '/' && !userSignedIn && (
          <div className="h-10 px-8">
            <SignInButton />
          </div>
        )}
      </div>
      <div className="px-6 pt-6 pb-3">
        <About />
      </div>
    </div>
  )
}

export default NavbarSide
