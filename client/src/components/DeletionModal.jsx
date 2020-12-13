import React from 'react'
import { useLocation } from 'react-router-dom'

import closeIconBLK from '../images/clear-blk.png'
import closeIconWHT from '../images/clear-wht.png'

import './DeletionModal.css'

export default function DeletionModal(props) {
  const location = useLocation()
  return (
    <section className="deletion-modal-back">
      <div>
        <span onClick={() => {
          props.setDeletionItemID(null)
        }}>
          <img src={location.pathname === '/' ? closeIconBLK : closeIconWHT} alt="close"
            className="deletion-modal-close"
          />
        </span>
        <section className="deletion-modal-content">
          <h5 className="deletion-modal-text">Was This Task a Mistake?</h5>
          <img src="https://media.giphy.com/media/9xlzhm7XZFaja1E6QX/giphy.gif" alt="delete" className="deletion-modal-gif" />
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