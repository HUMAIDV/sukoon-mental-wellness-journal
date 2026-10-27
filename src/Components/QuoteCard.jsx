import { faHandSparkles, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const QuoteCard = () => {

  const [quote,setQuote]=useState([])

  const fetchQuote = async ()=>{
    try {
      
      const response = await fetch('https://dummyjson.com/quotes/random')
      const data = await response.json()
      setQuote(data)
      console.log("QuoteData",data);
      
    } catch (error) {
     console.log("Error",error);
      
    }
  }

  useEffect(()=>{
    fetchQuote();
  },[])

  return (
    <div id='quoteContainer' className='glass-card flex flex-col gap-5  rounded-2xl px-10 py-10 max-h-fit'>
        <div className='flex justify-between items-center text-sm text-2'>
            <p className='font-semibold'>A THOUGHT FOR TODAY</p>
            <button className='icon'><FontAwesomeIcon icon={faQuoteRight} className='icon' /></button>
        </div>
        <p id="quote" className='font-2 text-3xl'>{quote?.quote}</p>
        <p id="author" className='font-4 text-2 text-xl'>- {quote?.author}</p>
        
    </div>
  )
}

export default QuoteCard