import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import { Event, EventSummary } from '../dummyData'
import { Icon } from '@iconify/react'
// import { eventList } from '../dummyData'

const LandingPage = () => {
  const [eventList, setEventList] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEventList();
  }, [])

  useEffect(() => {
    console.log("Events:", eventList);
  }, [eventList])
  
  async function getEventList() {
    const res = await fetch(`http://localhost:8000/event/summary`);

    const event_summary: EventSummary = await res.json();
    const event_list: Event[] | null = event_summary.detail;
    setEventList(event_list);
    if (eventList) setIsLoading(false);
  }

  return (
    <div className='bg-slate-200 w-full pt-8 px-[3.67%] min-h-[750px] flex flex-wrap gap-[2vw]'>
      {isLoading ? (
      <>
        <Icon icon="svg-spinners:180-ring" />
      </>
      ) : (
      <>
        {eventList?.map((event, index) => {
          return (
            <>
              <Link key={index} className='h-fit' to={`/events/${event.id}`}>
                <EventCard id={event.id} title={event.title} date={event.date} imageUrl={event.imageUrl} price={event.price} location={event.location} category={event.category} bookingNum={event.bookingNum} revenue={event.revenue}/>
              </Link>
            </>
          )})}
        </>)}
    </div>
  )
}

export default LandingPage