import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Pattern = ({journalData}) => {
  return (
    journalData.length>0 && (
      <div>
      <div id="pattern" className='glass-card max-md:[&_*:not(.font-1)]:!text-[xx-small] flex items-center gap-5 bg-amber-50 rounded-2xl p-5'>
            <p className='icon bg-gray-300 p-4 sm:px-5
            px-4 rounded-xl'><FontAwesomeIcon icon={faChartLine} id='chartIcon' className='icon' color='black'/></p>
            <div id="desc">
            <p id='mH' className='font-1 text-lg'>A gentle pattern</p>
            <p className='text-2 text-sm'>You've checked in {journalData.length} {journalData.length === 1 ? 'time' : 'times'}. Showing up is meaningful.</p>
            </div>
            </div>
            </div>

    )
  )
}

export default Pattern