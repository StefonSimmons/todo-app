import React from 'react'

import './CompletedList.css'

export default function CompletedList({ completed }) {


  const completedList = completed.map((item) => {
    return (
      <div key={item.id} className="completed-item">
        <li>{item.fields.name}</li>
      </div>
    )
  })

  return (
    <div className="completed-main">
      <div className="completed-back">
        <h1 className="completed-title">Completed LIST</h1>
        <ol>
          {completedList}
        </ol>
      </div>
    </div>
  )
}
