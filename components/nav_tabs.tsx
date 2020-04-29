import classNames from 'classnames'
import { Link } from 'components/link'
import React from 'react'

interface Tab {
  name: string
  pathname: string
  query: { [x: string]: number | string | boolean }
  as: string
}

interface OwnProps {
  tabs: Tab[]
  active: string | undefined
  defaultTab?: string
}

const NavTabs: React.FC<OwnProps> = ({ tabs, active, defaultTab }) => {
  return (
    <div className="flex border-b border-gray-400">
      {tabs.map((t) => (
        <div key={t.name} className="w-20 mr-2">
          <Link
            href={{ pathname: t.pathname, query: t.query }}
            as={t.as}
            key={t.name}
          >
            <a
              className={classNames(
                'block w-full py-1 text-sm text-center capitalize leading-loose tracking-wider',
                {
                  'cursor-default': t.name === active,
                  'cursor-pointer': t.name !== active,
                  'text-green-900 font-semibold':
                    (active !== undefined && t.name === active) ||
                    (active === undefined && t.name === defaultTab),
                  'text-gray-600 font-semibold':
                    !(active !== undefined && t.name === active) &&
                    !(active === undefined && t.name === defaultTab),
                },
              )}
            >
              {t.name}
            </a>
          </Link>
          <div
            className={classNames('w-20 rounded-t-full', {
              'bg-green-800':
                (active !== undefined && t.name === active) ||
                (active === undefined && t.name === defaultTab),
            })}
            style={{ height: '3px' }}
          />
        </div>
      ))}
    </div>
  )
}

export default NavTabs
