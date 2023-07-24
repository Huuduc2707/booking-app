import React from 'react'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import { eventList } from '../dummyData'



const LandingPage = () => {
  return (
    <div className='bg-slate-200 w-full pt-8 px-[3.67%] min-h-[750px] flex flex-wrap gap-[2vw]'>
      {eventList.map((event, index) => {
      return (
        <>
          <Link key={index} className='h-fit' to={`/events/${event.id}`}>
            <EventCard id={event.id} name={event.name} date={event.date} image_url={event.image_url} priceRange={event.priceRange} location={event.location} category={event.category}/>
          </Link>
        </>
      )})}
    </div>
  )
}

export default LandingPage