import React from 'react'
import Hero from '../components/Hero'
import Benefit from '../components/Benefit'
import HowItWork from '../components/HowItWork'

import Footer from '../components/Footer'

const HomePage = () => {
  document.title='HypeDrop'
  return (
    <div className='bg-home-gradient'>
      <Hero />
      <Benefit/>
      <HowItWork/>
      {/* <Contact /> */}
      <Footer/>
    </div>
  )
}

export default HomePage
