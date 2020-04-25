import { ChartLink } from 'components/link'
import { Category } from 'models'
import React from 'react'

export interface StateToProps {
  categories: Category[]
  subCategories: Category[]
}

export interface OwnProps {
  activeCategoryId: string
}

const CategoryList: React.FC<StateToProps & OwnProps> = ({
  categories,
  subCategories,
}) => {
  return (
    <div className="py-4 px-4 bg-gray-100 border border-gray-300 rounded-lg">
      {subCategories.length > 0 && (
        <>
          <h4 className="mb-4 tracking-wide">{'Sub Categories'}</h4>
          <div className="flex flex-wrap mb-4">
            {subCategories.map((c) => (
              <ChartLink key={c.id} chartUrlParam={c.urlParam}>
                <a className="block mx-1 mb-3 px-3 text-2xs text-gray-900 tracking-wide leading-loose bg-blue-100 hover:bg-blue-200 border border-blue-600 rounded-full">
                  {c.name}
                </a>
              </ChartLink>
            ))}
          </div>
        </>
      )}

      <div>
        <h4 className="mb-4 tracking-wide">{'All Categories'}</h4>
        <div className="flex flex-wrap mb-4">
          {categories.map((c) => (
            <ChartLink key={c.id} chartUrlParam={c.urlParam}>
              <a className="block mx-1 mb-3 px-3 text-2xs text-gray-900 tracking-wide leading-loose bg-green-100 hover:bg-green-200 border border-green-600 rounded-full">
                {c.name}
              </a>
            </ChartLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList
