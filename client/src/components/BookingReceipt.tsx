import React from 'react'
import { Booking } from '../interfaces'
import { Card, CardMedia, CardContent } from '@mui/material'

interface Props {
  date: string;
  seats: string[];
  eventName: string;
  location: string;
  imageUrl: string;
}

const BookingReceipt: React.FC<Props> = ({ date, seats, eventName, location, imageUrl }) => {
  const livDate = new Date(date);
  return (
    <Card>
        <CardMedia
          src={imageUrl}
          className='w-full h-[90px] !object-cover'
          component="img"
        />
        <CardContent className='flex flex-col'>
          <div>{livDate.getFullYear()} {eventName}</div>
          <div>
            {seats.map((seat, index) => (
              <div key={index}>
                {seat}
              </div>
            ))}
          </div>
          <div>{location}</div>
        </CardContent>
    </Card>
  )
}

export default BookingReceipt