import React, {useState, useEffect} from 'react'
import { Seat, Event } from '../dummyData'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'

const EventBooking = () => {
  const { id } = useParams();

  const [seatList, setSeatList] = useState<Seat[]>([{ id: '', status: '', seatType: { name: '', price: 0 } }]);
  const [seatTypes, setSeatTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState<string[]>([]);

  useEffect(() => {
    getEventInfo();
  }, [])

  async function getEventInfo() {
    const res = await fetch(`http://localhost:8000/event/detail/${id}`);

    const event = await res.json();
    setSeatList(event.seats);
  }

  useEffect(() => {
    const seat_types = Array.from(new Set(seatList.map(item => item.seatType.name)));
    setSeatTypes(seat_types);
    seatList?.sort((a: Seat, b: Seat) => {
      const typeAIndex = seatTypes.indexOf(a.seatType.name);
      const typeBIndex = seatTypes.indexOf(b.seatType.name);

      return typeAIndex - typeBIndex; 
    })
    if (seatTypes) setIsLoading(false);
  }, [seatList])

  useEffect(() => {

  }, [])

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
            <div className='w-[24px] h-[24px] bg-slate-100 border border-solid border-black'/>
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
        <div className="seat-container w-3/5 bg-white flex flex-col gap-12 px-6 py-8">
          <div className="screen bg-gray-600 text-center text-white font-bold text-2xl py-3">SCREEN</div>
          <div className="seats flex flex-wrap justify-center">
            {isLoading ? (<><Icon icon="svg-spinners:270-ring" /></>) : (
              <>
                {seatList?.map((item, index) => (
                  <>
                    {/* <div key={index} className='basis-[9%] h-[24px] bg-slate-200'>
                      {item.id}
                    </div> */}
                    {(item.seatType.name === seatTypes[0]) ? (
                      <>
                      {item.status === "available" ? (
                        <>
                          {isSelected?.includes(item.id) ? (
                            <div className='bg-blue-300 p-2'>
                              <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-red-950 flex justify-center items-center text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                if (isSelected?.includes(item.id)) {
                                  setIsSelected(prevState => prevState.filter(id => id != item.id))
                                } else {
                                  setIsSelected(prevState => [ ...prevState, item.id ])
                                }
                              }}>
                                {index}
                              </div>
                            </div>
                          ) : (
                            <div className='bg-blue-300 p-2'>
                              <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-slate-100 flex justify-center items-center hover:bg-red-950 hover:text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                if (isSelected?.includes(item.id)) {
                                  setIsSelected(prevState => prevState.filter(id => id != item.id))
                                } else {
                                  setIsSelected(prevState => [ ...prevState, item.id ])
                                }
                              }}>
                                {index}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className='bg-blue-300 p-2'>
                          <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-neutral-500 flex justify-center items-center' onClick={() => {
                            if (isSelected?.includes(item.id)) {
                              setIsSelected(prevState => prevState.filter(id => id != item.id))
                            } else {
                              setIsSelected(prevState => [ ...prevState, item.id ])
                            }
                          }}>
                            {index}
                          </div>
                        </div>
                      )}
                     </>
                    ) : (item.seatType.name === seatTypes[1]) ? (
                       <>
                        {item.status === "available" ? (
                          <>
                            {isSelected?.includes(item.id) ? (
                              <div className='bg-yellow-400 p-2'>
                                <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-red-950 flex justify-center items-center text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                  if (isSelected?.includes(item.id)) {
                                    setIsSelected(prevState => prevState.filter(id => id != item.id))
                                  } else {
                                    setIsSelected(prevState => [ ...prevState, item.id ])
                                  }
                                }}>
                                  {index}
                                </div>
                              </div>
                            ) : (
                              <div className='bg-yellow-400 p-2'>
                                <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-slate-100 flex justify-center items-center hover:bg-red-950 hover:text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                  if (isSelected?.includes(item.id)) {
                                    setIsSelected(prevState => prevState.filter(id => id != item.id))
                                  } else {
                                    setIsSelected(prevState => [ ...prevState, item.id ])
                                  }
                                }}>
                                  {index}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className='bg-yellow-400 p-2'>
                            <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-neutral-500 flex justify-center items-center' onClick={() => {
                              if (isSelected?.includes(item.id)) {
                                setIsSelected(prevState => prevState.filter(id => id != item.id))
                              } else {
                                setIsSelected(prevState => [ ...prevState, item.id ])
                              }
                            }}>
                              {index}
                            </div>
                          </div>
                        )}
                       </>
                      ) : (
                        <>
                        {item.status === "available" ? (
                          <>
                            {isSelected?.includes(item.id) ? (
                              <div className='bg-pink-300 p-2'>
                                <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-red-950 flex justify-center items-center text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                  if (isSelected?.includes(item.id)) {
                                    setIsSelected(prevState => prevState.filter(id => id != item.id))
                                  } else {
                                    setIsSelected(prevState => [ ...prevState, item.id ])
                                  }
                                }}>
                                  {index}
                                </div>
                              </div>
                            ) : (
                              <div className='bg-pink-300 p-2'>
                                <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-slate-100 flex justify-center items-center hover:bg-red-950 hover:text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                  if (isSelected?.includes(item.id)) {
                                    setIsSelected(prevState => prevState.filter(id => id != item.id))
                                  } else {
                                    setIsSelected(prevState => [ ...prevState, item.id ])
                                  }
                                }}>
                                  {index}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className='bg-pink-300 p-2'>
                            <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-neutral-500 flex justify-center items-center' onClick={() => {
                              if (isSelected?.includes(item.id)) {
                                setIsSelected(prevState => prevState.filter(id => id != item.id))
                              } else {
                                setIsSelected(prevState => [ ...prevState, item.id ])
                              }
                            }}>
                              {index}
                            </div>
                          </div>
                        )}
                       </>
                    )}
                  </>
                ))}
              </> 
            )}
          </div>
        </div>
        <div className='payment-info'>
          <div>
            <div>
              Booking information
            </div>
            <div className='bg-slate-500 h-[2px] w-full' />
            <div>
              <div>Type</div>
              <div>Quantity</div>
            </div>
            <div>Zone E</div>
            <div>
              <div>2000000VND</div>
              <div>2</div>
            </div>
            <div>
              <div>
                <div>E-27</div>
                <div>E-28</div>
              </div>
            </div>
          </div>
          <div>
            <div>Total</div>
            <div>4000000 VND</div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default EventBooking