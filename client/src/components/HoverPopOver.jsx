import React from 'react'
import { useLocation } from 'react-router-dom'

import './HoverPopOver.css'

export default function PopOver() {
  const location = useLocation()
  return (
    <label id="complete" className={`hover-popover-container`}>
      <div className="hover-popover-arrow"></div>
      <div className="hover-popover">
        {location.pathname === '/' ?
          <h6> Complete ?</h6>
          :
          <h6 className="not-complete"> Not? </h6>
        }
      </div>
    </label >
  )
}
