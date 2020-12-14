import React from 'react'
import { Link } from 'react-router-dom'

import StaticPopOver from './StaticPopOver'

import hamburgerIcon from '../images/hamburger.png'

import './Nav.css'

export default function Nav({ currentUser, logout, completed, showMobileMenu, mobileMenu }) {
  return (
    <>
      <nav className="nav-container">
        {currentUser.fields ?
          <>
            <h3>Hi, {currentUser.fields.username}!</h3>
            <Link className="nav-lnk list" to='/'>My List</Link>
            <Link className="nav-lnk new" to="/add-todo">New Item</Link>
            <div className="nav-completed-container">
              <Link className="nav-lnk completed" to="/completed-tasks">Completed</Link>
              <StaticPopOver completed={completed} />
            </div>
            <Link className="nav-lnk logout" to="/register-login" onClick={logout}>Logout</Link>
            <img className="nav-hamburger" src={hamburgerIcon} alt="menu"
              onClick={(e) => {
                e.stopPropagation()
                showMobileMenu(!mobileMenu)
              }}
            />
          </>
          :
          <Link className="nav-lnk" to="/register-login">Register / Login</Link>
        }
      </nav>
    </>
  )
}
