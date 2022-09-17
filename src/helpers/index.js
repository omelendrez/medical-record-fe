/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-cycle */
import moment from 'moment'
import {
  getInactiveCustomers,
  restoreCustomer,
  destroyCustomer
} from '../services/customers'
import { getInactivePets, restorePet, destroyPet } from '../services/pets'
import {
  getInactiveConsultations,
  restoreConsultation,
  destroyConsultation
} from '../services/consultations'
import {
  getInactiveDewormings,
  restoreDeworming,
  destroyDeworming
} from '../services/dewormings'
import {
  getInactiveVaccinations,
  restoreVaccination,
  destroyVaccination
} from '../services/vaccinations'
import 'moment/locale/es'

export const daysNames = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]

export const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

export const paymentMethods = [
  { id: 0, name: 'N/A' },
  { id: 1, name: 'Efectivo' },
  { id: 2, name: 'Tarjeta Débito' },
  { id: 3, name: 'Tarjeta Crédito' },
  { id: 4, name: 'Mercado Pago' },
  { id: 5, name: 'Otro' }
]

export const vaccinesList = [
  { id: 1, name: 'Triple felina' },
  { id: 2, name: 'Quíntuple' },
  { id: 3, name: 'Séxtuple' },
  { id: 4, name: 'Puppy DP' },
  { id: 5, name: 'Antirrábica' },
  { id: 6, name: 'Leptospirosis' }
]
export const treatmentStage = [
  { id: 1, name: 'Inicio' },
  { id: 2, name: 'Continuación' },
  { id: 3, name: 'Fin / Alta' }
]

export const sexList = [
  { id: '', name: '' },
  { id: 'Hc', name: 'Hembra c' },
  { id: 'He', name: 'Hembra e' },
  { id: 'Mc', name: 'Macho c' },
  { id: 'Me', name: 'Macho e' }
]

export const getSexName = (sexId) => {
  // sexId = Mc
  const newSex = sexList.find((sex) => sexId === sex.id)
  return newSex ? newSex.name : '???'
}

export const getTreatmentStage = (stageId) => {
  const newStage = treatmentStage.find(
    (stage) => parseInt(stageId, 10) === stage.id
  )
  return newStage ? newStage.name : '???'
}

export const getDateFromYears = (years) => {
  if (years < 1) {
    return ''
  }
  const d = new Date()
  d.setFullYear(d.getFullYear() - years)
  return moment(d).format('YYYY-MM-DD')
}

export const getDateFromMonths = (months) => {
  if (months < 1) {
    return ''
  }
  const d = new Date()
  d.setMonth(d.getMonth() - months)
  return moment(d).format('YYYY-MM-DD')
}

export const getDateFromDays = (days) => {
  if (days < 1) {
    return ''
  }
  const d = new Date()
  d.setDate(d.getDate() - days)
  return moment(d).format('YYYY-MM-DD')
}

export const getApointmentFromDays = (days, date) => {
  if (days < 1) {
    return ''
  }
  const d = new Date()
  const arrayDate = date.split('-')

  d.setFullYear(arrayDate[0])
  d.setDate(arrayDate[2])
  d.setMonth(parseInt(arrayDate[1], 10) - 1)
  d.setDate(d.getDate() + parseInt(days, 10))
  return moment(d).format('YYYY-MM-DD')
}

export const formatNumber = (amount) => parseFloat(amount).toFixed(2)

export const getAge = (birthDate) => {
  const results = moment(birthDate).toNow().replace('en ', '')
  return results === 'Fecha inválida' ? '' : results
}

export const formatDate = (date) => {
  const results = moment(date).add(3, 'hour').format('L')
  return results === 'Fecha inválida' ? '' : results
}

export const formatDateFull = (dateTime) => moment(dateTime).format('l LT')

export const setToday = () => moment(new Date()).format('YYYY-MM-DD')

