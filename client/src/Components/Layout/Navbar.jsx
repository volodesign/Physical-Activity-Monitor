import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import Button from '../Elements/Button';
import DropdownProfile from '../Elements/DropdownProfile'

export default function Navbar() {

  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();

  const signupNavigate = () => {
    const path = "/signup";
    navigate(path);
  }

  const signinNavigate = () => {
    const path = "/signin";
    navigate(path);
  }

  const rootNavigate = () => {
    const path = "/";
    navigate(path);
  }

  return (
    <div className='header'>
      <Button onClick={rootNavigate} className="size-3 variant-link-neutral">Physical Monitor</Button>
      {
        loggedIn === false && (
          <>
            <div className='link-wrap'>
              {location.pathname === '/signin' ? (
                <>
                  <Button onClick={signupNavigate} className="size-3 variant-link-neutral">Create an account</Button>
                </>
              ) : (
                <>
                  <Button onClick={signinNavigate} className="size-3 variant-link-neutral">Login</Button>
                </>
              )}
            </div>
          </>
        )
      }

      {
        loggedIn === true && (
          <>
            <DropdownProfile />
          </>
        )
      }
    </div>
  )
}
