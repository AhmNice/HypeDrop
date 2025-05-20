import React from 'react'
import Input from './Input'
import Textarea from './Textarea'

const ContactCard = () => {
  return (
    <div className='bg-white/10 grid lg:grid-cols-2 gap-5 relative backdrop-blur-lg rounded border  w-full border-white/25 p-4'>
      <div className="flex gap-5 flex-col">
        <Input label={'First Name'}type={'text'}/>
        <Input label={'Last Name'}type={'text'}/>
        <Input label={'Email Address'}type={'email'}/>
      </div>
      <div className='flex gap-5 flex-col'>
        <Textarea label={'Your message'} />
       <div className="flex justify-end">
       <button className='bg-brassYellow p-2 w-28 rounded'>Send</button>
       </div>
      </div>
    </div>
  )
}

export default ContactCard