export const formatDateYMD = (date) =>
  moment(new Date(date)).format('YYYY-MM-DD')

export const formatDateExtended = (dateTime) => moment(dateTime).format('LLLL')

export const formatAmount = (amount) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  })
  return formatter.format(amount)
}

export const logout = () => {
  localStorage.removeItem('user')
  window.location.href = '/'
}

export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  window.location.href = '/'
}

export const getUser = () => JSON.parse(localStorage.getItem('user'))

export const readOnly = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user.name.toLocaleLowerCase() === 'visitante'
}

export const fieldsDefault = {
  clientes: {
    fields: [
      { name: 'name', title: 'Nombre' },
      { name: 'address', title: 'Domicilio' },
      { name: 'phone', title: 'Teléfono' },
      { name: 'email', title: 'Email' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactiveCustomers,
    restoreRecord: restoreCustomer,
    deleteRecord: destroyCustomer
  },
  pacientes: {
    fields: [
      { name: 'name', title: 'Nombre' },
      { name: 'type', title: 'Tipo' },
      { name: 'breed', title: 'Raza' },
      { name: 'sex', title: 'Sexo' },
      { name: 'observations', title: 'Observaciones' }
    ],
    getRecords: getInactivePets,
    restoreRecord: restorePet,
    deleteRecord: destroyPet
  },
  vacunaciones: {
    fields: [
      { name: 'date', title: 'Fecha', className: 'text-nowrap' },
      { name: 'petName', title: 'Paciente' },
      { name: 'vaccination', title: 'Desparasitación' },
      {
        name: 'nextAppointment',
        title: 'Próx. Turno',
        className: 'text-nowrap',
        format: (value) => formatDate(value)
      }
    ],
    getRecords: getInactiveVaccinations,
    restoreRecord: restoreVaccination,
    deleteRecord: destroyVaccination
  },
  consultas: {
    fields: [
      { name: 'date', title: 'Fecha', className: 'text-nowrap' },
      { name: 'petName', title: 'Paciente' },
      { name: 'diagnosis', title: 'Diagnóstico' },
      { name: 'treatment', title: 'Tratamiento' },
      {
        name: 'nextAppointment',
        title: 'Próx. Turno',
        className: 'text-nowrap',
        format: (value) => formatDate(value)
      }
    ],
    getRecords: getInactiveConsultations,
    restoreRecord: restoreConsultation,
    deleteRecord: destroyConsultation
  },
  desparasitaciones: {
    fields: [
      { name: 'date', title: 'Fecha', className: 'text-nowrap' },
      { name: 'petName', title: 'Paciente' },
      { name: 'deworming', title: 'Desparasitación' },
      {
        name: 'nextAppointment',
        title: 'Próx. Turno',
        className: 'text-nowrap',
        format: (value) => formatDate(value)
      }
    ],
    getRecords: getInactiveDewormings,
    restoreRecord: restoreDeworming,
    deleteRecord: destroyDeworming
  }
}

/*

SELECT JSON_ARRAYAGG(JSON_OBJECT('name', name, 'phone', phone)) from customers;

SELECT JSON_OBJECT(
  'id', c.id,
  'name', c.name
  ,'statusList', (SELECT CAST(CONCAT(
  '[',
    GROUP_CONCAT(
      JSON_OBJECT(
        'id', id, 'name', name
      )
    ),
  ']') AS JSON) FROM `statuses` WHERE id = c.statusId)
  ) FROM customers c;

ALTER TABLE `vmr`.`accounts`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `debit`;
ALTER TABLE `vmr`.`consultations`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;
ALTER TABLE `vmr`.`customers`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;
ALTER TABLE `vmr`.`dewormings`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;
ALTER TABLE `vmr`.`pets`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;
ALTER TABLE `vmr`.`users`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;
ALTER TABLE `vmr`.`vaccinations`
ADD COLUMN `userId` INT NULL DEFAULT 0 AFTER `statusId`;

  */
