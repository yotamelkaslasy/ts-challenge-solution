import React, { useContext } from 'react'
import * as dateUtils from 'date-fns'
import classnames from 'classnames'

import DayEvents from './DayEvents'
import { EventsContext } from '../../context/EventContext'

const Cells = ({ currentMonth }) => {
  const { events } = useContext(EventsContext)

  const monthStart = dateUtils.startOfMonth(currentMonth)
  const monthEnd = dateUtils.endOfMonth(monthStart)
  let startDate = dateUtils.startOfWeek(monthStart)
  const endDate = dateUtils.endOfWeek(monthEnd)

  const dateFormat = 'd'
  const weeks = []
  let days = []

  while (startDate <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(startDate)
      startDate = dateUtils.addDays(startDate, 1)
    }
    weeks.push(days)
    days = []
  }

  const isToday = day => dateUtils.isToday(day)
  const isSameMonth = day => dateUtils.isSameMonth(day, monthStart)
  const isWeekend = index => index === 6 || index === 5

  const dayCssClasses = (day, index) =>
    classnames('Calendar__Cells-Day', {
      NotSameMonth: !isSameMonth(day),
      Today: isToday(day),
      Weekend: isWeekend(index),
    })

  return (
    <div className="Calendar__Cells">
      {weeks.map((week, index) => {
        return (
          <div
            key={index}
            className="Calendar__Cells-Week"
            style={{ height: `calc(100%/${weeks.length})` }}>
            {week.map((day, index) => (
              <div key={day} className={dayCssClasses(day, index)}>
                <span>{dateUtils.format(day, dateFormat)}</span>
                <DayEvents events={events.get(dateUtils.format(day, 'd/M/yyyy'))} />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Cells
