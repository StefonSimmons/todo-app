import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import HoverPopOver from './HoverPopOver'

import deleteIcon from '../images/delete-wht.png'

import './CompletedItems.css'

export default function CompletedItems({
  item, setFormData, setCompletionItemID, completionItemID, setDeletionItemID,
  gifs, setGif, currentUser
}) {

  const [popOver, togglePopOver] = useState(false)

  return (
    <div key={item.id} className="completed-item">
      <li>{item.fields.name}</li>
      <section className="completed-item-options">
        <Link to={`/items/${item.id}`} className="completed-item-link">Details</Link>
        <img
          src={deleteIcon} alt="delete"
          className="completed-item-delete"
          onClick={() => setDeletionItemID(item.id)}
        />
        <input
          id="complete"
          type="checkbox"
          checked={completionItemID === item.id ? false : true}
          value={item.id}
          onMouseOver={(e) => togglePopOver(e.target.value)}
          onMouseLeave={() => togglePopOver(false)}
          onClick={(e) => {
            if (!e.target.checked) {
              const randoIdx = Math.floor(Math.random() * gifs.length)
              setGif(gifs[randoIdx])
              setCompletionItemID(item.id)
              setFormData({
                name: item.fields.name,
                description: item.fields.description,
                priority: 0,
                email: [currentUser.id],
                complete: false
              })
            }
          }}
        />
        {popOver === item.id && <HoverPopOver />}
      </section>
    </div>
  )
}
