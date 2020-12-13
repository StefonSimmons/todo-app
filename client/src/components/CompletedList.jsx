import React, { useState } from 'react'

import DeletionModal from './DeletionModal'
import CompletionModal from './CompletionModal'
import CompletedItems from './CompletedItems'

import './CompletedList.css'

export default function CompletedList(props) {

  const [formData, setFormData] = useState()
  const [deletionItemID, setDeletionItemID] = useState(null)
  const [completionItemID, setCompletionItemID] = useState(null)

  return (
    <div className="completed-main">
      <div className="completed-back">
        <h1 className="completed-title">Completed LIST</h1>
        <ol>
          {props.completed.map((item) => {
            return (
              <CompletedItems
                item={item}
                setFormData={setFormData}
                setDeletionItemID={setDeletionItemID}
                completionItemID={completionItemID}
                setCompletionItemID={setCompletionItemID}
                currentUser={props.currentUser}
                gifs={props.gifs}
                setGif={props.setGif}
              />
            )
          })}
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
