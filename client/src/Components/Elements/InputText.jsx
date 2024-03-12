import React, { useState } from 'react'
import "../../css/input.css"

export default function InputText({ value, onChange, label, errorMessage, type, placeholder, required, pattern, onFocus, min, max, className, emailExists, isPassword }) {

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e) => {
    setFocused(true);
  }

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div className='input-base'>
        <label>
          {label}
        </label>

        {isPassword &&
          <>
            <input
              className={className}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              required={required}
              pattern={pattern}
              onBlur={handleFocus}
              focused={focused.toString()}
              onFocus={onFocus}
              min={min}
              max={max}
            />
            <button type="button" className="eye-button" onClick={togglePasswordVisibility}>
              {showPassword && <i className="fa-solid fa-eye-slash"></i>}
              {!showPassword && <i className="fa-solid fa-eye"></i>}
            </button>
          </>
        }

        {!isPassword &&
          <input
            className={className}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required={required}
            pattern={pattern}
            onBlur={handleFocus}
            focused={focused.toString()}
            onFocus={onFocus}
            min={min}
            max={max}
          />}

        {emailExists && <span className='errorMessage'>User with this email already exists</span>}
        <span className='hint errorMessage'>{errorMessage}</span>
      </div>
    </>
  )
}
