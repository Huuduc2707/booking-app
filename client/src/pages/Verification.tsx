import React, {useState} from 'react'
import { Modal, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <>
        <Modal open={true}>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[430px] shadow-md bg-white flex flex-col p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem]'>
                <div className='text-2xl font-bold text-center'>Enter your email</div>
                <TextField name="email" variant='outlined' required onChange={(e) => setEmail(e.target.value)}/>
                <Button type='submit' className='w-fit self-center' variant='contained' onClick={async () => {
                    sessionStorage.setItem("email", email);
                    setEmail("");
                    navigate("/home");
                }}>Submit</Button>
            </div>
        </Modal>
    </>
  )
}

export default Verification