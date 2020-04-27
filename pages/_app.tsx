import NProgress from 'accessible-nprogress'
import { getCurrentUser } from 'actions/user'
import AudioPlayer from 'components/audio_player'
import ModalSelector from 'components/modal/modal_selector'
import { DefaultSeo } from 'components/seo'
import SideNavbar from 'components/side_navbar'
import TopNavbar from 'components/top_navbar'
import withRedux from 'next-redux-wrapper'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeStore } from 'store'
import * as T from 'types/actions'
import { AppContext, PageContext } from 'types/utilities'
import '../styles/index.css'

NProgress.configure({
  showSpinner: false,
  trickle: true,
  trickleSpeed: 200,
  easing: 'ease',
  speed: 500,
  minimum: 0.1,
})

export default withRedux(makeStore)(
  class MyApp extends Component<AppProps & PageContext> {
    static async getInitialProps({ Component, ctx }: AppContext) {
      const { query, asPath: currentUrlPath, store } = ctx
      const { poppedEntry } = store.getState().history

      store.dispatch({ type: T.HISTORY_CLEAR_POPPED_ENTRY })

      if (currentUrlPath !== poppedEntry.urlPath && Component.getInitialProps) {
        await Component.getInitialProps(ctx)
      }

      return {
        pageProps: {
          ...query,
          scrollY:
            poppedEntry.urlPath === currentUrlPath ? poppedEntry.scrollY : 0,
        },
      }
    }

    componentDidMount() {
      const {
        store: { dispatch, getState },
      } = this.props

      /*
       * Don't let browser restore scroll position
       */
      window.history.scrollRestoration = 'manual'

      /*
       * Listen to screen width changes
       */
      this.setViewportSize()
      window.addEventListener('resize', this.setViewportSize)

      /*
       * Try to get signed in user session details
       */
      bindActionCreators(getCurrentUser, dispatch)()

      Router.events.on('routeChangeStart', () => NProgress.start())

      Router.events.on('routeChangeComplete', () => {
        dispatch({ type: T.SEARCH_BAR_SET_SHOW_SUGGESTIONS, value: false })
        NProgress.done()
      })

      Router.events.on('routeChangeError', () => NProgress.done())

      Router.beforePopState(({ as: toUrlPath }) => {
        const state = getState()

        // Prevent route change if there is a active modal
        if (state.ui.modalManager.activeModal.type !== 'NONE') {
          dispatch({ type: T.MODAL_MANAGER_CLOSE_MODAL })
          return false
        }

        // Pop history stack
        const { stack } = state.history
        if (stack.length > 0 && stack[0].urlPath === toUrlPath) {
          dispatch({ type: T.HISTORY_POP_ENTRY, entry: stack[0] })
        }

        return true
      })
    }

    setViewportSize = () => {
      const width = window.innerWidth

      if (width >= 1024) {
        return this.props.store.dispatch({
          type: T.WINDOW_VIEWPORT_SIZE,
          size: 'LG',
        })
      } else if (width >= 768) {
        return this.props.store.dispatch({
          type: T.WINDOW_VIEWPORT_SIZE,
          size: 'MD',
        })
      } else {
        return this.props.store.dispatch({
          type: T.WINDOW_VIEWPORT_SIZE,
          size: 'SM',
        })
      }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <>
          <DefaultSeo />
          <Provider store={store}>
            <Component {...pageProps} />
            <TopNavbar />
            <SideNavbar />
            <AudioPlayer />
            <ModalSelector />
          </Provider>
        </>
      )
    }
  },
)
