import React, { useState } from 'react'
import "../../css/input.css"

export default function Dropdown({ options, value, onChange, label, placeholder, errorMessage, required, onFocus, pattern }) {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  }

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
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

        <select
          onChange={handleValueChange}
          value={selectedValue}
          required={required}
          onBlur={handleFocus}
          focused={focused.toString()}
          onFocus={onFocus}
          pattern={pattern}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {selectedValue === '' && <span className='hint errorMessage'>{errorMessage}</span>}
      </div>
    </>
  )
}
