import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EventBooking from './pages/EventBooking';
import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import logo from './assets/logo.svg';
import AddEventButton from './components/AddEventButton';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <>
      <nav className="navbar w-full h-[100px] bg-[#333333] flex justify-between items-center px-8">
        <div className="links">
          <Link to="/">
            <IconButton>
              <Icon icon="material-symbols:home-rounded" className='w-[32px] h-[32px] text-green-500'/>
            </IconButton>
          </Link>
          <Link to="/mybookings">
            <IconButton>
              <Icon icon="mdi:account" className='w-[32px] h-[32px] text-green-500'/>
            </IconButton>
          </Link>
        </div>
        <img src={logo} alt="" className='h-[64px]'/>
        <AddEventButton />
      </nav>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/events/:id' element={<EventBooking/>}/>
        <Route path='/mybookings' element={<MyBookings/>} />
      </Routes>
      <footer className='h-[120px] bg-[#333333]'>

      </footer>
    </>
  );
}

export default App;
