import React from 'react'

import closeIcon from '../images/clear.png'

import './DeleteModal.css'

export default function DeleteModal(props) {

  return (
    <section className="delete-modal-back">
      <div>
        <span onClick={() => {
          
          props.setItemID(null)
          props.updateShowModal(false)
        }}>
          <img src={closeIcon} alt="close" className="delete-modal-close" />
        </span>
        <section className="delete-modal-content">
          <h5 className="delete-modal-text">Nice! So, you did the thing!?</h5>
          <img src={props.gif} alt="done" className="delete-modal-gif" />
          <button
            className="delete-modal-btn"
            onClick={() => {
              props.deleteToDoItem(props.itemID)
              props.triggerRefresh(!props.refresh)
              props.setItemID(null)
              props.updateShowModal(false)
            }}>YES!</button>
        </section>
      </div>
    </section>
  )
}
