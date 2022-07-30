import React from 'react'
import PropTypes from 'prop-types'
import { formatAmount } from '../../../helpers'

function Amount({ text, value }) {
  let balanceClass = ''
  if (text === 'Saldo') {
    balanceClass = value < 0 ? 'balance-row-red' : 'balance-row-green'
  }
  return (
    <div className={`balance-row ${balanceClass}`}>
      <div className="balance-label">{text}:</div>
      <div className="balance-amount">
        {value === 0 ? '' : formatAmount(value)}
      </div>
    </div>
  )
}

Amount.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default Amount
