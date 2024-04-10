import React, { useState } from "react";
import "../../css/input.css";
import "../../css/text.css";

export default function InputText({
  value,
  onChange,
  label,
  errorMessage,
  type,
  placeholder,
  required,
  pattern,
  onFocus,
  min,
  max,
  className,
  emailExists,
  isPassword,
  name,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div className="input-base">
        <label className="text-size-3 text-weight-medium text-style-neutral text-align-left">
          {label}
        </label>

        {isPassword && (
          <>
            <input
              className={
                (className,
                "text-size-3 text-weight-regular text-style-neutral")
              }
              type={showPassword ? "text" : "password"}
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
              name={name}
            />
            <button
              type="button"
              className="eye-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword && <i className="fa-solid fa-eye-slash"></i>}
              {!showPassword && <i className="fa-solid fa-eye"></i>}
            </button>
          </>
        )}

        {!isPassword && (
          <input
            className={
              (className, "text-size-3 text-weight-regular text-style-neutral")
            }
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
          />
        )}

        {emailExists && (
          <span className="text-size-2 text-weight-medium text-style-danger">
            User with this email already exists
          </span>
        )}
        <span className="hint text-size-2 text-weight-medium text-style-danger">
          {errorMessage}
        </span>
      </div>
    </>
  );
}
