import React, {useState, useEffect, FormEvent} from 'react'
import { Button, Box, Modal, TextField } from '@mui/material'
import { Seat, Event } from '../interfaces'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'

const EventBooking = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [thisEvent, setThisEvent] = useState<Event>();
  const [seatList, setSeatList] = useState<Seat[]>([{ id: '', status: '', seatType: { name: '', price: 0 } }]);
  const [seatTypes, setSeatTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState<{ seatNumber: number, seatInfo: Seat }[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    getEventInfo();
  }, [])

  async function getEventInfo() {
    const res = await fetch(`http://localhost:8000/event/detail/${id}`);

    const event = await res.json();
    setThisEvent(event.event);
    setSeatList(event.seats);
  }

  // useEffect(() => {
  //   console.log(seatList);
  // }, [seatList]);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/booking/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName: fullName,
            phone: phone,
            email: email,
            totalPayment: (isSelected?.reduce((total: number, currentValue) => {
              return total + currentValue.seatInfo.seatType.price
            }, 0)),
            event: id,
            eventName: thisEvent?.title,
            eventDate: thisEvent?.date,
            seats: (isSelected?.map(item => item.seatInfo.id)),
            seatIds: (isSelected?.map(item => { return `S-${item.seatNumber}`})),
        })
    })
  }
  // useEffect(() => {
  //   console.log(isSelected);
  // }, [isSelected])

  return (
    <div className='bg-[#f1f1f1]'>
      <div className='event-info bg-gradient-to-r from-[#20212A] to-[#3B3251] text-white/80 py-4'>
        <div className='content-box w-2/3 my-0 mx-auto'>
          <div className='text-3xl font-bold mb-8'>{thisEvent?.title}</div>
          <div>{thisEvent?.location} | Cinema 5 | Available seats ({seatList?.filter(seat => seat.status.toLowerCase() === "available").length}/{seatList?.length})</div>
          <div> 31/10/2017 | 22:10 PM  - 24:46 PM </div>
        </div>
      </div>
      <div className='main-container content-box w-2/3 my-0 mx-auto py-8 flex gap-8'>
        <div className='content-box w-[70%] py-8 flex flex-col gap-8'>
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
          <div className="seat-categories flex flex-wrap">
            {seatTypes?.map((item, index) => (
              <div className="category-card border border-dashed border-slate-500/30 bg-neutral-300/75 flex gap-4 px-4 items-center relative basis-1/2">
                <div className={`border border-solid border-slate-500 w-[32px] h-[32px] color-code-${index}`} />
                <div className='flex flex-col'>
                  <div className='font-semibold text-lg'>{item}</div>
                  <div>{seatList?.find(ele => ele.seatType.name === item)?.seatType.price} VND</div>
                </div>
                <Icon className='w-[32px] h-[32px] text-zinc-500 absolute right-2' icon="mdi:information-variant-circle"/>
              </div>
            ))}
            
          </div>
          <div className="seat-container bg-white flex flex-col gap-12 px-6 py-8">
            <div className="screen bg-gray-600 text-center text-white font-bold text-2xl py-3">SCREEN</div>
            <div className="seats flex flex-col">
              {isLoading ? (<><Icon icon="svg-spinners:270-ring" /></>) : (
                <>
                  {seatTypes.map(seatType => (
                    <>
                      <div className='flex flex-wrap px-7'>
                        {seatList.map((item, index) => {
                          if (item.seatType.name === seatType) {
                            return (
                              <>
                                {item.status.toLowerCase() === "available" ? (
                                  <>
                                    {isSelected?.some(ele => ele.seatInfo.id === item.id) ? (
                                      <div className={`color-code-${seatTypes.indexOf(seatType)} p-2`}>
                                        <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-red-950 flex justify-center items-center text-slate-100 hover:cursor-pointer hover:opacity-75 hover:ease-in hover:delay-100' onClick={() => {
                                          if (isSelected?.some(ele => ele.seatInfo.id === item.id)) {
                                            setIsSelected(prevState => prevState.filter(ele => ele.seatInfo.id != item.id))
                                          } else {
                                            setIsSelected(prevState => [ ...prevState, { seatNumber: index + 1, seatInfo: item } ])
                                          }
                                        }}>
                                          {index + 1}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className={`color-code-${seatTypes.indexOf(seatType)} p-2`}>
                                        <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-slate-100 flex justify-center items-center hover:bg-red-950 hover:text-slate-100 hover:cursor-pointer hover:ease-in hover:delay-100' onClick={() => {
                                          if (isSelected?.some(ele => ele.seatInfo.id === item.id)) {
                                            setIsSelected(prevState => prevState.filter(ele => ele.seatInfo.id != item.id))
                                          } else {
                                            setIsSelected(prevState => [ ...prevState, { seatNumber: index + 1, seatInfo: item } ])
                                          }
                                        }}>
                                          {index + 1}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div className={`color-code-${seatTypes.indexOf(seatType)} p-2`}>
                                    <div className='h-[48px] w-[48px] rounded-lg border border-solid border-slate-700 bg-neutral-500 flex justify-center items-center'>
                                      {index + 1}
                                    </div>
                                  </div>
                                )}
                              </>
                            )
                          }
                          return (<></>)
                        })}
                      </div>
                    </>
                  ))}
                  
                </> 
              )}
            </div>
          </div>
        </div>
        <div className='payment-info w-[520px] h-fit'>
          <div className='px-4 p-6 bg-white'>
            <div className='text-md font-bold'>
              Booking information
            </div>
            <div className='bg-slate-500 my-4 h-[2px] w-full' />
            <div className='flex justify-between text-black/60 font-bold'>
              <div>Type</div>
              <div>Quantity</div>
            </div>
            {seatTypes?.map((item, index) => (
              <>                
                {isSelected?.some(seat => seat.seatInfo.seatType.name === item) && (
                  <>
                    <div className='h-[1px] border border-slate-300 border-dashed my-4' />
                    <div className='text-black/50'>{item}</div>
                    <div className='flex justify-between text-black/50'>
                      <div>{isSelected?.find(selectedItem => selectedItem.seatInfo.seatType.name === item)?.seatInfo.seatType.price} VND</div>
                      <div>{isSelected?.filter(selectedItem => selectedItem.seatInfo.seatType.name === item).length}</div>
                    </div>
                    <div className='flex justify-between text-black/50'>
                      <div className='flex gap-2 flex-wrap w-2/3'>
                      {isSelected?.map(selectedItem => (
                        <>
                          {selectedItem.seatInfo.seatType.name === item && (
                            <div className='bg-yellow-200 py-1 px-2'>S-{selectedItem.seatNumber}</div>
                          )}
                        </>
                      ))}
                      </div>
                      <div className='text-black/50'>{isSelected?.reduce((total: number, currentValue) => {
                        if (currentValue.seatInfo.seatType.name === item) return total + currentValue.seatInfo.seatType.price;
                        return total
                      }, 0)} VND</div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
          <div className='bg-[#666] text-slate-100 px-4 py-6 flex justify-between font-bold'>
            <div>Total</div>
            <div>{isSelected?.reduce((total: number, currentValue) => {
              return total + currentValue.seatInfo.seatType.price
            }, 0)} VND</div>
          </div>
          <Button className='bg-transparent !mt-8 w-full' variant='contained' onClick={() => {setOpen(true)}}>Book</Button>
        </div>
      </div> 
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[1000px] h-[fit] shadow-md bg-white flex p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem] overflow-scroll">
            <form action="" className='px-4 w-1/2' onSubmit={handleSubmit}>
              <Box className="flex flex-col py-6 px-6 gap-6 border border-solid border-slate-200">
                <div className='text-2xl font-semibold'>Fill your information</div>
                <TextField onChange={(e) => {setFullName(e.target.value)}} name='fullName' variant='standard' placeholder='Full name'/>
                <TextField onChange={(e) => {setPhone(e.target.value)}} name='phone' variant='standard' placeholder='Phone number'/>
                <TextField onChange={(e) => {setEmail(e.target.value)}} name='email' variant='standard' placeholder='Email'/>
                <Button variant='contained' className='!mt-6 self-end' type='submit'>Confirm</Button>
              </Box>
            </form>
            <div className='payment-info w-[520px] h-fit !m-0 border border-dashed border-slate-300'>
              <div className='px-4 p-6 bg-white'>
                <div className='text-md font-bold'>
                  Booking information
                </div>
                <div className='bg-slate-500 my-4 h-[2px] w-full' />
                <div className='flex justify-between text-black/60 font-bold'>
                  <div>Type</div>
                  <div>Quantity</div>
                </div>
                {seatTypes?.map((item, index) => (
                  <>                
                    {isSelected?.some(seat => seat.seatInfo.seatType.name === item) && (
                      <>
                        <div className='h-[1px] border border-slate-300 border-dashed my-4' />
                        <div className='text-black/50'>{item}</div>
                        <div className='flex justify-between text-black/50'>
                          <div>{isSelected?.find(selectedItem => selectedItem.seatInfo.seatType.name === item)?.seatInfo.seatType.price} VND</div>
                          <div>{isSelected?.filter(selectedItem => selectedItem.seatInfo.seatType.name === item).length}</div>
                        </div>
                        <div className='flex justify-between text-black/50'>
                          <div className='flex gap-2 flex-wrap w-2/3'>
                          {isSelected?.map(selectedItem => (
                            <>
                              {selectedItem.seatInfo.seatType.name === item && (
                                <div className='bg-yellow-200 py-1 px-2'>S-{selectedItem.seatNumber}</div>
                              )}
                            </>
                          ))}
                          </div>
                          <div className='text-black/50'>{isSelected?.reduce((total: number, currentValue) => {
                            if (currentValue.seatInfo.seatType.name === item) return total + currentValue.seatInfo.seatType.price;
                            return total
                          }, 0)} VND</div>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
              <div className='bg-[#666] text-slate-100 px-4 py-8 flex justify-between font-bold'>
                <div>Total</div>
                <div>{isSelected?.reduce((total: number, currentValue) => {
                  return total + currentValue.seatInfo.seatType.price
                }, 0)} VND</div>
              </div>
            </div>
        </Box>
      </Modal>
      {isSelected && (<></>)}
    </div>
  )
}

export default EventBooking