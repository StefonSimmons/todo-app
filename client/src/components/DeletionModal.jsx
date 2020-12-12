import React from 'react'

import closeIcon from '../images/clear.png'

import './DeletionModal.css'

export default function DeletionModal(props) {

  return (
    <section className="deletion-modal-back">
      <div>
        <span onClick={() => {
          props.setDeletionItemID(null)
        }}>
          <img src={closeIcon} alt="close" className="deletion-modal-close" />
        </span>
        <section className="deletion-modal-content">
          <h5 className="deletion-modal-text">Nice! So, you did the thing!?</h5>
          <img src={props.gif} alt="done" className="deletion-modal-gif" />
          <button
            className="deletion-modal-btn"
            onClick={() => {
              props.deleteToDoItem(props.deletionItemID)
              props.setDeletionItemID(null)
            }}>YES!</button>
        </section>
      </div>
    </section>
  )
}