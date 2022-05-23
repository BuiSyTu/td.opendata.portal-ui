import React from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import './toolbaradstop.scss'

export function ToolbarQrCode() {
  return (
    <div className='row'>
      <div className='col-auto'>
        <div>
          <img
            alt=''
            className='img-fluid img-prcode'
            title=''
            src={toAbsoluteUrl('/media/logos/qr-code.svg')}
          />
        </div>
      </div>
      <div className='col ps-1'>
        <h3 className='text-primary m-0'>
          <b>Ứng dụng di động</b>
        </h3>
        <div className='group-qrcode d-flex py-2'>
          <div className='qr-code-item w-100px'>
            <img
              src={toAbsoluteUrl('/media/logos/App_Store.svg')}
              alt='Ứng dụng IOS'
              className='img-fluid'
            />
          </div>
          <div className='qr-code-item w-100px ms-2'>
            <img
              src={toAbsoluteUrl('/media/logos/Google_Play.svg')}
              alt='Ứng dụng Android'
              className='img-fluid'
            />
          </div>
        </div>
        <p className='qr-click-guid m-0'>
          <i>Bấm chuột để tải xuống</i>
        </p>
        <p className='qr-scan-guid m-0'>
          <i>Quét mã QR để tải xuống ứng dụng</i>
        </p>
        {/* cho <a href=''>IOS</a> và <a href="">Android</a> */}
      </div>
    </div>
  )
}
