import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo, useState } from 'react';

export default function Calendar({ journalData, activeDate, setActiveDate }) {

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthShort = monthNamesShort[currentMonthIndex];

  const monthHeaderName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // const moodMap = {}
  //  journalData.forEach(entry => {
    
  //     if (entry.date && entry.mood) {
  //       moodMap[entry.date] = entry.mood;
  //     }
  //   });
  const moodMap = useMemo(() => {
    const map = {};
    journalData.forEach(entry => {
      if (entry.date && entry.mood) {
        map[entry.date] = entry.mood;
      }
    });
    return map;
  }, [journalData]);

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonthIndex + 1, 1));
  };

  const moodColors = {
    Calm: 'bg-teal-500 text-white drop-shadow-sm drop-shadow-teal-500',
    Okay: 'bg-cyan-800 text-white drop-shadow-sm drop-shadow-cyan-800',
    Stressed: 'bg-red-900 text-white drop-shadow-sm drop-shadow-red-900',
    Low: 'bg-violet-900 text-white drop-shadow-sm drop-shadow-violet-900',
    Happy: 'bg-amber-500 text-white drop-shadow-sm drop-shadow-amber-500',
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div id='calendarContainer' className='glass-card rounded-2xl px-10 md:px-5 md:py-5 py-10 bg-white sm:max-w-fit md:max-w-full  max-h-fit shadow-sm border border-gray-100'>

      <h3 className="text-3xl font-1 pl-2 mb-3">Look Back</h3>

      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-xl text-2">{monthHeaderName}</h3>
        <div className="arrows">

          <button
            onClick={handlePrevMonth}
            className="icon p-1 rounded-full transition-colors text-gray-600 font-bold text-3xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} className='hover:bg-gray-100 rounded-full max-w-7.5 p-0 border-2' />

          </button>
          <button
            onClick={handleNextMonth}
            className="icon p-1 rounded-full transition-colors text-gray-600 font-bold text-3xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleArrowRight} className='hover:bg-gray-100 rounded-full max-w-7.5 p-0 border-2' />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-gray-400 py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="p-2"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_,idx) => {
          const dayNumber = idx + 1;

          const targetDateStr = `${dayNumber.toString().padStart(2, '0')} ${currentMonthShort} ${currentYear}`;
          const loggedMood = moodMap[targetDateStr];

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const targetDate = new Date(currentYear, currentMonthIndex, dayNumber);
          targetDate.setHours(0, 0, 0, 0);

          const isFutureDate = targetDate > today;

          const active = activeDate === targetDateStr;


          return (
            !isFutureDate ? (
              <a href="#journalContainer" key={dayNumber}>
                <div
                  className={`relative p-2 md:p-0 rounded-full flex flex-col items-center justify-center font-medium transition-all group aspect-square md:text-sm ${loggedMood
                      ? moodColors[loggedMood] || "bg-violet-500 text-white"
                      : ""
                    } ${active
                      ? "border-2 border-gray-400"
                      : "cursor-pointer hover:bg-gray-400"
                    }`}
                  onClick={() => {
                    setActiveDate(targetDateStr);
                  }}
                >
                  <span className={loggedMood ? "text-white" : ""}>
                    {dayNumber}
                  </span>

                  {loggedMood && (
                    <span className="absolute bottom-full mb-1 hidden group-hover:block bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap z-20">
                      {loggedMood}
                    </span>
                  )}
                </div>
              </a> 
            ) : (
              <div
                key={dayNumber}
                className="relative p-2 md:p-0 rounded-full flex flex-col items-center justify-center font-medium aspect-square md:text-sm text-gray-400 cursor-not-allowed"
              >
                <span>{dayNumber}</span>
              </div>
            )
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center text-[10px] font-semibold text-gray-500">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500 inline-block"></span> Happy</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-teal-500 inline-block"></span> Calm</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cyan-800 inline-block"></span> Okay</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-violet-900 inline-block"></span> Low</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-900 inline-block"></span> Stressed</div>
      </div>
    </div>
  );
}
