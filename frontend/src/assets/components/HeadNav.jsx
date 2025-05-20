import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";
import picture  from '../images/usersImage/pro_shizle.jpg'

const HeadNav = ({userName, pic, message, notification}) => {
    document.title ='HypeDrop | Dashboard'
  return (
    <div className='w-full flex justify-between items-center bg-white px-14'>
        <div className="username flex items-center font-bold text-xl">{userName} Rapstar Shizle</div>
        <div className="profileNote flex gap-5 p-4 items-center">
            <IoMdNotifications />
            <FaEnvelope/>
            <div className="rounded-full flex overflow-hidden w-8 h-8 bg-green-500">
                <img src={picture} alt="user" className='object-cover w-full h-full'/>
            </div>
        </div>
    </div>
  )
}

export default HeadNav
