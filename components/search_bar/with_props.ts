import { loadResultsPage } from 'actions/results'
import React, { createElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getText } from 'selectors/ui/search_bar'
import { AppState } from 'store'
import * as T from 'types/actions'
import { GlobalSearchParams } from 'types/ui/search'

export interface SearchBarProps {
  searchText: string
  handleTextChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleTextSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  collapseSearchBar: () => void
  showSuggestions: boolean
  setShowSuggestions: (e: boolean) => void
}

interface StateToProps {
  searchText: string
  showSuggestions: boolean
}

interface DispatchToProps {
  setCursor: (c: number) => void
  collapseSearchBar: () => void
  loadResultsPage: (searchParams: GlobalSearchParams) => void
  setSearchText: (text: string) => void
  setShowSuggestions: (e: boolean) => void
}

const withProps = (
  child: React.FC<SearchBarProps>,
): React.FC<StateToProps & DispatchToProps> => ({
  collapseSearchBar,
  loadResultsPage,
  searchText,
  showSuggestions,
  setSearchText,
  setShowSuggestions,
  setCursor,
}) => {
  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    setCursor(0)
    setSearchText(e.currentTarget.value)
  }

  const handleTextSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    !!e && e.preventDefault()

    setCursor(0)
    collapseSearchBar()
    loadResultsPage({
      query: searchText,
      type: 'episode',
      sortBy: 'relevance',
    })
  }

  return createElement(child, {
    searchText,
    handleTextChange,
    handleTextSubmit,
    collapseSearchBar,
    showSuggestions,
    setShowSuggestions,
  })
}

const mapStateToProps = (state: AppState): StateToProps => ({
  searchText: getText(state),
  showSuggestions: state.ui.searchBar.showSuggestions,
})

const mapDispatchToProps = (
  dispatch: Dispatch<T.AppActions>,
): DispatchToProps => ({
  loadResultsPage: bindActionCreators(loadResultsPage, dispatch),
  collapseSearchBar: () => dispatch({ type: T.SEARCH_BAR_COLLAPSE }),
  setSearchText: (text: string) =>
    dispatch({ type: T.SEARCH_BAR_UPDATE_TEXT, text }),
  setShowSuggestions: (e: boolean) =>
    dispatch({ type: T.SEARCH_BAR_SET_SHOW_SUGGESTIONS, value: e }),
  setCursor: (c: number) =>
    dispatch({ type: T.SEARCH_BAR_SET_CURSOR, cursor: c }),
})

export default (child: React.FC<SearchBarProps>) =>
  connect<StateToProps, DispatchToProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps,
  )(withProps(child))
