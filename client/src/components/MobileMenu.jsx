import React from 'react'
import { Link } from 'react-router-dom'

import StaticPopOver from './StaticPopOver'

import './MobileMenu.css'

export default function MobileMenu({ mobileMenu, currentUser, logout, completed }) {
  return (
    <>
      {mobileMenu &&
        <div className="mobile-menu-back">
          <section className="mobile-menu-content">
            <Link className="mobile-menu-lnk list" to='/'>My List</Link>
            <Link className="mobile-menu-lnk new" to="/add-todo">New Item</Link>
            <div className="menu-completed-container">
              <Link className="mobile-menu-lnk completed" to="/completed-tasks">Completed</Link>
              <StaticPopOver completed={completed} />
            </div>
            <Link className="mobile-menu-lnk logout" to="/register-login" onClick={logout}>Logout</Link>
          </section>
        </div>
      }
    </>
  )
}
