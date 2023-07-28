import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Booking, Seat, Event } from '../interfaces';
import BookingReceipt from '../components/BookingReceipt';
import { Icon } from '@iconify/react';
import { Pagination } from '@mui/material';

const MyBookings = () => {
  const { mail } = useParams();
  const [bookings, setBookings] = useState<{ booking: Booking, event: Event, seat: Seat[] }[]>([])
  const [slicedBookings, setSlicedBookings] = useState<{ booking: Booking, event: Event, seat: Seat[] }[]>([])
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getBookings();
    setLoading(false);
  }, [])

  useEffect(() => {
    
  }, [isLoading])

  useEffect(() => {
    setSlicedBookings(bookings.slice((currentPage - 1) * 10, currentPage * 10))
    if (slicedBookings) setLoading(false);
  }, [bookings, currentPage]); 

  async function getBookings(){
    const res = await fetch(`http://localhost:8000/booking/history/${mail}`);

    const result = await res.json();
    setBookings(result);
  }

  return (
    <div className='bg-slate-200 w-full flex flex-col items-start gap-4 px-6 py-8 min-h-[750px]'>
      <div className='w-[1565px] self-center bg-zinc-700 text-3xl text-center text-white font-bold py-3 rounded-md'>My Bookings</div>
      {/* <BookingReceipt /> */}
      <div className='flex flex-wrap items-start w-full gap-4 px-[118.5px] min-h-[600px]'>
        {isLoading ? (<Icon icon="vg-spinners:180-ring" />) : (
          <>
            {slicedBookings?.map((item, index) => (
              <>
                <BookingReceipt key={index} date={String(item.event.date)} location={item.event.location} imageUrl={item.event.imageUrl} eventName={item.event.title} seats={item.seat.map(item => item.name)}/>
              </>
            ))}
          </>
        )}
      </div>
      <Pagination count={Math.ceil(bookings?.length / 10)} page={currentPage} onChange={(e, value) => setCurrentPage(value)} className='my-8 self-center' />
    </div>
  )
}

export default MyBookings