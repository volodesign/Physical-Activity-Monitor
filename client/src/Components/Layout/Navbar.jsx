import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import LogOut from '../Auth/LogOut';
import AuthContext from '../../context/AuthContext';

export default function Navbar() {

const {loggedIn} = useContext(AuthContext);
const location = useLocation();

  return (
    <div className='header'>
      <Link to="/">AppName</Link>
        {
          loggedIn === false && (
            <>
            <div className='link-wrap'>
            {location.pathname === '/signin' ? (
              <>
              <Link to="/signup">Create an account</Link>
              </>
            ) : (
              <>
              <Link to="/signin">Log in</Link>
              </>
            )}
            </div>
            </>
          )
        }
        
        {
          loggedIn === true && (
            <>
            <Link to="/dashboard">Dashboard</Link>
            <LogOut />      
            </>
          )
        }
    </div>
  )
}
