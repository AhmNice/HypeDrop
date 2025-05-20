import React from 'react'
import Card from './cards/PlayCard'

const Overlay = () => {
  return (
    <div className='absolute left-0 top-0 h-screen w-full bg-gray-500 text-white z-10 bg-opacity-75 flex justify-center items-center'>
      <Card />
    </div>
  )
}

export default Overlay
