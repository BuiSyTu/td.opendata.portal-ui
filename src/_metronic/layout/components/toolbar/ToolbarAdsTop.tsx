import React from 'react'
import {ToolbarAdsImage} from './ToolbarAdsImage'
import './toolbaradstop.scss'
import {ToolbarQrCode} from './ToolbarQrCode'

export function ToolbarAdsTop() {
  return (
    <div className='contianer-fluid toolbar-ads-top'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <ToolbarAdsImage />
          </div>
          <div className='col-md-4'>
            <ToolbarQrCode />
          </div>
        </div>
      </div>
    </div>
  )
}
