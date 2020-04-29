import { getInactiveCustomers, restoreCustomer } from '../services/customers'
import { getInactivePets, restorePet } from '../services/pets'
import { getInactiveConsultations, restoreConsultation } from '../services/consultations'

export const fieldsDefault = {
  clientes: {
    fields: [
      { name: 'id', title: '#' },
      { name: 'name', title: 'Nombre' },
      { name: 'address', title: 'Domicilio' },
      { name: 'phone', title: 'Teléfono' },
      { name: 'email', title: 'Email' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactiveCustomers,
    restoreRecord: restoreCustomer
  },
  pacientes: {
    fields: [
      { name: 'id', title: '#' },
      { name: 'name', title: 'Nombre' },
      { name: 'type', title: 'Tipo' },
      { name: 'breed', title: 'Raza' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactivePets,
    restoreRecord: restorePet
  },
  consultas: {
    fields: [
      { name: 'id', title: '#' },
      { name: 'date', title: 'Fecha', className: "text-nowrap" },
      { name: 'pet.name', title: 'Paciente' },
      { name: 'diagnosis', title: 'Diagnóstico' },
      { name: 'treatment', title: 'Tratamiento' },
      { name: 'nextConsultation', title: 'Próx. Turno', className: "text-nowrap" }
    ],
    getRecords: getInactiveConsultations,
    restoreRecord: restoreConsultation
  }
}
