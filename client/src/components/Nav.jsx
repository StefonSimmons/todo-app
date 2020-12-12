import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({currentUser, logout}) {
  return (
    <nav className="nav-container">
      {currentUser.fields ?
        <>
          <h3>Hi, {currentUser.fields.username}!</h3>
          <Link to='/'>My List</Link>
          <Link to="/add-todo">New Item</Link>
          <Link to="/register-login" onClick={logout}>Logout</Link>
        </>
        :
        <Link to="/register-login">Register / Login</Link>
      }
    </nav>
  )
}
