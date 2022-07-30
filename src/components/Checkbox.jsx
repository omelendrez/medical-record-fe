import React from 'react'
import PropTypes from 'prop-types'
import './Checkbox.css'

function Checkbox({ id, label, checked, handleChange }) {
  return (
    <div className="bg-light p-2">
      <input
        type="checkbox"
        checked={checked}
        id={id}
        onChange={handleChange}
      />
      <label className="checkbox" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

Checkbox.defaultProps = {
  checked: undefined
}

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
}

export default Checkbox
