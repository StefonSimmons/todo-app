import React from 'react'

import './HoverPopOver.css'

export default function PopOver() {
  return (
    <label id="complete" className={`hover-popover-container`}>
      <div className="hover-popover-arrow"></div>
      <div className="hover-popover">
        <h6>Complete?</h6>
      </div>
    </label>
  )
}
