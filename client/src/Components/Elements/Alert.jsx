import React from 'react'
import "../../css/alert.css"

export default function Alert({ children, className }) {
  return (
    <div className={className}>{children}</div>
  )
}
