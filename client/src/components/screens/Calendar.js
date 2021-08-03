import { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



const Calendar =()=>{
  let [events, setEvents] = useState({})
    console.log("killme")
    let newEvents=[]
    
     const getEvent = async () => {
      let response= await fetch('/event');
      let data = await response.json();
      let i = 0
      for(i=0;i<data.length;i++){
        newEvents.push({title: '' , date: ''})
        newEvents[i].title=data[i].name
        newEvents[i].date=data[i].start
        
    }
    setEvents(newEvents);
   }
   useEffect( () => {
    getEvent(); 
  }, []);
   
   console.log("line25 im here",events)
  

return(
    <FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  events={events}
  //  events={[
  //   { title: 'event 1', date: '2021-07-29' },
  //   { title: 'event 2', date: '2021-07-30' }
  //  ]}
/> 
)
}
export default Calendar