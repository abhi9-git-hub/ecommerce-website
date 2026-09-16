import React from 'react'

export const Spinner = () => {
  return (
    <div className='flex justify-center pt-[200px] h-full'>
       <div className='w-20 h-20 border-8 border-gray-200 border-t-green-900 rounded-full
       animate-spin'></div>
    </div>
  )
}
