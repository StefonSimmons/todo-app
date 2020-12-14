import React from 'react'

import './StaticPopOver.css'

export default function StaticPopOver({ completed }) {
  return (
    <a href='#top' className='static-popover-container'>
      <div className="static-popover">
        {completed.length < 99 ?
          <h6>{completed.length}</h6>
          :
          <h6>99<span>+</span></h6>
        }
      </div>
    </a>
  )
}
