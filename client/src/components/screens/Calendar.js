import { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin,{DateClickArg} from '@fullcalendar/interaction';




const Calendar =()=>{
  let [events, setEvents] = useState({})
    let newEvents=[]
    
     const getEvent = async () => {
      let response= await fetch('/api/event');
      let data = await response.json();
      let i = 0
      for(i=0;i<data.length;i++){
        newEvents.push({title: '' , date: ''})
        newEvents[i].title=data[i].name
        newEvents[i].date=data[i].start
        newEvents[i].id=data[i]._id
        newEvents[i].index=i
        
    }
    setEvents(newEvents);
   }
   useEffect( () => {
    getEvent(); 
  }, []);
   
   
  
 const handleDateClick = (i)=>{
   console.log (i.event.id)
   i.dayEl.addEventListener('dblclick',()=>{
   alert(`im Working ${JSON.stringify(i.event.id)}`);
     
  })
 }
return(
    <FullCalendar

  plugins={[ dayGridPlugin,interactionPlugin ]}
  initialView="dayGridMonth"
  events={events}
  eventClick={handleDateClick}
  //  events={[
  //   { title: 'event 1', date: '2021-07-29' },
  //   { title: 'event 2', date: '2021-07-30' }
  //  ]}
/> 
)
}
export default Calendar