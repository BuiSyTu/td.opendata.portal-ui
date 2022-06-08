import React, { FC } from 'react'

import { Link } from 'react-router-dom'
import { useLayout } from '../../../core/LayoutProvider'
import { usePageData } from '../../../core/PageData'

const DefaultTitleCustom: FC = () => {
  const { pageTitle, pageBreadcrumbs } = usePageData()
  const { config, attributes } = useLayout()
  return (
    <div {...attributes.pageTitle} className='page-title d-flex flex-column'>
      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.pageTitle &&
        config.pageTitle.breadCrumbs && (
          <ul className='breadcrumb breadcrumb-line fw-bold fs-5 my-1'>
            {Array.from(pageBreadcrumbs).map((item, index) => (
              <li className={'breadcrumb-item'} key={`${item.path}${index}`}>

                {!item.isSeparator ? (
                  <Link to={item.path}>
                    {item.title}
                  </Link>
                ) : (
                  <span className='bullet bg-white opacity-75 w-5px h-2px'></span>
                )}
              </li>
            ))}
            <li>{pageTitle}</li>
          </ul>
        )}
    </div>
  )
}

export { DefaultTitleCustom }
