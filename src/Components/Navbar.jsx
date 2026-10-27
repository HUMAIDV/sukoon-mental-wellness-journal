import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faFaceGrin, faFaceSmile, faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faFaceSmileBeam, faHouse, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../Context/ContextProvider'
const Navbar = () => {

    const {isDarkMode,setIsDarkMode} = useContext(ThemeContext)

    const [activeIcon,setActiveIcon] = useState(faHouse)
    
      const activeStyle = `p-2 rounded-xl ${isDarkMode ? 'bg-violet-900' : 'bg-violet-200'}`;
    
      const icons=[{"icon":faHouse,"link":"#journalContainer"},{"icon":faFaceSmile,"link":"#moodContainer"},{"icon":faQuoteRight,"link":"#quoteContainer"},{"icon":faCalendar,"link":"#calendarContainer"}]  
    

    return (
    <div id='navbar' className='glass-card backdrop-blur-md flex justify-between items-center border-b-1 border-violet-300 px-5 py-5 sticky top-0 z-10 bg-violet-100 sm:px-10 md:px-20 lg:px-10 xl:px-25 min-w-full'>
        <a href="/">
        <div id="logo" className='flex items-center gap-5'>
            <FontAwesomeIcon color='black' icon={faBookBookmark} className='icon text-2xl bg-violet-200 p-3 rounded-xl' />
            <div>
            <p className='text-2xl font-1'>Sukoon</p>
            <p className='text-sm text-gray-400 '>Your Mindful Space</p>
            </div>
        </div>
        </a>
        <ul id='navList' className='hidden md:flex gap-5 sm:text-xl md:text-2xl flex justify-center items-center bg-gray-100 px-5 py-2 rounded-xl lg:min-w-100 glass-card'>
            {icons.map((item,index)=>(
            
                <li key={index} onClick={()=>setActiveIcon(item.icon)} className={`w-full text-center cursor-pointer ${activeIcon===item.icon ? activeStyle : ''}`} ><a href={item.link}><FontAwesomeIcon icon={item.icon} color='' /></a></li>
            ))}
        </ul>
        <div id="btnContainer" className='flex gap-3 sm:gap-5 sm:min-w-30'>

            <button className='icon bg-violet-900 py-2 px-3 rounded-full text-xl cursor-pointer'><FontAwesomeIcon icon={faUser} color='white' /></button>
            
            {isDarkMode ? 
            <button className='icon border-2 border-violet-900 bg-white py-2 px-3 rounded-full text-xl cursor-pointer'  onClick={()=>setIsDarkMode(false)}><FontAwesomeIcon color='blueviolet' icon={faSun} />
            </button>
            :
            <button className='icon border-2 border-violet-900 bg-violet-900 py-2 px-3 rounded-full text-xl cursor-pointer' onClick={()=>setIsDarkMode(true)}>
            <FontAwesomeIcon icon={faMoon} color='white' />
            </button>
            }
        </div>
    </div>
  )
}

export default Navbar