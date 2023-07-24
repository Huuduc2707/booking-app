import React from 'react'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Icon } from '@iconify/react'
import { Event } from '../dummyData'

const EventCard: React.FC<Event> = ({ id, name, date, image_url, priceRange, location, category }) => {
  return (
    <>
        <Card className='w-[30%] max-w-[400px] min-w-[350px]'>
          <CardMedia
            src={image_url} 
            className="img-container w-full h-[175px]"
            component="img" 
          />
          <CardContent className='flex flex-col gap-4'>
              <div className="event-title bg-white flex flex-col text-md font-bold">
                {name}
              </div>
              <div className="event-description flex flex-wrap justify-between">
                <div className="row-1">
                  <div className="event-price">
                    From <span className='text-green-500 text-md font-bold'>{priceRange.reduce((minPrice, item) => {
                      if (item.price < minPrice.price) return item
                      else return minPrice
                    }, priceRange[0])?.price} VND</span>
                  </div>
                  <div className="event-category flex items-center gap-1">
                    <Icon icon="material-symbols:calendar-view-month" className='text-slate-300'/>
                    {category.join('/')}
                  </div>
                </div>
                <div className="row-2 text-right">
                  <span className="event-date flex items-center justify-end gap-2">
                    <Icon icon="material-symbols:calendar-month" className='m-0 text-green-500' />
                    <span>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</span>
                  </span>
                  <div className="event-location border border-solid border-slate-300 flex items-center gap-1 w-fit px-2 self-end">
                    <Icon icon="material-symbols:location-on-rounded" className='text-slate-300'/>
                    {location}
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
    </>
  )
}

export default EventCard