import React, { useState } from 'react'
import Input from './common/Input'
import Button from './common/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ActionType } from './login/ActionType'

const LoginSignUp = () => {
  const [action, setAction] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addNewUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user', {
        email: formData.email,
        password: formData.password,
        username: formData.username
      })
      return response.data
    } catch (error) {
      setError('Add User Failed')
    }
  }

  const loginUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: formData.email,
        password: formData.password
      })
      return response.data
    } catch (error) {
      setError('Login Failed')
    }
  }

  return (
    <div className="m-12">
      <form className="flex flex-col m-auto mt-12 bg-white pb-7 w-[600px]">
        <div className="flex flex-col items-center gap-10 w-full mt-10">
          <div className="text-5xl font-bold">Planner</div>
          <div className="border-b-4 w-40"></div>
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <ActionType action={action} setAction={setAction} />
        </div>
        <div className="mt-14 flex flex-col gap-6">
          {action === 'Login' ? (
            <></>
          ) : (
            <Input
              type="text"
              img="/assets/username.png"
              altText="Username"
              title="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"></Input>
          )}
          <Input
            title="Email"
            placeholder="Enter Email"
            type="email"
            name="email"
            img="/assets/email.png"
            onChange={handleChange}
            value={formData.email}
            altText="Email"></Input>
          <Input
            title="Password"
            placeholder="Enter Password"
            type="password"
            name="password"
            img="/assets/password.png"
            onChange={handleChange}
            value={formData.password}
            altText="Password"></Input>
        </div>
        {action === 'Sign Up' ? (
          <></>
        ) : (
          <div className="pl-28 pt-8 text-[#797979] text-xl">
            Forgot Password
            <span className="text-black cursor-pointer pl-2">Click here!</span>
          </div>
        )}
        <div className="flex gap-8 mt-12 m-auto">
          <Button
            className={
              action == 'Sign Up'
                ? 'bg-[#e8f5fd]'
                : 'bg-[#EAEAEA] text-[#676767]'
            }
            type="submit"
            onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              setAction('Sign Up')
              console.log(formData)
              if (formData.email && formData.username && formData.password) {
                const response = await addNewUser()
                console.log('response', response)
                navigate('/dashboard', { state: { response } })
              } else {
                setError('Form data missing')
              }
            }}>
            SignUp
          </Button>
          <Button
            className={
              action == 'Login' ? 'bg-[#e8f5fd]' : 'bg-[#EAEAEA] text-[#676767]'
            }
            type="submit"
            onClick={async (event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              setAction('Login')
              console.log(formData)
              if (formData.email && formData.password) {
                const response = await loginUser()
                console.log('response', response)
                navigate('/dashboard', { state: { response } })
              } else {
                setError('Form data missing')
              }
            }}>
            Login
          </Button>
        </div>
        {error && (
          <div className="text-sm my-1 text-red-700 text-center pt-4">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default LoginSignUp
