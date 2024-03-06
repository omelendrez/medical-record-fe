import React, { useEffect, useState, useCallback } from 'react'
import NavLink from './NavLink'
import { logout, getUser, readOnly } from '../helpers'

function Navbar() {
  const [user, setUser] = useState({})
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const disabled = readOnly()

  const windowResize = () => setIsSmallDevice(window.innerWidth < 768)

  useEffect(() => {
    setUser(getUser())
    window.onresize = windowResize
    return () => {
      window.onresize = null
    }
  }, [])

  const handleLogout = useCallback((e) => {
    e.preventDefault()
    logout()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle={isSmallDevice ? 'collapse' : undefined}
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          className="navbar-nav mr-auto"
          data-toggle={isSmallDevice ? 'collapse' : undefined}
          data-target="#navbarSupportedContent"
        >
          <NavLink to="/">Home</NavLink>
          <div className="dropdown-divider" />
          <NavLink to="/turnos">Turnos</NavLink>
          <NavLink to="/clientes">Clientes</NavLink>
          <NavLink to="/pacientes">Pacientes</NavLink>
          <NavLink to="/consultas">Consultas</NavLink>
          <NavLink to="/vacunaciones">Vacunaciones</NavLink>
          <NavLink to="/desparasitaciones">Desparasitaciones</NavLink>
          <NavLink to="/documentos">Examenes Complementarios</NavLink>
          {!disabled && <NavLink to="/deudores">Deudores</NavLink>}
        </ul>
        <div className="text-white mr-2 text-capitalize">{user.name}</div>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
