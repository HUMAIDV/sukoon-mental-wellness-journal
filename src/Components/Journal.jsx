import React, { useEffect, useState } from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faL } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const Journal = ({activeMood,setActiveMood,journalData,setJournalData,activeDate,filteredJournalData}) => {

    const [loading,setLoading]=useState(false)
    const [isSaved,setIsSaved] = useState(false)
    
    const [journal,setJournal] = useState('')
    const [activeTags, setActiveTags] = useState(['Grateful']);


    const baseStyle = "tag cursor-pointer transition-bg border-1 py-1 px-2 rounded-full";
    const activeStyle = "bg-gray-100 border-gray-300 text-gray-900 border-2 px-3"; 

    const tags = ['Grateful', 'Reflective', 'Stressful', 'Hopeful'];
    
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            if (journal.trim().length<1) {
                setJournal('')
            return;
        }

        let updatedJournalData;
        
        if (filteredJournalData.length>0) {
            
            updatedJournalData = journalData.map(entry=>{
                if (entry?.date === activeDate) {
                    return {
                        ...entry,          
                        journal: journal,  
                        tag: activeTags,    
                        mood: activeMood   
                    };
                }
                return entry;
            })
            console.log("upd",updatedJournalData);
            
        }else{
            const newEntry = {"id":Date.now(),"journal": journal,"tag":activeTags, "mood": activeMood, "date":`${filteredJournalData.length>0 ? filteredJournalData[0]?.date : activeDate}`}
            console.log("new",newEntry);
            
            updatedJournalData = [...journalData,newEntry]
        }
        setJournalData(updatedJournalData)
        console.log("updated",updatedJournalData);
        
    
        localStorage.setItem('journalEntries',JSON.stringify(updatedJournalData))

        setLoading(false)
        setIsSaved(true)
        toast.success('Journal saved successfully!');
        
    } catch (error) {
        toast.success('Server Error: ',error);
    }
        
        
    }

    useEffect(()=>{
        if (filteredJournalData.length>0) {
            setIsSaved(true)
            setJournal(filteredJournalData[0]?.journal)
            setActiveTags(
            Array.isArray(filteredJournalData[0]?.tag)
                ? filteredJournalData[0].tag
                : filteredJournalData[0]?.tag
                ? [filteredJournalData[0].tag]
                : []
            );
            setActiveMood(filteredJournalData[0]?.mood)
        }else{
            
        setIsSaved(false)

        setJournal('')
        setActiveTags(['Grateful'])
        setActiveMood('Okay')
        }
    },[filteredJournalData,activeDate])

    useEffect(()=>{
        console.log("tags",activeTags);
        
    },[activeTags])

  return (
    <div id='journalContainer' className='glass-card flex flex-col gap-5 bg-white rounded-2xl px-10 py-10'>
        <div className='flex justify-between items-center text-2 text-sm'>
            <p className='font-semibold'>Daily Reflection
                {/* {activeDate} */}
            </p>
            <p>{isSaved ? 'Saved Locally' : 'Not Saved'}</p>
        </div>
        <p id="heading" className='text-3xl font-1'>What's on your mind?</p>
        <form action="" onSubmit={handleSubmit}>

        <textarea name="journal" id="journal" placeholder='let your thoughts arrive without judgement...' className='border-2 border-gray-400 bg-gray-100 rounded-2xl p-3 min-h-50 min-w-full mb-5 text-black' value={journal} onChange={(e)=>{
            
            setJournal(e.target.value)

        }} required maxLength={2000}></textarea>

        <div id="tagContainer" className='flex flex-col gap-3 text-2 border-b-1 sm:border-b-2 border-gray-300 pb-3 text-md'>
            <p >Add a feeling or theme</p>
            <div id="tags" className='flex justify-start gap-2 sm:gap-5 items-center text-xs sm:text-sm text-3'>
                {tags.map((tag,index)=>(
                    <p key={index} className={`${baseStyle} ${activeTags.includes(tag) ? activeStyle : ''}`} onClick={()=>setActiveTags(prevTag =>
                        prevTag.includes(tag)
                        ? prevTag.filter(item => item !== tag)
                        : [...prevTag, tag]
                    )}>{tag}</p>
                ))}
            </div>
        </div>
        <div className='flex justify-between items-center text-3 mt-5'>
            <p className='text-sm'>{journal.trim().length}/2000</p>
            
                <button className={`btn-primary py-3 px-6 ${journal.trim().length<1 || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `} 
                ><FontAwesomeIcon icon={faBookmark} />&nbsp;{`${filteredJournalData.length>0 ? 
                    (loading ? "Updating..." : "Update Journal") : (loading ? "Saving..." : "Save Journal")
                }`}</button>
        </div>
        </form>
    </div>
  )
}

export default Journal