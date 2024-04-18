import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Button from './common/Button'
import Input from './common/Input'
import axios from 'axios'
import { startOfWeek, addDays, format } from 'date-fns'

/* const Day: { [key: number]: string } = {
  0: 'S',
  1: 'M',
  2: 'T',
  3: 'W',
  4: 'T',
  5: 'F',
  6: 'S'
} */
type UserTask = {
  title: string
  id: number
}
type User = {
  id: number
  username: string
  email: string
}
/* enum STATUS {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS'
} */
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
type ExtendedTask = Task & { taskId: number; taskDate?: string }

const DateSelector = ({ user: { id: userId } }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newTaskName, setNewTaskName] = useState<string>('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [userTasks, setUserTasks] = useState<ExtendedTask[]>([])
  const [error, setError] = useState('')
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }
  const period = Period.week
  console.log('the date and user', selectedDate, userId)

  const getDatesForWeek = () => {
    const currentDate = new Date()
    //const currentDay = currentDate.getDay() // 0 for Sunday, 1 for Monday, etc.
    const startOfCurrentWeek = startOfWeek(currentDate)

    const dates = []

    for (let i = 0; i < period; i++) {
      const date = addDays(startOfCurrentWeek, i)
      console.log('date value', date, date.toISOString())
      dates.push({
        taskDate: date.toISOString(),
        date: format(date, 'd'), // Get the day of the month
        day: format(date, 'EEEE').charAt(0) // Get the full name of the day (e.g., Monday)
      })
    }

    return dates
  }

  const dataList = getDatesForWeek()

  console.log('data list is', dataList)
  const validateExistingTasks = (tasks: ExtendedTask[], taskName: string) => {
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
      const response = await axios.post(
        'http://127.0.0.1:8000/api/tasks/create',
        {
          user_id: task.userId,
          title: task.title
        }
      )
      return response.data
    } catch (error) {
      console.log('failed')
      setError('Save Task Failed')
    }
  }
  const deleteTask = async (task: ExtendedTask) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/tasks/delete/${task.taskId}`
      )
      if (response) {
        setUserTasks((prevTasks) =>
          prevTasks?.filter((t) => t.taskId !== task.taskId)
        )
      }
    } catch (error) {
      console.log('failed')
      setError('Delete Task Failed')
    }
  }
  const handleAddTask = async () => {
    if (!validateExistingTasks(userTasks, newTaskName)) {
      return
    }
    if (newTaskName) {
      const newTask: Task = {
        title: newTaskName,
        userId: userId,
        status: false
      }
      const response = await saveTask(newTask)
      if (response) {
        setUserTasks((prevTasks) => [
          ...prevTasks,
          { ...newTask, taskId: response.id }
        ])
        setNewTaskName('')
        setError('')
        setIsAddingTask(false)
      }
    } else {
      setError('Enter a value')
    }
  }
  /*  function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  } */
  const onTaskStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    task: ExtendedTask,
    index: number,
    item: {
      taskDate: string
      date: string
      day: string
    }
  ) => {
    // console.log(task)
    const updatedTask = { ...task }
    updatedTask.status = event.target.checked
    updatedTask.taskDate = item.taskDate
    console.log('the updated task is', updatedTask, item)
    // Perform any additional operations here if needed

    // Return the updated task
    const updatedTasks = [...userTasks]
    updatedTasks[index] = updatedTask
    setUserTasks(updatedTasks)
  }
  //console.log('the updated task is', userTasks)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/tasks/${userId}`
        )
        setUserTasks(
          response.data.map((task: UserTask) => ({
            userId: userId,
            title: task.title,
            status: undefined,
            taskId: task.id
          }))
        )
        return response.data
      } catch (error) {
        setError('Login Failed')
      }
    }
    fetchTasks()
  }, [])
  console.log('the user tasks are', userTasks)
  return (
    <div className="">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <table className="my-8 bg-[#789bed24]">
        <thead className="m-4 border">
          <tr>
            <th className="p-2 w-96 border-4 border-white">Tasks</th>
            {dataList.map((day, index) => (
              <th key={index} className="border-4 border-white">
                <div className="flex flex-col p-2">
                  <div className="p-2">{day.day}</div>
                  <div className="p-2">{day.date}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userTasks?.map((task, index) => (
            <tr key={index} className="border-white border-4 ">
              <td className="border-4 w-96 border-white">
                <span>{task.title}</span>
                <span
                  className="mx-4 text-red-500 font-bold cursor-pointer"
                  onClick={() => deleteTask(task)}>
                  X
                </span>
              </td>
              {dataList.map((item, index) => (
                <td className="border-4 p-2 border-white" key={index}>
                  <input
                    className="w-20 h-20"
                    type="checkbox"
                    value={task.status ? 'checked' : ''}
                    name="taskStatus"
                    onChange={(event) =>
                      onTaskStatusChange(event, task, index, item)
                    }></input>
                </td>
              ))}
            </tr>
          ))}
          <tr className="">
            {isAddingTask ? (
              <>
                <td className="border-4 border-white p-2">
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
                {dataList.map((item, index) => (
                  <td className="border-4 border-white p-2" key={index}>
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
            className="bg-[#789bed69] "
            type="button"
            onClick={handleAddTask}>
            Save Task
          </Button>
        ) : (
          <Button
            className="bg-[#789bed69] mr-4"
            type="button"
            onClick={() => setIsAddingTask(true)}>
            Add Task
          </Button>
        )}
      </div>
      <div className="">{error}</div>
    </div>
  )
}

export default DateSelector

/* 

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
        taskDate: date,
        date: date.getDate(),
        day: Day[date.getDay()] // 0 for Sunday, 1 for Monday, etc.
      })
    }

    return dates
  }
  const dataList = getDatesForWeek()

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
  } */
