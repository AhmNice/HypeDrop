import React from 'react'

const ReleaseCard = () => {
  return (
    <div className="w-full max-w-[320px] mx-auto bg-white shadow-2xl rounded-lg p-2 bg-zinc-900" >
        <div className="text-white">
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
                Release Date
            </p>
        </div>
        <div className="flex space-between justify-center gap-4 p-4">
            <div className="flex flex-col text-center text-white font-bold text-sm">
                <span>Days</span>
                <span className="text-xl">00</span>
            </div>
            <div className="flex flex-col text-center text-white font-bold text-sm">
                <span>Hours</span>
                <span className="text-xl">00</span>
            </div>
            <div className="flex flex-col text-center text-white font-bold text-sm">
                <span>Hours</span>
                <span className="text-xl">00</span>
            </div>
            <div className="flex flex-col text-center text-white font-bold text-sm">
                <span>Minutes</span>
                <span className="text-xl">00</span>
            </div>
            <div className="flex flex-col text-center text-white font-bold text-sm">
                <span>Seconds</span>
                <span className="text-xl">00</span>
            </div>
        </div>
    </div>
  )
}

export default ReleaseCard
