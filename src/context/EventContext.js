import React, { createContext } from 'react'
import * as dateUtils from 'date-fns'

// Create a context to hold event data generate from mock and from the UI.
// Also hold the addEvent handler used in the UI.
export const EventsContext = createContext()

export const EventsProvider = ({ events, children }) => {
  // Used in ScheduleEvent.js
  const addEvent = ({ title, description, date, time, participants }) => {
    // Take care offormatting vanilla time input e.g. '14:30' to milliseconds
    const [hours, minutes] = time.split(':')
    const hoursTime = dateUtils.setHours(new Date(date), parseInt(hours))
    const minutesTime = dateUtils.setMinutes(new Date(hoursTime), parseInt(minutes))

    // Create event from form data
    const newEvent = {
      title,
      description,
      date: new Date(date),
      time: dateUtils.getTime(minutesTime), // return milliseconds
      participants,
    }

    // Gather all events for that day to psh the new event to the list or to create a new list if no events that day.
    const allEventsForDate = events.get(dateUtils.format(new Date(date), 'd/M/yyyy'))

    if (allEventsForDate) {
      allEventsForDate.push(newEvent)
      events.set(dateUtils.format(new Date(date), 'd/M/yyyy'), allEventsForDate)
    } else {
      // Create new list in Map of events.
      events.set(dateUtils.format(new Date(date), 'd/M/yyyy'), [newEvent])
    }
  }

  return <EventsContext.Provider value={{ events, addEvent }}>{children}</EventsContext.Provider>
}
