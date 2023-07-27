import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import { Event, EventSummary } from '../interfaces'
import { Icon } from '@iconify/react'
import { TextField, Pagination, IconButton } from '@mui/material'
// import { eventList } from '../dummyData'

const LandingPage = () => {
  const [eventList, setEventList] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredEventList, setFilteredEventList] = useState<Event[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [slicedEventList, setSlicedEventList] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getEventList();
  }, [])

  useEffect(() => {
    setFilteredEventList(eventList.filter(event => (event.title.toLowerCase().includes(searchValue.toLowerCase()) || event.location.toLowerCase().includes(searchValue.toLowerCase()) || event.category?.some(item => item.name.toLowerCase().includes(searchValue.toLowerCase())))))
  }, [eventList, searchValue]);

  useEffect(() => {
    setSlicedEventList(filteredEventList.slice((currentPage - 1) * 8, currentPage * 8))
    if (slicedEventList) setIsLoading(false);
  }, [filteredEventList, currentPage]); 

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])
  
  async function getEventList() {
    const res = await fetch(`http://localhost:8000/event/summary`);

    const event_summary: EventSummary = await res.json();
    const event_list: Event[] | null = event_summary.detail;
    setEventList(event_list);
  }

  return (
    <>
    <div className='bg-slate-200 w-full flex flex-col items-center'>
      <TextField variant='outlined' label="Search" onChange={e => {setSearchValue(e.target.value)}} className='w-1/4 !mt-8'/>
      <div className='bg-slate-200 w-full pt-8 px-[3.67%] min-h-[750px] flex flex-wrap gap-[2vw]'>
        {isLoading ? (
        <>
          <Icon icon="svg-spinners:180-ring" />
        </>
        ) : (
        <>
          {slicedEventList.length === 0 ? (<div>No items found</div>) : slicedEventList?.map((event, index) => {
            return (
              <>
                <Link key={index} className='h-fit' to={`/events/${event.id}`}>
                  <EventCard id={event.id} title={event.title} date={event.date} imageUrl={event.imageUrl} price={event.price} location={event.location} category={event.category} bookingNum={event.bookingNum} revenue={event.revenue}/>
                </Link>
              </>
            )})}
          </>)}
      </div>
      <Pagination count={Math.ceil(eventList.length / 8)} page={currentPage} onChange={(e, value) => setCurrentPage(value)} className='my-8'/>
    </div>
    </>
  )
}

export default LandingPage