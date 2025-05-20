import React from 'react'
import Navbar from '../assets/components/Navbar'
import Footer from '../assets/components/Footer'

const Contact = () => {
  document.title='HypeDrop | Contact'
  return (
    <section className='bg-home-gradient h-full w-full'>
       <Navbar/>
       <div className="formContainer  flex items-center flex-col h-5/6 justify-center">
        <div className="shadow-md bg-charcoal  p-4 rounded-md ">
            <h3 className='text-2xl text-gray-300 font-bold'>Contact Us</h3>
            <form action="#" className='grid gap-5 text-gray-300 grid-cols-2 p-2'>
               <div className="formInput">
               <label className='flex text-gray-300 flex-col gap-2' htmlFor="Name *">
                    Your Name
                    <input type="text" className='text-gray-400 cursor-pointer outline-none border border-gray-300 rounded border-charcoal bg-transparent p-2' />
                </label>
                </div>

                <div className="formInput">
               <label className='flex flex-col gap-2 ' htmlFor="Email *">
                    Email Address
                    <input type="email" className='text-gray-400 cursor-pointer outline-none border border-gray-300 rounded border-charcoal bg-transparent p-2' />
                </label>
               </div>

               <div className="formInput col-span-2">
                <label className='flex flex-col gap-2 ' htmlFor="subject *">
                    Subject
                    <textarea name="" id="" cols="30"  className='resize-none h-52 text-gray-400 cursor-pointer outline-none border border-gray-300 rounded border-charcoal bg-transparent p-2'></textarea>
                </label>
               </div>
               <div className="btn flex justify-end col-span-2">
                    <button className='pt-3 text-white pb-3 p-10 bg-eerieBlack rounded-md'>submit</button>
               </div>
            </form>
        </div>
       </div>
       <Footer />

    </section>
  )
}

export default Contact
