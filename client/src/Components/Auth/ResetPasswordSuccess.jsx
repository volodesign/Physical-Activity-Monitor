import React from 'react'
import { Link } from 'react-router-dom'

export default function ResetPasswordSuccess() {
  return (
    <>
      <div className="form-container">

        <div className="title-text">
          <h1 className='solid-text'>Password updated!</h1>
          <p className='subtle-text'>Now you can login with your new password.</p>
        </div>

        <Link to="/signin">Back to login</Link>

      </div>
    </>
  )
}
