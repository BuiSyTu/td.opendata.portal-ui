import React from 'react'

import CardMostViewedDatas from './components/CardMostViewedDatas'
import CardNewsCarousel from './components/CardNewsCarousel'
import CardStatistical from './components/CardStatistical'

const Home = ({ location }) => {
  console.log(location)

  return (
    <>
      <CardMostViewedDatas />

      <CardStatistical />

      <CardNewsCarousel />
    </>
  )
}


export default Home

