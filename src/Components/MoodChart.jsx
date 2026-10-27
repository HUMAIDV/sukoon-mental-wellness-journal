import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown, faFaceFrownOpen, faFaceGrin, faFaceMeh, faFaceSmile } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react'
import Chart from './Chart'

const MoodChart = ({journalData}) => {

    const [maxMood,setMaxMood] = useState('')

    const moodIcons = {"Happy":faFaceGrin,"Calm":faFaceSmile,"Okay":faFaceMeh,"Low":faFaceFrownOpen,"Stressed":faFaceFrown}

  return (
    <div className='glass-card flex flex-col gap-5 rounded-2xl px-10 py-10 bg-white'>
        <div className='flex justify-between items-center text-sm text-2'>
            <p className='font-semibold'>YOUR RHYTHM</p>
            <div id="iconContainer" className='flex gap-2 items-center'>
                <p className='icon'><FontAwesomeIcon icon={moodIcons[maxMood]} color='rgb(82, 112, 139)' /></p>
                <p>{maxMood && (`Mostly ${maxMood}`)}</p>
            </div>
        </div>
        <p className='font-1 text-3xl'>Mood this week</p>
        <div id="chartContainer" className='pb-10'>
            <Chart journalData={journalData} setMaxMood={setMaxMood}/>
        </div>
    </div>
  )
}

export default MoodChart