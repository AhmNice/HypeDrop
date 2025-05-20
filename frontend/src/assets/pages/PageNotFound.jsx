import React, { useEffect,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  useEffect(()=>{
    document.title = 'Page not found'
  },[])
  const navigate = useNavigate();
  return (
    <div className='bg-home-gradient w-full h-screen  flex flex-col justify-center items-center'>
      <h1 className='text-9xl rubik-bold'>
        404
      </h1>
      <p className='text-3xl'>
        Page not found
      </p>
      <div className='pt-10'>
        <Link to='/'>
        <button className="rounded-md text-white rubik-bold bg-darkSlateGray shadow-md pl-10 pr-10 p-3">
          Go back Home
        </button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
