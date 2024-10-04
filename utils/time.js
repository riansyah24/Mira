let time = new Date()
let date = time.getDate()
let monthNum = time.getMonth() + 1
let month = (monthNum == 1) ? "January" : (monthNum == 2) ? "February" : (monthNum == 3) ? "March" : (monthNum == 4) ? "April" : (monthNum == 5) ? "May" : (monthNum == 6) ? "June" : (monthNum == 7) ? "July" : (monthNum == 8) ? "August" : (monthNum == 9) ? "September" : (monthNum == 10) ? "October" : (monthNum == 11) ? "November" : "December"
let year = time.getYear()
let hour = time.getHours() + 1
let minute = time.getMinutes()

let timeAll = {
  date:date,
  month:month,
  hour:hour,
  minute:minute
}

export default timeAll