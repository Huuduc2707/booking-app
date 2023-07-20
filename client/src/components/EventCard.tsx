import React from 'react'
import { Card, CardMedia, CardContent } from '@mui/material'

const EventCard = () => {
  return (
    <>
        <Card>
            <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" className='object-cover w-1/2' alt="" />
            <CardContent>
                <span>Live concert</span>
            </CardContent>
        </Card>
    </>
  )
}

export default EventCard