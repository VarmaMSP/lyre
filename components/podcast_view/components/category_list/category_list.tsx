import { ChartLink } from 'components/link'
import { Category } from 'models'
import React from 'react'

export interface StateToProps {
  categories: Category[]
}

export interface OwnProps {
  categoryIds: string[]
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
    <div className="flex flex-wrap">
      {Object.keys(byParentId).map((parentId) => {
        const parent = byId[parentId]
        const childIds = byParentId[parentId]

        return childIds.length > 0 ? (
          childIds.map((childId) => (
            <div
              key={`${parentId}${childId}`}
              className="bg-green-100 mr-4 mb-2 px-3 text-2xs text-green-900 font-medium tracking-wide border border-green-300 rounded-full"
              style={{ paddingBottom: '0.08rem', paddingTop: '0.08rem' }}
            >
              <ChartLink chartUrlParam={parent.urlParam}>
                <a className="hover:text-blue-800">{`${parent.name}`}</a>
              </ChartLink>
              <span
                className="font-bold"
                style={{ marginLeft: '0.35rem', marginRight: '0.35rem' }}
              >
                &rsaquo;
              </span>
              <ChartLink chartUrlParam={byId[childId].urlParam}>
                <a className="hover:text-blue-800">{`${byId[childId].name}`}</a>
              </ChartLink>
            </div>
          ))
        ) : (
          <div
            key={`${parentId}`}
            className="bg-green-100 mr-4 mb-2 px-3 text-2xs text-green-900 font-medium tracking-wide border border-green-500 rounded-full"
            style={{ paddingBottom: '0.08rem', paddingTop: '0.08rem' }}
          >
            <ChartLink chartUrlParam={parent.urlParam}>
              <a className="hover:text-blue-800">{`${parent.name}`}</a>
            </ChartLink>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryList
