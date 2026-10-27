import React, { act, useEffect, useState } from 'react'
import Hero from '../Components/Hero'
import Journal from '../Components/Journal'
import Mood from '../Components/Mood'
import MoodChart from '../Components/MoodChart'
import QuoteCard from '../Components/QuoteCard'
import Calendar from '../Components/Calendar'
import Pattern from '../Components/Pattern'

const Dashboard = () => {

  const [activeMood,setActiveMood] = useState('Okay')

  
  const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
  });

  const [activeDate,setActiveDate]=useState(currentDate)

  const [journalData, setJournalData] = useState(()=>{
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('journalEntries')
      return saved ? JSON.parse(saved) : []
    }
    return [];
  })

  const [filteredJournalData,setFilteredJournalData]=useState([])
  // let filteredJournalData=[]

  useEffect(()=>{

    const filteredData = journalData.filter(entry=>{
      if(!activeDate) return;
      return entry.date.includes(activeDate)
    })

    setFilteredJournalData(filteredData)
  },[activeDate,journalData])

  console.log(filteredJournalData);
  

  return (
    <div id='dashboardContainer' className='px-5 pb-30 sm:px-10 md:pb-5 md:px-20 lg:px-10 xl:px-25 overflow-x-hidden'>
      <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center'>
        <Hero activeDate={activeDate}/>
      </div>
        <div id="container" className='grid lg:grid-cols-3 gap-5 items-start'>
        <div id="left" className='grid lg:col-span-2 gap-5'>
        <Pattern journalData={journalData}/>

        <Journal activeDate={activeDate} activeMood={activeMood} setActiveMood={setActiveMood} journalData={journalData} setJournalData={setJournalData} filteredJournalData={filteredJournalData}/>
        <Mood activeMood={activeMood} setActiveMood={setActiveMood} />
        <MoodChart journalData={journalData}/>

        </div>
        <div id="right" className='grid gap-5 md:grid-cols-2 lg:grid-cols-1'>

        <QuoteCard />
        <Calendar journalData={journalData} activeDate={activeDate} setActiveDate={setActiveDate}/>
        </div>

        </div>
    </div>
  )
}

export default Dashboard