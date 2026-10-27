import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const moodScores = {
  Stressed: 1,
  Low: 2,
  Okay: 3,
  Calm: 4,
  Happy: 5
};


const Chart=({journalData, setMaxMood}) => {

  const [selectedPeriod,setSelectedPeriod] = useState(7)

  const today = new Date()
  today.setHours(0,0,0,0)

  const startDate = new Date(today)
  startDate.setDate(today.getDate() - (selectedPeriod-1))

  const filteredData = journalData.filter((entry)=>{
    const entryDate = new Date(`${entry.date}`)
    return entryDate >= startDate && entryDate <= today
  })

  useEffect(()=>{
  const md = {}
      filteredData.forEach((entry) => {
          const mood = entry?.mood || 'Unknown'
          md[mood] = (md[mood] || 0) + 1;
      });
      // console.log("md",md);
      
  const maxMood = Object.keys(md).reduce((a, b) => md[a] > md[b] ? a : b, null);
    setMaxMood(maxMood)
  },[filteredData])

  filteredData.sort((a,b)=> new Date(a.date) - new Date(b.date))
    const moodData = filteredData.map((entry) => ({
        
        day: new Date(entry?.date).toLocaleDateString('en-US', {
        weekday: 'short',
    }),
        mood: moodScores[entry?.mood]
    }));
    console.log("md1",moodData);

    
    function CustomTooltip({ active, payload }) {
      if (active && payload && payload.length) {
        const { day, mood } = payload[0].payload;
        const tooltipMood = Object.keys(moodScores).find(key => moodScores[key] === mood)

    return (
      <div className="glass-card p-3 rounded-xl text-black">
        <p className="font-semibold">{day}</p>
        <p>Mood : {tooltipMood}</p>
      </div>
    );
  }

  return null;
}
    
  return (
    <div className="w-full max-h-50 sm:max-h-fit">
      {/* <h2>Mood Trends</h2> */}
      <div className="flex gap-3 mb-4 text-xs md:text-md">
        <button className={`${selectedPeriod===7 ? 'btn-primary' : 'btn-secondary'} cursor-pointer py-2 px-5`} onClick={() => setSelectedPeriod(7)}>
          Last 7 Days
        </button>

        <button className={`${selectedPeriod===3 ? 'btn-primary' : 'btn-secondary'} cursor-pointer py-2 px-5`} onClick={() => setSelectedPeriod(3)}>
          Last 3 Days
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%" className={"min-h-50 sm:min-h-75 pt-5"}>
        <LineChart data={moodData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis domain={[1, 5]} />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="mood"
            stroke="#8B7BC8"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;