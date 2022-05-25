import React from 'react'

import CardMostViewedDatas from './components/CardMostViewedDatas'
import CardNewsCarousel from './components/CardNewsCarousel'
import CardStatistical from './components/CardStatistical'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

const Home = () => {
  return (
    <>
      <CardMostViewedDatas />

      <CardStatistical />

      <CardNewsCarousel />
    </>
  )
}


export default Home

