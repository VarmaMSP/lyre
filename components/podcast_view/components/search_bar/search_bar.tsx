import classnames from 'classnames'
import ButtonWithIcon from 'components/button_with_icon'
import { Formik } from 'formik'
import React from 'react'

export interface DispatchToProps {
  submitQuery: (q: string) => void
}

export interface OwnProps {
  podcastUrlParam: string
}

const SearchBar: React.FC<DispatchToProps & OwnProps> = ({ submitQuery }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      validate={(values) => {
        const errors: Partial<{ query: string }> = {}
        if (values.query.trim().length == 0) {
          errors.query = 'empty'
        }
      }}
      onSubmit={({ query }) => submitQuery(query)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <ButtonWithIcon
            className="absolute inset-y-0 right-0 w-3 h-auto mx-2 text-gray-800"
            icon="search"
            type="submit"
          />
          <input
            className={classnames(
              'w-full h-7 pl-2 pr-6 text-xs text-gray-900 tracking-wide placeholder-gray-800 border border-gray-500 rounded-lg',
              'appearance-none focus:outline-none focus:border-2 focus:border-blue-500',
            )}
            type="text"
            name="query"
            value={values.query}
            onChange={handleChange}
            placeholder="Search Episodes"
          />
        </form>
      )}
    </Formik>
  )
}

export default SearchBar
