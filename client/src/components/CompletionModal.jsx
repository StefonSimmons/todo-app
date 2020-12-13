import React from 'react'
import { useLocation } from 'react-router-dom'

import closeIconBLK from '../images/clear-blk.png'
import closeIconWHT from '../images/clear-wht.png'

import './CompletionModal.css'

export default function CompletionModal(props) {
  const location = useLocation()

  return (
    <section className="completion-modal-back">
      <div>
        <span onClick={() => {
          props.setCompletionItemID(null)
        }}>
          <img
            src={location.pathname === '/' ? closeIconBLK : closeIconWHT} alt="close"
            className="completion-modal-close"
          />
        </span>
        <section className="completion-modal-content">
          {location.pathname === '/' ?
            <>
              <h5 className="completion-modal-text">Nice! So, you did the thing!?</h5>
              <img src={props.gif} alt="done" className="completion-modal-gif" />
            </>
            :
            <>
              <h5 className="completion-modal-text">Oh! So, you didn't do the thing!?</h5>
              <img src='https://media.giphy.com/media/xT0BKFyZt9MMx9xkpW/giphy.gif' alt="not done" className="completion-modal-gif" />
            </>
          }
          <button
            className="completion-modal-btn"
            onClick={() => {
              props.updateToDoItem(props.completionItemID, props.formData)
              props.setCompletionItemID(null)
            }}>{location.pathname ==='/'? 'YES!': 'Incomplete!'}</button>
        </section>
      </div>
    </section >
  )
}
