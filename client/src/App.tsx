import React, {useState} from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EventBooking from './pages/EventBooking';
import { Icon } from '@iconify/react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import logo from './assets/logo.svg';
import AddEventButton from './components/AddEventButton';
import MyBookings from './pages/MyBookings';
import Verification from './pages/Verification';

function App() {
  const mail = sessionStorage.getItem('email');
  const [logoutSnack, setLogoutSnack] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar w-full h-[100px] bg-[#333333] flex justify-between items-center px-8">
        <div className="links">
          <Link to="/">
            <IconButton>
              <Icon icon="material-symbols:home-rounded" className='w-[32px] h-[32px] text-green-500'/>
            </IconButton>
          </Link>
          <IconButton onClick={() => {
            if (!mail) navigate("/login");
            else navigate(`/${mail}/mybookings`)
          }}>
            <Icon icon="mdi:account" className='w-[32px] h-[32px] text-green-500'/>
          </IconButton>
          <IconButton onClick={() => {
            sessionStorage.removeItem('email');
            setLogoutSnack(true);
            navigate(`/`);
          }}>
            <Icon icon="mdi:logout" className='w-[32px] h-[32px] text-green-500'/>
          </IconButton>
        </div>
        <img src={logo} alt="" className='h-[64px]'/>
        <AddEventButton />
      </nav>
      <Routes>
        <Route path='/login' element={<Verification/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/events/:id' element={<EventBooking/>}/>
        <Route path='/:mail/mybookings' element={<MyBookings/>} />
      </Routes>
      <footer className='h-[120px] bg-[#333333]'>

      </footer>
      <Snackbar
        open={logoutSnack}
        onClose={() => setLogoutSnack(false)}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={3000}
      >
        <Alert severity='success' variant='filled'>
          User successfully logged out
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
