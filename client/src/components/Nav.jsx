import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export default function Nav({ currentUser, logout }) {
  return (
    <nav className="nav-container">
      {currentUser.fields ?
        <>
          <h3>Hi, {currentUser.fields.username}!</h3>
          <Link className="nav-lnk" to='/'>My List</Link>
          <Link className="nav-lnk" to="/add-todo">New Item</Link>
          <div class="nav-completed-container">
            <Link className="nav-lnk" to="/completed-tasks">Completed</Link>
            <div className='static-popover-container'>
              <div className="static-popover">
                <h6>99<span>+</span></h6>
              </div>
            </div>
          </div>
          <Link className="nav-lnk" to="/register-login" onClick={logout}>Logout</Link>
        </>
        :
        <Link className="nav-lnk" to="/register-login">Register / Login</Link>
      }
    </nav>
  )
}
