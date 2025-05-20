import React from 'react'
import audiomack from '../../images/audiomack.png'
import appleMusic from '../../images/apple-music.png'
import spotify from '../../images/s.png'
import yt from '../../images/yt.png'
import '../../styles/Overlay.css'



const Card = () => {
  return (
    <div className='card rounded-xl w-96 bg-white text-gray-700 flex-col'>
      <div className="p-2 border-b border-gray-500">

        <h1 className='px-2 text-lg font-bold'>Play with:</h1>
      </div>
      <div className="flex p-4 flex-col w-full rounded-b-xl ">
        <div className='flex justify-between items-center flex-col gap-2'>

          <div className="flex justify-center gap-2 w-full">
            <a href='/'>
              <img src={audiomack} alt="audiomack" className="h-12  object-contain" />
            </a>
            <a href='/'>
              <img src={appleMusic} alt="appleMusic" className="h-12  object-contain" />
            </a>
            <a href='/'>
              <img src={spotify} alt="spotify" className="h-20 -mt-3 object-contain" />
            </a>
            <a href='/'>
              <img src={yt} alt="spotify" className="h-12  object-contain" />
            </a>
          </div>
          <div className="text-center  text-gray-700 font-medium text-xs">
            This song is now avaliable on streaming platforms
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
