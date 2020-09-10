import React, { useState, useContext, createRef } from 'react'
import * as dateUtils from 'date-fns'

import { EventsContext } from '../context/EventContext'
import OutsideAlerter from '../hooks/OutsideAlerter'

import './ScheduleEvent.scss'

const defaultState = {
  title: '',
  description: '',
  date: dateUtils.format(new Date(), 'u-MM-dd'),
  time: dateUtils.format(new Date(), 'kk:mm'),
  participants: [],
  maxEventsReached: false,
}

const ScheduleEvent = ({ isVisible, setIsSchduleEventsVisible }) => {
  const formRef = createRef()
  const { events, addEvent } = useContext(EventsContext)

  const [state, setState] = useState(defaultState)

  // closing...
  if (!isVisible) return null

  // set state for different inputs.
  const handleChange = event => {
    const target = event.target
    const name = target.name
    let value

    // handl selected participants values
    if (name === 'participants') {
      value = Array.from(target.selectedOptions, option => option.value)
      setState({ ...state, participants: value })
      return
    }

    value = target.value
    setState({ ...state, [name]: value })
  }

  // Guard 5 events per day before calling addEvent
  const reachedMaxFiveEvents = date => {
    const eventsInDay = events.get(dateUtils.format(new Date(date), 'd/M/yyyy'))
    if (!eventsInDay) return false
    return eventsInDay.length >= 5
  }

  const onSave = () => {
    const isFormValid = formRef.current.checkValidity()
    if (!isFormValid) {
      formRef.current.reportValidity()
      return
    }

    if (reachedMaxFiveEvents(state.date)) {
      setState({ ...state, maxEventsReached: true })
      return
    }

    addEvent(state)
    onCancel()
  }

  const onCancel = () => {
    setState(defaultState)
    setIsSchduleEventsVisible(false)
  }

  const { title, description, date, time, participants, maxEventsReached } = state
  return (
    // On click outside, close modal. custom hook (not built by me)
    <OutsideAlerter action={setIsSchduleEventsVisible}>
      <div className="ScheduleEvent">
        <div className="ScheduleEvent__Title">Add Event</div>
        <section className="ScheduleEvent__FormWrapper">
          <form ref={formRef} className="ScheduleEvent__Form">
            <input
              placeholder="Title.."
              className="ScheduleEvent__Form-input"
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder="Description..."
              className="ScheduleEvent__Form-textarea"
              name="description"
              value={description}
              onChange={handleChange}
              required
            />
            <input
              className="ScheduleEvent__Form-datepicker"
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
            />
            <input
              className="ScheduleEvent__Form-timepicker"
              type="time"
              name="time"
              value={time}
              onChange={handleChange}
              required
            />
            <select
              className="ScheduleEvent__Form-multiselect"
              name="participants"
              multiple
              value={participants}
              onChange={handleChange}
              required>
              <option value="Dan">Dan</option>
              <option value="Adi">Adi</option>
              <option value="Yotam">Yotam</option>
            </select>
          </form>
        </section>
        {maxEventsReached && (
          <div className="ScheduleEvent__Form-maxEventReached">
            Reached maximum amount of events of 5 to add with selected day.
          </div>
        )}
        <footer className="ScheduleEvent__Footer">
          <button type="button" className="ScheduleEvent__Footer-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="text" className="ScheduleEvent__Footer-save" onClick={onSave}>
            Save
          </button>
        </footer>
      </div>
    </OutsideAlerter>
  )
}

export default ScheduleEvent
