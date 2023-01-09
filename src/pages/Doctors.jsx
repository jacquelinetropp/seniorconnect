import React from 'react'
import Sidebar from '../components/Sidebar';
import MainNavbar from '../components/MainNavbar';
import Directory from '../components/Directory';

const Doctors = () => {
  return (
    <div className='doctors'>
        <div className='container'>
        <MainNavbar />
        <Sidebar />
        <Directory type="doctor"/>
        
        </div>
    </div>
  )
}

export default Doctors;