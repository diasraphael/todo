import React from 'react'
import { useLocation } from 'react-router-dom'
import DateSelector from './DateSelector'

const Dashboard = () => {
  const {
    state: { response }
  } = useLocation()
  return (
    <div className="flex flex-col mt-12 mx-auto bg-white w-[600px] text-center p-8 rounded-md text-3xl">
      <h2>Welcome {response.username}! </h2>
      <h3 className="text-base mt-4">
        Here you have an overview of your tasks.
      </h3>
      <DateSelector></DateSelector>
    </div>
  )
}

export default Dashboard
