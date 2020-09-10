import React from 'react'
import * as dateUtils from 'date-fns'

const DayEvents = ({ events }) => {
  if (!events) return null

  return (
    <div className="DayEvents">
      {events.map(({ title, time }, index) => {
        return (
          <div key={index} className="DayEvents__Event">
            <div className="DayEvents__Event-middot">·</div>
            <div className="DayEvents__Event-time">{dateUtils.format(time, 'kk:mm')}</div>
            <div className="DayEvents__Event-title">{title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DayEvents
