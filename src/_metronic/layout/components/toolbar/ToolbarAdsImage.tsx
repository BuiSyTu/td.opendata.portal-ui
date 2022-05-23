import React from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import './toolbaradstop.scss'

export function ToolbarAdsImage() {
  return (
    <div className='row'>
      <div className='col-md-6'>
        <a href='http://covid.haiduong.gov.vn/' target={"_blank"}>
          <img
            alt=''
            className='img-fluid'
            title=''
            src={toAbsoluteUrl('/media/logos/covid-link.png')}
          />
        </a>
      </div>
      <div className='col-md-6'>
        <a href='https://covidmaps.haiduong.gov.vn/haiduong?locale=vn' target={"_blank"}>
          <img
            alt=''
            className='img-fluid'
            title=''
            src={toAbsoluteUrl('/media/logos/covidmap-link.png')}
          />
        </a>
      </div>
    </div>
  )
}
