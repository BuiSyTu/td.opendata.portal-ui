import React from 'react'

import CardMostView from './components/CardMostView'
import CardNewsCarousel from './components/CardNewsCarousel'
import CardStatistical from './components/CardStatistical'

const Home = () => {
  return (
    <>
      <CardMostView />
      <CardStatistical />
      <CardNewsCarousel />
    </>
  )
}


export default Home

