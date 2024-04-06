import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import Modal from './Modal'
import {
  logout,
  getUser,
  saveUser,
  readOnly,
  SMALL_DEVICE_WIDTH
} from '../helpers'
import { getUsers, login } from '../services/users'
import './change-user-modal.css'

function Navbar() {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState(null)
  const [isSmallDevice, setIsSmallDevice] = useState(
    window.innerWidth < SMALL_DEVICE_WIDTH
  )
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleUser, setToggleUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(getUser())
  const [error, setError] = useState('')

  const [changed, setChanged] = useState(false)

  const disabled = readOnly()

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await getUsers()
      setUsers(usersList.users)
    }
    loadUsers()
  }, [])

  useEffect(() => {
    const localUser = getUser()
    setUser(localUser)
  }, [changed])

  useEffect(() => {
    window.onresize = () =>
      setIsSmallDevice(window.innerWidth < SMALL_DEVICE_WIDTH)
    return () => {
      window.onresize = null
    }
  }, [])

  const handleSelectUser = (u) => {
    setSelectedUser(u)
    setError('')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  const handleToggleMenu = (e) => {
    e.preventDefault()
    setToggleMenu(!toggleMenu)
  }

  const handleToggleUser = (e) => {
    e.preventDefault()
    setError('')
    setToggleUser(!toggleUser)
  }

  const clearForm = () => {
    setSelectedUser(null)
    setToggleUser(false)
    setError('')
  }
  const handleChangeUser = (e) => {
    e.preventDefault()
    if (!selectedUser) {
      setError('Debe seleccionar un usuario')
    } else {
      login({ name: selectedUser.name, password: 'auto' })
        .then((u) => {
          saveUser(u)
          setChanged(!changed)
        })
        .catch((err) => setError(err.response.data.error))
      clearForm()
    }
  }

  const handleCancelChangeUser = (e) => {
    e.preventDefault()
    clearForm()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle={isSmallDevice ? 'collapse' : undefined}
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" onClick={handleToggleMenu} />
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
        <button
          type="button"
          className="btn btn-primary btn-sm mr-2 text-capitalize"
          onClick={handleToggleUser}
        >
          {user.name}
        </button>
        {users && (
          <Modal
            className="change-user-modal"
            show={toggleUser}
            toggleModal={handleToggleUser}
            title="Cambiar usuario"
            onSubmit={handleChangeUser}
            onCancel={handleCancelChangeUser}
            error={error}
            okLabel="Cambiar"
          >
            <div className="change-user-modal-list">
              {users.rows
                .filter((u) => u.roleId === 2)
                .map((u) => (
                  <div
                    onClick={() => (!disabled ? handleSelectUser(u) : () => {})}
                    key={u.name}
                    className={
                      u.id === selectedUser?.id ? 'bg-info text-white' : ''
                    }
                  >
                    {u.name}
                  </div>
                ))}
            </div>
          </Modal>
        )}
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
