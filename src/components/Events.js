import React, { useContext } from 'react'
import * as dateUtils from 'date-fns'

import OutsideAlerter from '../hooks/OutsideAlerter'
import { EventsContext } from '../context/EventContext'

import './Events.scss'

const Events = ({ isVisible, setIsEventsVisible }) => {
  const { events } = useContext(EventsContext)

  if (!isVisible) return null

  const participantBGColor = participant =>
    participant.charAt(0) === 'D'
      ? '#6baef3'
      : participant.charAt(0) === 'Y'
      ? '#6bf388'
      : '#8c6bf3'

  return (
    // On click outside, close modal. custom hook (not built by me)
    <OutsideAlerter action={setIsEventsVisible}>
      <div className="Events">
        <div className="Events__Title">Events</div>
        {Array.from(events.entries())
          .sort((eventA, eventB) => {
            return dateUtils.compareAsc(new Date(eventB), new Date(eventA))
          })
          .map(([day, eventsList]) => (
            <div key={day} className="Events__Day">
              <div className="Events__Day-Date">{day}</div>
              <ul className="Events__Day-List">
                {eventsList.map(({ title, description, time, participants, zoom }, index) => (
                  <li key={index} className="Events__Day-ListItem">
                    <div className="Events__Day-ListItem-title">{title}</div>
                    <div className="Events__Day-ListItem-description">{description}</div>
                    <div className="Events__Day-ListItem-time">
                      {dateUtils.format(time, 'kk:mm')}
                    </div>
                    <div className="Events__Day-ListItem-participants">
                      {participants.map(participant => (
                        <span
                          key={participant}
                          className="Events__Day-ListItem-participant"
                          style={{
                            background: participantBGColor(participant),
                          }}>
                          <span title={participant}>{participant.charAt(0)}</span>
                        </span>
                      ))}{' '}
                      is participating
                    </div>
                    {zoom && (
                      <a
                        href={zoom}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Events__Day-ListItem-zoom">
                        Open Zoom
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </OutsideAlerter>
  )
}

export default Events
