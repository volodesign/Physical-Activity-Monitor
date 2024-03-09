import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import LogOut from '../Auth/LogOut';
import AuthContext from '../../context/AuthContext';

export default function Navbar() {

const {loggedIn} = useContext(AuthContext);
const location = useLocation();

  return (
    <div className='header'>
      <p>appname</p>
        {
          loggedIn === false && (
            <>
            <div className='link-wrap'>
            {(location.pathname === '/signin' || location.pathname === '/reset-password') && (
              <>
              <Link to="/signup">Create an account</Link>
              </>
            )}
              {location.pathname === '/signup' && (
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
