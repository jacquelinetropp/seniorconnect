import React, { useContext } from 'react';
import Img from '../assets/img.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

import '../styles/navigation.styles.scss';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='user'>
        <img src={currentUser.photoURL} alt="user icon" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => {signOut(auth); navigate("/")}}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar