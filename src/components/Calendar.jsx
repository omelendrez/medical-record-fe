import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getProgrammedVisitsByPeriod as getConsultations } from '../services/consultations'
import { getProgrammedVisitsByPeriod as getVaccinations } from '../services/vaccinations'
import { getProgrammedVisitsByPeriod as getDewormings } from '../services/dewormings'
import Loading from './Loading'
import { formatDateYMD, daysNames, monthNames } from '../helpers'
import './Calendar.css'

const TYPES = {
  UP: 'up',
  DOWN: 'down'
}

function Weekdays() {
  return (
    <div className="weekdays">
      {daysNames.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  )
}

const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth()
}

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }

    case TYPES.UP:
      if (state.month === 11) {
        return { ...state, month: 0, year: state.year + 1 }
      }
      return { ...state, month: state.month + 1 }

    case TYPES.DOWN:
      if (state.month === 0) {
        return { ...state, month: 11, year: state.year - 1 }
      }
      return { ...state, month: state.month - 1 }

    default:
      return state
  }
}

function Header({ year, month, onChangeMonth }) {
  return (
    <div className="month">
      <div>
        <div className="prev" onClick={() => onChangeMonth(TYPES.DOWN)}>
          &#10094;
        </div>
        <div className="next" onClick={() => onChangeMonth(TYPES.UP)}>
          &#10095;
        </div>
        <div>
          {monthNames[month]} <span style={{ fontSize: '18px' }}>{year}</span>
        </div>
      </div>
    </div>
  )
}

function Days({ month, days, events }) {
  if (!days.length && !events.length) return null
  return (
    <div className="days">
      {days.map((d) => {
        const date = formatDateYMD(
          new Date(`${d.date.year}-${d.date.month + 1}-${d.date.day}`)
        )
        const eventsByDate = events.filter((e) => e.nextAppointment === date)
        let componentClass = ''
        if (d.date.month !== month) {
          componentClass = 'not-current-month'
        }
        if (d.isToday) {
          componentClass = 'active'
        }
        return (
          <div key={`${d.date.day}-${d.date.month}`} className={componentClass}>
            <div className="date">{d.date.day}</div>
            {eventsByDate.length > 0 && (
              <div className="event">{eventsByDate.length} turnos</div>
            )}
            {eventsByDate.map((e, index) => {
              if (index > 2) return null
              return (
                <div key={`${e.id}-${e.type}`} className="event" title={d.type}>
                  <span className="icon">{e.icon}</span>{' '}
                  {e.petName.toUpperCase()}-{e.customerName.toUpperCase()}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function Calendar() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { year, month } = state
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [events, setEvents] = React.useState([])
  const [days, setDays] = React.useState([])

  useEffect(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    while (firstDay.getDay() !== 0) {
      firstDay.setDate(firstDay.getDate() - 1)
    }
    while (lastDay.getDay() !== 6) {
      lastDay.setDate(lastDay.getDate() + 1)
    }
    setStartDate(formatDateYMD(firstDay))
    setEndDate(formatDateYMD(lastDay))
    const daysList = []
    for (const q = firstDay; q <= lastDay; q.setDate(q.getDate() + 1)) {
      daysList.push({
        date: { day: q.getDate(), month: q.getMonth(), year: q.getFullYear() },
        isToday: formatDateYMD(new Date()) === formatDateYMD(q)
      })
    }
    setDays(daysList)
  }, [month])

  const handleChangeMonth = (upDown) => {
    dispatch({ type: upDown })
  }

  useEffect(() => {
    dispatch({ type: 'init' })
  }, [])

  useEffect(() => {
    const getEvents = async () => {
      const consultations = await getConsultations(startDate, endDate)
      const newConsultations = consultations.rows.map((c) => ({
        id: c.id,
        customerName: c.customerName,
        petName: c.petName,
        nextAppointment: c.nextAppointment,
        type: 'Consulta',
        icon: '🩺'
      }))
      const vaccionations = await getVaccinations(startDate, endDate)
      const newVaccinations = vaccionations.rows.map((c) => ({
        id: c.id,
        customerName: c.customerName,
        petName: c.petName,
        nextAppointment: c.nextAppointment,
        type: 'Vacuna',
        icon: '💉'
      }))
      const dewormings = await getDewormings(startDate, endDate)
      const newDewormings = dewormings.rows.map((c) => ({
        id: c.id,
        customerName: c.customerName,
        petName: c.petName,
        nextAppointment: c.nextAppointment,
        type: 'Desparasitación',
        icon: '🐛'
      }))
      setEvents([...newConsultations, ...newVaccinations, ...newDewormings])
    }
    getEvents()
  }, [startDate, endDate])

  if (!events.length) {
    return <Loading />
  }

  return (
    <div className="container-fluid mb-3">
      <Header year={year} month={month} onChangeMonth={handleChangeMonth} />
      <Weekdays />
      <Days days={days} month={month} events={events} />
      <Link to="/turnos" className="btn btn-primary">
        Volver a Turnos
      </Link>
    </div>
  )
}

Header.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChangeMonth: PropTypes.func.isRequired
}

Days.propTypes = {
  month: PropTypes.number.isRequired,
  days: PropTypes.instanceOf(Array).isRequired,
  events: PropTypes.instanceOf(Array).isRequired
}

export default Calendar
