import React from 'react'
import Sidebar from '../components/Sidebar';
import MainNavbar from '../components/MainNavbar';
import Directory from '../components/Directory';

const Residence = () => {
  return (
    <div className='residence'>
        <div className='container'>
        <MainNavbar />
        <Sidebar />
        <Directory type="resident"/>
        
        </div>
    </div>
  )
}

export default Residence;