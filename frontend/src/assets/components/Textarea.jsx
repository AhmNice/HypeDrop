import React from 'react'

const Textarea = ({label,placeholder}) => {
  return (
    <div className='flex flex-col relative'>
        <label className='relative move-t-15 z-1 text-gray-400' >{label}</label>
        <br></br><textarea placeholder={placeholder} className='text-gray-400 cursor-pointer outline-none border resize-none h-28 border-gray-600 bg-transparent p-2'></textarea>
    </div>
  )
}

export default Textarea
