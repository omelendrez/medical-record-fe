import React from 'react'
import PropTypes from 'prop-types'
import { formatAmount } from '../../helpers'

function TableFooter({ total }) {
  return (
    <tfoot>
      <tr>
        <td className="text-right" colSpan={4}>
          Total
        </td>
        <td className="text-right">{formatAmount(total)}</td>
        <td />
      </tr>
    </tfoot>
  )
}

TableFooter.propTypes = {
  total: PropTypes.number.isRequired
}

export default TableFooter
