import classNames from 'classnames'
import React from 'react'
import {
  GlobalSearchParams,
  SearchFilterSortBy,
  SearchFilterType,
} from 'types/ui/search'

export interface DispatchToProps {
  loadResultsPage: (searchParams: GlobalSearchParams) => void
}

export interface OwnProps {
  searchParams: GlobalSearchParams
}

const SearchResultsFilter: React.FC<DispatchToProps & OwnProps> = (props) => {
  const onResultTypeChange = (t: SearchFilterType) => {
    if (props.searchParams.type !== t) {
      props.loadResultsPage({ ...props.searchParams, type: t })
    }
  }

  const onSortByChange = (s: SearchFilterSortBy) => {
    if (props.searchParams.sortBy !== s) {
      props.loadResultsPage({ ...props.searchParams, sortBy: s })
    }
  }

  return (
    <div className="flex items-center mb-3 justify-between">
      <div className="flex flex-initial w-3/5 border-b">
        {(['episode', 'podcast'] as SearchFilterType[]).map((t) => (
          <div key={t} className="w-20 mr-2 text-center">
            <div
              className={classNames(
                'block px-3 py-1 text-sm capitalize leading-loose tracking-wider',
                {
                  'cursor-default': props.searchParams.type === t,
                  'cursor-pointer': props.searchParams.type !== t,
                },
              )}
              onClick={() => onResultTypeChange(t)}
            >
              {t === 'episode' ? 'all' : 'podcasts'}
            </div>
            <div
              className={classNames('h-1 w-20 rounded-full', {
                'bg-green-600': props.searchParams.type === t,
              })}
            />
          </div>
        ))}
      </div>
      <div>
        <select
          className="form-select text-sm tracking-wider w-36"
          onChange={(e) => onSortByChange(e.target.value as SearchFilterSortBy)}
          value={props.searchParams.sortBy}
        >
          <option value="relevance">{'Relevance'}</option>
          {props.searchParams.type === 'episode' && (
            <option value="publish_date">{'Date Published'}</option>
          )}
        </select>
      </div>
    </div>
  )
}

export default SearchResultsFilter
