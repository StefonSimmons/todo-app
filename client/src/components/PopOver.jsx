import React from 'react'

import './PopOver.css'

export default function PopOver() {
  return (
    <label id="complete" className={`popover-container`}>
      <div className="popover-arrow"></div>
      <div className="popover">
        <h6>Complete?</h6>
      </div>
    </label>
  )
}
