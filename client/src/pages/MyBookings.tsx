import React from 'react'
import { useParams } from 'react-router-dom'

const MyBookings = () => {
  const { mail } = useParams();

  return (
    <div>
      {mail}
    </div>
  )
}

export default MyBookings