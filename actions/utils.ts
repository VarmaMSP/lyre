import { Dispatch } from 'redux'
import { requestStatus } from 'selectors/request'
import { getIsUserSignedIn } from 'selectors/session'
import { AppState } from 'store'
import * as AT from 'types/actions'
import { FetchException } from 'utils/fetch'

type MakeRequest<T> = (g: () => AppState) => T

type ProcessData<T> = (
  d: Dispatch<AT.AppActions>,
  g: () => AppState,
  r: T extends Promise<infer U> ? U : T,
) => void

type RequestActionOpts = {
  requestId: string
  skip: RequestActionSkipCond | RequestActionSkipCond[]
  notifyError: boolean
  preAction: AT.AppActions
}

type RequestActionSkipCond =
  | { cond: 'USER_NOT_SIGNED_IN' }
  | { cond: 'REQUEST_ALREADY_MADE' }
  | { cond: 'CUSTOM'; p: (g: () => AppState) => boolean }

export function requestAction<T extends Promise<any>>(
  makeRequest: MakeRequest<T>,
  processData: ProcessData<T>,
  { skip, requestId, preAction }: Partial<RequestActionOpts> = {},
) {
  return async (
    dispatch: Dispatch<AT.AppActions>,
    getState: () => AppState,
  ) => {
    !!preAction && dispatch(preAction)

    const skipAction = (!!skip && !Array.isArray(skip) ? [skip] : []).some(
      (s) => {
        switch (s.cond) {
          case 'REQUEST_ALREADY_MADE':
            return requestStatus(getState(), requestId!) === 'SUCCESS'

          case 'USER_NOT_SIGNED_IN':
            return !getIsUserSignedIn(getState())

          case 'CUSTOM':
            return s.p(getState)
        }
      },
    )
    if (skipAction) {
      return
    }

    !!requestId && dispatch({ type: AT.REQUEST_IN_PROGRESS, requestId })

    try {
      const res = await makeRequest(getState)
      processData(dispatch, getState, res)
      !!requestId && dispatch({ type: AT.REQUEST_SUCCESS, requestId })
    } catch (err) {
      console.log(err)
      if ((err as FetchException).statusCode === 401) {
        dispatch({ type: AT.SESSION_DELETE })
        dispatch({ type: AT.MODAL_MANAGER_SHOW_SIGN_IN_MODAL })
      }
      !!requestId &&
        dispatch({
          type: AT.REQUEST_FAILURE,
          requestId,
          message: err.toString(),
        })
    }
  }
}
