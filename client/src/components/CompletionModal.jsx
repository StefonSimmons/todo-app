import React from 'react'

import closeIcon from '../images/clear.png'

import './CompletionModal.css'

export default function CompletionModal(props) {

  return (
    <section className="completion-modal-back">
      <div>
        <span onClick={() => {
          props.setCompletionItemID(null)
        }}>
          <img src={closeIcon} alt="close" className="completion-modal-close" />
        </span>
        <section className="completion-modal-content">
          <h5 className="completion-modal-text">Nice! So, you did the thing!?</h5>
          <img src={props.gif} alt="done" className="completion-modal-gif" />
          <button
            className="completion-modal-btn"
            onClick={() => {
              // props.deleteToDoItem(props.completionItemID)
              props.setCompletionItemID(null)
            }}>YES!</button>
        </section>
      </div>
    </section>
  )
}
