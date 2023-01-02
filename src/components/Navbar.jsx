import React, { useContext } from 'react';
import Img from '../assets/img.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='logo'>Senior Living</div>
      <div className='user'>
        <img src={currentUser.photoURL} alt="user icon" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar