export default function calculateTimeAgo (timestamp) {
  const postDate = new Date(timestamp)
  const now = new Date()
  const differenceInSeconds = Math.floor((now - postDate) / 1000)

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} s`
  } else if (differenceInSeconds < 3600) {
    return `${Math.floor(differenceInSeconds / 60)} m`
  } else if (differenceInSeconds < 86400) {
    return `${Math.floor(differenceInSeconds / 3600)} h`
  } else {
    return `${Math.floor(differenceInSeconds / 86400)} d`
  }
}
