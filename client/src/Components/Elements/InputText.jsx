import React, { useState } from 'react'
import "../../css/input.css"

export default function InputText({value, onChange, label, errorMessage, type, placeholder, required, pattern, onFocus, min, max, className, emailExists}) {

    const [focused, setFocused] = useState(false);

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
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required = {required}
        pattern = {pattern} 
        onBlur={handleFocus}
        focused = {focused.toString()}
        onFocus={onFocus}
        min={min}
        max={max}
        />
        {emailExists && <span className='errorMessage'>User with this email already exists</span>}
        <span className='hint errorMessage'>{errorMessage}</span>
      </div>
    </>
  )
}
