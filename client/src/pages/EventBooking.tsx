import React from 'react'

const EventBooking = () => {
  return (
    <div>
      <div className='event-info bg-gradient-to-r from-[#20212A] to-[#3B3251] text-white/80 py-4'>
        <div className='content-box w-2/3 my-0 mx-auto'>
          <div className='text-3xl font-bold mb-8'>BORN PINK</div>
          <div>CGV Hung Vuong Plaza | Cinema 5 | Số ghế (256/260)</div>
          <div> 31/10/2017 | 22:10 PM  - 24:46 PM </div>
        </div>
      </div>
      <div className='seats-container content-box w-2/3'>
        <div className='seat-states'>
          
        </div>
        <div className='payment-info'>

        </div>
      </div>
    </div>
  )
}

export default EventBooking