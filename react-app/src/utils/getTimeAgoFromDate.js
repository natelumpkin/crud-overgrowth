

const getTimeAgoFromDate = (dateString, updatedString) => {
  // console.log(dateString)
  // console.log(updatedString)
  let postTime = new Date(dateString)
  const updatedTime = new Date(updatedString)
  // console.log('getTimeAgo postTime: ', dateString)
  // console.log('getTimeAgo updatedTime ', updatedString)

  const currentTime = new Date()

  // if within the minute, tell seconds ago
  // if within the hour, tell minutes ago
  // if within the day, tell hours ago
  // if more than a day, tell the date as MM DD, YYYY
  // console.log("post Time: ", year, month, day, hour, minutes, seconds)
  // console.log('current time: ', currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds())
  let unit;
  let timeAgo;
  let verb = 'asked '

  if (dateString !== updatedString) {
    verb = 'modified '
    postTime = updatedTime
  }

  let timeBetween = currentTime - postTime;
  // console.log('time between: ', timeBetween)

  // console.log('')
  let oneYear = 31556952000;
  let oneMonth = Math.floor(oneYear / 12);
  let oneDay = 86400000;
  let oneHour = 3600000;
  let oneMinute = 60000;
  let oneSecond = 1000;

  let yearUnit;
  let monthUnit;
  let dayUnit;
  let hourUnit;
  let minuteUnit;
  let secondUnit;

  // if (timeBetween <= oneMinute) {
  //   let seconds = Math.floor(timeBetween / oneSecond)
  //   seconds === 1 ? secondUnit = 'seconds' : secondUnit = 'seconds'
  //   return `${verb}${seconds} ${secondUnit} ago`
  // } else if (timeBetween <= oneHour) {
  //   let minutes = Math.floor(timeBetween / oneMinute)
  //   let seconds = Math.floor((timeBetween - (oneMinute * minutes)) / oneSecond)
  //   seconds === 1 ? secondUnit = 'second' : secondUnit = 'seconds'
  //   minutes === 1 ? minuteUnit = 'minute' : minuteUnit = 'minutes'
  //   return `${verb}${minutes} ${minuteUnit}, ${seconds} ${secondUnit} ago`
  // } else if (timeBetween <= oneDay) {
  //   let hours = Math.floor(timeBetween / oneHour)
  //   let minutes = Math.floor((timeBetween - (oneHour * hours)) / oneMinute)
  //   hours === 1 ? hourUnit = 'hour' : dayUnit = 'hours'
  //   minutes === 1 ? minuteUnit = 'minute' : minuteUnit = 'minutes'
  //   return `${verb}${hours} ${hourUnit}, ${minutes} ${minuteUnit} ago`
  // } else if (timeBetween <= oneMonth) {
  //   let days = Math.floor(timeBetween / oneDay)
  //   let hours = Math.floor((timeBetween - (oneDay * days)) / oneHour)
  //   days === 1 ? dayUnit = 'day' : dayUnit = 'days'
  //   hours === 1 ? hourUnit = 'hour' : hourUnit = 'hours'
  //   return `${verb}${days} ${dayUnit}, ${hours} ${hourUnit} ago`
  // } else if (timeBetween <= oneYear) {
  //   let months = Math.floor(timeBetween / oneMonth)
  //   let days = Math.floor((timeBetween - (oneMonth * months)) / oneDay)
  //   // console.log(months, ' months')
  //   // console.log(days, ' remaining days')
  //   months === 1 ? monthUnit = 'month' : monthUnit = 'months'
  //   days === 1 ? dayUnit = 'day' : dayUnit = 'days'
  //   return `${verb}${months} ${monthUnit}, ${days} ${dayUnit} ago`
  // } else {
  //   let years = Math.floor(timeBetween / oneYear)
  //   let months = Math.floor((timeBetween - (oneYear * years)) / oneMonth)
  //   years === 1 ? yearUnit = 'year' : yearUnit = 'years'
  //   months === 1 ? monthUnit = 'month' : yearUnit = 'years'
  //   return `${verb}${years} ${yearUnit}, ${months} ${monthUnit} ago`
  // }

  const year = postTime.getFullYear()
  const month = postTime.getMonth()
  const day = postTime.getDate()
  const hour = postTime.getHours()
  const minutes = postTime.getMinutes()
  const seconds = postTime.getSeconds()

  // console.log(year === currentTime.getFullYear())
  // console.log(month === currentTime.getMonth())
  // console.log(day === currentTime.getDate())
  // console.log('posttime hour', hour)
  // console.log('current hour', currentTime.getHours())
  // console.log('posttime minute', minutes)
  // console.log('current minutes ', currentTime.getMinutes())


  // if year, month, day, hour, and minutes are the same, tell seconds ago
  if (year === currentTime.getFullYear() &&
          month === currentTime.getMonth() &&
          day === currentTime.getDate() &&
          hour === currentTime.getHours() &&
          minutes === currentTime.getMinutes()) {
            // console.log('postTime: ', postTime)
            // console.log('updatedTime: ', updatedTime)
            timeAgo = currentTime.getSeconds() - seconds;
            unit = 'second'
            if (timeAgo > 1) unit = 'seconds'
          }
 // if year, month, day, and hour are the same, tell minutes ago
  else if (year === currentTime.getFullYear() &&
            month === currentTime.getMonth() &&
            day === currentTime.getDate() &&
            hour === currentTime.getHours()) {
            //   console.log('postTime: ', postTime)
            // console.log('updatedTime: ', updatedTime)
              timeAgo = currentTime.getMinutes() - minutes;
              unit = 'minute';
              if (timeAgo > 1) unit = 'minutes'
            }
          // if year, month, and day are the same, tell hours ago
  else if (year === currentTime.getFullYear() &&
            month === currentTime.getMonth() &&
            day === currentTime.getDate()) {
              // console.log('postTime: ', postTime)
              // console.log('updatedTime: ', updatedTime)
              timeAgo = currentTime.getHours() - hour
              unit = 'hour';
              if (timeAgo > 1) unit = 'hours';
              // console.log('unit', unit, 'time ago', timeAgo)
            }
  // otherwise, return a day
  else {
    let date = new Intl.DateTimeFormat('en-US',{month: 'short', day: 'numeric', year: 'numeric'}).format(postTime)
    let time = postTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
    return verb + date + ' at ' + time
  }
  return verb + timeAgo + ' ' + unit + ' ago';
}

// let ex1 = "Wed, 19 Nov 2022 23:16:24 GMT"
// let up1 = "Wed, 19 Nov 2022 23:16:24 GMT"
// console.log(getTimeAgoFromDate(ex1, up1))
// let ex2 = "Thurs, 24 Nov 2022 20:25:20 GMT"
// let up2 = "Thurs, 24 Nov 2022 20:25:20 GMT"
// console.log(getTimeAgoFromDate(ex2, up2))

// let ex2 = "Sat, 20 Nov 2022 02:10:20 GMT"
// let up2 = "Sat, 22 Nov 2022 02:10:20 GMT"
// console.log(getTimeAgoFromDate(ex2, up2))

export default getTimeAgoFromDate;
