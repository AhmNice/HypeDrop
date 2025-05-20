import React from 'react'
import UploadForm from '../components/UploadForm'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const UploadSnippetPage = () => {
  return (
    <section style={{ gridTemplateColumns: '20%  80%' }} className='w-full bg-gray-50 flex items-center justify-center h-screen'>
    <Navbar/>
    <div className='bg-gray-50  overflow-hidden w-full h-screen flex flex-col'>
        <Header/>
        <div className="py-4 px-8 overflow-y-auto">
            <UploadForm/>
        </div>
    </div>
   </section>
  )
}

export default UploadSnippetPage
