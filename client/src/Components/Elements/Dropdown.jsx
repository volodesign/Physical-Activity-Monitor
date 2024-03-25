import React, { useState } from 'react'
import "../../css/input.css"
import "../../css/text.css"

export default function Dropdown({ options, value, onChange, label, placeholder, errorMessage, required, onFocus, pattern, className }) {
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
        <label className="text-size-3 text-weight-medium text-style-neutral text-align-left">
          {label}
        </label>
        <i className="fa-solid fa-chevron-down dropdown-icon"></i>
        <select
          className={(className, "text-size-3 text-weight-regular text-style-neutral")}
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
        {selectedValue === '' && <span className='hint text-size-2 text-weight-medium text-style-danger'>{errorMessage}</span>}
      </div>
    </>
  )
}
