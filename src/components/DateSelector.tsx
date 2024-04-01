import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from './common/Button'
import Input from './common/Input'

const Day: { [key: number]: string } = {
  0: 'S',
  1: 'M',
  2: 'T',
  3: 'W',
  4: 'T',
  5: 'F',
  6: 'S'
}
type User = {
  id: number
  username: string
  email: string
}
type Task = {
  userId: number
  title: string
}
interface DateSelectorProps {
  user: User
}

const DateSelector = ({ user: { id } }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newTaskName, setNewTaskName] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }
  console.log('the date', selectedDate)

  const getDatesForWeek = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay() // 0 for Sunday, 1 for Monday, etc.
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(startOfWeek.getDate() - currentDay) // Adjust to Monday of the current week

    const dates = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      dates.push({
        date: date.getDate(),
        day: Day[date.getDay()] // 0 for Sunday, 1 for Monday, etc.
      })
    }

    return dates
  }
  const dataList = getDatesForWeek()
  console.log('data list is', dataList)
  const handleAddTask = () => {
    const newTask: Task = { title: newTaskName, userId: id } // Replace 'New Task' with the actual task title
    setTasks((prevTasks) => [...prevTasks, newTask])
    setNewTaskName('')
  }

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <table>
        <thead className="flex items-center m-4 border bg-black text-white">
          <tr className="flex flex-row flex-1">
            <div className="flex flex-col bg-black text-white p-2">Tasks</div>
          </tr>
          {dataList.map((day, index) => (
            <tr key={index} className="flex flex-row border ">
              <div className="flex flex-col">
                <div className="bg-black text-white p-2">{day.day}</div>
                <div className="p-2">{day.date}</div>
              </div>
            </tr>
          ))}
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
            </tr>
          ))}
          <tr className="">
            <td>
              {isAddingTask ? (
                <>
                  <Input
                    img="/assets/username.png"
                    altText="Add Task"
                    title="Task title"
                    name="title"
                    placeholder="Enter Task Name"
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                  />
                  <Button
                    className="bg-[#e8f5fd]"
                    type="button"
                    onClick={handleAddTask}>
                    Save Task
                  </Button>
                </>
              ) : (
                <Button
                  className="bg-[#e8f5fd]"
                  type="button"
                  onClick={() => setIsAddingTask(true)}>
                  Add Task
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateSelector

/*   const getDatesForMonth = () => {
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
  } */
