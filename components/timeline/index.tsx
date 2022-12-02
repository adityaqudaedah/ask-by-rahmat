import React from 'react'
import TimelineList from './TimelineList'

const TimeLine = () => {
  return (
    <div className='flex flex-col w-full h-screen space-y-4 mt-10'>
        <h1 className='font-semibold text-lg'>Timeline</h1>
        {/* timeline list item */}
        <TimelineList/>
        <TimelineList/>
        <TimelineList/>
    </div>
  )
}

export default TimeLine