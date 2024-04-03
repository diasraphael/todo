import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from './common/Button'
import Input from './common/Input'
import axios from 'axios'

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
  user_id: number
  username: string
  email: string
}
type Task = {
  userId: number
  title: string
  status: boolean
}
interface DateSelectorProps {
  user: User
}
enum Period {
  week = 7,
  month = 30
}

const DateSelector = ({ user: { user_id } }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newTaskName, setNewTaskName] = useState<string>('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState('')
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }
  const period = Period.week
  console.log('the date and user', selectedDate, user_id)

  const getDatesForWeek = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay() // 0 for Sunday, 1 for Monday, etc.
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(startOfWeek.getDate() - currentDay) // Adjust to Monday of the current week

    const dates = []

    for (let i = 0; i < period; i++) {
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
  const validateExistingTasks = (tasks: Task[], taskName: string) => {
    const alreadyExistingTask = tasks.find((task) => task.title === taskName)
    if (alreadyExistingTask) {
      setError('This task is already added')
      return false
    } else {
      return true
    }
  }
  const saveTask = async (task: Task) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/task', {
        user_id: task.userId,
        title: task.title
      })
      return response.data
    } catch (error) {
      console.log('failed')
      setError('Save Task Failed')
    }
  }
  const handleAddTask = async () => {
    if (!validateExistingTasks(tasks, newTaskName)) {
      return
    }
    if (newTaskName) {
      const newTask: Task = {
        title: newTaskName,
        userId: user_id,
        status: false
      }
      const response = await saveTask(newTask)
      if (response) {
        setTasks((prevTasks) => [...prevTasks, newTask])
        setNewTaskName('')
        setError('')
        setIsAddingTask(false)
      }
    } else {
      setError('Enter a value')
    }
  }
  function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  return (
    <div className="m-auto">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <table className="my-8">
        <thead className="m-4 border bg-black text-white">
          <tr>
            <th className="bg-black text-white p-2 w-96">Tasks</th>
            {dataList.map((day, index) => (
              <th key={index} className="border">
                <div className="flex flex-col p-2">
                  <div className="bg-black text-white p-2">{day.day}</div>
                  <div className="p-2">{day.date}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="text-white border w-96">{task.title}</td>
              {range(1, period).map((value: number) => (
                <td className="text-white border p-2" key={value}>
                  <input className="w-20 h-20" type="checkbox"></input>
                </td>
              ))}
            </tr>
          ))}
          <tr className="">
            {isAddingTask ? (
              <>
                <td className="border p-2">
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
                </td>
                {range(1, period).map((value: number) => (
                  <td className="text-white border p-2" key={value}>
                    <input className="w-20 h-20" type="checkbox"></input>
                  </td>
                ))}
              </>
            ) : (
              <></>
            )}
          </tr>
        </tbody>
      </table>
      <div className="flex">
        {isAddingTask ? (
          <Button
            className="bg-[#e8f5fd]"
            type="button"
            onClick={handleAddTask}>
            Save Task
          </Button>
        ) : (
          <Button
            className="bg-[#e8f5fd] mr-4"
            type="button"
            onClick={() => setIsAddingTask(true)}>
            Add Task
          </Button>
        )}
      </div>
      <div className="text-white">{error}</div>
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
