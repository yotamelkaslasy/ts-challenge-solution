import * as dateUtils from 'date-fns'

/**
Create a Map data structure to hold events per day.
Key is a day, formatted as d/M/yyyy e.g. 28/12/2020
value is an array of events.
every event looks like:

 * {
 *   date: Date object
 *   time: milliseconds
 *   title: String
 *   description: String
 *   participants: []
 * }
 */

const events = new Map()

const lastMondayTaskEmail = new Date(2020, 3, 28, 15, 30)
const lastThursdayWork = new Date(2020, 3, 30, 20, 30)
const lastFridayRun = new Date(2020, 4, 1, 10, 15)
const todayFinishedTaskHours = dateUtils.setHours(new Date(), 21)
const todayFinishedTask = dateUtils.setMinutes(todayFinishedTaskHours, 30)

const inTwoDays = dateUtils.addDays(new Date(), 2)

events.set(dateUtils.format(lastMondayTaskEmail, 'd/M/yyyy'), [
  {
    date: lastMondayTaskEmail,
    time: dateUtils.getTime(lastMondayTaskEmail),
    title: 'Review Challenge By Mail',
    description: '',
    participants: ['Yotam', 'Dan'],
  },
])

events.set(dateUtils.format(lastThursdayWork, 'd/M/yyyy'), [
  {
    date: lastThursdayWork,
    time: dateUtils.getTime(lastThursdayWork),
    title: 'Start Transmit Security Challenge',
    description: 'Lorem Ipsum is simply dummy text',
    participants: ['Yotam'],
  },
])

events.set(dateUtils.format(lastFridayRun, 'd/M/yyyy'), [
  {
    date: lastFridayRun,
    time: dateUtils.getTime(lastFridayRun),
    title: 'Go For a Run',
    description: 'Lorem Ipsum is simply dummy text',
    participants: ['Yotam'],
  },
])

events.set(dateUtils.format(todayFinishedTask, 'd/M/yyyy'), [
  {
    date: todayFinishedTask,
    time: dateUtils.getTime(todayFinishedTask),
    title: 'Finished Challenge',
    description: 'Lorem Ipsum is simply dummy text',
    participants: ['Dan', 'Adi'],
  },
])

events.set(dateUtils.format(inTwoDays, 'd/M/yyyy'), [
  {
    date: inTwoDays,
    time: dateUtils.getTime(inTwoDays),
    title: 'Challenge Review',
    description: 'Review the challenge over zoom',
    zoom: 'https://us04web.zoom.us/j/71926818830?pwd=eUN3aVJveS84U0NkMDQyT1hoYzhNUT09',
    participants: ['Dan', 'Yotam', 'Adi'],
  },
])

export default events
