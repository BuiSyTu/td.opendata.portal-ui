/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {CONFIG} from '../../../helpers/config'
import {requestPOST, requestGET} from '../../../helpers/baseAPI'
import classnames from 'classnames'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const IntroducePage = () => {

  return <div className='col-xl-12'></div>
}

const IntroduceWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <IntroducePage />
      <div className='container-gruid' style={{backgroundColor : ""}}>
      <h5 className="mt-auto mb-auto text-uppercase"><strong>Giới thiệu</strong></h5>
      <br></br>
        <p style={{fontSize:"16px"}}>
        Hệ thống thông tin phản ánh hiện trường là giải pháp triển khai nhằm mục đích cho cơ quan nhà nước tiếp nhận các vấn đề phản ánh của công dân, tổ chức đối với các vấn đề bất cập trong xã hội. 
        Cá nhân tổ chức có thể gửi phản ánh qua các kênh thông tin:
        </p>
        <br></br>
        <span style={{fontSize:"16px"}}>- Website: <a style={{color:"black"}} href="https://tuongtac.haiduong.gov.vn/">https://tuongtac.haiduong.gov.vn/</a> </span>
        <p></p>
        <span style={{fontSize:"16px"}}>- Email: ioc@haiduong.gov.vn</span>
        <p></p>
        <span style={{fontSize:"16px"}}>- Facebook: <a style={{color:"black"}} href="https://www.facebook.com/Haiduongioc-102301631677901">https://www.facebook.com/Haiduongioc-102301631677901</a> </span>
        <p></p>
        <span style={{fontSize:"16px"}}>- Zalo: <a style={{color:"black"}}  href="https://zalo.me/34162798793657763?src=qr&f=1&gidzl=ZQXgHjTW2N-6isz4ttqAVO-qRaZ8BGznm-HXJPik3tQNwpjEoYKETy7hRKwU9GXnn-zh6cHf_LSDrMCBVm">https://zalo.me/</a> </span>
        <p></p>
        <span style={{fontSize:"16px"}}>- Hotline: 1022 </span>
        <p></p>
        <span style={{fontSize:"16px"}}>Trân trọng !</span>
      </div>
    </>
  )
}

export {IntroduceWrapper}
