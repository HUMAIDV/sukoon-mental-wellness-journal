import React from 'react'

const Hero=({activeDate}) => {

const date = new Date(activeDate);

const formattedDate = date.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

  return (
    <div id='heroContainer' className='flex flex-col gap-3 min-w-100 px-0 py-10'>
        <p className='text-gray-500'>{formattedDate}</p>
        <p className='text-5xl font-1'>How are you, really?</p>
        <p className='text-gray-400 font-2 text-2xl'>Take a slow breath. This space is yours.</p>
    </div>
  )
}

export default Hero