import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import DeletionModal from './DeletionModal'
import CompletionModal from './CompletionModal'
import HoverPopOver from './HoverPopOver'

import deleteIcon from '../images/delete-wht.png'

import './CompletedList.css'

export default function CompletedList(props) {

  const [formData, setFormData] = useState()
  const [deletionItemID, setDeletionItemID] = useState(null)
  const [completionItemID, setCompletionItemID] = useState(null)
  const [popOver, togglePopOver] = useState(false)

  const completedList = props.completed.map((item) => {
    return (
      <div key={item.id} className="completed-item">
        <li>{item.fields.name}</li>
        <section className="completed-options">
          <Link to={`/items/${item.id}`} className="completed-link">Details</Link>
          <img
            src={deleteIcon} alt="delete"
            className="completed-delete"
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
                const randoIdx = Math.floor(Math.random() * props.gifs.length)
                props.setGif(props.gifs[randoIdx])
                setCompletionItemID(item.id)
                setFormData({
                  name: item.fields.name,
                  description: item.fields.description,
                  priority: 0,
                  email: [props.currentUser.id],
                  complete: false
                })
              }
            }}
          />
          {popOver === item.id && <HoverPopOver />}
        </section>
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

      { completionItemID &&
        <CompletionModal
          gif={props.gif}
          setCompletionItemID={setCompletionItemID}
          completionItemID={completionItemID}
          updateToDoItem={props.updateToDoItem}
          formData={formData}
        />
      }

      { deletionItemID &&
        <DeletionModal
          setDeletionItemID={setDeletionItemID}
          deletionItemID={deletionItemID}
          deleteToDoItem={props.deleteToDoItem}
        />
      }
    </div>
  )
}
