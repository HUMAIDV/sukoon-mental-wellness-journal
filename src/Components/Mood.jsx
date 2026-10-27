import { faFaceFrown, faFaceFrownOpen, faFaceGrin, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const Mood = ({ activeMood,setActiveMood }) => {

    // const [activeIcon,setActiveIcon] = useState('Okay')

    const activeStyle = "bg-violet-200 p-4 rounded-xl"
    const activeIconStyle = "border-1 pt-0.25 sm:border-3 rounded-full border-violet-1000"

    const moods = [{"icon":<FontAwesomeIcon icon={faFaceGrin} color='rgb(236, 172, 53)'/>, "desc":"Happy"},{"icon":<FontAwesomeIcon icon={faFaceSmile} color='rgb(58, 145, 116)'/>, "desc":"Calm"},{"icon":<FontAwesomeIcon icon={faFaceMeh} color='rgb(82, 112, 139)' />, "desc":"Okay"},{"icon":<FontAwesomeIcon icon={faFaceFrownOpen} color='rgb(93, 68, 134)'/>, "desc":"Low"},{"icon":<FontAwesomeIcon icon={faFaceFrown} color='rgb(148, 92, 92)'/>, "desc":"Stressed"},]
    

  return (
    <div id='moodContainer' className='glass-card flex flex-col gap-5 rounded-2xl px-10 py-10 bg-white'>
        <div className='flex justify-between items-center text-sm text-2'>
            <p className='font-semibold'>CHECK IN</p>
            <p>Feeling {activeMood}</p>
        </div>
        <p id="heading" className='font-1 text-3xl'>How does today feel?</p>
        <div id="iconContainer" className='flex justify-between items-center text-xs text-2 mt-0 md:text-lg'>
            {moods.map((mood,index)=>(

                <div className={`singleIcon flex flex-col items-center cursor-pointer ${activeMood===mood.desc ? activeStyle : ''}`} key={index} onClick={()=>setActiveMood(mood.desc)}>
                <p className={`icon text-3xl mb-2 pb-0 ${activeMood===mood.desc ? activeIconStyle : ''}`}>{mood.icon}</p>
                <p className="desc">{mood.desc}</p>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default Mood