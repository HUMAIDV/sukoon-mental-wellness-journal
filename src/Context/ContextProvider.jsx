import React, { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ContextProvider = ({children}) => {

    
        const [isDarkMode,setIsDarkMode] = useState(()=>{
            if(typeof window !== 'undefined'){
                const savedTheme = localStorage.getItem('theme')
                return savedTheme === 'dark'
            }
            return false;
        })
    
        useEffect(()=>{
            const root= window.document.documentElement;
            if (isDarkMode) {
                root.classList.add("dark")
                localStorage.setItem('theme','dark')
            }else{
                root.classList.remove("dark")
                localStorage.setItem('theme','light')
            }
        },[isDarkMode])

  return (
    <ThemeContext.Provider value={{isDarkMode,setIsDarkMode}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextProvider