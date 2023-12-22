export default function canEditThePost (datetime, hasBeenEdited) {
  const date = new Date(datetime)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  let interval = seconds / 31536000 // Number of seconds in a year
  interval = seconds / 2592000 // Number of seconds in a month
  interval = seconds / 86400 // Number of seconds in a day
  if (interval > 1 || hasBeenEdited) {
    return false
  } else {
    return true
  }
}
