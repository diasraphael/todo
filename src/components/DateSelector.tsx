import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Day: { [key: number]: string } = {
  0: 'Su',
  1: 'Mo',
  2: 'Tu',
  3: 'We',
  4: 'Th',
  5: 'Fr',
  6: 'Sa'
}

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const getDatesForMonth = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const numDays = new Date(year, month + 1, 0).getDate()
    const dates = []

    for (let i = 1; i <= numDays; i++) {
      dates.push({
        date: i,
        day: Day[new Date(year, month, i).getDay()] // 0 for Sunday, 1 for Monday, etc.
      })
    }

    return dates
  }

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <ul>
        {getDatesForMonth().map((day, index) => (
          <li key={index}>
            {day.date} - {day.day}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DateSelector
