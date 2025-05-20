
import React, { useEffect, useRef } from 'react'
import yt from '../images/yt.png'
import s from '../images/s.png'
import apple from '../images/apple-music.png'
import audiomack from '../images/audiomack.png'
import sound from '../images/sound.png'
import boomplay from '../images/boomplay.png'
import time from '../images/time.gif'
import chart from '../images/chart.png'
import music from '../images/music.png'
import '../styles/Benefit.css'

const Benefit = () => {
    const cardsRef = useRef([])
    const imagesRef = useRef([])
    useEffect(() => {
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    entry.target.classList.add('visible')
                }
            })
        },
    {threshold:0.5});
    cardsRef.current.forEach((card)=>{
        if(card){
            observer.observe(card)
        }
    });
    imagesRef.current.forEach(image => {
        if(image){
            observer.observe(image)
        }
    });
    return () => {
        cardsRef.current.forEach((card)=>{
            if(card){
                observer.unobserve(card)
            }
        })
        imagesRef.current.forEach((image)=>{
            if(image){
                observer.unobserve(image)
            }
        })
    }
    }, [])
  return (
    <div className='flex flex-col gap-5 bg-eerieBlack h-1/2 py-6 lg:px-20'>
        <div className="text-center rubik-bold text-white text-3xl p-4">With our platform</div>
        <div className="grid lg:grid-cols-4 gap-2 px-10 md:grid-cols-2">
            <div ref={(el)=> cardsRef.current[0] = el} className="cursor-pointer w-[100%] bg-deepSlateBlue card rounded-xl gradient p-4">
                <div className='flex text-4xl p-2 w-full items-center justify-center'><img src={music} alt="" /></div>
               <h1 className='text-center text-white rubik-bold text-lg'>Let Them Hear It First</h1>
                <p className='text-center text-gray-300 text-sm lato-bold leading'>Share exclusive snippets of your upcoming song and build anticipation.</p>
            </div>
            <div ref={(el)=> cardsRef.current[1] = el} className="cursor-pointer w-[100%] bg-deepSlateBlue card rounded-xl gradient p-4">
                <div className='flex text-4xl p-2 w-full items-center justify-center'><img src={time} alt="" /></div>
               <h1 className='text-center text-white rubik-bold text-lg'> Release Day Reminders</h1>
                <p className='text-center text-gray-300 text-sm lato-bold leading'>Keep your fans in the loop with automatic reminders when your song</p>
            </div>
            <div ref={(el)=> cardsRef.current[2] = el} className="cursor-pointer w-[100%] bg-deepSlateBlue card rounded-xl gradient p-4">
                <div className='flex text-4xl p-2 w-full items-center justify-center'><img src={chart} alt="" /></div>
               <h1 className='text-center text-white rubik-bold text-lg'> Boost Engagement</h1>
                <p className='text-center text-gray-300 text-sm lato-bold leading'>Watch your buzz grow as fans interact and share their excitement.</p>
            </div>
            <div ref={(el)=> cardsRef.current[3] = el} className="cursor-pointer w-[100%] bg-deepSlateBlue card rounded-xl gradient p-4">
                <div className='flex text-4xl p-2 w-full items-center justify-center'><img src={chart} alt="" /></div>
               <h1 className='text-center text-white rubik-bold text-lg'> Turn Up the Volume on Your Launch</h1>
                <p className='text-center text-gray-300 text-sm lato-bold leading'>Start now and make every release unforgettable!</p>
            </div>
        </div>
        <div className="flex justify-center">
            <div className='grid lg:flex lg:justify-between grid-cols-2 items-center gap-10 lg:gap-5 md:grid-cols-3'>
                <img ref={(el)=> imagesRef.current[0] = el} src={sound} alt="" className=' image  w-24 grayscale brightness-0 invert object-contain'/>
                <img ref={(el)=> imagesRef.current[1] = el} src={yt} alt="" className=' image  w-40 grayscale brightness-0 invert object-contain'/>
                <img ref={(el)=> imagesRef.current[2] = el} src={s} alt="" className= ' image w-40 grayscale brightness-0 invert object-contain'/>
                <img ref={(el)=> imagesRef.current[3] = el} src={audiomack} alt="" className=' image  w-40 grayscale brightness-0 invert object-contain'/>
                <img ref={(el)=> imagesRef.current[4] = el} src={apple} alt="" className=' image  w-40 grayscale brightness-0 invert object-contain'/>
                <img ref={(el)=> imagesRef.current[5] = el} src={boomplay} alt="" className=' image  w-40 grayscale brightness-0 invert object-contain'/>

            </div>
        </div>

    </div>
  )
}

export default Benefit
