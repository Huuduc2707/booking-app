import React from 'react'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Icon } from '@iconify/react'
import { Event } from '../interfaces'

const EventCard: React.FC<Event> = ({ id, title, date, imageUrl, price, location, category, bookingNum, revenue }) => {
  const liveDate = new Date(date);
  const formattedLocation = location.split(",");
  // console.log(formattedLocation[formattedLocation.length - 1]);

  return (
    <>
        <Card className='w-[50%] max-w-[600px] min-w-[400px] min-h-[340px]'>
          <CardMedia
            src={imageUrl} 
            className="img-container w-full h-[175px] !object-cover"
            component="img" 
          />
          <CardContent className='flex flex-col gap-4'>
              <div className="event-title bg-white flex flex-col text-md font-bold">
                {title.toUpperCase()}
              </div>
              <div className="event-description flex flex-wrap justify-between">
                <div className="row-1">
                  <div className="event-price">
                    From <span className='text-green-500 text-md font-bold'>{price.toLocaleString()} VND</span>
                    {/* From <span className='text-green-500 text-md font-bold'>{priceRange.reduce((minPrice, item) => {
                      if (item.price < minPrice.price) return item
                      else return minPrice
                    }, priceRange[0])?.price} VND</span> */}
                  </div>
                  <div className="event-category flex items-center gap-1">
                    {category.map((item) => (<><div className='bg-green-300 px-2 py-1 text-sm'>{item.name}</div></>))}
                  </div>
                </div>
                <div className="row-2 text-right">
                  <span className="event-date flex items-center justify-end gap-2">
                    <Icon icon="material-symbols:calendar-month" className='m-0 text-green-500' />
                    <span>{liveDate?.getDate()}/{liveDate?.getMonth() + 1}/{liveDate?.getFullYear()}</span>
                  </span>
                  <div className="event-location border border-solid border-slate-300 flex items-center gap-1 w-fit px-2 self-end">
                    <Icon icon="material-symbols:location-on-rounded" className='text-slate-300'/>
                    {formattedLocation[formattedLocation.length - 1]}
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
    </>
  )
}

export default EventCard