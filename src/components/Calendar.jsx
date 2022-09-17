import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getProgrammedVisitsByPeriod as getConsultations } from '../services/consultations'
import { getProgrammedVisitsByPeriod as getVaccinations } from '../services/vaccinations'
import { getProgrammedVisitsByPeriod as getDewormings } from '../services/dewormings'
import Loading from './Loading'
import { formatDateYMD, daysNames, monthNames } from '../helpers'
import './Calendar.css'

const sortEventsByCustomerName = (a, b) =>
  a.customerName.localeCompare(b.customerName)

const TYPES = {
  UP: 'up',
  DOWN: 'down'
}

function Weekdays() {
  return (
    <div className="calendar__header">
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
      <div className="prev" onClick={() => onChangeMonth(TYPES.DOWN)}>
        &#10094;
      </div>
      <div>
        {monthNames[month]} <span style={{ fontSize: '18px' }}>{year}</span>
      </div>
      <div className="next" onClick={() => onChangeMonth(TYPES.UP)}>
        &#10095;
      </div>
    </div>
  )
}

function Days({ month, days, events }) {
  if (!days.length && !events.length) return null
  return (
    <div className="calendar__week">
      {days.map((d) => {
        const date = formatDateYMD(
          new Date(`${d.date.year}-${d.date.month + 1}-${d.date.day}`)
        )
        const eventsByDate = events.filter((e) => e.nextAppointment === date)
        let componentClass = 'calendar__day day'
        if (d.date.month !== month) {
          componentClass = 'calendar__day day not-current-month'
        }
        if (d.isToday) {
          componentClass = 'calendar__day day active'
        }
        return (
          <div key={`${d.date.day}-${d.date.month}`} className={componentClass}>
            <div className="date">{d.date.day}</div>
            {eventsByDate.map((e) => (
              <div
                key={`${e.customerName}-${e.type}-${e.id}`}
                className="event"
              >
                {e.icon}
                {e.customerName.toUpperCase()} - {e.petName.toUpperCase()}
              </div>
            ))}
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
    if (startDate && endDate) {
      const getEvents = async () => {
        const eventsList = []
        const consultations = await getConsultations(startDate, endDate)
        consultations.rows.forEach((c) => {
          const event = {
            id: c.id,
            petName: c.petName,
            customerName: c.customerName,
            nextAppointment: c.nextAppointment,
            type: 'C',
            icon: (
              <span className="material-icons" title="Consulta">
                access_time
              </span>
            )
          }
          eventsList.push(event)
        })
        const vaccionations = await getVaccinations(startDate, endDate)
        vaccionations.rows.forEach((c) => {
          const event = {
            id: c.id,
            petName: c.petName,
            customerName: c.customerName,
            nextAppointment: c.nextAppointment,
            type: 'V',
            icon: (
              <span className="material-icons" title="Vacuna">
                vaccines
              </span>
            )
          }
          eventsList.push(event)
        })
        const dewormings = await getDewormings(startDate, endDate)
        dewormings.rows.forEach((c) => {
          const event = {
            id: c.id,
            petName: c.petName,
            customerName: c.customerName,
            nextAppointment: c.nextAppointment,
            type: 'D',
            icon: (
              <span className="material-icons" title="Desparasitación">
                coronavirus
              </span>
            )
          }
          eventsList.push(event)
        })
        const sortedEvents = eventsList.sort(sortEventsByCustomerName)
        setEvents(sortedEvents)
      }
      getEvents()
    }
  }, [startDate, endDate])

  if (!events.length) {
    return <Loading />
  }

  return (
    <div className="calendar">
      <Link to="/turnos" className="btn btn-primary back-to-turnos">
        Volver a Turnos
      </Link>
      <Header year={year} month={month} onChangeMonth={handleChangeMonth} />
      <Weekdays />
      <Days days={days} month={month} events={events} />
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
