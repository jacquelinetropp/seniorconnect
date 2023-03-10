import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import MainNavbar from '../components/MainNavbar';

const Home = () => {
  return (
    <div className='home'>
        <div className='container'>
        <MainNavbar />
        <Sidebar />
        <Chat />
        
        </div>
    </div>
  )
}

export default Home