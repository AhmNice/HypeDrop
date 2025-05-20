import React from 'react'

const HowItWork = () => {
  return (
    <div  className='bg-charcoal pd-8 lg:px-24 text-white p-4'>
        <div className='text-center rubik-bold text-white text-3xl p-4'>
            <h1>How It Works</h1>
        </div>
        <ul className="list-disc list-inside space-y-4">
    <li className='list-decimal'>
      <span className='rubik-bold text-xl'>Upload Your Snippet</span>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li className='lato-regular text-lg text-gray-500'>Start by uploading a short snippet of your upcoming song to our platform.</li>
        <li className='lato-regular text-lg text-gray-500'>Set the stage and create excitement for your next big release!</li>
      </ul>
    </li>
    <li className='list-decimal'>
      <span className='rubik-bold text-xl'>Share Your Link</span>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li className='lato-regular text-lg text-gray-500'>Instantly get a shareable link to your snippet.</li>
        <li className='lato-regular text-lg text-gray-500'>Post it on your social media, newsletters, or anywhere your fans can find it.</li>
      </ul>
    </li>
    <li className='list-decimal'>
      <span className='rubik-bold text-xl'>Engage Your Fans</span>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li className='lato-regular text-lg text-gray-500'>When fans listen to your snippet, they’ll be asked to provide their email or phone number.</li>
        <li className='lato-regular text-lg text-gray-500'>This ensures they won’t miss your release when it drops.</li>
      </ul>
    </li>
    <li className='list-decimal text-bold'>
      <span className='rubik-bold text-xl'>Send Release Reminders</span>
      <ul className="list-disc pl-6 mt-2 space-y-2">
        <li className='lato-regular text-lg text-gray-500'>On release day, we’ll notify your fans via email or SMS.</li>
        <li className='lato-regular text-lg text-gray-500'>Include a direct link to your song, making it easy for them to stream or purchase.</li>
      </ul>
    </li>
  </ul>
  <p className="mt-6 text-center text-brassYellow rubik-bold text-xl">Grow your fanbase, build anticipation, and ensure your music gets heard!</p>
    </div>
  )
}

export default HowItWork
