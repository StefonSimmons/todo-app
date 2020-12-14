import React from 'react'
import { Link } from 'react-router-dom'

import StaticPopOver from './StaticPopOver'

import './MobileMenu.css'

export default function MobileMenu({ mobileMenu, logout, completed }) {
  return (
    <div className={`mobile-menu-back ${mobileMenu && 'open'}`}>
      <section className={`mobile-menu-content ${mobileMenu ? 'open' : 'close'}`}>
        <Link className="mobile-menu-lnk list" to='/'>My List</Link>
        <hr className="mobile-menu-lnk list" />
        <Link className="mobile-menu-lnk new" to="/add-todo">New Item</Link>
        <hr className="mobile-menu-lnk new"/>
        <div className="mobile-completed-container">
          <Link className="mobile-menu-lnk completed" to="/completed-tasks">Completed</Link>
          {<StaticPopOver completed={completed} />}
        </div>
        <hr className="mobile-menu-lnk completed"/>
        <Link className="mobile-menu-lnk logout" to="/register-login" onClick={logout}>Logout</Link>
      </section>
    </div>
  )
}
