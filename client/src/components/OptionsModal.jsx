import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import closeIconBLK from '../images/clear-blk.png'
import closeIconWHT from '../images/clear-wht.png'
import deleteIcon from '../images/delete-blk.png'

import './OptionsModal.css'

export default function OptionsModal({ setDeletionItemID, moreOptionsItemID,showMoreOptions }) {
  const location = useLocation()
  return (
    <section className="options-modal-back">
      <div>
        <span onClick={() => {
          showMoreOptions(null)
        }}>
          <img
            src={location.pathname === '/' ? closeIconBLK : closeIconWHT} alt="close"
            className="options-modal-close"
          />
        </span>
        <section className="options-modal-content">
          <Link to={`/items/${moreOptionsItemID}`} className="options-item-link">Details</Link>
          <img
            src={deleteIcon} alt="delete"
            className="options-item-delete"
            onClick={() => {
              showMoreOptions(null)
              setDeletionItemID(moreOptionsItemID)
            }
            }
          />
        </section>
      </div>
    </section >
  )
}
