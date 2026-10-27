import { faCalendar, faFaceSmile, faFaceSmileBeam, faHouse, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Context/ContextProvider'

const Footer =() => {

  const {isDarkMode}=useContext(ThemeContext)

  const [activeIcon,setActiveIcon] = useState(faHouse)

  const activeStyle = `p-2 rounded-xl  ${isDarkMode ? "bg-violet-900" : "bg-violet-200"}`

  const icons=[{"icon":faHouse,"link":"#journalContainer"},{"icon":faFaceSmile,"link":"#moodContainer"},{"icon":faQuoteRight,"link":"#quoteContainer"},{"icon":faCalendar,"link":"#calendarContainer"}]        

  return (
    <div>
        <ul id='navList' className='glass-card backdrop-blur-md fixed bottom-5 left-5 right-5 sm:left-10 sm:right-10 z-1 flex gap-5 justify-between items-center rounded-xl px-5 py-3 md:hidden text-xl'>
          {icons.map((item,index)=>(
              <li key={index} onClick={()=>setActiveIcon(item.icon)} className={`icon w-full text-center cursor-pointer ${activeIcon===item.icon ? activeStyle : ''}`} ><a href={item.link} className='icon'><FontAwesomeIcon icon={item.icon} color='' /></a></li>
          ))}
        </ul>
        <div id="footer" className='hidden md:flex gap-5 justify-between items-center border-t-1 border-violet-300 px-5 py-5 sm:px-10 md:px-20 lg:px-10 xl:px-25 text-2 text-xs'>
            <p>Your words stay on this device.</p>
            <p>Made for quieter moments.</p>
        </div>
    </div>
  )
}

export default Footer