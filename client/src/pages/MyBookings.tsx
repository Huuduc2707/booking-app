import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Booking, Seat, Event } from '../interfaces';
import BookingReceipt from '../components/BookingReceipt';
import { Icon } from '@iconify/react';
import { Pagination } from '@mui/material';

const MyBookings = () => {
  const { mail } = useParams();
  const [bookings, setBookings] = useState<{ booking: Booking, event: Event, seat: Seat[] }[]>()
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] =  useState(1)

  useEffect(() => {
    getBookings();
    setLoading(false);
  }, [])

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  async function getBookings(){
    const res = await fetch(`http://localhost:8000/booking/history/${mail}`);

    const result = await res.json();
    setBookings(result);
  }

  return (
    <div className='bg-slate-200 w-full flex items-center min-h-[750px]'>
      {/* <BookingReceipt /> */}
      {isLoading ? (<Icon icon="vg-spinners:180-ring" />) : (
        <>
          {bookings?.map((item, index) => (
            <>
               <BookingReceipt key={index} date={String(item.event.date)} location={item.event.location} imageUrl={item.event.imageUrl} eventName={item.event.title} seats={item.seat.map(item => item.name)}/>
            </>
          ))}
        </>
      )}
    </div>
  )
}

export default MyBookings