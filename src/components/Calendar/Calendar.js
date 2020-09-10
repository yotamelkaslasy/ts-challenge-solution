import React, { useState } from 'react'
import * as dateUtils from 'date-fns'

import Header from './Header'
import Days from './Days'
import Cells from './Cells'

import './Calendar.scss'

const defaultState = {
  currentMonth: new Date(),
}

const Calendar = () => {
  const [state, setState] = useState(defaultState)

  const { currentMonth } = state

  const onNextHandler = () => {
    setState({
      currentMonth: dateUtils.addMonths(currentMonth, 1),
    })
  }

  const onTodayHandler = () => {
    setState({
      currentMonth: new Date(),
    })
  }

  const onPreviousHandler = () => {
    setState({
      currentMonth: dateUtils.subMonths(currentMonth, 1),
    })
  }

  return (
    <div className="Calendar">
      <Header
        currentMonth={currentMonth}
        onNextHandler={onNextHandler}
        onTodayHandler={onTodayHandler}
        onPreviousHandler={onPreviousHandler}
      />
      <Days />
      <Cells currentMonth={currentMonth} />
    </div>
  )
}

export default Calendar
