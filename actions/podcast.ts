import * as T from 'types/actions'
import { PodcastEpisodeListOrder } from 'types/ui'
import { doFetch } from 'utils/fetch'
import * as RequestId from 'utils/request_id'
import { qs } from 'utils/utils'
import { requestAction } from './utils'

export function getPodcastPageData(podcastUrlParam: string) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/podcasts/${podcastUrlParam}`,
      }),
    (dispatch, _, { podcasts, episodes, categories }) => {
      dispatch({ type: T.PODCAST_ADD, podcasts })
      dispatch({ type: T.EPISODE_ADD, episodes })
      dispatch({ type: T.CATEGORY_ADD, categories })

      dispatch({
        type: T.PODCAST_EPISODES_LIST_LOAD_PAGE,
        podcastId: podcasts[0].id,
        episodeIds: episodes.map((x) => x.id),
        order: 'pub_date_desc',
        page: 0,
      })

      if (episodes.length < 15) {
        dispatch({
          type: T.PODCAST_EPISODES_LIST_RECEIVED_ALL,
          podcastId: podcasts[0].id,
          order: 'pub_date_desc',
        })
      }
    },
  )
}

export function getPodcastEpisodes(
  podcastId: string,
  limit: number,
  offset: number,
  order: PodcastEpisodeListOrder,
) {
  return requestAction(
    () =>
      doFetch({
        method: 'GET',
        urlPath: `/ajax/browse?${qs({
          endpoint: 'podcast_episodes',
          podcast_id: podcastId,
          order: order,
          offset: offset,
          limit: limit,
        })}`,
      }),
    (dispatch, _, { episodes }) => {
      dispatch({
        type: T.EPISODE_ADD,
        episodes,
      })

      dispatch({
        type: T.PODCAST_EPISODES_LIST_LOAD_PAGE,
        podcastId: podcastId,
        episodeIds: episodes.map((x) => x.id),
        order: order,
        page: Math.floor(offset - 15 / limit) + 1,
      })

      if (episodes.length < limit) {
        dispatch({
          type: T.PODCAST_EPISODES_LIST_RECEIVED_ALL,
          podcastId,
          order,
        })
      }
    },
    { requestId: RequestId.getPodcastEpisodes(podcastId) },
  )
}
