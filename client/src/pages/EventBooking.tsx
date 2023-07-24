import React, {useState, useEffect} from 'react'
import { Seat, Event } from '../dummyData'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'

const EventBooking = () => {
  const { id } = useParams();
  const dummyArray = new Array(100).fill(null)

  const [seatList, setSeatList] = useState<Seat[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEventInfo();
  }, [])

  async function getEventInfo() {
    const res = await fetch(`http://localhost:8000/event/detail/${id}`);

    const seats = await res.json();
    setSeatList(seats);
    setIsLoading(false);
  }

  return (
    <div className='bg-[#f1f1f1]'>
      <div className='event-info bg-gradient-to-r from-[#20212A] to-[#3B3251] text-white/80 py-4'>
        <div className='content-box w-2/3 my-0 mx-auto'>
          <div className='text-3xl font-bold mb-8'>BORN PINK</div>
          <div>CGV Hung Vuong Plaza | Cinema 5 | Số ghế (256/260)</div>
          <div> 31/10/2017 | 22:10 PM  - 24:46 PM </div>
        </div>
      </div>
      <div className='main-container content-box w-2/3 my-0 mx-auto py-8 flex flex-col gap-8'>
        <div className='seat-states flex gap-4'>
          <span>Please choose your seats</span>
          <div className='flex gap-2'>
            <div className='w-[24px] h-[24px] bg-white border border-solid border-black'/>
            Empty seats
          </div>
          <div className='flex gap-2'>
            <div className='w-[24px] h-[24px] bg-red-950 border border-solid border-black'/>
            Chosen seats
          </div>
          <div className='flex gap-2'>
            <div className='w-[24px] h-[24px] bg-neutral-500 border border-solid border-black'/>
            Occupied seats
          </div>
        </div>
        <div className="seat-categories w-3/5 flex flex-wrap">
          <div className="category-card border border-dashed border-slate-500/30 bg-neutral-300/75 flex gap-4 px-4 items-center relative basis-1/2">
            <div className='border border-solid border-slate-500 w-[32px] h-[32px] bg-[#99e4f5]' />
            <div className='flex flex-col'>
              <div className='font-semibold text-lg'>VIP Seating</div>
              <div>80000</div>
            </div>
            <Icon className='w-[32px] h-[32px] text-zinc-500 absolute right-2' icon="mdi:information-variant-circle"/>
          </div>
          <div className="category-card border border-dashed border-slate-500/30 bg-neutral-300/75 flex gap-4 px-4 items-center relative basis-1/2">
            <div className='border border-solid border-slate-500 w-[32px] h-[32px] bg-[#99e4f5]' />
            <div className='flex flex-col'>
              <div className='font-semibold text-lg'>VIP Seating</div>
              <div>80000</div>
            </div>
            <Icon className='w-[32px] h-[32px] text-zinc-500 absolute right-2' icon="mdi:information-variant-circle"/>
          </div>
        </div>
        <div className="seat-container w-3/5 bg-white flex flex-col gap-12 px-6 py-2">
          <div className="screen bg-gray-600 text-center text-white font-bold text-2xl py-3">SCREEN</div>
          <div className="seats flex gap-2 flex-wrap">
            {isLoading ? (<><Icon icon="svg-spinners:270-ring" /></>) : (
              <>
                {seatList?.map((item, index) => (
                  <div className='basis-[9%] h-[24px] bg-slate-200'>
                    {index}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className='payment-info'>

        </div>
      </div> 
    </div>
  )
}

export default EventBooking