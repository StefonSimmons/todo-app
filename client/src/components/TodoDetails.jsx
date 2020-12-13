import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditForm from './EditForm'

import './TodoDetails.css'

export default function TodoDetails(props) {

  const { itemID } = useParams()

  const [editForm, showEditForm] = useState(false)
  const myTask = props.myTasks.find(item => item.id === itemID)

  return (
    <div className="todo-details-main">
      <section className="todo-details-back">
        <section className="todo-details">
          {!editForm ?
            <>
              {myTask &&
                <>
                  <h5>Task:</h5>
                  <h6 className="todo-details-name">{myTask.fields.name}</h6>
                  <h5>Description:</h5>
                  <p className="todo-details-description">{myTask.fields.description}</p>
                </>
              }
            </>
            :
            <EditForm
              currentUser={props.currentUser}
              itemID={itemID}
              myTask={myTask}
              updateToDoItem={props.updateToDoItem}
              showEditForm={showEditForm}
            />
          }
          <section>
            {!editForm ?
              <button className="todo-details-btn" onClick={() => showEditForm(true)}>Edit</button>
              :
              <button className="todo-details-btn cancel" onClick={() => showEditForm(false)}>Cancel</button>
            }
          </section>
        </section>
      </section>
    </div>
  )
}
