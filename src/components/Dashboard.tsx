import React from 'react'
import { useLocation } from 'react-router-dom'
import DateSelector from './DateSelector'

const Dashboard = () => {
  const {
    state: { response }
  } = useLocation()
  console.log('new user', response)
  return (
    <div className="flex flex-col mt-12 mx-auto text-center p-8 rounded-md text-3xl">
      <h2 className="text-white">Welcome {response.username}! </h2>
      <h3 className="text-base my-8 text-white ">
        Here you have an overview of your tasks.
      </h3>
      <DateSelector user={response}></DateSelector>
    </div>
  )
}

export default Dashboard
