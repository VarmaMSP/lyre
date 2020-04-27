import { ChartLink } from 'components/link'
import { Category, Podcast } from 'models'
import React from 'react'

export interface StateToProps {
  categories: Category[]
}

export interface OwnProps {
  podcast: Podcast
}

const CategoryList: React.FC<StateToProps & OwnProps> = ({ categories }) => {
  const byId = categories.reduce<{ [categoryId: string]: Category }>(
    (acc, c) => ({ ...acc, [c.id]: c }),
    {},
  )
  const byParentId = categories.reduce<{ [categoryId: string]: string[] }>(
    (acc, p) =>
      !!p.parentId
        ? acc
        : {
            ...acc,
            [p.id]: categories.reduce<string[]>(
              (acc, c) => (c.parentId !== p.id ? acc : [...acc, c.id]),
              [],
            ),
          },
    {},
  )

  return (
    <div className="mt-6 flex flex-wrap">
      {Object.keys(byParentId)
        .sort((a, b) => byParentId[a].length - byParentId[b].length)
        .map((parentId) => {
          const parent = byId[parentId]
          const childIds = byParentId[parentId]

          return childIds.length > 0 ? (
            childIds.map((childId) => (
              <div
                key={`${parentId}${childId}`}
                className="bg-gray-150 mr-3 mb-3 px-3 text-2xs text-teal-800 font-medium tracking-wide border border-gray-400 rounded-full"
                style={{ paddingBottom: '0.08rem', paddingTop: '0.08rem' }}
              >
                <ChartLink chartUrlParam={parent.urlParam}>
                  <a className="hover:text-gray-900">{`${parent.name}`}</a>
                </ChartLink>
                <span
                  className="font-bold"
                  style={{ marginLeft: '0.35rem', marginRight: '0.35rem' }}
                >
                  &rsaquo;
                </span>
                <ChartLink chartUrlParam={byId[childId].urlParam}>
                  <a className="hover:text-gray-900">{`${byId[childId].name}`}</a>
                </ChartLink>
              </div>
            ))
          ) : (
            <div
              key={`${parentId}`}
              className="bg-gray-150 mr-3 mb-3 px-3 text-2xs text-teal-800 font-medium tracking-wide border border-gray-400 rounded-full"
              style={{ paddingBottom: '0.08rem', paddingTop: '0.08rem' }}
            >
              <ChartLink chartUrlParam={parent.urlParam}>
                <a className="hover:text-gray-900">{`${parent.name}`}</a>
              </ChartLink>
            </div>
          )
        })}
    </div>
  )
}

export default CategoryList
