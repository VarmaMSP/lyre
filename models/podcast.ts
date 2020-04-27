import {
  mergeArray,
  mergeNumber,
  mergeString,
  parseDatetime,
} from 'utils/utils'

export type PodcastType = 'SERIAL' | 'EPISODE'

export class PodcastCategory {
  categoryId: string

  constructor(j: any) {
    this.categoryId = j['category_id']
  }
}

export class Podcast {
  id: string
  urlParam: string
  title: string
  summary: string
  description: string
  language: string
  explicit: boolean
  author: string
  totalEpisodes: number
  type: PodcastType
  complete: boolean
  link: string
  earliestEpisodePubDate: string
  copyright: string
  categories: PodcastCategory[]
  titleHighlighted: string
  authorHighlighted: string
  descriptionHighlighted: string
  feedUrl: string
  feedLastRefreshAt: string

  static merge(p1: Podcast, p2: Podcast): Podcast {
    return {
      id: p2.id,
      urlParam: mergeString(p1.urlParam, p2.urlParam),
      title: mergeString(p1.title, p2.title),
      summary: mergeString(p1.summary, p2.summary),
      description: mergeString(p1.description, p2.description),
      language: mergeString(p1.language, p2.language),
      explicit: p2.explicit,
      author: mergeString(p1.author, p2.author),
      totalEpisodes: mergeNumber(p1.totalEpisodes, p2.totalEpisodes),
      type: p2.type,
      complete: p2.complete,
      link: mergeString(p1.link, p2.link),
      earliestEpisodePubDate: mergeString(
        p1.earliestEpisodePubDate,
        p2.earliestEpisodePubDate,
      ),
      copyright: mergeString(p1.copyright, p2.copyright),
      categories: mergeArray(p1.categories, p2.categories),
      titleHighlighted: mergeString(p1.titleHighlighted, p2.titleHighlighted),
      authorHighlighted: mergeString(
        p1.authorHighlighted,
        p2.authorHighlighted,
      ),
      descriptionHighlighted: mergeString(
        p1.descriptionHighlighted,
        p2.descriptionHighlighted,
      ),
      feedUrl: mergeString(p1.feedUrl, p2.feedUrl),
      feedLastRefreshAt: mergeString(
        p1.feedLastRefreshAt,
        p2.feedLastRefreshAt,
      ),
    }
  }

  constructor(j: any) {
    this.id = j['id'] || ''
    this.urlParam = j['url_param'] || ''
    this.title = j['title'] || ''
    this.summary = j['summary'] || ''
    this.description = j['description'] || ''
    this.language = j['language'] || 'en'
    this.explicit = j['explicit'] || false
    this.author = j['author'] || ''
    this.totalEpisodes = j['total_episodes'] || 0
    this.type = j['type'] || 'EPISODE'
    this.complete = j['complete'] || false
    this.link = j['link'] || ''
    this.earliestEpisodePubDate = j['earliest_episode_pub_date'] || ''
    this.copyright = j['copyright'] || ''
    this.categories = (j['categories'] || []).map(
      (o: any) => new PodcastCategory(o),
    )
    this.titleHighlighted = j['title_highlighted'] || ''
    this.authorHighlighted = j['author_highlighted'] || ''
    this.descriptionHighlighted = j['description_highlighted'] || ''
    this.feedUrl = j['feed_url'] || ''
    this.feedLastRefreshAt = parseDatetime(j['feed_last_refresh_at'] || '')
  }
}
