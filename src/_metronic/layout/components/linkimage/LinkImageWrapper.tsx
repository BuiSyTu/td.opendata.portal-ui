/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

export function LinkImageWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header, aside} = config

  return (
    <div className='widget widget-Links'>
      <div className='widget-content no-padding'>
        <div className='widget-content-inner'>
          <div className='tandan-div-module-links-img TD-link-img'>
            <a href='/lien-he' title='' target='' >
              <img alt='' src={toAbsoluteUrl('/media/logos/Hotline.png')} />
            </a>
            <a href='/gui-phan-anh' title='' target='' className='mt-3'>
              <img alt='' src={toAbsoluteUrl('/media/logos/GopY.png')} />
            </a>
            <a href='/huong-dan' title='' target='' className='mt-3'>
              <img alt='' src={toAbsoluteUrl('/media/logos/hdsd.png')} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
