import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/users/Login'
import Routes from './Routes'
import { getUser } from './helpers'

function App() {
  const isLogedIn = !!getUser()
  if (!isLogedIn) {
    return <Login />
  }
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes />
      </main>
    </BrowserRouter>
  )
}

export default App
