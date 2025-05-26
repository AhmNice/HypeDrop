import React from 'react'
import Card from './cards/PlayCard'

const Overlay = ({snippet}) => {
  return (
    <div className='absolute left-0 top-0 h-screen w-full overlay bg-white/50 backdrop-blur-md text-white z-60 bg-opacity-75 flex justify-center items-center'>
      <Card snippet={snippet}/>
    </div>
  )
}

export default Overlay
