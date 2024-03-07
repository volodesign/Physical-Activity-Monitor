import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import LogOut from '../Auth/LogOut';
import AuthContext from '../../context/AuthContext';

export default function Navbar() {

const {loggedIn} = useContext(AuthContext);

  return (
    <div>
        {
          loggedIn === false && (
            <>
            <Link to="/signup">Signup</Link>
            <Link to="/signin">Signin</Link>
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
