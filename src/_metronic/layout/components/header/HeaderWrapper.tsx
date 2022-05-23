/* eslint-disable react-hooks/exhaustive-deps */

import classnames from 'classnames'
import { useLayout } from '../../core'

export function HeaderWrapper() {
  const { classes, attributes } = useLayout()

  return (
    <div
      id='kt_header'
      className={classnames('header', classes.header.join(' '), 'align-items-stretch')}
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      data-kt-sticky-offset="{default: '200px', lg: '300px'}"
      {...attributes.headerMenu}
    >
      <div className={classnames(classes.headerContainer.join(' '), 'd-flex align-items-center')}>

      </div>
    </div>
  )
}
