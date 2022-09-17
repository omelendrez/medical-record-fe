import React from 'react'
import PropTypes from 'prop-types'
import Amount from './Amount'

function Balance({ amount, paid }) {
  const amounts = [
    { text: 'Consulta', value: amount },
    { text: 'Pagó', value: paid || 0 },
    { text: 'Saldo', value: (paid || 0) - amount }
  ]

  return (
    <div className="balance">
      {amounts.map((amt) => (
        <Amount key={amt.text} text={amt.text} value={amt.value} />
      ))}
    </div>
  )
}

Balance.defaultProps = {
  paid: 0
}

Balance.propTypes = {
  amount: PropTypes.number.isRequired,
  paid: PropTypes.number
}

export default Balance
