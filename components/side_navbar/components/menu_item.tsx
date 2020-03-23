import classnames from 'classnames'
import { Icon, iconMap } from 'components/icon'
import { Link } from 'components/link'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  icon: Icon
  name: string
  href: string
}

const MenuItem: React.SFC<Props> = ({ icon, name, href }) => {
  const Icon = iconMap[icon]
  const currentUrlPath = useRouter().asPath

  return (
    <Link href={href} scroll={false}>
      <a
        className={classnames(
          'flex items-center w-full h-full px-7 my-3 cursor-pointer rounded-full',
          {
            'text-gray-800 hover:bg-gray-200': href !== currentUrlPath,
            'text-gray-800 bg-gray-300': href === currentUrlPath,
          },
        )}
      >
        <Icon className="w-4 h-4 mr-3 fill-current" />
        <h4 className="capitalize text-lg font-semibold leading-loose tracking-wide">
          {name}
        </h4>
      </a>
    </Link>
  )
}

export default MenuItem
