import React, { useState, FormEvent, useEffect } from 'react'
import { Box, Button, Modal, TextField, InputLabel, IconButton, MenuItem, FormControl } from '@mui/material';
import {Icon} from '@iconify/react'
import { MuiFileInput } from 'mui-file-input';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from 'react-select';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { placeholderCSS } from 'react-select/dist/declarations/src/components/Placeholder';

interface FormData {
    eventName: string;
    liveDate: Date;
    eventLocation: string;
    backdropImage: string;
    categories: { label: string, value: string }[];
    priceRange: { name: string, price: number, quantity: number }[];
}

const AddEventButton = () => {
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([{ type: '', price: 0}])
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([])

//   const handleChange = (index: number, event: FormEvent<HTMLFormElement>) => {
//     const { name, value } = event.target;
//   }
  useEffect(() => {
    getCategories();
  }, [])

  async function getCategories(){
    const res = await fetch('http://localhost:8000/category')

    const result = await res.json();
    console.log(result);
    setCategories(result);
  }

  function handleAddField() {
    setPriceRange([...priceRange, { type: '', price: 0}]);
  }

  function handleRemoveField(index: number) {
    const updated = [...priceRange];
    updated.splice(index, 1);
    setPriceRange(updated);
  }

  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
        backdropImage: ""
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setOpen(false);
    setPriceRange([{ type: '', price: 0}]);
    const category = data.categories.map(item => categories.find(ele => ele.name === item.value)?.id)
    const priceRange = data.priceRange.map(item => {return { name: item.name, price: Number(item.price), quantity: Number(item.quantity) }})
    console.log(category);
    return await fetch('http://localhost:8000/event/add', {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.eventName,
            location: data.eventLocation,
            date: data.liveDate,
            image: data.backdropImage,
            seatType: priceRange,
            category: category 
        })
    })
  };

  const options = [
    { value: 'live music', label: 'Live music' },
    { value: 'conference', label: 'Conference' },
    { value: 'theater', label: 'Theater' },
    { value: 'seminar', label: 'Seminar' },
  ]

  return (
    <div>
        <Button className='text-md font-bold text-white' variant='contained' onClick={() => {setOpen(true)}}>
            Add Event
        </Button>
        <Modal
            open={open}
            onClose={() => {setOpen(false)}}
        >
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[800px] h-[700px] shadow-md bg-white flex flex-col p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem] overflow-scroll">
                    <Box className="flex gap-8">
                        <TextField className="flex-grow" variant='standard' {...register("eventName")} placeholder='Event name...' />
                        <TextField className="flex-grow" variant='standard' {...register("eventLocation")} placeholder='Location...'/>
                    </Box>
                    <Box className="flex items-end gap-8">
                        <Controller 
                            name='liveDate'
                            control={control}
                            render={({ field }) => (
                                <Box className="flex-grow">
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker {...field} label="Pick event date" />
                                    </DemoContainer>
                                </Box>
                            )}
                        />
                        {/* <Controller 
                            name='backdropImage' 
                            control={control}
                            render={({field}) => (
                                <Box className="flex-grow">
                                    <InputLabel>Backdrop image</InputLabel>
                                    <MuiFileInput {...field}/>
                                </Box>
                            )}
                        /> */}
                        <TextField variant='standard' {...register("backdropImage")} placeholder="Image..."/>
                    </Box>
                    <Controller
                        name="categories"
                        control={control}
                        render={( {field} ) => (
                            <Box>
                                <InputLabel>Categories</InputLabel>
                                <Select {...field} isMulti name='categories' options={options}/>
                            </Box>
                        )}
                    />
                    <Box className="flex flex-col gap-4 items-center border border-solid border-slate-300 mx-auto py-8 px-16">
                        <InputLabel>Price range</InputLabel>
                        {priceRange.map((item, index) => (
                            <>
                                <div key={index} className='flex gap-2'>
                                    <Controller 
                                        name={`priceRange.${index}.name`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} variant='standard' placeholder='Type'/>
                                        )}
                                    />
                                    <Controller 
                                        name={`priceRange.${index}.price`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} type='number' variant='standard' placeholder='Price'/>
                                        )}
                                    />
                                    <Controller 
                                        name={`priceRange.${index}.quantity`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField {...field} type='number' variant='standard' placeholder='Quantity'/>
                                        )}
                                    />
                                    <IconButton onClick={() => {handleRemoveField(index)}}>
                                        <Icon icon='mdi:minus' />
                                    </IconButton>
                                </div>
                            </>
                        ))}
                        <Button variant='contained' onClick={() => {handleAddField()}}>Add field</Button>
                    </Box>
                    <Button variant='contained' type="submit" className='w-fit my-0 mx-auto self-end'>Submit</Button>
                </Box>
            </form>
        </Modal>
    </div>
  )
}

export default AddEventButton