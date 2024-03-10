import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordSuccess() {
  return (
   <>
    <div className="form-container">

    <div className="title-text">
         <h1 className='solid-text'>Check your email</h1>
        <p className='subtle-text'>We just sent you a password recovery link. Check your email.</p>
    </div>

    <Link to="/signin">Back to login</Link>

    </div>
   </>
  )
}
