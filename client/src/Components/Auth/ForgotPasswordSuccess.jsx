import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Elements/Button'

export default function ForgotPasswordSuccess() {

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="form-container">

        <div className="title-text">
          <h1 className='text-size-6 text-weight-semibold text-style-neutral'>Check your email</h1>
          <p className='text-size-3 text-weight-regular text-style-grey'>We just sent you a password recovery link. Check your email.</p>
        </div>

        <Button type="Button" className="size-3 variant-link-neutral" onClick={navigateLogin}>Back to login</Button>

      </div>
    </>
  )
}
