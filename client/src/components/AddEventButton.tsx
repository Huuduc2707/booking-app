import React, { useState } from 'react'
import { Box, Button, Modal, TextField, InputLabel, MenuItem, FormControl } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from 'react-select';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    eventName: string;
    liveDate: Date;
    eventLocation: string;
    backdropImage: File | null;
    categories: [{ label: string, value: string }];
    priceRange: [{ type: string, price: number }];
}

const AddEventButton = () => {
  const [open, setOpen] = useState(false);

  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
        backdropImage: null
    }
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // alert(JSON.stringify(data));
    console.log(data);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
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
            <Box>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[430px] shadow-md bg-white flex flex-col p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem]">
                        <TextField variant='standard' {...register("eventName")} placeholder='Event name...' />
                        <TextField variant='standard' {...register("eventLocation")} placeholder='Location...'/>
                        <Controller 
                            name='liveDate'
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker {...field} label="Pick event date" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            )}
                        />
                        <Controller 
                            name='backdropImage' 
                            control={control}
                            render={({field, fieldState}) => (
                                <Box>
                                    <InputLabel>Backdrop image</InputLabel>
                                    <MuiFileInput {...field}/>
                                </Box>
                            )}
                        />
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
                        <Button variant='contained' type="submit">Submit</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    </div>
  )
}

export default AddEventButton