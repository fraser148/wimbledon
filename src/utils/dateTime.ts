const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getDateTimeReadable = (date: Date | undefined) => {
  if (!date) {
    return {
      date: 'err',
      time: 'err'
    }
  }
  const day = shortDayNames[date.getDay()]
  const month = shortMonthNames[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  if (day && month && dayOfMonth && year) {
    let dateString = `${day} ${dayOfMonth} ${month} ${year}`;
    dateString = dateString.toUpperCase()
    return {
      date: dateString,
      time: `${hours}:${minutes}`
    }
  }
  return {
    date: 'err',
    time: 'err'
  }
}

export {
  getDateTimeReadable
}