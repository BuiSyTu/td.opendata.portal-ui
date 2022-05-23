import './dashboard.scss'

import { CardMostViewedDatas } from './components/CardMostViewedDatas'
import { CardNewsCarousel } from './components/CardNewsCarousel'
import { CardStatistical } from './components/CardStatistical'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

const DashboardPage = () => {
  return (
    <>
      <div className='section-mostview' style={{backgroundImage: `url(${toAbsoluteUrl('media/images/bg-graphics.png')})`}}>
        <div className="container">
          <CardMostViewedDatas />
        </div>
      </div>

      <CardStatistical />
      <div className="section-news" style={{backgroundImage: `url(${toAbsoluteUrl('media/images/bg-graphics.png')})`}}>
        <div className="container">
          <CardNewsCarousel />
        </div>
      </div>
    </>
  )
}


const DashboardWrapper = () => {
  return (
    <>
      <DashboardPage />
    </>
  )
}


export { DashboardWrapper }

