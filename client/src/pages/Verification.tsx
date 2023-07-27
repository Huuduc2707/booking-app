import React, {useState, useEffect} from 'react'
import { Modal, TextField, Button, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
  const [email, setEmail] = useState("");
  const [snack, openSnack] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (sessionStorage.getItem('email')) navigate("/home");
  }, [])

  return (
    <>
        <Modal open={true}>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[430px] shadow-md bg-white flex flex-col p-10 border-solid border-black border-[1px] rounded-sm space-y-[3rem]'>
                <div className='text-2xl font-bold text-center'>Enter your email</div>
                <TextField name="email" variant='outlined' required onChange={(e) => setEmail(e.target.value)}/>
                <Button type='submit' className='w-fit self-center' variant='contained' onClick={() => {
                    if (validateEmail(email)){
                        sessionStorage.setItem("email", email);
                        setEmail("");
                        navigate("/home");
                    } else {
                        openSnack(true);
                    }
                }}>Submit</Button>
            </div>
        </Modal>
        <Snackbar
            open={snack}
            onClose={() => openSnack(false)}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            autoHideDuration={3000}
        >
            <Alert severity='error' variant='filled'>
                Invalid email
            </Alert>
        </Snackbar>
    </>
  )
}

export default Verification