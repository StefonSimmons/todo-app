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
          <h5 className="deletion-modal-text">Was This Task a Mistake?</h5>
          <img src="https://media.giphy.com/media/9xlzhm7XZFaja1E6QX/giphy.gif" alt="delete" className="deletion-modal-gif"/>
          <button
            className="deletion-modal-btn"
            onClick={() => {
              props.deleteToDoItem(props.deletionItemID)
              props.setDeletionItemID(null)
            }}>DELETE!</button>
        </section>
      </div>
    </section>
  )
}