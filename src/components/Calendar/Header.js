import React from 'react'
import * as dateUtils from 'date-fns'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

const Header = ({ currentMonth, onNextHandler, onTodayHandler, onPreviousHandler }) => {
  return (
    <div className="Calendar__Header">
      <div className="Calendar__Header-title">{dateUtils.format(currentMonth, 'MMM yyyy')}</div>
      <div className="Calendar__Header-actions">
        <button type="button" className="previousButton" onClick={onPreviousHandler}>
          <AiFillCaretLeft />
        </button>
        <button type="button" className="todayButton" onClick={onTodayHandler}>
          Today
        </button>
        <button type="button" className="nextButton" onClick={onNextHandler}>
          <AiFillCaretRight />
        </button>
      </div>
    </div>
  )
}

export default Header
