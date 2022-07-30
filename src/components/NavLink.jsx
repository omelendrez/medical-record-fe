/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

function NavLink(props) {
  const { to, children } = props
  const { pathname: page } = useLocation()
  const isActive = to.includes(page.split('/')[1])
  const className = 'nav-link ' && isActive ? 'active' : ''

  return (
    <li className={className}>
      <Link className="nav-link" {...props}>
        {children}
      </Link>
    </li>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavLink
