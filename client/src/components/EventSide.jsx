import React from 'react'
import EventsPost from './EventsPost'
import { events } from '../Data/eventsData'

function EventSide() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 flex-col h-screen overflow-y-auto gap-4 pb-20 lg:pb-4 pt-[80px] lg:pt-0'>
      {events.map((event) => {
        return <EventsPost key={event.id} event={event}/>
      })}
    </div>
  )
}

export default EventSide
