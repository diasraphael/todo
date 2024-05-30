import React from 'react'
import { useLocation } from 'react-router-dom'
import DateSelector from './DateSelector'

const Dashboard = () => {
  const {
    state: { response }
  } = useLocation()
  console.log('new user', response)
  return (
    <div className="flex flex-col items-center mt-12 mx-auto text-center p-8 rounded-md text-3xl min-h-[100vh]">
      <h2 className="font-medium">
        Welcome to the Planner Tool
        <span className="capitalize"> {response.user.username}</span>!
      </h2>
      <h3 className="text-xl my-8">Here you have an overview of your tasks.</h3>
      <DateSelector user={response.user} token={response.token}></DateSelector>
    </div>
  )
}

export default Dashboard
