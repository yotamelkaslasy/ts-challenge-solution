import React, { useState } from 'react'
import { FcPlus, FcTimeline } from 'react-icons/fc'

import Calendar from './components/Calendar/Calendar'
import Events from './components/Events'
import ScheduleEvent from './components/ScheduleEvent'
import { EventsProvider } from './context/EventContext'

import mockEvents from './mockEvents'

import './App.scss'

function App() {
  const [isEventsVisible, setIsEventsVisible] = useState(false)
  const [isSchduleEventsVisible, setIsSchduleEventsVisible] = useState(false)

  return (
    <EventsProvider events={mockEvents}>
      <header className="App-Header">
        <div className="App-Header-modalWrapper">
          <button
            type="button"
            className="toggle-events"
            onClick={() => {
              setIsSchduleEventsVisible(false)
              setIsEventsVisible(val => !val)
            }}>
            <FcTimeline size="2em" title="Events" />
          </button>
          <Events isVisible={isEventsVisible} setIsEventsVisible={setIsEventsVisible} />
        </div>
        <div className="App-Header-modalWrapper">
          <button
            type="button"
            className="schedule-events"
            onClick={() => {
              setIsEventsVisible(false)
              setIsSchduleEventsVisible(val => !val)
            }}>
            <FcPlus size="2em" title="Add Event" />
          </button>
          <ScheduleEvent
            isVisible={isSchduleEventsVisible}
            setIsSchduleEventsVisible={setIsSchduleEventsVisible}
          />
        </div>
      </header>
      <div className="App">
        <Calendar />
      </div>
    </EventsProvider>
  )
}

export default App
