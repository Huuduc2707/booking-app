import React from 'react'
import { Booking } from '../interfaces'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Icon } from '@iconify/react'

interface Props {
  date: string;
  seats: string[];
  eventName: string;
  location: string;
  imageUrl: string;
}

const BookingReceipt: React.FC<Props> = ({ date, seats, eventName, location, imageUrl }) => {
  const liveDate = new Date(date);
  return (
    <Card className='w-[20%] min-w-[200px] max-w-[300px] !shadow-none'>
        <CardMedia
          src={imageUrl}
          className='w-full h-[120px] !object-cover'
          component="img"
        />
        <CardContent className='flex flex-col !p-0 relative'>
          <div className='w-[16px] h-[16px] bg-slate-200 rounded-full absolute top-[-8px] left-[-7px]' />
          <div className='w-[16px] h-[16px] bg-slate-200 rounded-full absolute top-[-8px] right-[-7px]' />
          <div className='flex justify-between border-b-[1px] border-dashed border-slate-400 py-3 px-[16px] bg-green-100'>
            <div className='w-2/3 font-bold'>{eventName.toUpperCase()}</div>
            <div className='flex gap-1 items-center'>
              <Icon icon="material-symbols:calendar-month" className='m-0 text-green-500'/>
              <div>{liveDate.getDate()}/{liveDate.getMonth() + 1}/{liveDate.getFullYear()}</div>
            </div>
          </div>
          <div className='px-[16px] py-3 bg-green-200 border border-x-0 border-dashed border-slate-400'>
            <div>Seats: </div>
            <div className='flex flex-wrap gap-2'>
              {seats.map((seat, index) => (
                <div key={index} className='bg-yellow-200 py-1 px-2'>
                  {seat}
                </div>
              ))}
            </div>
          </div>
          <div className='flex gap-1 items-center py-3 px-[16px] bg-green-100'>
            <Icon icon="material-symbols:location-on-rounded" className='text-red-500'/>
            <div>{location.toUpperCase()}</div>
          </div>
        </CardContent>
    </Card>
  )
}

export default BookingReceipt