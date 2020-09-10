import React from 'react'

const Days = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="Calendar__Days">
      {days.map(day => {
        return (
          <div key={day} className="Calendar__Days-Day">
            {day}
          </div>
        )
      })}
    </div>
  )
}

export default Days
