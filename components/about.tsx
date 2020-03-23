import { Link } from 'components/link'
import React from 'react'

const About: React.FC<{}> = () => {
  return (
    <div className="text-xs text-gray-800">
      <p className="tracking-wide">
        <Link href="/about" prefetch={false}>
          <a className="cursor-pointer">{'about'}</a>
        </Link>{' '}
        <span className="font-extrabold">&middot;</span>{' '}
        <Link href="/privacy" prefetch={false}>
          <a className="cursor-pointer">{'privacy'}</a>
        </Link>
      </p>
      <p className="mb-2 tracking-wide">
        <a href="https://www.facebook.com/phenopod" target="_blank">
          {'facebook'}
        </a>{' '}
        <span className="font-extrabold">&middot;</span>{' '}
        <a href="https://twitter.com/phenopod" target="_blank">
          {'twitter'}
        </a>
      </p>
      <a href="mailto:hello@phenopod.com" className="font-light tracking-wider">
        {'hello@phenopod.com'}
      </a>
    </div>
  )
}

export default About
