import { Curation, Podcast } from 'models'
import * as T from 'types/actions'
import { doFetch } from 'utils/fetch'
import * as RequestId from 'utils/request_id'
import { requestAction } from './utils'

export function getHomePageData() {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: '/',
      }),
    (dispatch, _, { raw, categories }) => {
      let podcasts: Podcast[] = []
      let curations: Curation[] = []

      raw.forEach((o: any) => {
        const p = (o.podcasts as any[]).map((x: any) => new Podcast(x))
        const c = {
          id: o.title,
          title: o.title as string,
          podcastIds: p.map((x) => x.id),
        }

        podcasts = [...podcasts, ...p]
        curations = [...curations, c]
      })

      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.CATEGORY_ADD, categories })
      dispatch({ type: T.CURATION_ADD, curations })
      dispatch({
        type: T.HOME_LOAD_PAGE,
        curationIds: curations.map((x) => x.id),
      })
    },
    {
      requestId: RequestId.getHomePageData(),
      skip: { cond: 'REQUEST_ALREADY_MADE' },
    },
  )
}
