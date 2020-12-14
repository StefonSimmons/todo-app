import React from 'react'

import './MobileMenu.css'

export default function MobileMenu({ mobileMenu }) {
  return (
    <>
      {mobileMenu &&
        <div className="mobile-menu-back">
          <section className="mobile-menu-content">

          </section>
        </div>
      }
    </>
  )
}
