import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Elements/Button'

export default function ResetPasswordSuccess() {

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="form-container">

        <div className="title-text">
          <h1 className='text-size-6 text-weight-semibold text-style-neutral'>Password updated!</h1>
          <p className='text-size-3 text-weight-regular text-style-grey'>Now you can login with your new password.</p>
        </div>
        
        <Button type="Button" className="size-3 variant-link-neutral" onClick={navigateLogin}>Back to login</Button>

      </div>
    </>
  )
}
