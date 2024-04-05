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
type UserTask = {
  title: string
  id: number
}
type User = {
  id: number
  username: string
  email: string
  tasks: UserTask[]
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
type ExtendedTask = Task & { taskId: number }

const DateSelector = ({ user: { id, tasks } }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [newTaskName, setNewTaskName] = useState<string>('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [userTasks, setUserTasks] = useState<ExtendedTask[]>(
    tasks.map((task) => ({
      userId: id,
      title: task.title,
      status: false,
      taskId: task.id
    }))
  )
  const [error, setError] = useState('')
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }
  const period = Period.week
  console.log('the date and user', selectedDate, id)

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
  const deleteTask = async (task: ExtendedTask) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/task/delete/${task.taskId}`
      )
      if (response) {
        setUserTasks((prevTasks) =>
          prevTasks.filter((t) => t.taskId !== task.taskId)
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
        userId: id,
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
  function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }
  const onTaskStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    task: ExtendedTask,
    index: number
  ) => {
    console.log(task)
    const updatedTask = { ...task }
    updatedTask.status = event.target.checked

    // Perform any additional operations here if needed

    // Return the updated task
    const updatedTasks = [...userTasks]
    updatedTasks[index] = updatedTask
    setUserTasks(updatedTasks)
  }
  console.log('the updated task is', userTasks)
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
          {userTasks.map((task, index) => (
            <tr key={index}>
              <td className="text-white border w-96 ">
                <span>{task.title}</span>
                <span
                  className="mx-4 text-red-500 font-bold cursor-pointer"
                  onClick={() => deleteTask(task)}>
                  X
                </span>
              </td>
              {range(1, period).map((value: number) => (
                <td className="text-white border p-2" key={value}>
                  <input
                    className="w-20 h-20"
                    type="checkbox"
                    value={task.status ? 'checked' : ''}
                    name="taskStatus"
                    onChange={(event) =>
                      onTaskStatusChange(event, task, index)
                    }></input>
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
