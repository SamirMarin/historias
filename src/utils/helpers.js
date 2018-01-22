export function getDate (timestamp) {
  let date = new Date(timestamp)
  return date.toDateString()
}

