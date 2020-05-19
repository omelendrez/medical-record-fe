import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../services/utils'

const ProgrammedVisits = ({ consultations }) => {
	return (
		<div className="container">
			<h5 className="header">Visitas Programadas</h5>
			<table className="table table-sm">
				<tbody>
					{consultations
						.map(row =>
							<tr key={row.id}>
								<td>{formatDate(row.nextConsultation)}</td>
								<td className="name">
									<Link to={{ pathname: `/clientes/${row.customerId}/${row.petId}`, state: { from: '/' } }}>
										{row.petName}
									</Link>
								</td>
								<td>{row.customerName}</td>
							</tr>
						)}
				</tbody>
			</table>
		</div>
	)
}

export default ProgrammedVisits